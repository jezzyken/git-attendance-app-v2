"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[646],{3646:function(t,e,s){s.r(e),s.d(e,{default:function(){return Y}});var i=s(3740),a=s(3698),n=s(2938),o=s(569),r=s(6993),l=(s(4114),s(4746)),c=s(5471),h=c.Ay.extend({name:"rippleable",directives:{ripple:l.A},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple(t={}){return this.ripple?(t.staticClass="v-input--selection-controls__ripple",t.directives=t.directives||[],t.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",t)):null}}}),u=s(8968),d=s(5803);function m(t){t.preventDefault()}var v=(0,d.A)(r.A,h,u.A).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive(){const t=this.value,e=this.internalValue;return this.isMultiple?!!Array.isArray(e)&&e.some((e=>this.valueComparator(e,t))):void 0===this.trueValue||void 0===this.falseValue?t?this.valueComparator(t,e):Boolean(e):this.valueComparator(e,this.trueValue)},isDirty(){return this.isActive},rippleState(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue(t){this.lazyValue=t,this.hasColor=t}},methods:{genLabel(){const t=r.A.options.methods.genLabel.call(this);return t?(t.data.on={click:m},t):t},genInput(t,e){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:t,type:t},e),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:m},ref:"input"})},onClick(t){this.onChange(),this.$emit("click",t)},onChange(){if(!this.isInteractive)return;const t=this.value;let e=this.internalValue;if(this.isMultiple){Array.isArray(e)||(e=[]);const s=e.length;e=e.filter((e=>!this.valueComparator(e,t))),e.length===s&&e.push(t)}else e=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(e,this.trueValue)?this.falseValue:this.trueValue:t?this.valueComparator(e,t)?null:t:!e;this.validate(!0,e),this.internalValue=e,this.hasColor=e},onFocus(t){this.isFocused=!0,this.$emit("focus",t)},onBlur(t){this.isFocused=!1,this.$emit("blur",t)},onKeydown(t){}}}),p=v.extend({name:"v-checkbox",props:{indeterminate:Boolean,indeterminateIcon:{type:String,default:"$checkboxIndeterminate"},offIcon:{type:String,default:"$checkboxOff"},onIcon:{type:String,default:"$checkboxOn"}},data(){return{inputIndeterminate:this.indeterminate}},computed:{classes(){return{...r.A.options.computed.classes.call(this),"v-input--selection-controls":!0,"v-input--checkbox":!0,"v-input--indeterminate":this.inputIndeterminate}},computedIcon(){return this.inputIndeterminate?this.indeterminateIcon:this.isActive?this.onIcon:this.offIcon},validationState(){if(!this.isDisabled||this.inputIndeterminate)return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0}},watch:{indeterminate(t){this.$nextTick((()=>this.inputIndeterminate=t))},inputIndeterminate(t){this.$emit("update:indeterminate",t)},isActive(){this.indeterminate&&(this.inputIndeterminate=!1)}},methods:{genCheckbox(){const{title:t,...e}=this.attrs$;return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(o.A,this.setTextColor(this.validationState,{props:{dense:this.dense,dark:this.dark,light:this.light}}),this.computedIcon),this.genInput("checkbox",{...e,"aria-checked":this.inputIndeterminate?"mixed":this.isActive.toString()}),this.genRipple(this.setTextColor(this.rippleState))])},genDefaultSlot(){return[this.genCheckbox(),this.genLabel()]}}}),f=s(3180),g=s(4414),y=s(3449),b=s(6814),A=s(9991),k=s(174),S=s(6930),w=s(7296),_=s(2659),x=s(4437),C=s(2756),T=s(5834),$=s(7150),D=s(1034),I=s(7112),B=s(7270),E=function(){var t=this,e=t._self._c;return e(y.A,{attrs:{fluid:""}},[e(a.A,{staticClass:"my-4",attrs:{elevation:"2"}},[e(n.ri,{staticClass:"d-flex align-center py-4"},[e(S.A,{staticClass:"mr-3",attrs:{large:"",color:"#d2691e"}},[t._v("mdi-calendar-clock")]),e("span",{staticClass:"text-h5"},[t._v("Class Schedule Management")]),e(D.A),e(I.A,{staticClass:"mr-4",staticStyle:{"max-width":"300px"},attrs:{"prepend-inner-icon":"mdi-magnify",label:"Search schedules...","single-line":"","hide-details":"",outlined:"",dense:""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),e(i.A,{staticClass:"px-5 rounded",attrs:{color:"#d2691e",dark:""},on:{click:t.openCreateDialog}},[e(S.A,{attrs:{left:""}},[t._v("mdi-plus")]),t._v(" Add Schedule ")],1)],1),e(b.A,{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.filteredSchedules,loading:t.loading,search:t.search},scopedSlots:t._u([{key:"item.teacher",fn:function({item:e}){return[t._v(" "+t._s(e.teacher?t.getTeacherName(e.teacher):"Unknown Teacher")+" ")]}},{key:"item.weekDays",fn:function({item:s}){return t._l(s.weekDays,(function(s){return e(f.A,{key:s,staticClass:"mr-1 mb-1",attrs:{small:"",color:"#f4a460",dark:""}},[t._v(" "+t._s(s)+" ")])}))}},{key:"item.time",fn:function({item:e}){return[t._v(" "+t._s(e.startTime)+" - "+t._s(e.endTime)+" ")]}},{key:"item.students.length",fn:function({item:s}){return[e(i.A,{attrs:{small:"",text:"",color:"primary"},on:{click:function(e){return t.openStudentListDialog(s)}}},[t._v(" "+t._s(s.students.length)+" students ")])]}},{key:"item.actions",fn:function({item:s}){return[e(B.A,{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function({on:a,attrs:n}){return[e(i.A,t._g(t._b({staticClass:"mr-1",attrs:{icon:"",small:"",color:"primary"},on:{click:function(e){return t.editSchedule(s)}}},"v-btn",n,!1),a),[e(S.A,{attrs:{small:""}},[t._v("mdi-pencil")])],1)]}}],null,!0)},[e("span",[t._v("Edit Schedule")])]),e(B.A,{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function({on:a,attrs:n}){return[e(i.A,t._g(t._b({attrs:{icon:"",small:"",color:"error"},on:{click:function(e){return t.confirmDelete(s)}}},"v-btn",n,!1),a),[e(S.A,{attrs:{small:""}},[t._v("mdi-delete")])],1)]}}],null,!0)},[e("span",[t._v("Delete Schedule")])])]}}])})],1),e(A.A,{attrs:{"max-width":"800px",persistent:""},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[e(a.A,[e(n.ri,{staticClass:"headline white--text d-flex align-center",staticStyle:{"background-color":"#a52a2a"}},[t._v(" "+t._s(t.editMode?"Edit Schedule":"Create New Schedule")+" "),e(D.A),e(i.A,{attrs:{icon:"",dark:""},on:{click:t.closeDialog}},[e(S.A,[t._v("mdi-close")])],1)],1),e(n.OQ,{staticClass:"pt-4"},[e(k.A,{ref:"form",model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[e(C.A,[e(g.A,{attrs:{cols:"12",md:"6"}},[e(T.A,{attrs:{items:t.courses,"item-text":"courseName","item-value":"_id",label:"Course",rules:t.rules.required,outlined:"",dense:""},on:{change:t.handleCourseChange},model:{value:t.form.course,callback:function(e){t.$set(t.form,"course",e)},expression:"form.course"}})],1),e(g.A,{attrs:{cols:"12",md:"6"}},[e(T.A,{attrs:{items:t.filteredSubjects,"item-text":"subjectName","item-value":"_id",label:"Descriptive Title",rules:t.rules.required,outlined:"",dense:"",disabled:!t.form.course},on:{change:t.handleSubjectChange},model:{value:t.form.subject,callback:function(e){t.$set(t.form,"subject",e)},expression:"form.subject"}})],1),e(g.A,{attrs:{cols:"12",md:"6"}},[e(I.A,{attrs:{label:"Section",rules:t.rules.required,outlined:"",dense:""},model:{value:t.form.section,callback:function(e){t.$set(t.form,"section",e)},expression:"form.section"}})],1),e(g.A,{attrs:{cols:"12",md:"6"}},[e(T.A,{attrs:{items:t.filteredTeachers,"item-text":"fullName","item-value":"_id",label:"Teacher",rules:t.rules.required,outlined:"",dense:"",disabled:!t.form.subject},scopedSlots:t._u([{key:"item",fn:function({item:e}){return[t._v(" "+t._s(t.getTeacherName(e))+" ")]}},{key:"selection",fn:function({item:e}){return[t._v(" "+t._s(t.getTeacherName(e))+" ")]}}]),model:{value:t.form.teacher,callback:function(e){t.$set(t.form,"teacher",e)},expression:"form.teacher"}})],1)],1),e(C.A,[e(g.A,{attrs:{cols:"12"}},[e(T.A,{attrs:{items:t.weekDays,label:"Week Days",multiple:"",chips:"",rules:t.rules.required,outlined:"",dense:""},model:{value:t.form.weekDays,callback:function(e){t.$set(t.form,"weekDays",e)},expression:"form.weekDays"}})],1)],1),e(C.A,[e(g.A,{attrs:{cols:"12",md:"6"}},[e(T.A,{attrs:{items:t.timeSlots,"item-text":"text","item-value":"value",label:"Start Time",rules:t.rules.required,outlined:"",dense:""},model:{value:t.form.startTime,callback:function(e){t.$set(t.form,"startTime",e)},expression:"form.startTime"}})],1),e(g.A,{attrs:{cols:"12",md:"6"}},[e(T.A,{attrs:{items:t.timeSlots,"item-text":"text","item-value":"value",label:"End Time",rules:t.timeRules,outlined:"",dense:""},model:{value:t.form.endTime,callback:function(e){t.$set(t.form,"endTime",e)},expression:"form.endTime"}})],1),e(g.A,{attrs:{cols:"12"}},[e(T.A,{attrs:{items:t.students,"item-text":"user.lastName","item-value":"_id",label:"Students",multiple:"",chips:"",outlined:"",dense:""},scopedSlots:t._u([{key:"selection",fn:function({item:s,index:i}){return[i<3?e(f.A,{attrs:{small:""}},[t._v(" "+t._s(t.getStudentName(s))+" ")]):3===i?e("span",{staticClass:"grey--text text-caption"},[t._v(" (+"+t._s(t.form.students.length-3)+" others) ")]):t._e()]}},{key:"item",fn:function({item:s,attrs:i,on:a}){return[e(w.A,t._g(t._b({scopedSlots:t._u([{key:"default",fn:function({active:i}){return[e(_.A,[e(p,{attrs:{"input-value":i}})],1),e(x.pr,[e(x.UZ,[t._v(" "+t._s(t.getStudentName(s))+" ")]),e(x.w,[t._v(" ID: "+t._s(s.studentId)+" ")])],1)]}}],null,!0)},"v-list-item",i,!1),a))]}}]),model:{value:t.form.students,callback:function(e){t.$set(t.form,"students",e)},expression:"form.students"}})],1)],1)],1)],1),e(n.SL,{staticClass:"pb-4 px-6"},[e(i.A,{attrs:{text:"",color:"grey darken-1"},on:{click:t.closeDialog}},[t._v("Cancel")]),e(D.A),e(i.A,{attrs:{color:"#d2691e",disabled:!t.isFormValid,loading:t.loading,dark:t.isFormValid},on:{click:t.handleSubmit}},[t._v(" "+t._s(t.editMode?"Save Changes":"Create Schedule")+" ")])],1)],1)],1),e(A.A,{attrs:{"max-width":"400"},model:{value:t.deleteDialog,callback:function(e){t.deleteDialog=e},expression:"deleteDialog"}},[e(a.A,[e(n.ri,{staticClass:"headline error--text"},[t._v("Confirm Delete")]),e(n.OQ,[t._v("Are you sure you want to delete this schedule?")]),e(n.SL,[e(D.A),e(i.A,{attrs:{text:""},on:{click:function(e){t.deleteDialog=!1}}},[t._v("Cancel")]),e(i.A,{attrs:{color:"error",loading:t.loading},on:{click:t.handleDelete}},[t._v(" Delete ")])],1)],1)],1),e("student-list-dialog",{attrs:{schedule:t.selectedSchedule||{},"all-students":t.students,loading:t.loading},model:{value:t.studentListDialog,callback:function(e){t.studentListDialog=e},expression:"studentListDialog"}}),e($.A,{attrs:{color:t.snackbar.color,timeout:3e3,top:""},scopedSlots:t._u([{key:"action",fn:function({attrs:s}){return[e(i.A,t._b({attrs:{text:""},on:{click:function(e){t.snackbar.show=!1}}},"v-btn",s,!1),[t._v("Close")])]}}]),model:{value:t.snackbar.show,callback:function(e){t.$set(t.snackbar,"show",e)},expression:"snackbar.show"}},[t._v(" "+t._s(t.snackbar.text)+" ")])],1)},N=[],O=s(5353),L=s(5093),j=s.n(L),V=function(){var t=this,e=t._self._c;return e(A.A,{attrs:{"max-width":"800px"},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[e(a.A,[e(n.ri,{staticClass:"headline d-flex align-center"},[t._v(" Student List "),e(D.A),e(i.A,{attrs:{icon:""},on:{click:t.close}},[e(S.A,[t._v("mdi-close")])],1)],1),e(n.OQ,[e(b.A,{attrs:{headers:t.headers,items:t.schedule.students||[],dense:"","items-per-page":10},scopedSlots:t._u([{key:"item.fullName",fn:function({item:e}){return[t._v(" "+t._s(t.getStudentName(e))+" ")]}}])})],1)],1)],1)},F=[],M={name:"StudentListDialog",props:{value:{type:Boolean,default:!1},schedule:{type:Object,required:!0}},data:()=>({headers:[{text:"Student ID",value:"studentId"},{text:"Student Name",value:"fullName"}]}),computed:{show:{get(){return this.value},set(t){this.$emit("input",t)}}},methods:{getStudentName(t){return t?.user?`${t.user.lastName||""}, ${t.user.firstName||""} ${t.user.middleName||""}`.trim():"Unknown Student"},close(){this.show=!1}}},W=M,q=s(1656),H=(0,q.A)(W,V,F,!1,null,null,null),P=H.exports,z={name:"ClassScheduleView",components:{StudentListDialog:P},data:()=>({valid:!1,dialog:!1,deleteDialog:!1,search:"",editMode:!1,scheduleToDelete:null,form:{course:null,subject:null,section:"",teacher:null,weekDays:[],startTime:null,endTime:null,students:[]},headers:[{text:"Course",value:"course.courseName"},{text:"Descriptive Title",value:"subject.subjectName"},{text:"Section",value:"section"},{text:"Teacher",value:"teacher"},{text:"Days",value:"weekDays"},{text:"Time",value:"time",sortable:!1},{text:"Students",value:"students.length"},{text:"Actions",value:"actions",sortable:!1,align:"end"}],weekDays:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],rules:{required:[t=>!!t||"This field is required"]},snackbar:{show:!1,text:"",color:""},timeSlots:[],studentListDialog:!1,selectedSchedule:null}),computed:{...(0,O.aH)("schedules",["schedules","loading"]),...(0,O.aH)("courses",["courses"]),...(0,O.aH)("subjects",["subjects"]),...(0,O.aH)("teachers",["teachers"]),...(0,O.aH)("students",["students"]),filteredSubjects(){return this.form.course?this.subjects.filter((t=>t.course&&t.course.some((t=>t._id===this.form.course)))):[]},filteredTeachers(){return this.form.subject?this.teachers.filter((t=>t.subjects.some((t=>t._id===this.form.subject)))):[]},filteredSchedules(){return this.schedules.filter((t=>t.teacher&&t.teacher.user))},timeRules(){return[t=>!!t||"End time is required",t=>!this.form.startTime||!t||(this.isTimeAfter(t,this.form.startTime)||"End time must be after start time")]},isFormValid(){return this.valid&&this.form.course&&this.form.subject&&this.form.weekDays.length>0&&this.form.startTime&&this.form.endTime&&this.isTimeAfter(this.form.endTime,this.form.startTime)}},methods:{...(0,O.i0)("schedules",["fetchSchedules","createSchedule","updateSchedule","deleteSchedule"]),...(0,O.i0)("courses",["fetchCourses"]),...(0,O.i0)("subjects",["fetchSubjects"]),...(0,O.i0)("teachers",["fetchTeachers"]),...(0,O.i0)("students",["fetchStudents"]),openStudentListDialog(t){this.selectedSchedule=t,this.studentListDialog=!0},generateTimeSlots(){const t=[],e=j()("07:30","HH:mm"),s=j()("20:30","HH:mm");while(e<=s)t.push({value:e.format("HH:mm"),text:e.format("h:mm A")}),e.add(30,"minutes");return t},getStudentName(t){return t?.user?`${t.user.lastName||""}, ${t.user.firstName||""} ${t.user.middleName||""}`.trim():"Unknown Student"},getTeacherName(t){return t?.user?`${t.user.lastName||""}, ${t.user.firstName||""} ${t.user.middleName||""}`.trim():"Unknown Teacher"},isTimeAfter(t,e){const[s,i]=t.split(":").map(Number),[a,n]=e.split(":").map(Number);return s>a||s===a&&i>n},handleCourseChange(){console.log("Selected course:",this.form.course),console.log("All subjects:",this.subjects),console.log("Filtered subjects:",this.filteredSubjects),this.form.subject=null,this.form.teacher=null},handleSubjectChange(){this.form.subject||(this.form.teacher=null)},resetForm(){this.form={course:null,subject:null,section:"",teacher:null,weekDays:[],startTime:null,endTime:null,students:[]},this.$refs.form&&this.$refs.form.reset()},openCreateDialog(){this.editMode=!1,this.dialog=!0,this.resetForm()},closeDialog(){this.dialog=!1,this.$nextTick((()=>{this.resetForm()}))},editSchedule(t){console.log(t),this.editMode=!0,this.form={_id:t._id,course:t.course?._id||null,subject:t.subject?._id||null,section:t.section||"",teacher:t.teacher?._id||null,weekDays:[...t.weekDays||[]],startTime:t.startTime||null,endTime:t.endTime||null,students:t.students?.map((t=>t._id))||[]},this.dialog=!0},confirmDelete(t){this.scheduleToDelete=t,this.deleteDialog=!0},async handleSubmit(){if(this.$refs.form.validate())try{const t={...this.form};this.editMode?(await this.updateSchedule({id:this.form._id,scheduleData:t}),this.showSnackbar("Schedule updated successfully!","success")):(await this.createSchedule(t),this.showSnackbar("Schedule created successfully!","success")),this.closeDialog(),this.fetchSchedules()}catch(t){this.showSnackbar(t.response?.data?.message||"An error occurred!","error")}},async handleDelete(){try{await this.deleteSchedule(this.scheduleToDelete._id),this.showSnackbar("Schedule deleted successfully!","success"),this.deleteDialog=!1,this.fetchSchedules()}catch(t){this.showSnackbar(t.response?.data?.message||"Failed to delete schedule!","error")}},showSnackbar(t,e){this.snackbar={show:!0,text:t,color:e}},async loadInitialData(){try{await Promise.all([this.fetchSchedules(),this.fetchCourses(),this.fetchSubjects(),this.fetchTeachers(),this.fetchStudents()])}catch(t){this.showSnackbar("Failed to load data","error")}}},created(){this.timeSlots=this.generateTimeSlots(),this.loadInitialData()}},Z=z,R=(0,q.A)(Z,E,N,!1,null,"fa91a2d8",null),Y=R.exports},9991:function(t,e,s){s.d(e,{A:function(){return p}});var i=s(4596),a=s(5030),n=s(2031),o=s(7631),r=s(5949),l=s(7198),c=s(5648),h=s(4598),u=s(5803),d=s(6988),m=s(4152);const v=(0,u.A)(n.A,o.A,r.A,l.A,c.A,a.A);var p=v.extend({name:"v-dialog",directives:{ClickOutside:h.A},props:{dark:Boolean,disabled:Boolean,fullscreen:Boolean,light:Boolean,maxWidth:[String,Number],noClickAnimation:Boolean,origin:{type:String,default:"center center"},persistent:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"},width:[String,Number]},data(){return{activatedBy:null,animate:!1,animateTimeout:-1,stackMinZIndex:200,previousActiveElement:null}},computed:{classes(){return{[`v-dialog ${this.contentClass}`.trim()]:!0,"v-dialog--active":this.isActive,"v-dialog--persistent":this.persistent,"v-dialog--fullscreen":this.fullscreen,"v-dialog--scrollable":this.scrollable,"v-dialog--animated":this.animate}},contentClasses(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive(t){var e;t?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind(),null===(e=this.previousActiveElement)||void 0===e||e.focus())},fullscreen(t){this.isActive&&(t?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},created(){this.$attrs.hasOwnProperty("full-width")&&(0,d.rq)("full-width",this)},beforeMount(){this.$nextTick((()=>{this.isBooted=this.isActive,this.isActive&&this.show()}))},beforeDestroy(){"undefined"!==typeof window&&this.unbind()},methods:{animateClick(){this.animate=!1,this.$nextTick((()=>{this.animate=!0,window.clearTimeout(this.animateTimeout),this.animateTimeout=window.setTimeout((()=>this.animate=!1),150)}))},closeConditional(t){const e=t.target;return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(e)||this.overlay&&e&&!this.overlay.$el.contains(e))&&this.activeZIndex>=this.getMaxZIndex()},hideScroll(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):r.A.options.methods.hideScroll.call(this)},show(){!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$nextTick((()=>{this.$nextTick((()=>{var t,e;(null===(t=this.$refs.dialog)||void 0===t?void 0:t.contains(document.activeElement))||(this.previousActiveElement=document.activeElement,null===(e=this.$refs.dialog)||void 0===e||e.focus()),this.bind()}))}))},bind(){window.addEventListener("focusin",this.onFocusin)},unbind(){window.removeEventListener("focusin",this.onFocusin)},onClickOutside(t){this.$emit("click:outside",t),this.persistent?this.noClickAnimation||this.animateClick():this.isActive=!1},onKeydown(t){if(t.keyCode===m.uP.esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;const t=this.getActivator();this.$nextTick((()=>t&&t.focus()))}this.$emit("keydown",t)},onFocusin(t){if(!t||!this.retainFocus)return;const e=t.target;if(e&&this.$refs.dialog&&![document,this.$refs.dialog].includes(e)&&!this.$refs.dialog.contains(e)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some((t=>t.contains(e)))){const t=this.$refs.dialog.querySelectorAll('button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'),e=[...t].find((t=>!t.hasAttribute("disabled")&&!t.matches('[tabindex="-1"]')));e&&e.focus()}},genContent(){return this.showLazyContent((()=>[this.$createElement(i.A,{props:{root:!0,light:this.light,dark:this.dark}},[this.$createElement("div",{class:this.contentClasses,attrs:{role:"dialog","aria-modal":this.hideOverlay?void 0:"true",...this.getScopeIdAttrs()},on:{keydown:this.onKeydown},style:{zIndex:this.activeZIndex},ref:"content"},[this.genTransition()])])]))},genTransition(){const t=this.genInnerContent();return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,appear:!0}},[t]):t},genInnerContent(){const t={class:this.classes,attrs:{tabindex:this.isActive?0:void 0},ref:"dialog",directives:[{name:"click-outside",value:{handler:this.onClickOutside,closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],style:{transformOrigin:this.origin}};return this.fullscreen||(t.style={...t.style,maxWidth:(0,m.Dg)(this.maxWidth),width:(0,m.Dg)(this.width)}),this.$createElement("div",t,this.getContentSlot())}},render(t){return t("div",{staticClass:"v-dialog__container",class:{"v-dialog__container--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},[this.genActivator(),this.genContent()])}})},174:function(t,e,s){s(4114);var i=s(5803),a=s(7717),n=s(7540),o=s(4152);e.A=(0,i.A)(a.A,(0,n.G)("form")).extend({name:"v-form",provide(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:()=>({inputs:[],watchers:[],errorBag:{}}),watch:{errorBag:{handler(t){const e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput(t){const e=t=>t.$watch("hasError",(e=>{this.$set(this.errorBag,t._uid,e)}),{immediate:!0}),s={_uid:t._uid,valid:()=>{},shouldValidate:()=>{}};return this.lazyValidation?s.shouldValidate=t.$watch("shouldValidate",(i=>{i&&(this.errorBag.hasOwnProperty(t._uid)||(s.valid=e(t)))})):s.valid=e(t),s},validate(){return 0===this.inputs.filter((t=>!t.validate(!0))).length},reset(){this.inputs.forEach((t=>t.reset())),this.resetErrorBag()},resetErrorBag(){this.lazyValidation&&setTimeout((()=>{this.errorBag={}}),0)},resetValidation(){this.inputs.forEach((t=>t.resetValidation())),this.resetErrorBag()},register(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister(t){const e=this.inputs.find((e=>e._uid===t._uid));if(!e)return;const s=this.watchers.find((t=>t._uid===e._uid));s&&(s.valid(),s.shouldValidate()),this.watchers=this.watchers.filter((t=>t._uid!==e._uid)),this.inputs=this.inputs.filter((t=>t._uid!==e._uid)),this.$delete(this.errorBag,e._uid)}},render(t){return t("form",{staticClass:"v-form",attrs:{novalidate:!0,...this.attrs$},on:{submit:t=>this.$emit("submit",t)}},(0,o.$c)(this))}})},8907:function(t,e,s){s.d(e,{A:function(){return l}});s(4114);var i=s(8743),a=s(3381),n=s(428),o=s(5803),r=s(4152),l=(0,o.A)(i.A,a.A,n.A).extend({name:"v-overlay",props:{absolute:Boolean,color:{type:String,default:"#212121"},dark:{type:Boolean,default:!0},opacity:{type:[Number,String],default:.46},value:{default:!0},zIndex:{type:[Number,String],default:5}},computed:{__scrim(){const t=this.setBackgroundColor(this.color,{staticClass:"v-overlay__scrim",style:{opacity:this.computedOpacity}});return this.$createElement("div",t)},classes(){return{"v-overlay--absolute":this.absolute,"v-overlay--active":this.isActive,...this.themeClasses}},computedOpacity(){return Number(this.isActive?this.opacity:0)},styles(){return{zIndex:this.zIndex}}},methods:{genContent(){return this.$createElement("div",{staticClass:"v-overlay__content"},(0,r.$c)(this))}},render(t){const e=[this.__scrim];return this.isActive&&e.push(this.genContent()),t("div",{staticClass:"v-overlay",on:this.$listeners,class:this.classes,style:this.styles},e)}})},7150:function(t,e,s){s.d(e,{A:function(){return u}});var i=s(8184),a=s(8743),n=s(3381),o=s(428),r=s(6763),l=s(5803),c=s(4152),h=s(6988),u=(0,l.A)(i.A,a.A,o.A,(0,r.P)(["absolute","bottom","left","right","top"])).extend({name:"v-snackbar",props:{app:Boolean,centered:Boolean,contentClass:{type:String,default:""},multiLine:Boolean,text:Boolean,timeout:{type:[Number,String],default:5e3},transition:{type:[Boolean,String],default:"v-snack-transition",validator:t=>"string"===typeof t||!1===t},vertical:Boolean},data:()=>({activeTimeout:-1}),computed:{classes(){return{"v-snack--absolute":this.absolute,"v-snack--active":this.isActive,"v-snack--bottom":this.bottom||!this.top,"v-snack--centered":this.centered,"v-snack--has-background":this.hasBackground,"v-snack--left":this.left,"v-snack--multi-line":this.multiLine&&!this.vertical,"v-snack--right":this.right,"v-snack--text":this.text,"v-snack--top":this.top,"v-snack--vertical":this.vertical}},hasBackground(){return!this.text&&!this.outlined},isDark(){return this.hasBackground?!this.light:n.A.options.computed.isDark.call(this)},styles(){if(this.absolute||!this.app)return{};const{bar:t,bottom:e,footer:s,insetFooter:i,left:a,right:n,top:o}=this.$vuetify.application;return{paddingBottom:(0,c.Dg)(e+s+i),paddingLeft:(0,c.Dg)(a),paddingRight:(0,c.Dg)(n),paddingTop:(0,c.Dg)(t+o)}}},watch:{isActive:"setTimeout",timeout:"setTimeout"},mounted(){this.isActive&&this.setTimeout()},created(){this.$attrs.hasOwnProperty("auto-height")&&(0,h.rq)("auto-height",this),0==this.timeout&&(0,h.CI)('timeout="0"',"-1",this)},methods:{genActions(){return this.$createElement("div",{staticClass:"v-snack__action "},[(0,c.$c)(this,"action",{attrs:{class:"v-snack__btn"}})])},genContent(){return this.$createElement("div",{staticClass:"v-snack__content",class:{[this.contentClass]:!0},attrs:{role:"status","aria-live":"polite"}},[(0,c.$c)(this)])},genWrapper(){const t=this.hasBackground?this.setBackgroundColor:this.setTextColor,e=t(this.color,{staticClass:"v-snack__wrapper",class:i.A.options.computed.classes.call(this),style:i.A.options.computed.styles.call(this),directives:[{name:"show",value:this.isActive}],on:{pointerenter:()=>window.clearTimeout(this.activeTimeout),pointerleave:this.setTimeout}});return this.$createElement("div",e,[this.genContent(),this.genActions()])},genTransition(){return this.$createElement("transition",{props:{name:this.transition}},[this.genWrapper()])},setTimeout(){window.clearTimeout(this.activeTimeout);const t=Number(this.timeout);this.isActive&&![0,-1].includes(t)&&(this.activeTimeout=window.setTimeout((()=>{this.isActive=!1}),t))}},render(t){return t("div",{staticClass:"v-snack",class:this.classes,style:this.styles},[!1!==this.transition?this.genTransition():this.genWrapper()])}})},7270:function(t,e,s){s.d(e,{A:function(){return u}});var i=s(5030),a=s(8743),n=s(7391),o=s(2031),r=s(9975),l=s(4152),c=s(6988),h=s(5803),u=(0,h.A)(a.A,n.A,o.A,r.A).extend({name:"v-tooltip",props:{closeDelay:{type:[Number,String],default:0},disabled:Boolean,openDelay:{type:[Number,String],default:0},openOnHover:{type:Boolean,default:!0},openOnFocus:{type:Boolean,default:!0},tag:{type:String,default:"span"},transition:String},data:()=>({calculatedMinWidth:0,closeDependents:!1}),computed:{calculatedLeft(){const{activator:t,content:e}=this.dimensions,s=!this.bottom&&!this.left&&!this.top&&!this.right,i=!1!==this.attach?t.offsetLeft:t.left;let a=0;return this.top||this.bottom||s?a=i+t.width/2-e.width/2:(this.left||this.right)&&(a=i+(this.right?t.width:-e.width)+(this.right?10:-10)),this.nudgeLeft&&(a-=parseInt(this.nudgeLeft)),this.nudgeRight&&(a+=parseInt(this.nudgeRight)),`${this.calcXOverflow(a,this.dimensions.content.width)}px`},calculatedTop(){const{activator:t,content:e}=this.dimensions,s=!1!==this.attach?t.offsetTop:t.top;let i=0;return this.top||this.bottom?i=s+(this.bottom?t.height:-e.height)+(this.bottom?10:-10):(this.left||this.right)&&(i=s+t.height/2-e.height/2),this.nudgeTop&&(i-=parseInt(this.nudgeTop)),this.nudgeBottom&&(i+=parseInt(this.nudgeBottom)),!1===this.attach&&(i+=this.pageYOffset),`${this.calcYOverflow(i)}px`},classes(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left,"v-tooltip--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},computedTransition(){return this.transition?this.transition:this.isActive?"scale-transition":"fade-transition"},offsetY(){return this.top||this.bottom},offsetX(){return this.left||this.right},styles(){return{left:this.calculatedLeft,maxWidth:(0,l.Dg)(this.maxWidth),minWidth:(0,l.Dg)(this.minWidth),top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount(){this.$nextTick((()=>{this.value&&this.callActivate()}))},mounted(){"v-slot"===(0,l.fo)(this,"activator",!0)&&(0,c.yA)("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},deactivate(){this.runDelay("close")},genActivatorListeners(){const t=i.A.options.methods.genActivatorListeners.call(this);return this.openOnFocus&&(t.focus=t=>{this.getActivator(t),this.runDelay("open")},t.blur=t=>{this.getActivator(t),this.runDelay("close")}),t.keydown=t=>{t.keyCode===l.uP.esc&&(this.getActivator(t),this.runDelay("close"))},t},genActivatorAttributes(){return{"aria-haspopup":!0,"aria-expanded":String(this.isActive)}},genTransition(){const t=this.genContent();return this.computedTransition?this.$createElement("transition",{props:{name:this.computedTransition}},[t]):t},genContent(){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:{[this.contentClass]:!0,menuable__content__active:this.isActive,"v-tooltip__content--fixed":this.activatorFixed},style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.getContentSlot())}},render(t){return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[this.showLazyContent((()=>[this.genTransition()])),this.genActivator()])}})},5949:function(t,e,s){s.d(e,{A:function(){return r}});var i=s(8907),a=i.A,n=s(4152),o=s(5471),r=o.Ay.extend().extend({name:"overlayable",props:{hideOverlay:Boolean,overlayColor:String,overlayOpacity:[Number,String]},data(){return{animationFrame:0,overlay:null}},watch:{hideOverlay(t){this.isActive&&(t?this.removeOverlay():this.genOverlay())}},beforeDestroy(){this.removeOverlay()},methods:{createOverlay(){const t=new a({propsData:{absolute:this.absolute,value:!1,color:this.overlayColor,opacity:this.overlayOpacity}});t.$mount();const e=this.absolute?this.$el.parentNode:document.querySelector("[data-app]");e&&e.insertBefore(t.$el,e.firstChild),this.overlay=t},genOverlay(){if(this.hideScroll(),!this.hideOverlay)return this.overlay||this.createOverlay(),this.animationFrame=requestAnimationFrame((()=>{this.overlay&&(void 0!==this.activeZIndex?this.overlay.zIndex=String(this.activeZIndex-1):this.$el&&(this.overlay.zIndex=(0,n.fl)(this.$el)),this.overlay.value=!0)})),!0},removeOverlay(t=!0){this.overlay&&((0,n.d7)(this.overlay.$el,"transitionend",(()=>{this.overlay&&this.overlay.$el&&this.overlay.$el.parentNode&&!this.overlay.value&&!this.isActive&&(this.overlay.$el.parentNode.removeChild(this.overlay.$el),this.overlay.$destroy(),this.overlay=null)})),cancelAnimationFrame(this.animationFrame),this.overlay.value=!1),t&&this.showScroll()},scrollListener(t){if("key"in t){if(["INPUT","TEXTAREA","SELECT"].includes(t.target.tagName)||t.target.isContentEditable)return;const e=[n.uP.up,n.uP.pageup],s=[n.uP.down,n.uP.pagedown];if(e.includes(t.keyCode))t.deltaY=-1;else{if(!s.includes(t.keyCode))return;t.deltaY=1}}(t.target===this.overlay||"keydown"!==t.type&&t.target===document.body||this.checkPath(t))&&t.preventDefault()},hasScrollbar(t){if(!t||t.nodeType!==Node.ELEMENT_NODE)return!1;const e=window.getComputedStyle(t);return(["auto","scroll"].includes(e.overflowY)||"SELECT"===t.tagName)&&t.scrollHeight>t.clientHeight||["auto","scroll"].includes(e.overflowX)&&t.scrollWidth>t.clientWidth},shouldScroll(t,e){if(t.hasAttribute("data-app"))return!1;const s=e.shiftKey||e.deltaX?"x":"y",i="y"===s?e.deltaY:e.deltaX||e.deltaY;let a,n;"y"===s?(a=0===t.scrollTop,n=t.scrollTop+t.clientHeight===t.scrollHeight):(a=0===t.scrollLeft,n=t.scrollLeft+t.clientWidth===t.scrollWidth);const o=i<0,r=i>0;return!(a||!o)||(!(n||!r)||!(!a&&!n||!t.parentNode)&&this.shouldScroll(t.parentNode,e))},isInside(t,e){return t===e||null!==t&&t!==document.body&&this.isInside(t.parentNode,e)},checkPath(t){const e=(0,n.K9)(t);if("keydown"===t.type&&e[0]===document.body){const e=this.$refs.dialog,s=window.getSelection().anchorNode;return!(e&&this.hasScrollbar(e)&&this.isInside(s,e))||!this.shouldScroll(e,t)}for(let s=0;s<e.length;s++){const i=e[s];if(i===document)return!0;if(i===document.documentElement)return!0;if(i===this.$refs.content)return!0;if(this.hasScrollbar(i))return!this.shouldScroll(i,t)}return!0},hideScroll(){this.$vuetify.breakpoint.smAndDown?document.documentElement.classList.add("overflow-y-hidden"):((0,n.P4)(window,"wheel",this.scrollListener,{passive:!1}),window.addEventListener("keydown",this.scrollListener))},showScroll(){document.documentElement.classList.remove("overflow-y-hidden"),window.removeEventListener("wheel",this.scrollListener),window.removeEventListener("keydown",this.scrollListener)}}})}}]);
//# sourceMappingURL=646.d9ced7f8.js.map