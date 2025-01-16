"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[82],{4082:function(t,e,s){s.r(e),s.d(e,{default:function(){return S}});var i=s(3740),a=s(3698),o=s(2938),r=s(3180),n=s(3449),l=s(6814),c=s(9991),h=s(174),d=s(6930),u=s(5834),m=s(7150),v=s(1034),p=s(7112),f=s(7270),g=function(){var t=this,e=t._self._c;return e(n.A,{attrs:{fluid:""}},[e(a.A,{staticClass:"my-4",attrs:{elevation:"2"}},[e(o.ri,{staticClass:"d-flex align-center py-4"},[e(d.A,{staticClass:"mr-3",attrs:{large:"",color:"#d2691e"}},[t._v("mdi-book")]),e("span",{staticClass:"text-h5"},[t._v("Subject Management")]),e(v.A),e(p.A,{staticClass:"mr-4",staticStyle:{"max-width":"300px"},attrs:{"prepend-inner-icon":"mdi-magnify",label:"Search subjects...","single-line":"","hide-details":"",outlined:"",dense:""},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleSearch.apply(null,arguments)}},model:{value:t.options.search,callback:function(e){t.$set(t.options,"search",e)},expression:"options.search"}}),e(i.A,{staticClass:"px-5 rounded",attrs:{color:"#d2691e",dark:""},on:{click:t.openCreateDialog}},[e(d.A,{attrs:{left:""}},[t._v("mdi-plus")]),t._v(" Add Subject ")],1)],1),e(l.A,{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.subjects,loading:t.loading,options:t.options,"server-items-length":t.totalSubjects,"footer-props":{"items-per-page-options":[5,10,25,50],showFirstLastPage:!0}},on:{"update:options":function(e){t.options=e}},scopedSlots:t._u([{key:"item.course",fn:function({item:s}){return t._l(s.course,(function(s){return e(r.A,{key:s._id,staticClass:"mr-1 my-1",attrs:{small:"",color:"#f4a460",dark:""}},[t._v(" "+t._s(s.courseCode)+" ")])}))}},{key:"item.actions",fn:function({item:s}){return[e(f.A,{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function({on:a,attrs:o}){return[e(i.A,t._g(t._b({staticClass:"mr-1",attrs:{icon:"",small:"",color:"primary"},on:{click:function(e){return t.editSubject(s)}}},"v-btn",o,!1),a),[e(d.A,{attrs:{small:""}},[t._v("mdi-pencil")])],1)]}}],null,!0)},[e("span",[t._v("Edit Subject")])]),e(f.A,{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function({on:a,attrs:o}){return[e(i.A,t._g(t._b({attrs:{icon:"",small:"",color:"error"},on:{click:function(e){return t.confirmDelete(s)}}},"v-btn",o,!1),a),[e(d.A,{attrs:{small:""}},[t._v("mdi-delete")])],1)]}}],null,!0)},[e("span",[t._v("Delete Subject")])])]}}])})],1),e(c.A,{attrs:{"max-width":"600px",persistent:""},model:{value:t.createDialog,callback:function(e){t.createDialog=e},expression:"createDialog"}},[e(a.A,[e(o.ri,{staticClass:"headline white--text d-flex align-center",staticStyle:{"background-color":"#a52a2a"}},[t._v(" "+t._s(t.editMode?"Edit Subject":"Create New Subject")+" ")]),e(o.OQ,{staticClass:"pt-4"},[e(h.A,{ref:"form",attrs:{"lazy-validation":""},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[e(p.A,{attrs:{rules:t.formRules.subjectName,label:"Descriptive Title",required:"",outlined:"","error-messages":t.subjectNameError},model:{value:t.form.subjectName,callback:function(e){t.$set(t.form,"subjectName",e)},expression:"form.subjectName"}}),e(p.A,{attrs:{rules:t.formRules.catNo,label:"CAT No",required:"",outlined:""},model:{value:t.form.catNo,callback:function(e){t.$set(t.form,"catNo",e)},expression:"form.catNo"}}),e(u.A,{attrs:{items:["first","second"],rules:t.formRules.semester,label:"Semester",required:"",outlined:""},model:{value:t.form.semester,callback:function(e){t.$set(t.form,"semester",e)},expression:"form.semester"}}),e(u.A,{attrs:{items:t.academicYears,rules:t.formRules.academicYear,label:"Academic Year",required:"",outlined:""},model:{value:t.form.academicYear,callback:function(e){t.$set(t.form,"academicYear",e)},expression:"form.academicYear"}}),e(u.A,{attrs:{items:t.courseOptions,"item-text":"courseName","item-value":"_id",label:"Select Courses",multiple:"",chips:"",outlined:""},model:{value:t.form.course,callback:function(e){t.$set(t.form,"course",e)},expression:"form.course"}})],1)],1),e(o.SL,{staticClass:"pb-4 px-6"},[e(v.A),e(i.A,{attrs:{color:"grey darken-1",text:"",disabled:t.loading},on:{click:t.closeCreateDialog}},[t._v(" Cancel ")]),e(i.A,{attrs:{color:"#d2691e",disabled:!t.isFormValid,loading:t.loading,dark:t.isFormValid},on:{click:t.handleCreate}},[t._v(" "+t._s(t.editMode?"Save Changes":"Create Subject")+" ")])],1)],1)],1),e(c.A,{attrs:{"max-width":"400"},model:{value:t.deleteDialog,callback:function(e){t.deleteDialog=e},expression:"deleteDialog"}},[e(a.A,[e(o.ri,{staticClass:"headline error--text"},[t._v("Confirm Delete")]),e(o.OQ,[t._v(" Are you sure you want to delete the subject "),e("strong",[t._v(t._s(t.subjectToDelete?.subjectName))]),t._v("? ")]),e(o.SL,[e(v.A),e(i.A,{attrs:{color:"grey darken-1",text:""},on:{click:function(e){t.deleteDialog=!1}}},[t._v(" Cancel ")]),e(i.A,{attrs:{color:"error",loading:t.loading},on:{click:t.handleDelete}},[t._v(" Delete ")])],1)],1)],1),e(m.A,{attrs:{color:t.snackbarColor,timeout:3e3,top:""},scopedSlots:t._u([{key:"action",fn:function({attrs:s}){return[e(i.A,t._b({attrs:{text:""},on:{click:function(e){t.showSnackbar=!1}}},"v-btn",s,!1),[t._v("Close")])]}}]),model:{value:t.showSnackbar,callback:function(e){t.showSnackbar=e},expression:"showSnackbar"}},[t._v(" "+t._s(t.snackbarText)+" ")])],1)},b=[],y=s(5353),A={name:"SubjectListView",data:()=>({valid:!1,options:{page:1,itemsPerPage:10,search:""},createDialog:!1,deleteDialog:!1,subjectToDelete:null,courseOptions:[],academicYears:["2023-2024","2024-2025","2025-2026","2027-2028"],form:{subjectName:"",catNo:"",academicYear:"",semester:"",course:[]},formRules:{subjectName:[t=>!!t||"Subject name is required",t=>t&&t.length>=3||"Subject name must be at least 3 characters"],catNo:[t=>!!t||"CAT No is required"],academicYear:[t=>!!t||"Academic Year is required"],semester:[t=>!!t||"Semester Year is required"]},headers:[{text:"Descriptive Title",align:"start",value:"subjectName"},{text:"CAT No",align:"start",value:"catNo"},{text:"Semeester",align:"start",value:"semester"},{text:"Academic Year",align:"start",value:"academicYear"},{text:"Courses",align:"start",value:"course"},{text:"Actions",value:"actions",sortable:!1,align:"end"}],editMode:!1,loading:!1,snackbarColor:"",snackbarText:"",showSnackbar:!1,subjectNameError:""}),computed:{...(0,y.aH)("subjects",["subjects","totalSubjects"]),isFormValid(){return Boolean(this.valid&&this.form?.subjectName)}},methods:{...(0,y.i0)("subjects",["fetchSubjects","createSubject","updateSubject","deleteSubject"]),...(0,y.i0)("courses",["fetchCourses"]),async loadCourseOptions(){try{await this.fetchCourses(),this.courseOptions=this.$store.state.courses.courses}catch(t){this.showSnackbarMessage("Failed to load courses","error")}},openCreateDialog(){this.editMode=!1,this.createDialog=!0,this.resetForm()},closeCreateDialog(){this.$refs.form&&this.$refs.form.resetValidation(),this.resetForm(),this.createDialog=!1},resetForm(){this.valid=!1,this.subjectNameError="",this.form={_id:null,subjectName:"",catNo:"",semester:"",academicYear:"",course:[]},this.$nextTick((()=>{this.$refs.form&&(this.$refs.form.reset(),this.$refs.form.resetValidation())}))},validateForm(){return this.$refs.form&&this.$refs.form.validate()},async handleCreate(){if(this.validateForm()){this.loading=!0,this.subjectNameError="";try{this.editMode?await this.updateSubject({id:this.form._id,subjectData:this.form}):await this.createSubject(this.form),this.showSnackbarMessage(`Subject ${this.editMode?"updated":"created"} successfully!`,"success"),await this.fetchSubjects(),this.closeCreateDialog()}catch(t){t.response?.data?.message.includes("already exists")?this.subjectNameError="This subject name already exists":this.showSnackbarMessage(t.response?.data?.message||"An error occurred!","error")}finally{this.loading=!1}}},editSubject(t){this.editMode=!0,this.form={_id:t._id,subjectName:t.subjectName,catNo:t.catNo||"",semester:t.semester||"",academicYear:t.academicYear||"",course:t.course?t.course.map((t=>t._id)):[]},this.createDialog=!0},confirmDelete(t){this.subjectToDelete=t,this.deleteDialog=!0},async handleDelete(){this.loading=!0;try{await this.deleteSubject(this.subjectToDelete._id),this.showSnackbarMessage("Subject deleted successfully!","success"),this.fetchSubjects()}catch(t){this.showSnackbarMessage(t.response?.data?.message||"Failed to delete subject!","error")}finally{this.loading=!1,this.deleteDialog=!1}},showSnackbarMessage(t,e){this.snackbarText=t,this.snackbarColor=e,this.showSnackbar=!0},async handleSearch(){this.options.page=1,await this.fetchSubjects()}},async created(){await Promise.all([this.fetchSubjects(),this.loadCourseOptions()])}},k=A,w=s(1656),C=(0,w.A)(k,g,b,!1,null,null,null),S=C.exports},9991:function(t,e,s){s.d(e,{A:function(){return p}});var i=s(4596),a=s(5030),o=s(2031),r=s(7631),n=s(5949),l=s(7198),c=s(5648),h=s(4598),d=s(5803),u=s(6988),m=s(4152);const v=(0,d.A)(o.A,r.A,n.A,l.A,c.A,a.A);var p=v.extend({name:"v-dialog",directives:{ClickOutside:h.A},props:{dark:Boolean,disabled:Boolean,fullscreen:Boolean,light:Boolean,maxWidth:[String,Number],noClickAnimation:Boolean,origin:{type:String,default:"center center"},persistent:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"},width:[String,Number]},data(){return{activatedBy:null,animate:!1,animateTimeout:-1,stackMinZIndex:200,previousActiveElement:null}},computed:{classes(){return{[`v-dialog ${this.contentClass}`.trim()]:!0,"v-dialog--active":this.isActive,"v-dialog--persistent":this.persistent,"v-dialog--fullscreen":this.fullscreen,"v-dialog--scrollable":this.scrollable,"v-dialog--animated":this.animate}},contentClasses(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive(t){var e;t?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind(),null===(e=this.previousActiveElement)||void 0===e||e.focus())},fullscreen(t){this.isActive&&(t?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},created(){this.$attrs.hasOwnProperty("full-width")&&(0,u.rq)("full-width",this)},beforeMount(){this.$nextTick((()=>{this.isBooted=this.isActive,this.isActive&&this.show()}))},beforeDestroy(){"undefined"!==typeof window&&this.unbind()},methods:{animateClick(){this.animate=!1,this.$nextTick((()=>{this.animate=!0,window.clearTimeout(this.animateTimeout),this.animateTimeout=window.setTimeout((()=>this.animate=!1),150)}))},closeConditional(t){const e=t.target;return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(e)||this.overlay&&e&&!this.overlay.$el.contains(e))&&this.activeZIndex>=this.getMaxZIndex()},hideScroll(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):n.A.options.methods.hideScroll.call(this)},show(){!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$nextTick((()=>{this.$nextTick((()=>{var t,e;(null===(t=this.$refs.dialog)||void 0===t?void 0:t.contains(document.activeElement))||(this.previousActiveElement=document.activeElement,null===(e=this.$refs.dialog)||void 0===e||e.focus()),this.bind()}))}))},bind(){window.addEventListener("focusin",this.onFocusin)},unbind(){window.removeEventListener("focusin",this.onFocusin)},onClickOutside(t){this.$emit("click:outside",t),this.persistent?this.noClickAnimation||this.animateClick():this.isActive=!1},onKeydown(t){if(t.keyCode===m.uP.esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;const t=this.getActivator();this.$nextTick((()=>t&&t.focus()))}this.$emit("keydown",t)},onFocusin(t){if(!t||!this.retainFocus)return;const e=t.target;if(e&&this.$refs.dialog&&![document,this.$refs.dialog].includes(e)&&!this.$refs.dialog.contains(e)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some((t=>t.contains(e)))){const t=this.$refs.dialog.querySelectorAll('button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'),e=[...t].find((t=>!t.hasAttribute("disabled")&&!t.matches('[tabindex="-1"]')));e&&e.focus()}},genContent(){return this.showLazyContent((()=>[this.$createElement(i.A,{props:{root:!0,light:this.light,dark:this.dark}},[this.$createElement("div",{class:this.contentClasses,attrs:{role:"dialog","aria-modal":this.hideOverlay?void 0:"true",...this.getScopeIdAttrs()},on:{keydown:this.onKeydown},style:{zIndex:this.activeZIndex},ref:"content"},[this.genTransition()])])]))},genTransition(){const t=this.genInnerContent();return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,appear:!0}},[t]):t},genInnerContent(){const t={class:this.classes,attrs:{tabindex:this.isActive?0:void 0},ref:"dialog",directives:[{name:"click-outside",value:{handler:this.onClickOutside,closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],style:{transformOrigin:this.origin}};return this.fullscreen||(t.style={...t.style,maxWidth:(0,m.Dg)(this.maxWidth),width:(0,m.Dg)(this.width)}),this.$createElement("div",t,this.getContentSlot())}},render(t){return t("div",{staticClass:"v-dialog__container",class:{"v-dialog__container--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},[this.genActivator(),this.genContent()])}})},174:function(t,e,s){s(4114);var i=s(5803),a=s(7717),o=s(7540),r=s(4152);e.A=(0,i.A)(a.A,(0,o.G)("form")).extend({name:"v-form",provide(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:()=>({inputs:[],watchers:[],errorBag:{}}),watch:{errorBag:{handler(t){const e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput(t){const e=t=>t.$watch("hasError",(e=>{this.$set(this.errorBag,t._uid,e)}),{immediate:!0}),s={_uid:t._uid,valid:()=>{},shouldValidate:()=>{}};return this.lazyValidation?s.shouldValidate=t.$watch("shouldValidate",(i=>{i&&(this.errorBag.hasOwnProperty(t._uid)||(s.valid=e(t)))})):s.valid=e(t),s},validate(){return 0===this.inputs.filter((t=>!t.validate(!0))).length},reset(){this.inputs.forEach((t=>t.reset())),this.resetErrorBag()},resetErrorBag(){this.lazyValidation&&setTimeout((()=>{this.errorBag={}}),0)},resetValidation(){this.inputs.forEach((t=>t.resetValidation())),this.resetErrorBag()},register(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister(t){const e=this.inputs.find((e=>e._uid===t._uid));if(!e)return;const s=this.watchers.find((t=>t._uid===e._uid));s&&(s.valid(),s.shouldValidate()),this.watchers=this.watchers.filter((t=>t._uid!==e._uid)),this.inputs=this.inputs.filter((t=>t._uid!==e._uid)),this.$delete(this.errorBag,e._uid)}},render(t){return t("form",{staticClass:"v-form",attrs:{novalidate:!0,...this.attrs$},on:{submit:t=>this.$emit("submit",t)}},(0,r.$c)(this))}})},8907:function(t,e,s){s.d(e,{A:function(){return l}});s(4114);var i=s(8743),a=s(3381),o=s(428),r=s(5803),n=s(4152),l=(0,r.A)(i.A,a.A,o.A).extend({name:"v-overlay",props:{absolute:Boolean,color:{type:String,default:"#212121"},dark:{type:Boolean,default:!0},opacity:{type:[Number,String],default:.46},value:{default:!0},zIndex:{type:[Number,String],default:5}},computed:{__scrim(){const t=this.setBackgroundColor(this.color,{staticClass:"v-overlay__scrim",style:{opacity:this.computedOpacity}});return this.$createElement("div",t)},classes(){return{"v-overlay--absolute":this.absolute,"v-overlay--active":this.isActive,...this.themeClasses}},computedOpacity(){return Number(this.isActive?this.opacity:0)},styles(){return{zIndex:this.zIndex}}},methods:{genContent(){return this.$createElement("div",{staticClass:"v-overlay__content"},(0,n.$c)(this))}},render(t){const e=[this.__scrim];return this.isActive&&e.push(this.genContent()),t("div",{staticClass:"v-overlay",on:this.$listeners,class:this.classes,style:this.styles},e)}})},7150:function(t,e,s){s.d(e,{A:function(){return d}});var i=s(8184),a=s(8743),o=s(3381),r=s(428),n=s(6763),l=s(5803),c=s(4152),h=s(6988),d=(0,l.A)(i.A,a.A,r.A,(0,n.P)(["absolute","bottom","left","right","top"])).extend({name:"v-snackbar",props:{app:Boolean,centered:Boolean,contentClass:{type:String,default:""},multiLine:Boolean,text:Boolean,timeout:{type:[Number,String],default:5e3},transition:{type:[Boolean,String],default:"v-snack-transition",validator:t=>"string"===typeof t||!1===t},vertical:Boolean},data:()=>({activeTimeout:-1}),computed:{classes(){return{"v-snack--absolute":this.absolute,"v-snack--active":this.isActive,"v-snack--bottom":this.bottom||!this.top,"v-snack--centered":this.centered,"v-snack--has-background":this.hasBackground,"v-snack--left":this.left,"v-snack--multi-line":this.multiLine&&!this.vertical,"v-snack--right":this.right,"v-snack--text":this.text,"v-snack--top":this.top,"v-snack--vertical":this.vertical}},hasBackground(){return!this.text&&!this.outlined},isDark(){return this.hasBackground?!this.light:o.A.options.computed.isDark.call(this)},styles(){if(this.absolute||!this.app)return{};const{bar:t,bottom:e,footer:s,insetFooter:i,left:a,right:o,top:r}=this.$vuetify.application;return{paddingBottom:(0,c.Dg)(e+s+i),paddingLeft:(0,c.Dg)(a),paddingRight:(0,c.Dg)(o),paddingTop:(0,c.Dg)(t+r)}}},watch:{isActive:"setTimeout",timeout:"setTimeout"},mounted(){this.isActive&&this.setTimeout()},created(){this.$attrs.hasOwnProperty("auto-height")&&(0,h.rq)("auto-height",this),0==this.timeout&&(0,h.CI)('timeout="0"',"-1",this)},methods:{genActions(){return this.$createElement("div",{staticClass:"v-snack__action "},[(0,c.$c)(this,"action",{attrs:{class:"v-snack__btn"}})])},genContent(){return this.$createElement("div",{staticClass:"v-snack__content",class:{[this.contentClass]:!0},attrs:{role:"status","aria-live":"polite"}},[(0,c.$c)(this)])},genWrapper(){const t=this.hasBackground?this.setBackgroundColor:this.setTextColor,e=t(this.color,{staticClass:"v-snack__wrapper",class:i.A.options.computed.classes.call(this),style:i.A.options.computed.styles.call(this),directives:[{name:"show",value:this.isActive}],on:{pointerenter:()=>window.clearTimeout(this.activeTimeout),pointerleave:this.setTimeout}});return this.$createElement("div",e,[this.genContent(),this.genActions()])},genTransition(){return this.$createElement("transition",{props:{name:this.transition}},[this.genWrapper()])},setTimeout(){window.clearTimeout(this.activeTimeout);const t=Number(this.timeout);this.isActive&&![0,-1].includes(t)&&(this.activeTimeout=window.setTimeout((()=>{this.isActive=!1}),t))}},render(t){return t("div",{staticClass:"v-snack",class:this.classes,style:this.styles},[!1!==this.transition?this.genTransition():this.genWrapper()])}})},7270:function(t,e,s){s.d(e,{A:function(){return d}});var i=s(5030),a=s(8743),o=s(7391),r=s(2031),n=s(9975),l=s(4152),c=s(6988),h=s(5803),d=(0,h.A)(a.A,o.A,r.A,n.A).extend({name:"v-tooltip",props:{closeDelay:{type:[Number,String],default:0},disabled:Boolean,openDelay:{type:[Number,String],default:0},openOnHover:{type:Boolean,default:!0},openOnFocus:{type:Boolean,default:!0},tag:{type:String,default:"span"},transition:String},data:()=>({calculatedMinWidth:0,closeDependents:!1}),computed:{calculatedLeft(){const{activator:t,content:e}=this.dimensions,s=!this.bottom&&!this.left&&!this.top&&!this.right,i=!1!==this.attach?t.offsetLeft:t.left;let a=0;return this.top||this.bottom||s?a=i+t.width/2-e.width/2:(this.left||this.right)&&(a=i+(this.right?t.width:-e.width)+(this.right?10:-10)),this.nudgeLeft&&(a-=parseInt(this.nudgeLeft)),this.nudgeRight&&(a+=parseInt(this.nudgeRight)),`${this.calcXOverflow(a,this.dimensions.content.width)}px`},calculatedTop(){const{activator:t,content:e}=this.dimensions,s=!1!==this.attach?t.offsetTop:t.top;let i=0;return this.top||this.bottom?i=s+(this.bottom?t.height:-e.height)+(this.bottom?10:-10):(this.left||this.right)&&(i=s+t.height/2-e.height/2),this.nudgeTop&&(i-=parseInt(this.nudgeTop)),this.nudgeBottom&&(i+=parseInt(this.nudgeBottom)),!1===this.attach&&(i+=this.pageYOffset),`${this.calcYOverflow(i)}px`},classes(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left,"v-tooltip--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},computedTransition(){return this.transition?this.transition:this.isActive?"scale-transition":"fade-transition"},offsetY(){return this.top||this.bottom},offsetX(){return this.left||this.right},styles(){return{left:this.calculatedLeft,maxWidth:(0,l.Dg)(this.maxWidth),minWidth:(0,l.Dg)(this.minWidth),top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount(){this.$nextTick((()=>{this.value&&this.callActivate()}))},mounted(){"v-slot"===(0,l.fo)(this,"activator",!0)&&(0,c.yA)("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},deactivate(){this.runDelay("close")},genActivatorListeners(){const t=i.A.options.methods.genActivatorListeners.call(this);return this.openOnFocus&&(t.focus=t=>{this.getActivator(t),this.runDelay("open")},t.blur=t=>{this.getActivator(t),this.runDelay("close")}),t.keydown=t=>{t.keyCode===l.uP.esc&&(this.getActivator(t),this.runDelay("close"))},t},genActivatorAttributes(){return{"aria-haspopup":!0,"aria-expanded":String(this.isActive)}},genTransition(){const t=this.genContent();return this.computedTransition?this.$createElement("transition",{props:{name:this.computedTransition}},[t]):t},genContent(){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:{[this.contentClass]:!0,menuable__content__active:this.isActive,"v-tooltip__content--fixed":this.activatorFixed},style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.getContentSlot())}},render(t){return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[this.showLazyContent((()=>[this.genTransition()])),this.genActivator()])}})},5949:function(t,e,s){s.d(e,{A:function(){return n}});var i=s(8907),a=i.A,o=s(4152),r=s(5471),n=r.Ay.extend().extend({name:"overlayable",props:{hideOverlay:Boolean,overlayColor:String,overlayOpacity:[Number,String]},data(){return{animationFrame:0,overlay:null}},watch:{hideOverlay(t){this.isActive&&(t?this.removeOverlay():this.genOverlay())}},beforeDestroy(){this.removeOverlay()},methods:{createOverlay(){const t=new a({propsData:{absolute:this.absolute,value:!1,color:this.overlayColor,opacity:this.overlayOpacity}});t.$mount();const e=this.absolute?this.$el.parentNode:document.querySelector("[data-app]");e&&e.insertBefore(t.$el,e.firstChild),this.overlay=t},genOverlay(){if(this.hideScroll(),!this.hideOverlay)return this.overlay||this.createOverlay(),this.animationFrame=requestAnimationFrame((()=>{this.overlay&&(void 0!==this.activeZIndex?this.overlay.zIndex=String(this.activeZIndex-1):this.$el&&(this.overlay.zIndex=(0,o.fl)(this.$el)),this.overlay.value=!0)})),!0},removeOverlay(t=!0){this.overlay&&((0,o.d7)(this.overlay.$el,"transitionend",(()=>{this.overlay&&this.overlay.$el&&this.overlay.$el.parentNode&&!this.overlay.value&&!this.isActive&&(this.overlay.$el.parentNode.removeChild(this.overlay.$el),this.overlay.$destroy(),this.overlay=null)})),cancelAnimationFrame(this.animationFrame),this.overlay.value=!1),t&&this.showScroll()},scrollListener(t){if("key"in t){if(["INPUT","TEXTAREA","SELECT"].includes(t.target.tagName)||t.target.isContentEditable)return;const e=[o.uP.up,o.uP.pageup],s=[o.uP.down,o.uP.pagedown];if(e.includes(t.keyCode))t.deltaY=-1;else{if(!s.includes(t.keyCode))return;t.deltaY=1}}(t.target===this.overlay||"keydown"!==t.type&&t.target===document.body||this.checkPath(t))&&t.preventDefault()},hasScrollbar(t){if(!t||t.nodeType!==Node.ELEMENT_NODE)return!1;const e=window.getComputedStyle(t);return(["auto","scroll"].includes(e.overflowY)||"SELECT"===t.tagName)&&t.scrollHeight>t.clientHeight||["auto","scroll"].includes(e.overflowX)&&t.scrollWidth>t.clientWidth},shouldScroll(t,e){if(t.hasAttribute("data-app"))return!1;const s=e.shiftKey||e.deltaX?"x":"y",i="y"===s?e.deltaY:e.deltaX||e.deltaY;let a,o;"y"===s?(a=0===t.scrollTop,o=t.scrollTop+t.clientHeight===t.scrollHeight):(a=0===t.scrollLeft,o=t.scrollLeft+t.clientWidth===t.scrollWidth);const r=i<0,n=i>0;return!(a||!r)||(!(o||!n)||!(!a&&!o||!t.parentNode)&&this.shouldScroll(t.parentNode,e))},isInside(t,e){return t===e||null!==t&&t!==document.body&&this.isInside(t.parentNode,e)},checkPath(t){const e=(0,o.K9)(t);if("keydown"===t.type&&e[0]===document.body){const e=this.$refs.dialog,s=window.getSelection().anchorNode;return!(e&&this.hasScrollbar(e)&&this.isInside(s,e))||!this.shouldScroll(e,t)}for(let s=0;s<e.length;s++){const i=e[s];if(i===document)return!0;if(i===document.documentElement)return!0;if(i===this.$refs.content)return!0;if(this.hasScrollbar(i))return!this.shouldScroll(i,t)}return!0},hideScroll(){this.$vuetify.breakpoint.smAndDown?document.documentElement.classList.add("overflow-y-hidden"):((0,o.P4)(window,"wheel",this.scrollListener,{passive:!1}),window.addEventListener("keydown",this.scrollListener))},showScroll(){document.documentElement.classList.remove("overflow-y-hidden"),window.removeEventListener("wheel",this.scrollListener),window.removeEventListener("keydown",this.scrollListener)}}})}}]);
//# sourceMappingURL=82.35f5258d.js.map