import{d as t}from"./vendor.e9c367ae.js";import{g as e,U as a,S as i,B as s,n as o}from"./index.2deacc07.js";import{V as r}from"./VuePlotly.1b598568.js";import{b as n}from"./DashBoard.61a0fedf.js";import"./index.3d2ad359.js";import"./HTTPFileSystem.e57ad358.js";import"./TopSheet.2244b18e.js";var l=t({name:"BarChartPanel",components:{VuePlotly:r},props:{fileSystemConfig:{type:Object,required:!0},subfolder:{type:String,required:!0},files:{type:Array,required:!0},config:{type:Object,required:!0},cardTitle:{type:String,required:!0},cardId:String,datamanager:Object},data:()=>({globalState:e.state,id:"bar-"+Math.floor(1e12*Math.random()),plotID:Math.floor(1e12*Math.random()).toString(),className:"",dataSet:{},YAMLrequirementsBar:{dataset:"",x:"",columns:""},layout:{barmode:"overlay",bargap:.08,height:300,margin:{t:8,b:0,l:0,r:0,pad:2},font:{color:"#444444",family:a},xaxis:{automargin:!0,autorange:!0,title:{text:"",standoff:12},animate:!0},yaxis:{automargin:!0,autorange:!0,title:{text:"",standoff:16},animate:!0},legend:{orientation:"v",x:1,y:1}},data:[],options:{responsive:!0,displaylogo:!1,modeBarButtonsToRemove:["pan2d","zoom2d","select2d","lasso2d","zoomIn2d","zoomOut2d","autoScale2d","hoverClosestCartesian","hoverCompareCartesian","resetScale2d","toggleSpikelines","resetViewMapbox"],toImageButtonOptions:{format:"png",filename:"bar-chart",width:null,height:null}}}),async mounted(){this.updateLayout(),this.updateTheme(),this.dataSet=await this.loadData(),this.updateChart(),this.options.toImageButtonOptions.filename=n(this.cardTitle,this.subfolder),this.$emit("dimension-resizer",{id:this.cardId,resizer:this.changeDimensions}),this.$emit("isLoaded"),this.checkWarningsAndErrors()},beforeDestroy(){var t;null==(t=this.datamanager)||t.removeFilterListener(this.config,this.handleFilterChanged)},watch:{"globalState.isDarkMode"(){this.updateTheme()}},methods:{changeDimensions(t){this.layout=Object.assign({},this.layout,t)},checkWarningsAndErrors(){0==this.cardTitle.length&&this.$store.commit("setStatus",{type:i.WARNING,msg:"The plot title is missing!",desc:"Please add a plot title in the .yaml-file (title: 'Example title')"})},updateTheme(){const t={paper_bgcolor:s[this.globalState.colorScheme],plot_bgcolor:s[this.globalState.colorScheme],font:{color:this.globalState.isDarkMode?"#cccccc":"#444444"}};this.layout=Object.assign({},this.layout,t)},updateLayout(){this.layout.xaxis.title.text=this.config.xAxisTitle||this.config.xAxisName||"",this.layout.yaxis.title.text=this.config.yAxisTitle||this.config.yAxisName||""},async handlePlotlyClick(t){try{const{x:e,y:a,data:i}=t.points[0];this.config.groupBy}catch(e){console.error(e)}},async handleFilterChanged(){if(this.datamanager)try{const{filteredRows:t}=this.datamanager.getFilteredDataset(this.config);if(!t)return this.data=[this.data[0]],void(this.data[0].opacity=1);const e=Object.assign({},this.data[0]);e.x=t.x,e.y=t.y,e.opacity=1,e.name="Filtered",e.marker={color:"#ffaf00"},this.data=[this.data[0],e],this.data[0].opacity=.3,this.data[0].name="All"}catch(t){const e=""+t;console.log(e),this.dataSet={}}},async loadData(){if(!this.datamanager)return{};try{this.validateYAML();let t=await this.datamanager.getDataset(this.config);if(!this.config.filters)return t;this.datamanager.addFilterListener(this.config,this.handleFilterChanged);for(const[e,a]of Object.entries(this.config.filters)){const t={dataset:this.config.dataset,column:e,value:a,range:Array.isArray(a)};this.datamanager.setFilter(t)}return{allRows:{}}}catch(t){console.error(""+t)}return{allRows:{}}},validateYAML(){console.log("in bars validation");for(const t in this.YAMLrequirementsBar)t in this.config==!1&&this.$store.commit("setStatus",{type:i.ERROR,msg:`YAML file missing required key: ${t}`,desc:"Check this.YAMLrequirementsXY for required keys"})},updateChart(){try{this.config.groupBy?this.updateChartWithGroupBy():this.updateChartSimple()}catch(t){const e=""+t;this.$store.commit("setStatus",{type:i.ERROR,msg:e})}},updateChartWithGroupBy(){this.className=this.plotID},updateChartSimple(){var t,e;let a=[];var i=!1;const s=this.dataSet.allRows||{},o=Object.keys(s);if(!o.length)return;let r=this.config.columns||this.config.usedCol;!r&&o.length&&(r=o.filter((t=>t!==this.config.x)).sort()),this.config.legendName&&(this.config.legendTitles=this.config.legendName),(null==(t=this.config.legendTitles)?void 0:t.length)&&(i=!0),this.config.stacked?this.layout.barmode="stack":this.layout.barmode="group",this.config.stacked&&(this.className=this.plotID);const n=s[this.config.x];if(!n)throw Error(`File ${this.config.dataset}: Could not find column ${this.config.x}`);a=n.values,this.config.skipFirstRow&&(a=a.slice(1));for(let l=0;l<r.length;l++){const t=r[l],o=i&&null!=(e=this.config.legendTitles[l])?e:t;let n=s[t].values;this.config.skipFirstRow&&(n=n.slice(1)),this.config.convertToSeconds&&(n=this.convertToSeconds(n)),this.data.push({x:a,y:n,name:o,type:"bar",textinfo:"label+percent",textposition:"inside",automargin:!0,opacity:1})}},convertToSeconds(t){t=t.map((t=>{try{const e=t.split(":");return e.reduce(((t,e)=>parseInt(e,10)+60*t),0)}catch(e){return 0}}))}}});const h={};var c=o(l,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("VuePlotly",{staticClass:"myplot",class:t.className,attrs:{data:t.data,layout:t.layout,options:t.options,id:t.id}})}),[],!1,d,"6d146ae7",null,null);function d(t){for(let e in h)this[e]=h[e]}var g=function(){return c.exports}();export{g as default};
//# sourceMappingURL=bar.276f7c8b.js.map
