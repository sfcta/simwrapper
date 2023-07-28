import{d as t,n as e,m as s}from"./vendor.e9c367ae.js";import{l as i,p as a,b as r}from"./turf.es.943b3175.js";import{c as o}from"./index.7080a99e.js";import{c as n}from"./index.0d83a8f9.js";import{P as l}from"./papaparse.min.963a9bc8.js";import{b as d}from"./index.3d2ad359.js";import{n as h,g as c,C as m}from"./index.2deacc07.js";import{C as u}from"./CollapsiblePanel.58a8eae6.js";import{H as p}from"./HTTPFileSystem.e57ad358.js";import{W as f}from"./NewXmlFetcher.worker.e9a3bf23.js";import{D as y}from"./DrawingTool.daac4c85.js";import{Z as g}from"./ZoomButtons.e860a156.js";import{W as v}from"./GzipFetcher.worker.4da801f6.js";import"./layer.b20bd88e.js";import"./text-layer.f1b6c0de.js";import"./path-layer.f17fbd6c.js";var _=t({name:"LeftDataPanel",props:{title:String},data:()=>({isHidden:!1,isLeaving:!1}),methods:{toggleHidePanel(){this.isHidden?this.isHidden=!this.isHidden:(this.isLeaving=!0,setTimeout((()=>{this.isHidden=!0,this.isLeaving=!1}),300))}}});const k={};var w=h(_,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"datapanel"}},[s("div",{staticClass:"content-area",class:{"is-hidden":t.isHidden,bye:t.isLeaving}},[t.title?s("div",{staticClass:"info-header"},[s("h3",{staticStyle:{padding:"0.5rem 3rem","font-size":"1rem","font-weight":"normal",color:"white"}},[t._v(t._s(t.title))])]):t._e(),s("div",{staticClass:"top-area"},[t._t("default")],2)]),s("div",{staticClass:"restore-button",class:{"add-margin":!t.isHidden}},[s("button",{staticClass:"button is-small hide-button",on:{click:t.toggleHidePanel}},[t.isHidden?t._e():s("i",{staticClass:"fa fa-arrow-left"}),t.isHidden?s("i",{staticClass:"fa fa-arrow-right"}):t._e()])])])}),[],!1,b,"17992f6c",null,null);function b(t){for(let e in k)this[e]=k[e]}var S=function(){return w.exports}();function D(){return new Worker("/simwrapper/assets/TransitSupplyHelper.worker.b0dbf602.js",{type:"module"})}var x=t({name:"LegendBox",props:{rows:{type:Array,required:!0}}});const L={};var M=h(x,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"legend-container"},[s("p",{staticClass:"control-label"},[t._v("Legend")]),t._l(t.rows,(function(e){return s("div",{key:e[0],staticClass:"legend-item"},[s("div",{staticClass:"legend-col-1",style:{"background-color":e[0]}}),s("span",{staticClass:"legend-col-2"},[t._v(t._s(e[1]))])])}))],2)}),[],!1,C,"27fc5701",null,null);function C(t){for(let e in L)this[e]=L[e]}const R=t({name:"TransitViewer",i18n:{messages:{en:{metrics:"Metrics",viewer:"Transit Network"},de:{metrics:"Metrics",viewer:"ÖV Netzwerk"}}},components:{CollapsiblePanel:u,LeftDataPanel:S,LegendBox:function(){return M.exports}(),DrawingTool:y,ZoomButtons:g},props:{root:{type:String,required:!0},subfolder:{type:String,required:!0},yamlConfig:String,config:{type:Object},thumbnail:Boolean},data:()=>{const t=[{field:"departures",name_en:"Departures",name_de:"Abfahrten"}];return{mapPopup:new e.exports.Popup({closeButton:!1,closeOnClick:!1}),buttonColors:["#5E8AAE","#BF7230","#269367","#9C439C"],metrics:t,activeMetric:t[0].field,vizDetails:{transitSchedule:"",network:"",demand:"",projection:"",title:"",description:""},myState:{subfolder:"",yamlConfig:"",thumbnail:!0},isDarkMode:c.state.isDarkMode,isMapMoving:!1,loadingText:"MATSim Transit Inspector",mymap:null,mapID:`map-id-${Math.floor(1e12*Math.random())}`,projection:"EPSG:31468",routesOnLink:[],selectedRoute:{},stopMarkers:[],_attachedRouteLayers:[],_departures:{},_linkData:null,_mapExtentXYXY:null,_maximum:-1/0,_network:{},_routeData:{},_stopFacilities:{},_transitLines:{},_roadFetcher:{},_transitFetcher:{},_transitHelper:{},_transitLinks:null,_geoTransitLinks:null,resolvers:{},resolverId:0,xmlWorker:null,cfDemand:null,cfDemandLink:null,hoverWait:!1}},computed:{fileApi(){return new p(this.fileSystem,c)},fileSystem(){const t=this.$store.state.svnProjects.filter((t=>t.slug===this.root));if(0===t.length)throw console.log("no such project"),Error;return t[0]},legendRows:()=>[["#a03919","Rail"],["#448","Bus"]]},watch:{"$store.state.resizeEvents"(){this.mymap&&this.mymap.resize()},"$store.state.viewState"({bearing:t,longitude:e,latitude:s,zoom:i,pitch:a}){this.mymap&&!this.isMapMoving?i&&(this.mymap.off("move",this.handleMapMotion),this.mymap.jumpTo({bearing:t,zoom:i,center:[e,s],pitch:a}),this.mymap.on("move",this.handleMapMotion),this.stopMarkers.length>0&&this.showTransitStops()):this.isMapMoving=!1},"$store.state.colorScheme"(){this.isDarkMode=this.$store.state.colorScheme===m.DarkMode,this.mymap&&(this.removeAttachedRoutes(),this.mymap.setStyle(c.getters.mapStyle),this.mymap.on("style.load",(()=>{this._geoTransitLinks&&this.addTransitToMap(this._geoTransitLinks),this.highlightAllAttachedRoutes(),this.selectedRoute&&this.showTransitRoute(this.selectedRoute.id)})))}},methods:{async getVizDetails(){var t,e;if(this.config)return this.vizDetails=Object.assign({},this.config),!0;if((null==(t=this.myState.yamlConfig)?void 0:t.endsWith("yaml"))||(null==(e=this.myState.yamlConfig)?void 0:e.endsWith("yml")))return this.loadYamlConfig();const s=this.myState.yamlConfig.substring(0,15+this.myState.yamlConfig.indexOf("transitSchedule"));return this.vizDetails={transitSchedule:this.myState.yamlConfig,network:"",title:s,description:"",demand:"",projection:""},this.$emit("title",s),!0},async prepareView(){var t;const{files:e}=await this.fileApi.getDirectory(this.myState.subfolder);let s=null!=(t=this.vizDetails.network)?t:this.myState.yamlConfig.replaceAll("transitSchedule","network");if(-1==e.indexOf(s)){const t=e.filter((t=>t.endsWith("network.xml.gz")));t.length?s=t[0]:(this.loadingText="No road network found.",s="")}let i=[];this.myState.yamlConfig.indexOf("output_transitSchedule")>-1&&(i=e.filter((t=>t.endsWith("pt_stop2stop_departures.csv.gz")))),this.vizDetails.network=s,i.length&&(this.vizDetails.demand=i[0])},async guessProjection(t){var e,s,i,a,r,o,n,l;if(this.vizDetails.projection)return this.vizDetails.projection;if(null==(e=this.config)?void 0:e.projection)return this.config.projection;if("coordinateReferenceSystem"===(null==(r=null==(a=null==(i=null==(s=null==t?void 0:t.roadXML)?void 0:s.network)?void 0:i.attributes)?void 0:a.attribute)?void 0:r.name))return null==(l=null==(n=null==(o=null==t?void 0:t.roadXML)?void 0:o.network)?void 0:n.attributes)?void 0:l.attribute["#text"];const d=`${this.root}/${this.subfolder}`,{files:h}=await this.fileApi.getDirectory(this.myState.subfolder),c=h.filter((t=>t.indexOf(".output_config.xml")>-1||t.indexOf(".output_config_reduced.xml")>-1));if(c.length&&this.fileSystem)for(const f of c)try{const t=await this.fetchXML({worker:null,slug:this.fileSystem.slug,filePath:this.myState.subfolder+"/"+f}),e=t.config.module.filter((t=>"global"===t.$name))[0].param.filter((t=>"coordinateSystem"===t.$name))[0];return e.$value}catch(p){console.warn("Failed parsing",f)}let m=prompt("Need coordinate EPSG number:","")||"";if(!m)return"";if(isNaN(parseInt(m,10))&&!/EPSG:.\d/.test(m))return this.guessProjection(t);m.startsWith("EPSG:")||(m="EPSG:"+m);const u=m;return localStorage.setItem(d,JSON.stringify({networkProjection:u})),u},async loadYamlConfig(){const t=this.myState.yamlConfig.indexOf("/")>-1?this.myState.yamlConfig:this.myState.subfolder+"/"+this.myState.yamlConfig;try{const e=await this.fileApi.getFileText(t);this.vizDetails=d.parse(e)}catch(s){const e=s;if(this.fileSystem&&this.fileSystem.needPassword&&401===e.status)this.$store.commit("requestLogin",this.fileSystem.slug);else{const e="Could not load "+t;this.$store.commit("error",e),this.loadingText=e}return!1}const e=this.vizDetails.title?this.vizDetails.title:"Transit Ridership";return this.$emit("title",e),this.projection=this.vizDetails.projection,!0},isMobile(){const t=window,e=document,s=e.documentElement,i=e.getElementsByTagName("body")[0],a=t.innerWidth||s.clientWidth||i.clientWidth;return t.innerHeight||s.clientHeight||i.clientHeight,a<640},setupMap(){try{this.mymap=new s.Map({bearing:0,container:this.mapID,logoPosition:"bottom-left",style:c.getters.mapStyle,pitch:0});const e=localStorage.getItem(this.$route.fullPath+"-bounds");if(e)try{const t=JSON.parse(e),s=this.isMobile()?0:1,i={top:50*s,bottom:50*s,right:50*s,left:50*s};this.mymap.fitBounds(t,{animate:!1,padding:i})}catch(t){}this.mymap.on("load",this.mapIsReady),this.mymap.on("move",this.handleMapMotion),this.mymap.on("click",this.handleEmptyClick),this.mymap.keyboard.disable()}catch(t){console.error(""+t)}},handleClickedMetric(t){console.log("transit metric:",t.field),this.activeMetric=t.field;let e=3;switch(t.field){case"departures":e=["max",2,["*",.03,["get","departures"]]];break;case"pax":e=["max",2,["*",.003,["get","pax"]]];break;case"loadfac":e=["max",2,["*",200,["get","loadfac"]]]}this.mymap.setPaintProperty("transit-link","line-width",e)},handleMapMotion(){const t={longitude:this.mymap.getCenter().lng,latitude:this.mymap.getCenter().lat,bearing:this.mymap.getBearing(),zoom:this.mymap.getZoom(),pitch:this.mymap.getPitch()};this.isMapMoving||this.$store.commit("setMapCamera",t),this.isMapMoving=!0,this.stopMarkers.length>0&&this.showTransitStops()},handleEmptyClick(t){this.removeStopMarkers(),this.removeSelectedRoute(),this.removeAttachedRoutes(),this.routesOnLink=[]},showRouteDetails(t){(t||this.selectedRoute)&&(console.log({routeID:t}),t?this.showTransitRoute(t):this.showTransitRoute(this.selectedRoute.id),this.showTransitStops())},async mapIsReady(){const t=await this.loadNetworks(),e=await this.guessProjection(t);this.vizDetails.projection=e,this.projection=this.vizDetails.projection,console.log(e),t&&this.processInputs(t)},setupKeyListeners(){window.addEventListener("keyup",(t=>{27===t.keyCode&&this.pressedEscape()})),window.addEventListener("keydown",(t=>{38===t.keyCode&&this.pressedArrowKey(-1),40===t.keyCode&&this.pressedArrowKey(1)}))},fetchXML(t){let e=t.worker;e.onmessage=t=>{const{resolve:s,reject:i}=this.resolvers[t.data.id];e.terminate(),t.data.error&&i(t.data.error),s(t.data.xml)};const s=this.resolverId++;e.postMessage({id:s,fileSystem:this.fileSystem,filePath:t.filePath,options:t.options});return new Promise(((t,e)=>{this.resolvers[s]={resolve:t,reject:e}}))},async loadNetworks(){try{if(!this.fileSystem||!this.vizDetails.network||!this.vizDetails.transitSchedule)return;this.loadingText="Loading networks...";const t=this.fetchXML({worker:this._roadFetcher,slug:this.fileSystem.slug,filePath:this.myState.subfolder+"/"+this.vizDetails.network,options:{attributeNamePrefix:""}}),e=this.fetchXML({worker:this._transitFetcher,slug:this.fileSystem.slug,filePath:this.myState.subfolder+"/"+this.vizDetails.transitSchedule,options:{attributeNamePrefix:"",alwaysArray:["transitSchedule.transitLine.transitRoute","transitSchedule.transitLine.transitRoute.departures.departure"]}}),s=await Promise.all([t,e]);return{roadXML:s[0],transitXML:s[1],ridership:[]}}catch(t){return console.error("TRANSIT:",t),this.loadingText=""+t,c.commit("error","Transit: "+t),null}},loadDemandData(t){return new Promise(((e,s)=>{t||e([]),this.loadingText="Loading demand...";const i=new v;i.onmessage=t=>{this.loadingText="Processing demand...";const s=new TextDecoder("utf-8").decode(t.data);i.terminate(),l.parse(s,{header:!0,skipEmptyLines:!0,dynamicTyping:!0,worker:!0,complete:t=>{e(this.processDemand(t))}})},i.postMessage({filePath:this.myState.subfolder+"/"+t,fileSystem:this.fileSystem})}))},processDemand(t){this.loadingText="Processing demand data...",console.log("BUILD crossfilter"),this.cfDemand=n(t.data),this.cfDemandLink=this.cfDemand.dimension((t=>t.linkIdsSincePreviousStop)),console.log("COUNTING RIDERSHIP");const e={},s=this.cfDemandLink.group();s.reduceSum((t=>t.passengersAtArrival)).all().map((t=>{e[t.key]=t.value}));const i={};s.reduceSum((t=>t.totalVehicleCapacity)).all().map((t=>{i[t.key]=t.value}));for(const a of this._transitLinks.features)a.properties.pax=e[a.properties.id],a.properties.cap=i[a.properties.id],a.properties.loadfac=Math.round(1e3*e[a.properties.id]/i[a.properties.id])/1e3;this.metrics=this.metrics.concat([{field:"pax",name_en:"Passengers",name_de:"Passagiere"},{field:"loadfac",name_en:"Load Factor",name_de:"Auslastung"}]);return this.mymap.getSource("transit-source").setData(this._transitLinks),this.loadingText="",[]},async processInputs(t){this.loadingText="Preparing...",this._transitHelper=new D,this._transitHelper.onmessage=async t=>{this.receivedProcessedTransit(t)},this._transitHelper.postMessage({xml:t,projection:this.projection})},async receivedProcessedTransit(t){if(t.data.status)return void(this.loadingText=t.data.status);if(t.data.error)return console.error(t.data.error),void this.$store.commit("error",t.data.error);const{network:e,routeData:s,stopFacilities:i,transitLines:a,mapExtent:r}=t.data;this._network=e,this._routeData=s,this._stopFacilities=i,this._transitLines=a,this._mapExtentXYXY=r,this._transitHelper.terminate(),this.loadingText="Summarizing departures...",await this.processDepartures(),this._transitLinks=await this.constructDepartureFrequencyGeoJson(),this.addTransitToMap(this._transitLinks),this.handleClickedMetric({field:"departures"}),localStorage.setItem(this.$route.fullPath+"-bounds",JSON.stringify(this._mapExtentXYXY)),this.mymap.fitBounds(this._mapExtentXYXY,{animate:!1}),this.vizDetails.demand&&await this.loadDemandData(this.vizDetails.demand),this.loadingText=""},async processDepartures(){this.loadingText="Processing departures...";for(const t in this._transitLines)if(this._transitLines.hasOwnProperty(t)){const e=this._transitLines[t];for(const t of e.transitRoutes)for(const e of t.route)e in this._departures||(this._departures[e]={total:0,routes:new Set}),this._departures[e].total+=t.departures,this._departures[e].routes.add(t.id),this._maximum=Math.max(this._maximum,this._departures[e].total)}},addTransitToMap(t){this._geoTransitLinks=t,this.mymap.addSource("transit-source",{data:t,type:"geojson"}),this.mymap.addLayer({id:"transit-link",source:"transit-source",type:"line",paint:{"line-opacity":1,"line-width":1,"line-color":["get","color"]}}),this.mymap.on("click","transit-link",(t=>{this.clickedOnTransitLink(t)})),this.mymap.on("mousemove","transit-link",(t=>{this.mymap.getCanvas().style.cursor=t?"pointer":"grab",this.hoveredOnElement(t)})),this.mymap.on("mouseleave","transit-link",(()=>{this.mymap.getCanvas().style.cursor="grab",this.mapPopup.remove()}))},hoveredOnElement(t){const e=t.features[0].properties;let s='<div class="map-popup">';for(const i of this.metrics){let t="de"==this.$i18n.locale?i.name_de:i.name_en;t=t.replaceAll(" ","&nbsp;"),isNaN(e[i.field])||(s+=`\n          <div style="display: flex">\n            <div>${t}:&nbsp;&nbsp;</div>\n            <b style="margin-left: auto; text-align: right">${e[i.field]}</b>\n          </div>`)}s+="<div>",this.mapPopup.setLngLat(t.lngLat).setHTML(s).addTo(this.mymap)},async constructDepartureFrequencyGeoJson(){const t=[];for(const e in this._departures)if(this._departures.hasOwnProperty(e)){const s=this._network.links[e];if(!s)continue;const i=[[this._network.nodes[s.from].x,this._network.nodes[s.from].y],[this._network.nodes[s.to].x,this._network.nodes[s.to].y]],a=this._departures[e].total,r=.25+.75*(a-1)/this._maximum,o=Math.floor(10*r);let n=!0;for(const t of this._departures[e].routes)"bus"===this._routeData[t].transportMode&&(n=!1);let l={type:"Feature",geometry:{type:"LineString",coordinates:i},properties:{color:n?"#a03919":T[o],colorBin:o,departures:a,id:e,isRail:n,from:s.from,to:s.to}};l=this.offsetLineByMeters(l,15),t.push(l)}return t.sort((function(t,e){return t.isRail&&!e.isRail?-1:e.isRail&&!t.isRail?1:0})),{type:"FeatureCollection",features:t}},offsetLineByMeters(t,e){try{return i(t,e,{units:"meters"})}catch(s){}return t},removeStopMarkers(){this.stopMarkers=[]},async showTransitStops(){this.removeStopMarkers();const t=this.selectedRoute,e=this.mymap.getBearing();let s;for(const[i,o]of t.routeProfile.entries()){const n=[this._stopFacilities[o.refId].x,this._stopFacilities[o.refId].y];if(i<t.routeProfile.length-1){const o=a([n[0],n[1]]),l=a([this._stopFacilities[t.routeProfile[i+1].refId].x,this._stopFacilities[t.routeProfile[i+1].refId].y]);s=r(o,l)-e}const l=this.mymap.project([n[0],n[1]]),d={i:i,bearing:s,xy:{x:Math.floor(l.x),y:Math.floor(l.y)}};this.stopMarkers.push(d)}},showTransitRoute(t){if(!t)return;const e=this._routeData[t];this.selectedRoute=e;const s=this.mymap.getSource("selected-route-data");s?s.setData(e.geojson):this.mymap.addSource("selected-route-data",{data:e.geojson,type:"geojson"}),this.mymap.getLayer("selected-route")||this.mymap.addLayer({id:"selected-route",source:"selected-route-data",type:"line",paint:{"line-opacity":1,"line-width":5,"line-color":"#097c43"}})},removeSelectedRoute(){if(this.selectedRoute){try{this.mymap.removeLayer("selected-route")}catch(t){}this.selectedRoute=null}},clickedOnTransitLink(t){this.removeStopMarkers(),this.removeSelectedRoute();const e=t.features[0].properties,s=this._departures[e.id].routes;this.calculatePassengerVolumes(e.id);const i=[];for(const a of s)i.push(this._routeData[a]);i.sort((function(t,e){return t.departures>e.departures?-1:1})),this.routesOnLink=i,this.highlightAllAttachedRoutes(),i.length>0&&this.showRouteDetails(i[0].id)},calculatePassengerVolumes(t){if(!this.cfDemandLink||!this.cfDemand)return;this.cfDemandLink.filter(t);const e=this.cfDemand.allFiltered();let s=0;e.map((t=>{s=s+t.passengersBoarding+t.passengersAtArrival-t.passengersAlighting}))},removeAttachedRoutes(){for(const e of this._attachedRouteLayers)try{this.mymap.removeLayer("route-"+e),this.mymap.removeSource("source-route-"+e)}catch(t){}this._attachedRouteLayers=[]},highlightAllAttachedRoutes(){this.removeAttachedRoutes();for(const t of this.routesOnLink)this.mymap.addSource("source-route-"+t.id,{data:t.geojson,type:"geojson"}),this.mymap.addLayer({id:"route-"+t.id,source:"source-route-"+t.id,type:"line",paint:{"line-opacity":.7,"line-width":8,"line-color":"#ccff33"}}),this._attachedRouteLayers.push(t.id)},pressedEscape(){this.removeSelectedRoute(),this.removeStopMarkers(),this.removeAttachedRoutes(),this.selectedRoute=null,this.routesOnLink=[]},pressedArrowKey(t){if(!this.selectedRoute)return;let e=this.routesOnLink.indexOf(this.selectedRoute);e+=t,e<0||e>=this.routesOnLink.length||this.showRouteDetails(this.routesOnLink[e].id)},clearData(){var t;this._attachedRouteLayers=[],this._departures={},this._mapExtentXYXY=[180,90,-180,-90],this._maximum=0,this._network={nodes:{},links:{}},this._routeData={},this._stopFacilities={},this._transitLinks=null,this._transitLines={},this.selectedRoute=null,this.cfDemand=null,null==(t=this.cfDemandLink)||t.dispose(),this.resolvers={},this.routesOnLink=[],this.selectedRoute={},this.stopMarkers=[],this._linkData=null,this._geoTransitLinks=null}},async mounted(){var t;this.$store.commit("setFullScreen",!this.thumbnail),this.clearData(),this._roadFetcher=new f,this._transitFetcher=new f,this._transitHelper=new D,this.myState.subfolder=this.subfolder,this.myState.yamlConfig=null!=(t=this.yamlConfig)?t:"",this.myState.thumbnail=this.thumbnail;await this.getVizDetails()&&(this.thumbnail||(await this.prepareView(),this.setupMap()))},beforeDestroy(){this.mymap&&this.mymap.remove(),this.clearData(),this.xmlWorker&&this.xmlWorker.terminate(),this._roadFetcher&&this._roadFetcher.terminate(),this._transitFetcher&&this._transitFetcher.terminate(),this._transitHelper&&this._transitHelper.terminate(),this.$store.commit("setFullScreen",!1)}}),T=o({colormap:"viridis",nshades:10});const P={};var j=h(R,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"transit-viz",class:{"hide-thumbnail":!t.thumbnail}},[s("div",{staticClass:"map-container",class:{"hide-thumbnail":!t.thumbnail}},[s("div",{staticClass:"map-styles",attrs:{id:t.mapID}},t._l(t.stopMarkers,(function(t){return s("div",{key:t.i,staticClass:"stop-marker",style:{transform:"translate(-50%,-50%) rotate("+t.bearing+"deg)",left:t.xy.x+"px",top:t.xy.y+"px"}})})),0),t.thumbnail?t._e():s("legend-box",{staticClass:"legend",attrs:{rows:t.legendRows}})],1),t.thumbnail?t._e():s("zoom-buttons"),t.thumbnail?t._e():s("collapsible-panel",{staticClass:"left-side",attrs:{darkMode:t.isDarkMode,locked:!0,direction:"left"}},[s("div",{staticClass:"panel-items"},[t.routesOnLink.length>0?s("div",{staticClass:"route-list"},t._l(t.routesOnLink,(function(e){return s("div",{key:e.uniqueRouteID,staticClass:"route",class:{highlightedRoute:t.selectedRoute&&e.id===t.selectedRoute.id},on:{click:function(s){return t.showRouteDetails(e.id)}}},[s("div",{staticClass:"route-title"},[t._v(t._s(e.id))]),s("div",{staticClass:"detailed-route-data"},[s("div",{staticClass:"col"},[s("p",[s("b",[t._v(t._s(e.departures)+" departures")])]),s("p",[t._v("First: "+t._s(e.firstDeparture))]),s("p",[t._v("Last: "+t._s(e.lastDeparture))])]),e.passengersAtArrival?s("div",{staticClass:"col"},[s("p",[s("b",[t._v(t._s(e.passengersAtArrival)+" passengers")])]),s("p",[t._v(t._s(e.totalVehicleCapacity)+" capacity")])]):t._e()])])})),0):t._e()])]),t.thumbnail?t._e():s("div",{staticClass:"control-panel",class:{"is-dashboard":void 0!==t.config}},[s("div",{staticClass:"panel-item"},[s("p",{staticClass:"control-label"},[t._v(t._s(t.$t("metrics"))+":")]),s("div",{staticClass:"metric-buttons"},t._l(t.metrics,(function(e,i){return s("button",{key:e.field,staticClass:"button is-small metric-button",style:{color:t.activeMetric===e.field?"white":t.buttonColors[i],border:`1px solid ${t.buttonColors[i]}`,"border-right":`0.4rem solid ${t.buttonColors[i]}`,"border-radius":"4px","background-color":t.activeMetric===e.field?t.buttonColors[i]:t.isDarkMode?"#333":"white"},on:{click:function(s){return t.handleClickedMetric(e)}}},[t._v(t._s("de"===t.$i18n.locale?e.name_de:e.name_en))])})),0)])]),!t.thumbnail&&t.loadingText?s("div",{staticClass:"status-corner"},[s("p",[t._v(t._s(t.loadingText))])]):t._e()],1)}),[],!1,A,"1d6f3f1d",null,null);function A(t){for(let e in P)this[e]=P[e]}var z=function(){return j.exports}();export{z as default};
//# sourceMappingURL=TransitDemand.ee56ffbc.js.map
