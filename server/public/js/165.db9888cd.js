"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[165],{6165:function(t,e,s){s.r(e),s.d(e,{default:function(){return $}});var r=s(3698),i=s(2938),a=s(4414),n=s(3449),o=s(6930),l=s(8907),c=s(1554),d=s(2756),u=(s(4114),function(){var t=this,e=t._self._c;return e(n.A,{attrs:{fluid:""}},[e(i.ri,{staticClass:"d-flex align-center py-4"},[e(o.A,{staticClass:"mr-3",attrs:{large:"",color:"#a52a2a"}},[t._v("mdi-view-dashboard")]),e("span",{staticClass:"text-h5"},[t._v("School Dashboard")])],1),e(d.A,[e(a.A,{attrs:{cols:"12",sm:"6",md:"3"}},[e(r.A,{staticClass:"mx-auto",staticStyle:{cursor:"pointer"},attrs:{color:"#b22222",dark:""},on:{click:function(e){return t.$router.push("/students")}}},[e(i.OQ,[e("div",{staticClass:"text-h4 mb-2"},[t._v(t._s(t.totalStudents))]),e("div",{staticClass:"text-subtitle-1"},[t._v("Total Students")]),e(o.A,{staticClass:"dashboard-icon",attrs:{large:""}},[t._v("mdi-account-group")])],1)],1)],1),e(a.A,{attrs:{cols:"12",sm:"6",md:"3"}},[e(r.A,{staticClass:"mx-auto",staticStyle:{cursor:"pointer"},attrs:{color:"#d2691e",dark:""},on:{click:function(e){return t.$router.push("/teachers")}}},[e(i.OQ,[e("div",{staticClass:"text-h4 mb-2"},[t._v(t._s(t.totalTeachers))]),e("div",{staticClass:"text-subtitle-1"},[t._v("Total Teachers")]),e(o.A,{staticClass:"dashboard-icon",attrs:{large:""}},[t._v("mdi-teach")])],1)],1)],1),e(a.A,{attrs:{cols:"12",sm:"6",md:"3"}},[e(r.A,{staticClass:"mx-auto",staticStyle:{cursor:"pointer"},attrs:{color:"#f4a460",dark:""},on:{click:function(e){return t.$router.push("/academics/schedules")}}},[e(i.OQ,[e("div",{staticClass:"text-h4 mb-2"},[t._v(t._s(t.totalClasses))]),e("div",{staticClass:"text-subtitle-1"},[t._v("Active Classes")]),e(o.A,{staticClass:"dashboard-icon",attrs:{large:""}},[t._v("mdi-calendar-clock")])],1)],1)],1),e(a.A,{attrs:{cols:"12",sm:"6",md:"3"}},[e(r.A,{staticClass:"mx-auto",staticStyle:{cursor:"pointer"},attrs:{color:"#d2b48c",dark:""},on:{click:function(e){return t.$router.push("/attendance")}}},[e(i.OQ,[e("div",{staticClass:"text-h4 mb-2"},[t._v(t._s(t.attendanceRate)+"%")]),e("div",{staticClass:"text-subtitle-1"},[t._v("Today's Attendance")]),e(o.A,{staticClass:"dashboard-icon",attrs:{large:""}},[t._v("mdi-account-check")])],1)],1)],1)],1),e(l.A,{attrs:{value:t.isLoading}},[e(c.A,{attrs:{indeterminate:"",size:"64"}})],1)],1)}),h=[],v=s(5353),m=s(5093),p=s.n(m),g=function(){var t=this,e=t._self._c;return e("div",{staticClass:"attendance-chart"},[e("apexchart",{attrs:{type:"line",height:"300",options:t.chartOptions,series:t.series}})],1)},f=[],y=s(7588),b=s.n(y),_={name:"AttendanceChart",components:{apexchart:b()},props:{data:{type:Array,required:!0}},computed:{series(){return[{name:"Attendance Rate",data:this.data.map((t=>({x:p()(t._id).format("ddd"),y:Math.round(t.presentStudents/t.totalStudents*100)})))}]},chartOptions(){return{chart:{type:"line",toolbar:{show:!1}},stroke:{curve:"smooth",width:3},colors:["#1976D2"],xaxis:{type:"category"},yaxis:{labels:{formatter:t=>`${t}%`}},tooltip:{y:{formatter:t=>`${t}%`}}}}}},A=_,C=s(1656),x=(0,C.A)(A,g,f,!1,null,null,null),k=x.exports,S={name:"DashboardView",components:{AttendanceChart:k},data:()=>({search:"",activityHeaders:[{text:"Activity",value:"description"},{text:"User",value:"user"},{text:"Timestamp",value:"timestamp"},{text:"Status",value:"status"}],quickActions:[{title:"Take Attendance",icon:"mdi-checkbox-marked",color:"success",route:"/attendance"},{title:"Add New Student",icon:"mdi-account-plus",color:"primary",route:"/students/new"},{title:"Schedule Class",icon:"mdi-calendar-plus",color:"info",route:"/schedule/new"},{title:"Generate Reports",icon:"mdi-file-chart",color:"warning",route:"/reports"}]}),computed:{...(0,v.L8)("dashboard",["totalStudents","totalTeachers","totalClasses","attendanceRate","isLoading"]),...(0,v.aH)("dashboard",["recentActivities","weeklyAttendance","classDistribution"])},methods:{...(0,v.i0)("dashboard",["fetchDashboardData","fetchRecentActivities","fetchWeeklyAttendance","fetchClassDistribution"]),formatDate(t){return p()(t).format("MMM DD, YYYY HH:mm")},getStatusColor(t){const e={completed:"success",pending:"warning",failed:"error"};return e[t.toLowerCase()]||"grey"},handleQuickAction(t){this.$router.push(t.route)},viewAttendanceDetails(){this.$router.push("/attendance/overview")},viewClassDetails(){this.$router.push("/classes/overview")},async initialize(){try{await Promise.all([this.fetchDashboardData()])}catch(t){console.error("Failed to initialize dashboard:",t)}}},created(){this.initialize()}},B=S,w=(0,C.A)(B,u,h,!1,null,"a4046a04",null),$=w.exports},3698:function(t,e,s){s(6001);var r=s(9375),i=s(3801),a=s(8418),n=s(5803),o=s(4152);e.A=(0,n.A)(i.A,a.A,r.A).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes(){return{"v-card":!0,...a.A.options.computed.classes.call(this),"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised,...r.A.options.computed.classes.call(this)}},styles(){const t={...r.A.options.computed.styles.call(this)};return this.img&&(t.background=`url("${this.img}") center center / cover no-repeat`),t}},methods:{genProgress(){const t=i.A.options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[t]):null}},render(t){const{tag:e,data:s}=this.generateRouteLink();return s.style=this.styles,this.isClickable&&(s.attrs=s.attrs||{},s.attrs.tabindex=0),t(e,this.setBackgroundColor(this.color,s),[this.genProgress(),(0,o.$c)(this)])}})},2938:function(t,e,s){s.d(e,{OQ:function(){return o},SL:function(){return a},ri:function(){return l}});var r=s(3698),i=s(4152);const a=(0,i.Gn)("v-card__actions"),n=(0,i.Gn)("v-card__subtitle"),o=(0,i.Gn)("v-card__text"),l=(0,i.Gn)("v-card__title");r.A},8907:function(t,e,s){s.d(e,{A:function(){return l}});s(4114);var r=s(8743),i=s(3381),a=s(428),n=s(5803),o=s(4152),l=(0,n.A)(r.A,i.A,a.A).extend({name:"v-overlay",props:{absolute:Boolean,color:{type:String,default:"#212121"},dark:{type:Boolean,default:!0},opacity:{type:[Number,String],default:.46},value:{default:!0},zIndex:{type:[Number,String],default:5}},computed:{__scrim(){const t=this.setBackgroundColor(this.color,{staticClass:"v-overlay__scrim",style:{opacity:this.computedOpacity}});return this.$createElement("div",t)},classes(){return{"v-overlay--absolute":this.absolute,"v-overlay--active":this.isActive,...this.themeClasses}},computedOpacity(){return Number(this.isActive?this.opacity:0)},styles(){return{zIndex:this.zIndex}}},methods:{genContent(){return this.$createElement("div",{staticClass:"v-overlay__content"},(0,o.$c)(this))}},render(t){const e=[this.__scrim];return this.isActive&&e.push(this.genContent()),t("div",{staticClass:"v-overlay",on:this.$listeners,class:this.classes,style:this.styles},e)}})},1554:function(t,e,s){s.d(e,{A:function(){return n}});var r=s(1677),i=s(8743),a=s(4152),n=i.A.extend({name:"v-progress-circular",directives:{intersect:r.A},props:{button:Boolean,indeterminate:Boolean,rotate:{type:[Number,String],default:0},size:{type:[Number,String],default:32},width:{type:[Number,String],default:4},value:{type:[Number,String],default:0}},data:()=>({radius:20,isVisible:!0}),computed:{calculatedSize(){return Number(this.size)+(this.button?8:0)},circumference(){return 2*Math.PI*this.radius},classes(){return{"v-progress-circular--visible":this.isVisible,"v-progress-circular--indeterminate":this.indeterminate,"v-progress-circular--button":this.button}},normalizedValue(){return this.value<0?0:this.value>100?100:parseFloat(this.value)},strokeDashArray(){return Math.round(1e3*this.circumference)/1e3},strokeDashOffset(){return(100-this.normalizedValue)/100*this.circumference+"px"},strokeWidth(){return Number(this.width)/+this.size*this.viewBoxSize*2},styles(){return{height:(0,a.Dg)(this.calculatedSize),width:(0,a.Dg)(this.calculatedSize)}},svgStyles(){return{transform:`rotate(${Number(this.rotate)}deg)`}},viewBoxSize(){return this.radius/(1-Number(this.width)/+this.size)}},methods:{genCircle(t,e){return this.$createElement("circle",{class:`v-progress-circular__${t}`,attrs:{fill:"transparent",cx:2*this.viewBoxSize,cy:2*this.viewBoxSize,r:this.radius,"stroke-width":this.strokeWidth,"stroke-dasharray":this.strokeDashArray,"stroke-dashoffset":e}})},genSvg(){const t=[this.indeterminate||this.genCircle("underlay",0),this.genCircle("overlay",this.strokeDashOffset)];return this.$createElement("svg",{style:this.svgStyles,attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:`${this.viewBoxSize} ${this.viewBoxSize} ${2*this.viewBoxSize} ${2*this.viewBoxSize}`}},t)},genInfo(){return this.$createElement("div",{staticClass:"v-progress-circular__info"},(0,a.$c)(this))},onObserve(t,e,s){this.isVisible=s}},render(t){return t("div",this.setTextColor(this.color,{staticClass:"v-progress-circular",attrs:{role:"progressbar","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":this.indeterminate?void 0:this.normalizedValue},class:this.classes,directives:[{name:"intersect",value:this.onObserve}],style:this.styles,on:this.$listeners}),[this.genSvg(),this.genInfo()])}})},3801:function(t,e,s){s.d(e,{A:function(){return p}});var r=s(5471),i=s(5961),a=s(1677),n=s(8743),o=s(6763),l=s(4632),c=s(3381),d=s(4152),u=s(5803);const h=(0,u.A)(n.A,(0,o.P)(["absolute","fixed","top","bottom"]),l.A,c.A);var v=h.extend({name:"v-progress-linear",directives:{intersect:a.A},props:{active:{type:Boolean,default:!0},backgroundColor:{type:String,default:null},backgroundOpacity:{type:[Number,String],default:null},bufferValue:{type:[Number,String],default:100},color:{type:String,default:"primary"},height:{type:[Number,String],default:4},indeterminate:Boolean,query:Boolean,reverse:Boolean,rounded:Boolean,stream:Boolean,striped:Boolean,value:{type:[Number,String],default:0}},data(){return{internalLazyValue:this.value||0,isVisible:!0}},computed:{__cachedBackground(){return this.$createElement("div",this.setBackgroundColor(this.backgroundColor||this.color,{staticClass:"v-progress-linear__background",style:this.backgroundStyle}))},__cachedBar(){return this.$createElement(this.computedTransition,[this.__cachedBarType])},__cachedBarType(){return this.indeterminate?this.__cachedIndeterminate:this.__cachedDeterminate},__cachedBuffer(){return this.$createElement("div",{staticClass:"v-progress-linear__buffer",style:this.styles})},__cachedDeterminate(){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__determinate",style:{width:(0,d.Dg)(this.normalizedValue,"%")}}))},__cachedIndeterminate(){return this.$createElement("div",{staticClass:"v-progress-linear__indeterminate",class:{"v-progress-linear__indeterminate--active":this.active}},[this.genProgressBar("long"),this.genProgressBar("short")])},__cachedStream(){return this.stream?this.$createElement("div",this.setTextColor(this.color,{staticClass:"v-progress-linear__stream",style:{width:(0,d.Dg)(100-this.normalizedBuffer,"%")}})):null},backgroundStyle(){const t=null==this.backgroundOpacity?this.backgroundColor?1:.3:parseFloat(this.backgroundOpacity);return{opacity:t,[this.isReversed?"right":"left"]:(0,d.Dg)(this.normalizedValue,"%"),width:(0,d.Dg)(Math.max(0,this.normalizedBuffer-this.normalizedValue),"%")}},classes(){return{"v-progress-linear--absolute":this.absolute,"v-progress-linear--fixed":this.fixed,"v-progress-linear--query":this.query,"v-progress-linear--reactive":this.reactive,"v-progress-linear--reverse":this.isReversed,"v-progress-linear--rounded":this.rounded,"v-progress-linear--striped":this.striped,"v-progress-linear--visible":this.isVisible,...this.themeClasses}},computedTransition(){return this.indeterminate?i.mM:i.vt},isReversed(){return this.$vuetify.rtl!==this.reverse},normalizedBuffer(){return this.normalize(this.bufferValue)},normalizedValue(){return this.normalize(this.internalLazyValue)},reactive(){return Boolean(this.$listeners.change)},styles(){const t={};return this.active||(t.height=0),this.indeterminate||100===parseFloat(this.normalizedBuffer)||(t.width=(0,d.Dg)(this.normalizedBuffer,"%")),t}},methods:{genContent(){const t=(0,d.$c)(this,"default",{value:this.internalLazyValue});return t?this.$createElement("div",{staticClass:"v-progress-linear__content"},t):null},genListeners(){const t=this.$listeners;return this.reactive&&(t.click=this.onClick),t},genProgressBar(t){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__indeterminate",class:{[t]:!0}}))},onClick(t){if(!this.reactive)return;const{width:e}=this.$el.getBoundingClientRect();this.internalValue=t.offsetX/e*100},onObserve(t,e,s){this.isVisible=s},normalize(t){return t<0?0:t>100?100:parseFloat(t)}},render(t){const e={staticClass:"v-progress-linear",attrs:{role:"progressbar","aria-valuemin":0,"aria-valuemax":this.normalizedBuffer,"aria-valuenow":this.indeterminate?void 0:this.normalizedValue},class:this.classes,directives:[{name:"intersect",value:this.onObserve}],style:{bottom:this.bottom?0:void 0,height:this.active?(0,d.Dg)(this.height):0,top:this.top?0:void 0},on:this.genListeners()};return t("div",e,[this.__cachedStream,this.__cachedBackground,this.__cachedBuffer,this.__cachedBar,this.genContent()])}}),m=v,p=r.Ay.extend().extend({name:"loadable",props:{loading:{type:[Boolean,String],default:!1},loaderHeight:{type:[Number,String],default:2}},methods:{genProgress(){return!1===this.loading?null:(0,d.$c)(this,"progress")||this.$createElement(m,{props:{absolute:!0,color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,height:this.loaderHeight,indeterminate:!0}})}}})},428:function(t,e,s){s.d(e,{P:function(){return i}});var r=s(5471);function i(t="value",e="input"){return r.Ay.extend({name:"toggleable",model:{prop:t,event:e},props:{[t]:{required:!1}},data(){return{isActive:!!this[t]}},watch:{[t](t){this.isActive=!!t},isActive(s){!!s!==this[t]&&this.$emit(e,s)}}})}const a=i();e.A=a},6001:function(){}}]);
//# sourceMappingURL=165.db9888cd.js.map