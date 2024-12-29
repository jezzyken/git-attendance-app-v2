"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[84],{4466:function(t,e,s){s.r(e),s.d(e,{default:function(){return T}});var a=s(3740),i=s(3698),n=s(2938),o=s(4414),r=s(3449),l=s(6814),d=s(1446),u=s(9991),c=s(174),h=s(6930),m=s(6237),p=s(2756),f=s(5834),g=s(7150),v=s(1034),b=s(3302),A=s(7112),y=s(5803);const k=(0,y.A)(A.A);var w=k.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:t=>!isNaN(parseFloat(t))},rows:{type:[Number,String],default:5,validator:t=>!isNaN(parseInt(t,10))}},computed:{classes(){return{"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle,...A.A.options.computed.classes.call(this)}},noResizeHandle(){return this.noResize||this.autoGrow}},watch:{autoGrow(t){this.$nextTick((()=>{var e;t?this.calculateInputHeight():null===(e=this.$refs.input)||void 0===e||e.style.removeProperty("height")}))},lazyValue(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted(){setTimeout((()=>{this.autoGrow&&this.calculateInputHeight()}),0)},methods:{calculateInputHeight(){const t=this.$refs.input;if(!t)return;t.style.height="0";const e=t.scrollHeight,s=parseInt(this.rows,10)*parseFloat(this.rowHeight);t.style.height=Math.max(s,e)+"px"},genInput(){const t=A.A.options.methods.genInput.call(this);return t.tag="textarea",delete t.data.attrs.type,t.data.attrs.rows=this.rows,t},onInput(t){A.A.options.methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.$emit("keydown",t)}}}),x=s(7270),S=function(){var t=this,e=t._self._c;return e(r.A,{attrs:{fluid:""}},[e(i.A,{staticClass:"my-4",attrs:{elevation:"2"}},[e(n.ri,{staticClass:"d-flex align-center py-4"},[e(h.A,{staticClass:"mr-3",attrs:{large:"",color:"#d2691e"}},[t._v("mdi-account-school")]),e("span",{staticClass:"text-h5"},[t._v("Student Management")]),e(v.A),e(A.A,{staticClass:"mr-4",staticStyle:{"max-width":"300px"},attrs:{"prepend-inner-icon":"mdi-magnify",label:"Search students...","single-line":"","hide-details":"",outlined:"",dense:""},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleSearch.apply(null,arguments)}},model:{value:t.options.search,callback:function(e){t.$set(t.options,"search",e)},expression:"options.search"}}),e(a.A,{staticClass:"px-5 rounded",attrs:{color:"#d2691e",dark:""},on:{click:t.openCreateDialog}},[e(h.A,{attrs:{left:""}},[t._v("mdi-plus")]),t._v(" Add Student ")],1)],1),e(l.A,{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.students,loading:t.loading,options:t.options,"server-items-length":t.totalStudents,"footer-props":{"items-per-page-options":[5,10,25,50],showFirstLastPage:!0}},on:{"update:options":function(e){t.options=e}},scopedSlots:t._u([{key:"item.user.fullName",fn:function({item:e}){return[t._v(" "+t._s(`${e.user.lastName}, ${e.user.firstName} ${e.user.middleName||""}`)+" ")]}},{key:"item.course",fn:function({item:e}){return[t._v(" "+t._s(e.course.courseName)+" ")]}},{key:"item.actions",fn:function({item:s}){return[e(x.A,{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function({on:i,attrs:n}){return[e(a.A,t._g(t._b({staticClass:"mr-1",attrs:{icon:"",small:"",color:"primary"},on:{click:function(e){return t.editStudent(s)}}},"v-btn",n,!1),i),[e(h.A,{attrs:{small:""}},[t._v("mdi-pencil")])],1)]}}],null,!0)},[e("span",[t._v("Edit Student")])]),e(x.A,{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function({on:i,attrs:n}){return[e(a.A,t._g(t._b({attrs:{icon:"",small:"",color:"error"},on:{click:function(e){return t.confirmDelete(s)}}},"v-btn",n,!1),i),[e(h.A,{attrs:{small:""}},[t._v("mdi-delete")])],1)]}}],null,!0)},[e("span",[t._v("Delete Student")])])]}}])})],1),e(u.A,{attrs:{"max-width":"800px",persistent:""},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[e(i.A,[e(n.ri,{staticClass:"headline white--text d-flex align-center",staticStyle:{"background-color":"#a52a2a"}},[t._v(" "+t._s(t.editMode?"Edit Student":"Add New Student")+" ")]),e(n.OQ,{staticClass:"pt-4"},[e(c.A,{ref:"form",attrs:{"lazy-validation":""},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[e(p.A,[e(o.A,{attrs:{cols:"12",sm:"12",md:"4"}},[e(A.A,{attrs:{rules:t.rules.required,label:"Student ID",required:"",outlined:"",dense:""},model:{value:t.form.studentId,callback:function(e){t.$set(t.form,"studentId",e)},expression:"form.studentId"}})],1)],1),e(b.A,{staticClass:"pl-0"},[t._v("Personal Information")]),e(p.A,[e(o.A,{attrs:{cols:"12",sm:"12",md:"4"}},[e(A.A,{attrs:{rules:t.rules.required,label:"Last Name",required:"",outlined:"",dense:""},model:{value:t.form.lastName,callback:function(e){t.$set(t.form,"lastName",e)},expression:"form.lastName"}})],1),e(o.A,{attrs:{cols:"12",sm:"12",md:"4"}},[e(A.A,{attrs:{rules:t.rules.required,label:"First Name",required:"",outlined:"",dense:""},model:{value:t.form.firstName,callback:function(e){t.$set(t.form,"firstName",e)},expression:"form.firstName"}})],1),e(o.A,{attrs:{cols:"12",sm:"12",md:"4"}},[e(A.A,{attrs:{label:"Middle Name",outlined:"",dense:""},model:{value:t.form.middleName,callback:function(e){t.$set(t.form,"middleName",e)},expression:"form.middleName"}})],1)],1),e(p.A,[e(o.A,{attrs:{cols:"12",sm:"12",md:"4"}},[e(m.A,{ref:"dateMenu",attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":"","min-width":"auto"},scopedSlots:t._u([{key:"activator",fn:function({on:s,attrs:a}){return[e(A.A,t._g(t._b({attrs:{label:"Date of Birth",readonly:"",rules:t.rules.required,outlined:"",dense:""},model:{value:t.form.dateOfBirth,callback:function(e){t.$set(t.form,"dateOfBirth",e)},expression:"form.dateOfBirth"}},"v-text-field",a,!1),s))]}}]),model:{value:t.dateMenu,callback:function(e){t.dateMenu=e},expression:"dateMenu"}},[e(d.A,{on:{input:function(e){t.dateMenu=!1}},model:{value:t.form.dateOfBirth,callback:function(e){t.$set(t.form,"dateOfBirth",e)},expression:"form.dateOfBirth"}})],1)],1),e(o.A,{attrs:{cols:"12",sm:"12",md:"4"}},[e(f.A,{attrs:{items:["Male","Female"],label:"Gender",rules:t.rules.required,outlined:"",dense:""},model:{value:t.form.gender,callback:function(e){t.$set(t.form,"gender",e)},expression:"form.gender"}})],1),e(o.A,{attrs:{cols:"12",sm:"4"}},[e(A.A,{attrs:{label:"Phone Number",rules:t.rules.phone,outlined:"",dense:""},model:{value:t.form.phoneNo,callback:function(e){t.$set(t.form,"phoneNo",e)},expression:"form.phoneNo"}})],1)],1),e(b.A,{staticClass:"pl-0"},[t._v("Academic Information")]),e(p.A,[e(o.A,{attrs:{cols:"12",sm:"12",md:"4"}},[e(f.A,{attrs:{items:t.courses,"item-text":"courseName","item-value":"_id",label:"Course",rules:t.rules.required,outlined:"",dense:""},model:{value:t.form.course,callback:function(e){t.$set(t.form,"course",e)},expression:"form.course"}})],1),e(o.A,{attrs:{cols:"12",sm:"12",md:"4"}},[e(f.A,{attrs:{items:[1,2,3,4],label:"Level",rules:t.rules.required,outlined:"",dense:""},model:{value:t.form.level,callback:function(e){t.$set(t.form,"level",e)},expression:"form.level"}})],1),e(o.A,{attrs:{cols:"12",sm:"4"}},[e(A.A,{attrs:{label:"Section",rules:t.rules.required,outlined:"",dense:""},model:{value:t.form.section,callback:function(e){t.$set(t.form,"section",e)},expression:"form.section"}})],1)],1),e(b.A,{staticClass:"pl-0"},[t._v("Parent/Guardian Information")]),e(p.A,[e(o.A,{attrs:{cols:"12",sm:"12",md:"4"}},[e(A.A,{attrs:{label:"Parent/Gurdian Name",rules:t.rules.required,outlined:"",dense:""},model:{value:t.form.parentName,callback:function(e){t.$set(t.form,"parentName",e)},expression:"form.parentName"}})],1),e(o.A,{attrs:{cols:"12",sm:"12",md:"4"}},[e(A.A,{attrs:{label:"Parent/Gurdian Contact Number",rules:t.rules.phone,outlined:"",dense:""},model:{value:t.form.parentNo,callback:function(e){t.$set(t.form,"parentNo",e)},expression:"form.parentNo"}})],1),e(o.A,{attrs:{cols:"12",sm:"12",md:"4"}},[e(A.A,{attrs:{label:"Parent/Gurdian Email",rules:t.rules.email,outlined:"",dense:""},model:{value:t.form.parentEmail,callback:function(e){t.$set(t.form,"parentEmail",e)},expression:"form.parentEmail"}})],1),e(o.A,{attrs:{cols:"12"}},[e(w,{attrs:{label:"Parent/Gurdian Address",rules:t.rules.required,outlined:"",dense:"",rows:"2"},model:{value:t.form.parentAddress,callback:function(e){t.$set(t.form,"parentAddress",e)},expression:"form.parentAddress"}})],1)],1)],1)],1),e(n.SL,{staticClass:"pb-4 px-6"},[e(v.A),e(a.A,{attrs:{color:"grey darken-1",text:"",disabled:t.loading},on:{click:t.closeDialog}},[t._v(" Cancel ")]),e(a.A,{attrs:{color:"#d2691e",disabled:!t.valid,loading:t.loading,dark:""},on:{click:t.handleSubmit}},[t._v(" "+t._s(t.editMode?"Save Changes":"Add Student")+" ")])],1)],1)],1),e(u.A,{attrs:{"max-width":"400"},model:{value:t.deleteDialog,callback:function(e){t.deleteDialog=e},expression:"deleteDialog"}},[e(i.A,[e(n.ri,{staticClass:"headline error--text"},[t._v(" Confirm Delete ")]),e(n.OQ,[t._v(" Are you sure you want to delete this student? "),e("div",{staticClass:"mt-2"},[e("strong",[t._v(" "+t._s(t.studentToDelete?.user?.lastName)+", "+t._s(t.studentToDelete?.user?.firstName)+" "+t._s(t.studentToDelete?.user?.middleName)+" ")])])]),e(n.SL,[e(v.A),e(a.A,{attrs:{color:"grey darken-1",text:""},on:{click:function(e){t.deleteDialog=!1}}},[t._v(" Cancel ")]),e(a.A,{attrs:{color:"error",loading:t.loading},on:{click:t.handleDelete}},[t._v(" Delete ")])],1)],1)],1),e(g.A,{attrs:{color:t.snackbarColor,timeout:3e3,top:""},scopedSlots:t._u([{key:"action",fn:function({attrs:s}){return[e(a.A,t._b({attrs:{text:""},on:{click:function(e){t.snackbar=!1}}},"v-btn",s,!1),[t._v("Close")])]}}]),model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v(" "+t._s(t.snackbarText)+" ")])],1)},_=[],N=s(5353),C={name:"StudentListView",data:()=>({valid:!1,dialog:!1,deleteDialog:!1,dateMenu:!1,options:{page:1,itemsPerPage:10,search:""},headers:[{text:"Student ID",value:"studentId"},{text:"Name",value:"user.fullName"},{text:"Course",value:"course"},{text:"Level",value:"level"},{text:"Section",value:"section"},{text:"Actions",value:"actions",sortable:!1,align:"end"}],form:{studentId:"",firstName:"",middleName:"",lastName:"",dateOfBirth:"",gender:"",phoneNo:"",course:null,level:null,section:"",parentName:"",parentNo:"",parentEmail:"",parentAddress:""},rules:{required:[t=>!!t||"This field is required"],email:[t=>!t||/.+@.+\..+/.test(t)||"Please enter a valid email"],phone:[t=>!t||(t.startsWith("0")?/^0\d{10}$/.test(t)||"Phone number starting with 0 must be 11 digits (e.g., 09123456789)":t.startsWith("+63")?/^\+63\d{10}$/.test(t)||"Phone number starting with +63 must be followed by 10 digits (e.g., +639123456789)":"Please enter a valid phone number (09123456789 or +639123456789)")]},editMode:!1,loading:!1,studentToDelete:null,snackbar:!1,snackbarColor:"",snackbarText:""}),computed:{...(0,N.aH)("students",["students","totalStudents"]),...(0,N.aH)("courses",["courses"]),isFormValid(){return this.valid&&this.form.studentId&&this.form.firstName&&this.form.lastName&&this.form.dateOfBirth&&this.form.gender&&this.form.course&&this.form.level&&this.form.section&&this.form.parentName&&this.form.parentNo&&this.form.parentEmail&&this.form.parentAddress}},methods:{...(0,N.i0)("students",["fetchStudents","createStudent","updateStudent","deleteStudent"]),...(0,N.i0)("courses",["fetchCourses"]),resetForm(){this.form={studentId:"",firstName:"",middleName:"",lastName:"",dateOfBirth:"",gender:"",phoneNo:"",course:null,level:null,section:"",parentName:"",parentNo:"",parentEmail:"",parentAddress:""},this.$refs.form&&this.$refs.form.resetValidation()},openCreateDialog(){this.editMode=!1,this.dialog=!0,this.resetForm()},closeDialog(){this.dialog=!1,this.$nextTick((()=>{this.resetForm()}))},editStudent(t){this.editMode=!0,this.form={_id:t._id,studentId:t.studentId,firstName:t.user.firstName,middleName:t.user.middleName,lastName:t.user.lastName,dateOfBirth:t.user.dateOfBirth,gender:t.user.gender,phoneNo:t.user.phoneNo,course:t.course._id,level:t.level,section:t.section,parentName:t.parentName,parentNo:t.parentNo,parentEmail:t.parentEmail,parentAddress:t.parentAddress},this.dialog=!0},confirmDelete(t){this.studentToDelete=t,this.deleteDialog=!0},async handleSubmit(){if(this.$refs.form.validate()){this.loading=!0;try{const t={...this.form};this.editMode?(await this.updateStudent({id:this.form._id,studentData:t}),this.showSnackbarMessage("Student updated successfully!","success")):(await this.createStudent(t),this.showSnackbarMessage("Student added successfully!","success")),this.closeDialog(),this.fetchStudents()}catch(t){console.log(t),this.showSnackbarMessage(t.response?.data?.message||"An error occurred!","error")}finally{this.loading=!1}}},async handleDelete(){this.loading=!0;try{await this.deleteStudent(this.studentToDelete._id),this.showSnackbarMessage("Student deleted successfully!","success"),this.fetchStudents()}catch(t){this.showSnackbarMessage(t.response?.data?.message||"Failed to delete student!","error")}finally{this.loading=!1,this.deleteDialog=!1}},showSnackbarMessage(t,e){this.snackbarText=t,this.snackbarColor=e,this.snackbar=!0},async handleSearch(){this.options.page=1,await this.fetchStudents()},async loadInitialData(){try{await Promise.all([this.fetchStudents(),this.fetchCourses()])}catch(t){this.showSnackbarMessage("Failed to load data","error")}}},created(){this.loadInitialData()}},$=C,B=s(1656),D=(0,B.A)($,S,_,!1,null,"d67ec410",null),T=D.exports},174:function(t,e,s){s(4114);var a=s(5803),i=s(7717),n=s(7540),o=s(4152);e.A=(0,a.A)(i.A,(0,n.G)("form")).extend({name:"v-form",provide(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:()=>({inputs:[],watchers:[],errorBag:{}}),watch:{errorBag:{handler(t){const e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput(t){const e=t=>t.$watch("hasError",(e=>{this.$set(this.errorBag,t._uid,e)}),{immediate:!0}),s={_uid:t._uid,valid:()=>{},shouldValidate:()=>{}};return this.lazyValidation?s.shouldValidate=t.$watch("shouldValidate",(a=>{a&&(this.errorBag.hasOwnProperty(t._uid)||(s.valid=e(t)))})):s.valid=e(t),s},validate(){return 0===this.inputs.filter((t=>!t.validate(!0))).length},reset(){this.inputs.forEach((t=>t.reset())),this.resetErrorBag()},resetErrorBag(){this.lazyValidation&&setTimeout((()=>{this.errorBag={}}),0)},resetValidation(){this.inputs.forEach((t=>t.resetValidation())),this.resetErrorBag()},register(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister(t){const e=this.inputs.find((e=>e._uid===t._uid));if(!e)return;const s=this.watchers.find((t=>t._uid===e._uid));s&&(s.valid(),s.shouldValidate()),this.watchers=this.watchers.filter((t=>t._uid!==e._uid)),this.inputs=this.inputs.filter((t=>t._uid!==e._uid)),this.$delete(this.errorBag,e._uid)}},render(t){return t("form",{staticClass:"v-form",attrs:{novalidate:!0,...this.attrs$},on:{submit:t=>this.$emit("submit",t)}},(0,o.$c)(this))}})},4414:function(t,e,s){s(4114),s(125);var a=s(5471),i=s(8041),n=s(4152);const o=["sm","md","lg","xl"],r=(()=>o.reduce(((t,e)=>(t[e]={type:[Boolean,String,Number],default:!1},t)),{}))(),l=(()=>o.reduce(((t,e)=>(t["offset"+(0,n.Zb)(e)]={type:[String,Number],default:null},t)),{}))(),d=(()=>o.reduce(((t,e)=>(t["order"+(0,n.Zb)(e)]={type:[String,Number],default:null},t)),{}))(),u={col:Object.keys(r),offset:Object.keys(l),order:Object.keys(d)};function c(t,e,s){let a=t;if(null!=s&&!1!==s){if(e){const s=e.replace(t,"");a+=`-${s}`}return"col"!==t||""!==s&&!0!==s?(a+=`-${s}`,a.toLowerCase()):a.toLowerCase()}}const h=new Map;e.A=a.Ay.extend({name:"v-col",functional:!0,props:{cols:{type:[Boolean,String,Number],default:!1},...r,offset:{type:[String,Number],default:null},...l,order:{type:[String,Number],default:null},...d,alignSelf:{type:String,default:null,validator:t=>["auto","start","end","center","baseline","stretch"].includes(t)},tag:{type:String,default:"div"}},render(t,{props:e,data:s,children:a,parent:n}){let o="";for(const i in e)o+=String(e[i]);let r=h.get(o);if(!r){let t;for(t in r=[],u)u[t].forEach((s=>{const a=e[s],i=c(t,s,a);i&&r.push(i)}));const s=r.some((t=>t.startsWith("col-")));r.push({col:!s||!e.cols,[`col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),h.set(o,r)}return t(e.tag,(0,i.Ay)(s,{class:r}),a)}})},2756:function(t,e,s){s(4114),s(125);var a=s(5471),i=s(8041),n=s(4152);const o=["sm","md","lg","xl"],r=["start","end","center"];function l(t,e){return o.reduce(((s,a)=>(s[t+(0,n.Zb)(a)]=e(),s)),{})}const d=t=>[...r,"baseline","stretch"].includes(t),u=l("align",(()=>({type:String,default:null,validator:d}))),c=t=>[...r,"space-between","space-around"].includes(t),h=l("justify",(()=>({type:String,default:null,validator:c}))),m=t=>[...r,"space-between","space-around","stretch"].includes(t),p=l("alignContent",(()=>({type:String,default:null,validator:m}))),f={align:Object.keys(u),justify:Object.keys(h),alignContent:Object.keys(p)},g={align:"align",justify:"justify",alignContent:"align-content"};function v(t,e,s){let a=g[t];if(null!=s){if(e){const s=e.replace(t,"");a+=`-${s}`}return a+=`-${s}`,a.toLowerCase()}}const b=new Map;e.A=a.Ay.extend({name:"v-row",functional:!0,props:{tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:d},...u,justify:{type:String,default:null,validator:c},...h,alignContent:{type:String,default:null,validator:m},...p},render(t,{props:e,data:s,children:a}){let n="";for(const i in e)n+=String(e[i]);let o=b.get(n);if(!o){let t;for(t in o=[],f)f[t].forEach((s=>{const a=e[s],i=v(t,s,a);i&&o.push(i)}));o.push({"no-gutters":e.noGutters,"row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),b.set(n,o)}return t(e.tag,(0,i.Ay)(s,{staticClass:"row",class:o}),a)}})},7150:function(t,e,s){s.d(e,{A:function(){return c}});var a=s(8184),i=s(8743),n=s(3381),o=s(428),r=s(6763),l=s(5803),d=s(4152),u=s(6988),c=(0,l.A)(a.A,i.A,o.A,(0,r.P)(["absolute","bottom","left","right","top"])).extend({name:"v-snackbar",props:{app:Boolean,centered:Boolean,contentClass:{type:String,default:""},multiLine:Boolean,text:Boolean,timeout:{type:[Number,String],default:5e3},transition:{type:[Boolean,String],default:"v-snack-transition",validator:t=>"string"===typeof t||!1===t},vertical:Boolean},data:()=>({activeTimeout:-1}),computed:{classes(){return{"v-snack--absolute":this.absolute,"v-snack--active":this.isActive,"v-snack--bottom":this.bottom||!this.top,"v-snack--centered":this.centered,"v-snack--has-background":this.hasBackground,"v-snack--left":this.left,"v-snack--multi-line":this.multiLine&&!this.vertical,"v-snack--right":this.right,"v-snack--text":this.text,"v-snack--top":this.top,"v-snack--vertical":this.vertical}},hasBackground(){return!this.text&&!this.outlined},isDark(){return this.hasBackground?!this.light:n.A.options.computed.isDark.call(this)},styles(){if(this.absolute||!this.app)return{};const{bar:t,bottom:e,footer:s,insetFooter:a,left:i,right:n,top:o}=this.$vuetify.application;return{paddingBottom:(0,d.Dg)(e+s+a),paddingLeft:(0,d.Dg)(i),paddingRight:(0,d.Dg)(n),paddingTop:(0,d.Dg)(t+o)}}},watch:{isActive:"setTimeout",timeout:"setTimeout"},mounted(){this.isActive&&this.setTimeout()},created(){this.$attrs.hasOwnProperty("auto-height")&&(0,u.rq)("auto-height",this),0==this.timeout&&(0,u.CI)('timeout="0"',"-1",this)},methods:{genActions(){return this.$createElement("div",{staticClass:"v-snack__action "},[(0,d.$c)(this,"action",{attrs:{class:"v-snack__btn"}})])},genContent(){return this.$createElement("div",{staticClass:"v-snack__content",class:{[this.contentClass]:!0},attrs:{role:"status","aria-live":"polite"}},[(0,d.$c)(this)])},genWrapper(){const t=this.hasBackground?this.setBackgroundColor:this.setTextColor,e=t(this.color,{staticClass:"v-snack__wrapper",class:a.A.options.computed.classes.call(this),style:a.A.options.computed.styles.call(this),directives:[{name:"show",value:this.isActive}],on:{pointerenter:()=>window.clearTimeout(this.activeTimeout),pointerleave:this.setTimeout}});return this.$createElement("div",e,[this.genContent(),this.genActions()])},genTransition(){return this.$createElement("transition",{props:{name:this.transition}},[this.genWrapper()])},setTimeout(){window.clearTimeout(this.activeTimeout);const t=Number(this.timeout);this.isActive&&![0,-1].includes(t)&&(this.activeTimeout=window.setTimeout((()=>{this.isActive=!1}),t))}},render(t){return t("div",{staticClass:"v-snack",class:this.classes,style:this.styles},[!1!==this.transition?this.genTransition():this.genWrapper()])}})},7270:function(t,e,s){s.d(e,{A:function(){return c}});var a=s(5030),i=s(8743),n=s(7391),o=s(2031),r=s(9975),l=s(4152),d=s(6988),u=s(5803),c=(0,u.A)(i.A,n.A,o.A,r.A).extend({name:"v-tooltip",props:{closeDelay:{type:[Number,String],default:0},disabled:Boolean,openDelay:{type:[Number,String],default:0},openOnHover:{type:Boolean,default:!0},openOnFocus:{type:Boolean,default:!0},tag:{type:String,default:"span"},transition:String},data:()=>({calculatedMinWidth:0,closeDependents:!1}),computed:{calculatedLeft(){const{activator:t,content:e}=this.dimensions,s=!this.bottom&&!this.left&&!this.top&&!this.right,a=!1!==this.attach?t.offsetLeft:t.left;let i=0;return this.top||this.bottom||s?i=a+t.width/2-e.width/2:(this.left||this.right)&&(i=a+(this.right?t.width:-e.width)+(this.right?10:-10)),this.nudgeLeft&&(i-=parseInt(this.nudgeLeft)),this.nudgeRight&&(i+=parseInt(this.nudgeRight)),`${this.calcXOverflow(i,this.dimensions.content.width)}px`},calculatedTop(){const{activator:t,content:e}=this.dimensions,s=!1!==this.attach?t.offsetTop:t.top;let a=0;return this.top||this.bottom?a=s+(this.bottom?t.height:-e.height)+(this.bottom?10:-10):(this.left||this.right)&&(a=s+t.height/2-e.height/2),this.nudgeTop&&(a-=parseInt(this.nudgeTop)),this.nudgeBottom&&(a+=parseInt(this.nudgeBottom)),!1===this.attach&&(a+=this.pageYOffset),`${this.calcYOverflow(a)}px`},classes(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left,"v-tooltip--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},computedTransition(){return this.transition?this.transition:this.isActive?"scale-transition":"fade-transition"},offsetY(){return this.top||this.bottom},offsetX(){return this.left||this.right},styles(){return{left:this.calculatedLeft,maxWidth:(0,l.Dg)(this.maxWidth),minWidth:(0,l.Dg)(this.minWidth),top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount(){this.$nextTick((()=>{this.value&&this.callActivate()}))},mounted(){"v-slot"===(0,l.fo)(this,"activator",!0)&&(0,d.yA)("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},deactivate(){this.runDelay("close")},genActivatorListeners(){const t=a.A.options.methods.genActivatorListeners.call(this);return this.openOnFocus&&(t.focus=t=>{this.getActivator(t),this.runDelay("open")},t.blur=t=>{this.getActivator(t),this.runDelay("close")}),t.keydown=t=>{t.keyCode===l.uP.esc&&(this.getActivator(t),this.runDelay("close"))},t},genActivatorAttributes(){return{"aria-haspopup":!0,"aria-expanded":String(this.isActive)}},genTransition(){const t=this.genContent();return this.computedTransition?this.$createElement("transition",{props:{name:this.computedTransition}},[t]):t},genContent(){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:{[this.contentClass]:!0,menuable__content__active:this.isActive,"v-tooltip__content--fixed":this.activatorFixed},style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.getContentSlot())}},render(t){return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[this.showLazyContent((()=>[this.genTransition()])),this.genActivator()])}})}}]);
//# sourceMappingURL=84.eddcb88a.js.map