// import plugins in the order you want them to appear on project pages
import AreaMap from '@/plugins/shape-file/FancyPolygonMap.vue'
import CarrierViewer from '@/plugins/carrier-viewer/CarrierViewer.vue'
import VehicleAnimation from '@/plugins/vehicle-animation/VehicleAnimation.vue'
import CalculationTable from '@/plugins/calculation-table/CalculationTable.vue'
import XyHexagons from '@/plugins/xy-hexagons/XyHexagons.vue'
import LinksGl from '@/plugins/links-gl/LinkVolumes.vue'
import TransitDemand from '@/plugins/transit-demand/TransitDemand.vue'
import ShapeFile from '@/plugins/shape-file/ShapeFile.vue'
import AggregateOd from '@/plugins/aggregate-od/AggregateOd.vue'
import SankeyDiagram from '@/plugins/sankey/SankeyDiagram.vue'
import VegaLite from '@/plugins/vega-lite/VegaLite.vue'
import VideoPlayer from '@/plugins/video-player/VideoPlayer.vue'
import ImageView from '@/plugins/image/ImageView.vue'

// // EVERY plugin must also be exported here:
const plugins = {
  AggregateOd,
  AreaMap,
  CalculationTable,
  CarrierViewer,
  ImageView,
  LinksGl,
  SankeyDiagram,
  ShapeFile,
  TransitDemand,
  VegaLite,
  VehicleAnimation,
  VideoPlayer,
  XyHexagons,
}

export default plugins
