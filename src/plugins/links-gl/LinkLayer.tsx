import React, { useState, useMemo, useEffect } from 'react'
import DeckGL from '@deck.gl/react'

import { LineOffsetLayer, OFFSET_DIRECTION } from '@/layers/LineOffsetLayer'

import { scaleThreshold, scaleOrdinal } from 'd3-scale'
import { StaticMap } from 'react-map-gl'
import { rgb } from 'd3-color'

import {
  MAPBOX_TOKEN,
  REACT_VIEW_HANDLES,
  DataTableColumn,
  LookupDataset,
  DataType,
} from '@/Globals'
import globalStore from '@/store'

export default function Component({
  links = { source: new Float32Array(), dest: new Float32Array() },
  colors = ['#0099ee'],
  colorRampType = -1, // -1 undefined, 0 categorical, 1 diffs, 2 sequential
  dark = false,
  scaleWidth = 1,
  build = {} as LookupDataset,
  base = {} as LookupDataset,
  widths = {} as LookupDataset,
  showDiffs = false,
  viewId = 0,
}) {
  // ------- draw frame begins here -----------------------------

  const [viewState, setViewState] = useState(globalStore.state.viewState)

  const { dataTable, activeColumn, csvRowFromLinkRow } = build
  const buildColumn: DataTableColumn = dataTable[activeColumn] || { values: [] }

  const widthValues = widths.dataTable[widths.activeColumn]
  const widthRowLookup = widths.csvRowFromLinkRow

  // deck.gl colors must be in rgb[] or rgba[] format
  const colorsAsRGB: any = colors.map(hexcolor => {
    const c = rgb(hexcolor)
    return [c.r, c.g, c.b]
  })

  // Build breakpoints between 0.0 - 1.0 to match the number of color swatches
  // e.g. If there are five colors, then we need 4 breakpoints: 0.2, 0.4, 0.6, 0.8.
  // An exponent reduces visual dominance of very large values at the high end of the scale
  const exponent = 4.0
  const domain = new Array(colors.length - 1)
    .fill(0)
    .map((v, i) => Math.pow((1 / colors.length) * (i + 1), exponent))

  // *scaleOrdinal* is the d3 function that maps categorical variables to colors.
  // *scaleThreshold* is the d3 function that maps numerical values from [0.0,1.0) to the color buckets
  // *range* is the list of colors;
  // *domain* is the list of breakpoints in the 0-1.0 continuum; it is auto-created from data for categorical.
  // *colorRampType* is 0 if a categorical color ramp is chosen
  const isCategorical = colorRampType === 0 || buildColumn.type == DataType.STRING
  const setColorBasedOnValue: any = isCategorical
    ? scaleOrdinal().range(colorsAsRGB)
    : scaleThreshold().range(colorsAsRGB).domain(domain)

  // this assumes that zero means hide the link. This may not be generic enough
  const colorPaleGrey = dark ? [80, 80, 80, 96] : [212, 212, 212]
  const colorInvisible = [0, 0, 0, 0]

  // register setViewState in global view updater
  // so we can respond to external map motion
  REACT_VIEW_HANDLES[viewId] = () => {
    setViewState(globalStore.state.viewState)
  }

  const numCsvRows = csvRowFromLinkRow.length

  // --- LINE COLORS -----------------------------------------------
  const getLineColor = (
    feature: any,
    objectInfo: { index: number; data: any; target: number[] }
  ) => {
    if (!dataTable[activeColumn]) return colorPaleGrey

    // use the csvRowLookup if we have it; if now then just use the link row number.
    const csvRow = numCsvRows ? csvRowFromLinkRow[objectInfo.index] : objectInfo.index
    let value = dataTable[activeColumn].values[csvRow]

    if (!value) return colorInvisible

    if (colors.length === 1) return colorsAsRGB[0]

    // categorical?
    if (isCategorical) {
      return setColorBasedOnValue(value)
    }

    // comparison?
    if (showDiffs) {
      const baseValue = base.dataTable[base.activeColumn].values[csvRow]
      const diff = value - baseValue

      if (diff === 0) return colorPaleGrey // setColorBasedOnValue(0.5)
      return diff > 0 ? [255, 0, 0] : [0, 0, 255] // red vs. blue
    } else {
      // don't use log scale if numbers are below 1.0
      let ratio = value / (buildColumn.max || 1.0)
      // if (ratio < 0.0001) return colorPaleGrey

      return setColorBasedOnValue(ratio)
    }
  }

  // --- LINE WIDTHS -----------------------------------------------
  const getLineWidth = (
    feature: any,
    objectInfo: { index: number; data: any; target: number[] }
  ) => {
    if (!widthValues) return 0

    const csvRow = widthRowLookup.length ? widthRowLookup[objectInfo.index] : objectInfo.index
    const value = widthValues.values[csvRow]

    if (showDiffs) {
      const baseValue = base.dataTable[base.activeColumn].values[csvRow]
      const diff = Math.abs(value - baseValue)
      return diff / scaleWidth
    } else {
      return value / scaleWidth
    }
  }

  function handleClick() {
    console.log('click!')
  }

  function handleViewState(view: any) {
    setViewState(view)
    view.center = [view.longitude, view.latitude]
    globalStore.commit('setMapCamera', view)
  }

  function precise(x: number) {
    return x.toPrecision(5)
  }

  function buildTooltipHtml(column: DataTableColumn, index: number) {
    try {
      if (!column) return null

      let value = column.values[index]
      let baseValue = base ? base.dataTable[column.name].values[index] : null

      if (isCategorical) {
        if (!Number.isFinite(value)) return null
        return `<b>${column.name}</b><p>${value}</p>`
      }

      let html = null

      if (Number.isFinite(value)) html = `<b>${column.name}</b><p>Value: ${precise(value)}</p>`

      let diff = value - baseValue
      if (Number.isFinite(baseValue)) {
        html += `<p>Base: ${precise(baseValue)}</p>`
        html += `<p>+/- Base: ${precise(diff)}</p>`
      }

      return html
    } catch (e) {
      return null
    }
  }

  function getTooltip({ object, index }: { object: any; index: number }) {
    // tooltip will show values for color settings and for width settings.
    // if there is base data, it will also show values and diff vs. base for both color and width.

    try {
      // tooltip color valuess------------
      const csvRow = numCsvRows ? csvRowFromLinkRow[index] : index
      let tooltip = buildTooltipHtml(buildColumn, csvRow)

      // tooltip widths------------
      if (widthValues && widthValues.name !== buildColumn.name) {
        const csvRow = widthRowLookup.length ? widthRowLookup[index] : index
        const widthTip = buildTooltipHtml(widthValues, csvRow)
        if (widthTip) tooltip = tooltip ? tooltip + widthTip : widthTip
      }

      if (!tooltip) return null

      return {
        html: tooltip,
        style: { color: dark ? '#ccc' : '#223', backgroundColor: dark ? '#2a3c4f' : 'white' },
      }
    } catch (e) {
      console.warn(e)
      return null
    }
  }

  //@ts-ignore
  const layer = new LineOffsetLayer({
    id: 'linkLayer',
    data: {
      length: links.source.length / 2,
      attributes: {
        getSourcePosition: { value: links.source, size: 2 },
        getTargetPosition: { value: links.dest, size: 2 },
      },
    },
    getColor: getLineColor,
    getWidth: getLineWidth,
    widthUnits: 'pixels',
    widthMinPixels: 1,
    widthMaxPixels: 50,
    pickable: true,
    opacity: 0.97,
    autoHighlight: true,
    highlightColor: [255, 0, 224],
    offsetDirection: OFFSET_DIRECTION.RIGHT,
    updateTriggers: {
      getColor: [showDiffs, dark, colors, activeColumn],
      getWidth: [showDiffs, scaleWidth, widths],
    },
    transitions: {
      getColor: 200,
      getWidth: 200,
    },
    parameters: {
      depthTest: false,
    },
  })

  return (
    /*
    //@ts-ignore */
    <DeckGL
      layers={[layer]}
      viewState={viewState}
      controller={true}
      pickingRadius={5}
      getTooltip={getTooltip}
      getCursor={({ isDragging, isHovering }: any) =>
        isDragging ? 'grabbing' : isHovering ? 'pointer' : 'grab'
      }
      onClick={handleClick}
      onViewStateChange={(e: any) => handleViewState(e.viewState)}
    >
      {
        /*
        // @ts-ignore */
        <StaticMap mapStyle={globalStore.getters.mapStyle} mapboxApiAccessToken={MAPBOX_TOKEN} />
      }
    </DeckGL>
  )
}
