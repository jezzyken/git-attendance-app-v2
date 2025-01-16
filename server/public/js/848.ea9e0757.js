"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[848],{4804:function(t,e,s){s.r(e),s.d(e,{default:function(){return D}});var i=s(3740),a=s(3698),n=s(2938),o=s(4414),r=s(3449),l=s(6814),d=s(1446),c=s(9991),u=s(174),h=s(6930),m=s(6237),p=s(2756),f=s(5834),v=s(7150),g=s(1034),y=s(3302),A=s(7112),b=s(5803);const k=(0,b.A)(A.A);var w=k.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:t=>!isNaN(parseFloat(t))},rows:{type:[Number,String],default:5,validator:t=>!isNaN(parseInt(t,10))}},computed:{classes(){return{"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle,...A.A.options.computed.classes.call(this)}},noResizeHandle(){return this.noResize||this.autoGrow}},watch:{autoGrow(t){this.$nextTick((()=>{var e;t?this.calculateInputHeight():null===(e=this.$refs.input)||void 0===e||e.style.removeProperty("height")}))},lazyValue(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted(){setTimeout((()=>{this.autoGrow&&this.calculateInputHeight()}),0)},methods:{calculateInputHeight(){const t=this.$refs.input;if(!t)return;t.style.height="0";const e=t.scrollHeight,s=parseInt(this.rows,10)*parseFloat(this.rowHeight);t.style.height=Math.max(s,e)+"px"},genInput(){const t=A.A.options.methods.genInput.call(this);return t.tag="textarea",delete t.data.attrs.type,t.data.attrs.rows=this.rows,t},onInput(t){A.A.options.methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.$emit("keydown",t)}}}),S=s(7270),x=function(){var t=this,e=t._self._c;return e(r.A,{attrs:{fluid:""}},[e(a.A,{staticClass:"my-4",attrs:{elevation:"2"}},[e(n.ri,{staticClass:"d-flex align-center py-4"},[e(h.A,{staticClass:"mr-3",attrs:{large:"",color:"#d2691e"}},[t._v("mdi-account-school")]),e("span",{staticClass:"text-h5"},[t._v("Student Management")]),e(g.A),e(A.A,{staticClass:"mr-4",staticStyle:{"max-width":"300px"},attrs:{"prepend-inner-icon":"mdi-magnify",label:"Search students...","single-line":"","hide-details":"",outlined:"",dense:""},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleSearch.apply(null,arguments)}},model:{value:t.options.search,callback:function(e){t.$set(t.options,"search",e)},expression:"options.search"}}),e(i.A,{staticClass:"px-5 rounded",attrs:{color:"#d2691e",dark:""},on:{click:t.openCreateDialog}},[e(h.A,{attrs:{left:""}},[t._v("mdi-plus")]),t._v(" Add Student ")],1)],1),e(l.A,{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.students,loading:t.loading,options:t.options,"server-items-length":t.totalStudents,"footer-props":{"items-per-page-options":[5,10,25,50],showFirstLastPage:!0}},on:{"update:options":function(e){t.options=e}},scopedSlots:t._u([{key:"item.user.fullName",fn:function({item:e}){return[t._v(" "+t._s(`${e.user.lastName}, ${e.user.firstName} ${e.user.middleName||""}`)+" ")]}},{key:"item.course",fn:function({item:e}){return[t._v(" "+t._s(e.course.courseName)+" ")]}},{key:"item.actions",fn:function({item:s}){return[e(S.A,{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function({on:a,attrs:n}){return[e(i.A,t._g(t._b({staticClass:"mr-1",attrs:{icon:"",small:"",color:"primary"},on:{click:function(e){return t.editStudent(s)}}},"v-btn",n,!1),a),[e(h.A,{attrs:{small:""}},[t._v("mdi-pencil")])],1)]}}],null,!0)},[e("span",[t._v("Edit Student")])]),e(S.A,{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function({on:a,attrs:n}){return[e(i.A,t._g(t._b({attrs:{icon:"",small:"",color:"error"},on:{click:function(e){return t.confirmDelete(s)}}},"v-btn",n,!1),a),[e(h.A,{attrs:{small:""}},[t._v("mdi-delete")])],1)]}}],null,!0)},[e("span",[t._v("Delete Student")])])]}}])})],1),e(c.A,{attrs:{"max-width":"800px",persistent:""},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[e(a.A,[e(n.ri,{staticClass:"headline white--text d-flex align-center",staticStyle:{"background-color":"#a52a2a"}},[t._v(" "+t._s(t.editMode?"Edit Student":"Add New Student")+" ")]),e(n.OQ,{staticClass:"pt-4"},[e(u.A,{ref:"form",attrs:{"lazy-validation":""},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[e(p.A,[e(o.A,{attrs:{cols:"12",sm:"12",md:"4"}},[e(A.A,{attrs:{rules:t.rules.required,label:"Student ID",required:"",outlined:"",dense:""},model:{value:t.form.studentId,callback:function(e){t.$set(t.form,"studentId",e)},expression:"form.studentId"}})],1)],1),e(y.A,{staticClass:"pl-0"},[t._v("Personal Information")]),e(p.A,[e(o.A,{attrs:{cols:"12",sm:"12",md:"4"}},[e(A.A,{attrs:{rules:t.rules.required,label:"Last Name",required:"",outlined:"",dense:""},model:{value:t.form.lastName,callback:function(e){t.$set(t.form,"lastName",e)},expression:"form.lastName"}})],1),e(o.A,{attrs:{cols:"12",sm:"12",md:"4"}},[e(A.A,{attrs:{rules:t.rules.required,label:"First Name",required:"",outlined:"",dense:""},model:{value:t.form.firstName,callback:function(e){t.$set(t.form,"firstName",e)},expression:"form.firstName"}})],1),e(o.A,{attrs:{cols:"12",sm:"12",md:"4"}},[e(A.A,{attrs:{label:"Middle Name",outlined:"",dense:""},model:{value:t.form.middleName,callback:function(e){t.$set(t.form,"middleName",e)},expression:"form.middleName"}})],1)],1),e(p.A,[e(o.A,{attrs:{cols:"12",sm:"12",md:"4"}},[e(m.A,{ref:"dateMenu",attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":"","min-width":"auto"},scopedSlots:t._u([{key:"activator",fn:function({on:s,attrs:i}){return[e(A.A,t._g(t._b({attrs:{label:"Date of Birth",readonly:"",rules:t.rules.required,outlined:"",dense:""},model:{value:t.form.dateOfBirth,callback:function(e){t.$set(t.form,"dateOfBirth",e)},expression:"form.dateOfBirth"}},"v-text-field",i,!1),s))]}}]),model:{value:t.dateMenu,callback:function(e){t.dateMenu=e},expression:"dateMenu"}},[e(d.A,{on:{input:function(e){t.dateMenu=!1}},model:{value:t.form.dateOfBirth,callback:function(e){t.$set(t.form,"dateOfBirth",e)},expression:"form.dateOfBirth"}})],1)],1),e(o.A,{attrs:{cols:"12",sm:"12",md:"4"}},[e(f.A,{attrs:{items:["Male","Female"],label:"Gender",rules:t.rules.required,outlined:"",dense:""},model:{value:t.form.gender,callback:function(e){t.$set(t.form,"gender",e)},expression:"form.gender"}})],1),e(o.A,{attrs:{cols:"12",sm:"4"}},[e(A.A,{attrs:{label:"Phone Number",rules:t.rules.phone,outlined:"",dense:""},model:{value:t.form.phoneNo,callback:function(e){t.$set(t.form,"phoneNo",e)},expression:"form.phoneNo"}})],1)],1),e(y.A,{staticClass:"pl-0"},[t._v("Academic Information")]),e(p.A,[e(o.A,{attrs:{cols:"12",sm:"12",md:"4"}},[e(f.A,{attrs:{items:t.courses,"item-text":"courseName","item-value":"_id",label:"Course",rules:t.rules.required,outlined:"",dense:""},model:{value:t.form.course,callback:function(e){t.$set(t.form,"course",e)},expression:"form.course"}})],1),e(o.A,{attrs:{cols:"12",sm:"12",md:"4"}},[e(f.A,{attrs:{items:[1,2,3,4],label:"Level",rules:t.rules.required,outlined:"",dense:""},model:{value:t.form.level,callback:function(e){t.$set(t.form,"level",e)},expression:"form.level"}})],1),e(o.A,{attrs:{cols:"12",sm:"4"}},[e(A.A,{attrs:{label:"Section",rules:t.rules.required,outlined:"",dense:""},model:{value:t.form.section,callback:function(e){t.$set(t.form,"section",e)},expression:"form.section"}})],1)],1),e(y.A,{staticClass:"pl-0"},[t._v("Parent/Guardian Information")]),e(p.A,[e(o.A,{attrs:{cols:"12",sm:"12",md:"4"}},[e(A.A,{attrs:{label:"Parent/Gurdian Name",rules:t.rules.required,outlined:"",dense:""},model:{value:t.form.parentName,callback:function(e){t.$set(t.form,"parentName",e)},expression:"form.parentName"}})],1),e(o.A,{attrs:{cols:"12",sm:"12",md:"4"}},[e(A.A,{attrs:{label:"Parent/Gurdian Contact Number",rules:t.rules.phone,outlined:"",dense:""},model:{value:t.form.parentNo,callback:function(e){t.$set(t.form,"parentNo",e)},expression:"form.parentNo"}})],1),e(o.A,{attrs:{cols:"12",sm:"12",md:"4"}},[e(A.A,{attrs:{label:"Parent/Gurdian Email",rules:t.rules.email,outlined:"",dense:""},model:{value:t.form.parentEmail,callback:function(e){t.$set(t.form,"parentEmail",e)},expression:"form.parentEmail"}})],1),e(o.A,{attrs:{cols:"12"}},[e(w,{attrs:{label:"Parent/Gurdian Address",rules:t.rules.required,outlined:"",dense:"",rows:"2"},model:{value:t.form.parentAddress,callback:function(e){t.$set(t.form,"parentAddress",e)},expression:"form.parentAddress"}})],1)],1)],1)],1),e(n.SL,{staticClass:"pb-4 px-6"},[e(g.A),e(i.A,{attrs:{color:"grey darken-1",text:"",disabled:t.loading},on:{click:t.closeDialog}},[t._v(" Cancel ")]),e(i.A,{attrs:{color:"#d2691e",disabled:!t.valid,loading:t.loading,dark:""},on:{click:t.handleSubmit}},[t._v(" "+t._s(t.editMode?"Save Changes":"Add Student")+" ")])],1)],1)],1),e(c.A,{attrs:{"max-width":"400"},model:{value:t.deleteDialog,callback:function(e){t.deleteDialog=e},expression:"deleteDialog"}},[e(a.A,[e(n.ri,{staticClass:"headline error--text"},[t._v(" Confirm Delete ")]),e(n.OQ,[t._v(" Are you sure you want to delete this student? "),e("div",{staticClass:"mt-2"},[e("strong",[t._v(" "+t._s(t.studentToDelete?.user?.lastName)+", "+t._s(t.studentToDelete?.user?.firstName)+" "+t._s(t.studentToDelete?.user?.middleName)+" ")])])]),e(n.SL,[e(g.A),e(i.A,{attrs:{color:"grey darken-1",text:""},on:{click:function(e){t.deleteDialog=!1}}},[t._v(" Cancel ")]),e(i.A,{attrs:{color:"error",loading:t.loading},on:{click:t.handleDelete}},[t._v(" Delete ")])],1)],1)],1),e(v.A,{attrs:{color:t.snackbarColor,timeout:3e3,top:""},scopedSlots:t._u([{key:"action",fn:function({attrs:s}){return[e(i.A,t._b({attrs:{text:""},on:{click:function(e){t.snackbar=!1}}},"v-btn",s,!1),[t._v("Close")])]}}]),model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v(" "+t._s(t.snackbarText)+" ")])],1)},C=[],$=s(5353),N={name:"StudentListView",data:()=>({valid:!1,dialog:!1,deleteDialog:!1,dateMenu:!1,options:{page:1,itemsPerPage:10,search:""},headers:[{text:"Student ID",value:"studentId"},{text:"Name",value:"user.fullName"},{text:"Course",value:"course"},{text:"Level",value:"level"},{text:"Section",value:"section"},{text:"Actions",value:"actions",sortable:!1,align:"end"}],form:{studentId:"",firstName:"",middleName:"",lastName:"",dateOfBirth:"",gender:"",phoneNo:"",course:null,level:null,section:"",parentName:"",parentNo:"",parentEmail:"",parentAddress:""},rules:{required:[t=>!!t||"This field is required"],email:[t=>!t||/.+@.+\..+/.test(t)||"Please enter a valid email"],phone:[t=>{if(!t)return!0;let e=t;return t.startsWith("0")&&(e="+63"+t.substring(1)),e.startsWith("+63")?/^\+63\d{10}$/.test(e)||"Phone number must have 10 digits after +63 (e.g., +639123456789)":"Please enter a valid phone number starting with 0 or +63"}]},editMode:!1,loading:!1,studentToDelete:null,snackbar:!1,snackbarColor:"",snackbarText:"",mask:"+63##########"}),computed:{...(0,$.aH)("students",["students","totalStudents"]),...(0,$.aH)("courses",["courses"]),isFormValid(){return this.valid&&this.form.studentId&&this.form.firstName&&this.form.lastName&&this.form.dateOfBirth&&this.form.gender&&this.form.course&&this.form.level&&this.form.section&&this.form.parentName&&this.form.parentNo&&this.form.parentEmail&&this.form.parentAddress}},methods:{...(0,$.i0)("students",["fetchStudents","createStudent","updateStudent","deleteStudent"]),...(0,$.i0)("courses",["fetchCourses"]),resetForm(){this.form={studentId:"",firstName:"",middleName:"",lastName:"",dateOfBirth:"",gender:"",phoneNo:"",course:null,level:null,section:"",parentName:"",parentNo:"",parentEmail:"",parentAddress:""},this.$refs.form&&this.$refs.form.resetValidation()},openCreateDialog(){this.editMode=!1,this.dialog=!0,this.resetForm()},closeDialog(){this.dialog=!1,this.$nextTick((()=>{this.resetForm()}))},editStudent(t){this.editMode=!0,this.form={_id:t._id,studentId:t.studentId,firstName:t.user.firstName,middleName:t.user.middleName,lastName:t.user.lastName,dateOfBirth:t.user.dateOfBirth,gender:t.user.gender,phoneNo:t.user.phoneNo,course:t.course._id,level:t.level,section:t.section,parentName:t.parentName,parentNo:t.parentNo,parentEmail:t.parentEmail,parentAddress:t.parentAddress},this.dialog=!0},confirmDelete(t){this.studentToDelete=t,this.deleteDialog=!0},async handleSubmit(){if(this.$refs.form.validate()){this.loading=!0;try{const t={...this.form};this.editMode?(await this.updateStudent({id:this.form._id,studentData:t}),this.showSnackbarMessage("Student updated successfully!","success")):(await this.createStudent(t),this.showSnackbarMessage("Student added successfully!","success")),this.closeDialog(),this.fetchStudents()}catch(t){console.log(t),this.showSnackbarMessage(t.response?.data?.message||"An error occurred!","error")}finally{this.loading=!1}}},async handleDelete(){this.loading=!0;try{await this.deleteStudent(this.studentToDelete._id),this.showSnackbarMessage("Student deleted successfully!","success"),this.fetchStudents()}catch(t){this.showSnackbarMessage(t.response?.data?.message||"Failed to delete student!","error")}finally{this.loading=!1,this.deleteDialog=!1}},showSnackbarMessage(t,e){this.snackbarText=t,this.snackbarColor=e,this.snackbar=!0},async handleSearch(){this.options.page=1,await this.fetchStudents()},async loadInitialData(){try{await Promise.all([this.fetchStudents(),this.fetchCourses()])}catch(t){this.showSnackbarMessage("Failed to load data","error")}}},created(){this.loadInitialData()},watch:{"form.parentNo":{handler(t){if(t){let e=t.replace(/[^\d]/g,"");this.form.parentNo="+63"+e.replace(/^63|^0/,"")}}},"form.phoneNo":{handler(t){if(t){let e=t.replace(/[^\d]/g,"");this.form.phoneNo="+63"+e.replace(/^63|^0/,"")}}}},rules:{phone:[t=>!t||/^\+63\d{10}$/.test(t)||"Please enter a valid phone number"]}},_=N,B=s(1656),T=(0,B.A)(_,x,C,!1,null,"6649e6b0",null),D=T.exports},9991:function(t,e,s){s.d(e,{A:function(){return f}});var i=s(4596),a=s(5030),n=s(2031),o=s(7631),r=s(5949),l=s(7198),d=s(5648),c=s(4598),u=s(5803),h=s(6988),m=s(4152);const p=(0,u.A)(n.A,o.A,r.A,l.A,d.A,a.A);var f=p.extend({name:"v-dialog",directives:{ClickOutside:c.A},props:{dark:Boolean,disabled:Boolean,fullscreen:Boolean,light:Boolean,maxWidth:[String,Number],noClickAnimation:Boolean,origin:{type:String,default:"center center"},persistent:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"},width:[String,Number]},data(){return{activatedBy:null,animate:!1,animateTimeout:-1,stackMinZIndex:200,previousActiveElement:null}},computed:{classes(){return{[`v-dialog ${this.contentClass}`.trim()]:!0,"v-dialog--active":this.isActive,"v-dialog--persistent":this.persistent,"v-dialog--fullscreen":this.fullscreen,"v-dialog--scrollable":this.scrollable,"v-dialog--animated":this.animate}},contentClasses(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive(t){var e;t?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind(),null===(e=this.previousActiveElement)||void 0===e||e.focus())},fullscreen(t){this.isActive&&(t?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},created(){this.$attrs.hasOwnProperty("full-width")&&(0,h.rq)("full-width",this)},beforeMount(){this.$nextTick((()=>{this.isBooted=this.isActive,this.isActive&&this.show()}))},beforeDestroy(){"undefined"!==typeof window&&this.unbind()},methods:{animateClick(){this.animate=!1,this.$nextTick((()=>{this.animate=!0,window.clearTimeout(this.animateTimeout),this.animateTimeout=window.setTimeout((()=>this.animate=!1),150)}))},closeConditional(t){const e=t.target;return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(e)||this.overlay&&e&&!this.overlay.$el.contains(e))&&this.activeZIndex>=this.getMaxZIndex()},hideScroll(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):r.A.options.methods.hideScroll.call(this)},show(){!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$nextTick((()=>{this.$nextTick((()=>{var t,e;(null===(t=this.$refs.dialog)||void 0===t?void 0:t.contains(document.activeElement))||(this.previousActiveElement=document.activeElement,null===(e=this.$refs.dialog)||void 0===e||e.focus()),this.bind()}))}))},bind(){window.addEventListener("focusin",this.onFocusin)},unbind(){window.removeEventListener("focusin",this.onFocusin)},onClickOutside(t){this.$emit("click:outside",t),this.persistent?this.noClickAnimation||this.animateClick():this.isActive=!1},onKeydown(t){if(t.keyCode===m.uP.esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;const t=this.getActivator();this.$nextTick((()=>t&&t.focus()))}this.$emit("keydown",t)},onFocusin(t){if(!t||!this.retainFocus)return;const e=t.target;if(e&&this.$refs.dialog&&![document,this.$refs.dialog].includes(e)&&!this.$refs.dialog.contains(e)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some((t=>t.contains(e)))){const t=this.$refs.dialog.querySelectorAll('button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'),e=[...t].find((t=>!t.hasAttribute("disabled")&&!t.matches('[tabindex="-1"]')));e&&e.focus()}},genContent(){return this.showLazyContent((()=>[this.$createElement(i.A,{props:{root:!0,light:this.light,dark:this.dark}},[this.$createElement("div",{class:this.contentClasses,attrs:{role:"dialog","aria-modal":this.hideOverlay?void 0:"true",...this.getScopeIdAttrs()},on:{keydown:this.onKeydown},style:{zIndex:this.activeZIndex},ref:"content"},[this.genTransition()])])]))},genTransition(){const t=this.genInnerContent();return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,appear:!0}},[t]):t},genInnerContent(){const t={class:this.classes,attrs:{tabindex:this.isActive?0:void 0},ref:"dialog",directives:[{name:"click-outside",value:{handler:this.onClickOutside,closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],style:{transformOrigin:this.origin}};return this.fullscreen||(t.style={...t.style,maxWidth:(0,m.Dg)(this.maxWidth),width:(0,m.Dg)(this.width)}),this.$createElement("div",t,this.getContentSlot())}},render(t){return t("div",{staticClass:"v-dialog__container",class:{"v-dialog__container--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},[this.genActivator(),this.genContent()])}})},174:function(t,e,s){s(4114);var i=s(5803),a=s(7717),n=s(7540),o=s(4152);e.A=(0,i.A)(a.A,(0,n.G)("form")).extend({name:"v-form",provide(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:()=>({inputs:[],watchers:[],errorBag:{}}),watch:{errorBag:{handler(t){const e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput(t){const e=t=>t.$watch("hasError",(e=>{this.$set(this.errorBag,t._uid,e)}),{immediate:!0}),s={_uid:t._uid,valid:()=>{},shouldValidate:()=>{}};return this.lazyValidation?s.shouldValidate=t.$watch("shouldValidate",(i=>{i&&(this.errorBag.hasOwnProperty(t._uid)||(s.valid=e(t)))})):s.valid=e(t),s},validate(){return 0===this.inputs.filter((t=>!t.validate(!0))).length},reset(){this.inputs.forEach((t=>t.reset())),this.resetErrorBag()},resetErrorBag(){this.lazyValidation&&setTimeout((()=>{this.errorBag={}}),0)},resetValidation(){this.inputs.forEach((t=>t.resetValidation())),this.resetErrorBag()},register(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister(t){const e=this.inputs.find((e=>e._uid===t._uid));if(!e)return;const s=this.watchers.find((t=>t._uid===e._uid));s&&(s.valid(),s.shouldValidate()),this.watchers=this.watchers.filter((t=>t._uid!==e._uid)),this.inputs=this.inputs.filter((t=>t._uid!==e._uid)),this.$delete(this.errorBag,e._uid)}},render(t){return t("form",{staticClass:"v-form",attrs:{novalidate:!0,...this.attrs$},on:{submit:t=>this.$emit("submit",t)}},(0,o.$c)(this))}})},4414:function(t,e,s){s(4114),s(125);var i=s(5471),a=s(8041),n=s(4152);const o=["sm","md","lg","xl"],r=(()=>o.reduce(((t,e)=>(t[e]={type:[Boolean,String,Number],default:!1},t)),{}))(),l=(()=>o.reduce(((t,e)=>(t["offset"+(0,n.Zb)(e)]={type:[String,Number],default:null},t)),{}))(),d=(()=>o.reduce(((t,e)=>(t["order"+(0,n.Zb)(e)]={type:[String,Number],default:null},t)),{}))(),c={col:Object.keys(r),offset:Object.keys(l),order:Object.keys(d)};function u(t,e,s){let i=t;if(null!=s&&!1!==s){if(e){const s=e.replace(t,"");i+=`-${s}`}return"col"!==t||""!==s&&!0!==s?(i+=`-${s}`,i.toLowerCase()):i.toLowerCase()}}const h=new Map;e.A=i.Ay.extend({name:"v-col",functional:!0,props:{cols:{type:[Boolean,String,Number],default:!1},...r,offset:{type:[String,Number],default:null},...l,order:{type:[String,Number],default:null},...d,alignSelf:{type:String,default:null,validator:t=>["auto","start","end","center","baseline","stretch"].includes(t)},tag:{type:String,default:"div"}},render(t,{props:e,data:s,children:i,parent:n}){let o="";for(const a in e)o+=String(e[a]);let r=h.get(o);if(!r){let t;for(t in r=[],c)c[t].forEach((s=>{const i=e[s],a=u(t,s,i);a&&r.push(a)}));const s=r.some((t=>t.startsWith("col-")));r.push({col:!s||!e.cols,[`col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),h.set(o,r)}return t(e.tag,(0,a.Ay)(s,{class:r}),i)}})},2756:function(t,e,s){s(4114),s(125);var i=s(5471),a=s(8041),n=s(4152);const o=["sm","md","lg","xl"],r=["start","end","center"];function l(t,e){return o.reduce(((s,i)=>(s[t+(0,n.Zb)(i)]=e(),s)),{})}const d=t=>[...r,"baseline","stretch"].includes(t),c=l("align",(()=>({type:String,default:null,validator:d}))),u=t=>[...r,"space-between","space-around"].includes(t),h=l("justify",(()=>({type:String,default:null,validator:u}))),m=t=>[...r,"space-between","space-around","stretch"].includes(t),p=l("alignContent",(()=>({type:String,default:null,validator:m}))),f={align:Object.keys(c),justify:Object.keys(h),alignContent:Object.keys(p)},v={align:"align",justify:"justify",alignContent:"align-content"};function g(t,e,s){let i=v[t];if(null!=s){if(e){const s=e.replace(t,"");i+=`-${s}`}return i+=`-${s}`,i.toLowerCase()}}const y=new Map;e.A=i.Ay.extend({name:"v-row",functional:!0,props:{tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:d},...c,justify:{type:String,default:null,validator:u},...h,alignContent:{type:String,default:null,validator:m},...p},render(t,{props:e,data:s,children:i}){let n="";for(const a in e)n+=String(e[a]);let o=y.get(n);if(!o){let t;for(t in o=[],f)f[t].forEach((s=>{const i=e[s],a=g(t,s,i);a&&o.push(a)}));o.push({"no-gutters":e.noGutters,"row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),y.set(n,o)}return t(e.tag,(0,a.Ay)(s,{staticClass:"row",class:o}),i)}})},8907:function(t,e,s){s.d(e,{A:function(){return l}});s(4114);var i=s(8743),a=s(3381),n=s(428),o=s(5803),r=s(4152),l=(0,o.A)(i.A,a.A,n.A).extend({name:"v-overlay",props:{absolute:Boolean,color:{type:String,default:"#212121"},dark:{type:Boolean,default:!0},opacity:{type:[Number,String],default:.46},value:{default:!0},zIndex:{type:[Number,String],default:5}},computed:{__scrim(){const t=this.setBackgroundColor(this.color,{staticClass:"v-overlay__scrim",style:{opacity:this.computedOpacity}});return this.$createElement("div",t)},classes(){return{"v-overlay--absolute":this.absolute,"v-overlay--active":this.isActive,...this.themeClasses}},computedOpacity(){return Number(this.isActive?this.opacity:0)},styles(){return{zIndex:this.zIndex}}},methods:{genContent(){return this.$createElement("div",{staticClass:"v-overlay__content"},(0,r.$c)(this))}},render(t){const e=[this.__scrim];return this.isActive&&e.push(this.genContent()),t("div",{staticClass:"v-overlay",on:this.$listeners,class:this.classes,style:this.styles},e)}})},7150:function(t,e,s){s.d(e,{A:function(){return u}});var i=s(8184),a=s(8743),n=s(3381),o=s(428),r=s(6763),l=s(5803),d=s(4152),c=s(6988),u=(0,l.A)(i.A,a.A,o.A,(0,r.P)(["absolute","bottom","left","right","top"])).extend({name:"v-snackbar",props:{app:Boolean,centered:Boolean,contentClass:{type:String,default:""},multiLine:Boolean,text:Boolean,timeout:{type:[Number,String],default:5e3},transition:{type:[Boolean,String],default:"v-snack-transition",validator:t=>"string"===typeof t||!1===t},vertical:Boolean},data:()=>({activeTimeout:-1}),computed:{classes(){return{"v-snack--absolute":this.absolute,"v-snack--active":this.isActive,"v-snack--bottom":this.bottom||!this.top,"v-snack--centered":this.centered,"v-snack--has-background":this.hasBackground,"v-snack--left":this.left,"v-snack--multi-line":this.multiLine&&!this.vertical,"v-snack--right":this.right,"v-snack--text":this.text,"v-snack--top":this.top,"v-snack--vertical":this.vertical}},hasBackground(){return!this.text&&!this.outlined},isDark(){return this.hasBackground?!this.light:n.A.options.computed.isDark.call(this)},styles(){if(this.absolute||!this.app)return{};const{bar:t,bottom:e,footer:s,insetFooter:i,left:a,right:n,top:o}=this.$vuetify.application;return{paddingBottom:(0,d.Dg)(e+s+i),paddingLeft:(0,d.Dg)(a),paddingRight:(0,d.Dg)(n),paddingTop:(0,d.Dg)(t+o)}}},watch:{isActive:"setTimeout",timeout:"setTimeout"},mounted(){this.isActive&&this.setTimeout()},created(){this.$attrs.hasOwnProperty("auto-height")&&(0,c.rq)("auto-height",this),0==this.timeout&&(0,c.CI)('timeout="0"',"-1",this)},methods:{genActions(){return this.$createElement("div",{staticClass:"v-snack__action "},[(0,d.$c)(this,"action",{attrs:{class:"v-snack__btn"}})])},genContent(){return this.$createElement("div",{staticClass:"v-snack__content",class:{[this.contentClass]:!0},attrs:{role:"status","aria-live":"polite"}},[(0,d.$c)(this)])},genWrapper(){const t=this.hasBackground?this.setBackgroundColor:this.setTextColor,e=t(this.color,{staticClass:"v-snack__wrapper",class:i.A.options.computed.classes.call(this),style:i.A.options.computed.styles.call(this),directives:[{name:"show",value:this.isActive}],on:{pointerenter:()=>window.clearTimeout(this.activeTimeout),pointerleave:this.setTimeout}});return this.$createElement("div",e,[this.genContent(),this.genActions()])},genTransition(){return this.$createElement("transition",{props:{name:this.transition}},[this.genWrapper()])},setTimeout(){window.clearTimeout(this.activeTimeout);const t=Number(this.timeout);this.isActive&&![0,-1].includes(t)&&(this.activeTimeout=window.setTimeout((()=>{this.isActive=!1}),t))}},render(t){return t("div",{staticClass:"v-snack",class:this.classes,style:this.styles},[!1!==this.transition?this.genTransition():this.genWrapper()])}})},7270:function(t,e,s){s.d(e,{A:function(){return u}});var i=s(5030),a=s(8743),n=s(7391),o=s(2031),r=s(9975),l=s(4152),d=s(6988),c=s(5803),u=(0,c.A)(a.A,n.A,o.A,r.A).extend({name:"v-tooltip",props:{closeDelay:{type:[Number,String],default:0},disabled:Boolean,openDelay:{type:[Number,String],default:0},openOnHover:{type:Boolean,default:!0},openOnFocus:{type:Boolean,default:!0},tag:{type:String,default:"span"},transition:String},data:()=>({calculatedMinWidth:0,closeDependents:!1}),computed:{calculatedLeft(){const{activator:t,content:e}=this.dimensions,s=!this.bottom&&!this.left&&!this.top&&!this.right,i=!1!==this.attach?t.offsetLeft:t.left;let a=0;return this.top||this.bottom||s?a=i+t.width/2-e.width/2:(this.left||this.right)&&(a=i+(this.right?t.width:-e.width)+(this.right?10:-10)),this.nudgeLeft&&(a-=parseInt(this.nudgeLeft)),this.nudgeRight&&(a+=parseInt(this.nudgeRight)),`${this.calcXOverflow(a,this.dimensions.content.width)}px`},calculatedTop(){const{activator:t,content:e}=this.dimensions,s=!1!==this.attach?t.offsetTop:t.top;let i=0;return this.top||this.bottom?i=s+(this.bottom?t.height:-e.height)+(this.bottom?10:-10):(this.left||this.right)&&(i=s+t.height/2-e.height/2),this.nudgeTop&&(i-=parseInt(this.nudgeTop)),this.nudgeBottom&&(i+=parseInt(this.nudgeBottom)),!1===this.attach&&(i+=this.pageYOffset),`${this.calcYOverflow(i)}px`},classes(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left,"v-tooltip--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},computedTransition(){return this.transition?this.transition:this.isActive?"scale-transition":"fade-transition"},offsetY(){return this.top||this.bottom},offsetX(){return this.left||this.right},styles(){return{left:this.calculatedLeft,maxWidth:(0,l.Dg)(this.maxWidth),minWidth:(0,l.Dg)(this.minWidth),top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount(){this.$nextTick((()=>{this.value&&this.callActivate()}))},mounted(){"v-slot"===(0,l.fo)(this,"activator",!0)&&(0,d.yA)("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},deactivate(){this.runDelay("close")},genActivatorListeners(){const t=i.A.options.methods.genActivatorListeners.call(this);return this.openOnFocus&&(t.focus=t=>{this.getActivator(t),this.runDelay("open")},t.blur=t=>{this.getActivator(t),this.runDelay("close")}),t.keydown=t=>{t.keyCode===l.uP.esc&&(this.getActivator(t),this.runDelay("close"))},t},genActivatorAttributes(){return{"aria-haspopup":!0,"aria-expanded":String(this.isActive)}},genTransition(){const t=this.genContent();return this.computedTransition?this.$createElement("transition",{props:{name:this.computedTransition}},[t]):t},genContent(){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:{[this.contentClass]:!0,menuable__content__active:this.isActive,"v-tooltip__content--fixed":this.activatorFixed},style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.getContentSlot())}},render(t){return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[this.showLazyContent((()=>[this.genTransition()])),this.genActivator()])}})},5949:function(t,e,s){s.d(e,{A:function(){return r}});var i=s(8907),a=i.A,n=s(4152),o=s(5471),r=o.Ay.extend().extend({name:"overlayable",props:{hideOverlay:Boolean,overlayColor:String,overlayOpacity:[Number,String]},data(){return{animationFrame:0,overlay:null}},watch:{hideOverlay(t){this.isActive&&(t?this.removeOverlay():this.genOverlay())}},beforeDestroy(){this.removeOverlay()},methods:{createOverlay(){const t=new a({propsData:{absolute:this.absolute,value:!1,color:this.overlayColor,opacity:this.overlayOpacity}});t.$mount();const e=this.absolute?this.$el.parentNode:document.querySelector("[data-app]");e&&e.insertBefore(t.$el,e.firstChild),this.overlay=t},genOverlay(){if(this.hideScroll(),!this.hideOverlay)return this.overlay||this.createOverlay(),this.animationFrame=requestAnimationFrame((()=>{this.overlay&&(void 0!==this.activeZIndex?this.overlay.zIndex=String(this.activeZIndex-1):this.$el&&(this.overlay.zIndex=(0,n.fl)(this.$el)),this.overlay.value=!0)})),!0},removeOverlay(t=!0){this.overlay&&((0,n.d7)(this.overlay.$el,"transitionend",(()=>{this.overlay&&this.overlay.$el&&this.overlay.$el.parentNode&&!this.overlay.value&&!this.isActive&&(this.overlay.$el.parentNode.removeChild(this.overlay.$el),this.overlay.$destroy(),this.overlay=null)})),cancelAnimationFrame(this.animationFrame),this.overlay.value=!1),t&&this.showScroll()},scrollListener(t){if("key"in t){if(["INPUT","TEXTAREA","SELECT"].includes(t.target.tagName)||t.target.isContentEditable)return;const e=[n.uP.up,n.uP.pageup],s=[n.uP.down,n.uP.pagedown];if(e.includes(t.keyCode))t.deltaY=-1;else{if(!s.includes(t.keyCode))return;t.deltaY=1}}(t.target===this.overlay||"keydown"!==t.type&&t.target===document.body||this.checkPath(t))&&t.preventDefault()},hasScrollbar(t){if(!t||t.nodeType!==Node.ELEMENT_NODE)return!1;const e=window.getComputedStyle(t);return(["auto","scroll"].includes(e.overflowY)||"SELECT"===t.tagName)&&t.scrollHeight>t.clientHeight||["auto","scroll"].includes(e.overflowX)&&t.scrollWidth>t.clientWidth},shouldScroll(t,e){if(t.hasAttribute("data-app"))return!1;const s=e.shiftKey||e.deltaX?"x":"y",i="y"===s?e.deltaY:e.deltaX||e.deltaY;let a,n;"y"===s?(a=0===t.scrollTop,n=t.scrollTop+t.clientHeight===t.scrollHeight):(a=0===t.scrollLeft,n=t.scrollLeft+t.clientWidth===t.scrollWidth);const o=i<0,r=i>0;return!(a||!o)||(!(n||!r)||!(!a&&!n||!t.parentNode)&&this.shouldScroll(t.parentNode,e))},isInside(t,e){return t===e||null!==t&&t!==document.body&&this.isInside(t.parentNode,e)},checkPath(t){const e=(0,n.K9)(t);if("keydown"===t.type&&e[0]===document.body){const e=this.$refs.dialog,s=window.getSelection().anchorNode;return!(e&&this.hasScrollbar(e)&&this.isInside(s,e))||!this.shouldScroll(e,t)}for(let s=0;s<e.length;s++){const i=e[s];if(i===document)return!0;if(i===document.documentElement)return!0;if(i===this.$refs.content)return!0;if(this.hasScrollbar(i))return!this.shouldScroll(i,t)}return!0},hideScroll(){this.$vuetify.breakpoint.smAndDown?document.documentElement.classList.add("overflow-y-hidden"):((0,n.P4)(window,"wheel",this.scrollListener,{passive:!1}),window.addEventListener("keydown",this.scrollListener))},showScroll(){document.documentElement.classList.remove("overflow-y-hidden"),window.removeEventListener("wheel",this.scrollListener),window.removeEventListener("keydown",this.scrollListener)}}})}}]);
//# sourceMappingURL=848.ea9e0757.js.map