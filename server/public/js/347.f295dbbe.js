"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[347],{1347:function(t,e,s){s.r(e),s.d(e,{default:function(){return D}});var i=s(1965),o=s(3740),r=s(3698),n=s(2938),a=s(3180),l=s(4414),c=s(3449),h=s(6814),d=s(9991),u=s(174),m=s(6930),v=s(8907),p=s(1554),g=s(2756),f=s(5834),y=s(7150),A=s(1034),b=s(7112),w=s(7270),k=function(){var t=this,e=t._self._c;return e(c.A,[e(r.A,{attrs:{elevation:"2"}},[e(n.ri,{staticClass:"d-flex align-center py-3"},[e(m.A,{staticClass:"mr-2",attrs:{large:"",color:"#d2691e"}},[t._v("mdi-account-group")]),e("span",{staticClass:"text-h5"},[t._v("User Management")]),e(A.A),e(b.A,{staticClass:"mr-4",staticStyle:{"max-width":"300px"},attrs:{"prepend-inner-icon":"mdi-magnify",label:"Search users...","single-line":"","hide-details":"",outlined:"",dense:""},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleSearch.apply(null,arguments)}},model:{value:t.options.search,callback:function(e){t.$set(t.options,"search",e)},expression:"options.search"}}),e(o.A,{staticClass:"px-4",attrs:{color:"#d2691e",dark:""},on:{click:t.openCreateDialog}},[e(m.A,{attrs:{left:""}},[t._v("mdi-plus")]),t._v(" Add User ")],1)],1),e(h.A,{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.users,loading:t.loading,options:t.options,"footer-props":{"items-per-page-options":[5,10,25,50],showFirstLastPage:!0}},on:{"update:options":function(e){t.options=e}},scopedSlots:t._u([{key:"item.roles",fn:function({item:s}){return[e(a.A,{attrs:{small:"",color:t.getRoleColor(s.roles),"text-color":"white",label:""}},[t._v(" "+t._s(s.roles)+" ")])]}},{key:"item.isActive",fn:function({item:s}){return[e(a.A,{attrs:{small:"",color:s.isActive?"success":"error","text-color":"white",label:""}},[t._v(" "+t._s(s.isActive?"Active":"Inactive")+" ")])]}},{key:"item.actions",fn:function({item:s}){return[e(w.A,{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function({on:i,attrs:r}){return["admin"!==s.roles?e(o.A,t._g(t._b({staticClass:"mr-1",attrs:{icon:"",small:"",color:s.isActive?"warning":"success",loading:s._id===t.updatingId},on:{click:function(e){return t.toggleStatus(s)}}},"v-btn",r,!1),i),[e(m.A,{attrs:{small:""}},[t._v(t._s(s.isActive?"mdi-block-helper":"mdi-check-circle"))])],1):t._e()]}}],null,!0)},[e("span",[t._v(t._s(s.isActive?"Deactivate":"Activate")+" User")])]),e(w.A,{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function({on:i,attrs:r}){return["admin"!==s.roles?e(o.A,t._g(t._b({attrs:{icon:"",small:"",color:"error"},on:{click:function(e){return t.confirmDelete(s)}}},"v-btn",r,!1),i),[e(m.A,{attrs:{small:""}},[t._v("mdi-delete")])],1):t._e()]}}],null,!0)},[e("span",[t._v("Delete User")])])]}},{key:"no-data",fn:function(){return[e(i.A,{attrs:{type:"info",dense:"",text:""}},[t._v(" No users found ")])]},proxy:!0},{key:"progress",fn:function(){return[e(v.A,{attrs:{absolute:"",color:"white"}},[e(p.A,{attrs:{indeterminate:"",color:"primary"}})],1)]},proxy:!0}])})],1),e(d.A,{attrs:{"max-width":"600px",persistent:""},model:{value:t.createDialog,callback:function(e){t.createDialog=e},expression:"createDialog"}},[e(r.A,[e(n.ri,{staticClass:"headline white--text d-flex align-center",staticStyle:{"background-color":"#a52a2a"}},[t._v(" "+t._s(t.editMode?"Edit User":"Create New User")+" "),e(A.A),e(o.A,{attrs:{icon:"",dark:""},on:{click:t.closeDialog}},[e(m.A,[t._v("mdi-close")])],1)],1),e(n.OQ,{staticClass:"pt-6"},[e(u.A,{ref:"form",attrs:{"lazy-validation":""},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[e(g.A,{attrs:{dense:""}},[e(l.A,{attrs:{cols:"12"}},[e(b.A,{attrs:{rules:t.formRules.email,label:"Email",required:"",outlined:"",dense:""},model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}})],1),e(l.A,{attrs:{cols:"12"}},[e(b.A,{attrs:{rules:t.formRules.username,label:"Username",required:"",outlined:"",dense:""},model:{value:t.form.username,callback:function(e){t.$set(t.form,"username",e)},expression:"form.username"}})],1),t.editMode?t._e():e(l.A,{attrs:{cols:"12"}},[e(b.A,{attrs:{rules:t.formRules.password,label:"Password",type:"password",required:"",outlined:"",dense:""},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}})],1),e(l.A,{attrs:{cols:"12"}},[e(f.A,{attrs:{items:t.roleOptions,rules:t.formRules.roles,label:"Role",required:"",outlined:"",dense:""},model:{value:t.form.roles,callback:function(e){t.$set(t.form,"roles",e)},expression:"form.roles"}})],1)],1)],1)],1),e(n.SL,[e(A.A),e(o.A,{attrs:{color:"grey darken-1",text:""},on:{click:t.closeCreateDialog}},[t._v(" Cancel ")]),e(o.A,{attrs:{color:"#d2691e",disabled:!t.valid,loading:t.loading,dark:""},on:{click:t.handleCreate}},[t._v(" "+t._s(t.editMode?"Save":"Create")+" ")])],1)],1)],1),e(d.A,{attrs:{"max-width":"400"},model:{value:t.deleteDialog,callback:function(e){t.deleteDialog=e},expression:"deleteDialog"}},[e(r.A,[e(n.ri,{staticClass:"headline error--text"},[t._v(" Confirm Delete ")]),e(n.OQ,[t._v(" Are you sure you want to delete user "),e("strong",[t._v(t._s(t.userToDelete?.email))]),t._v("? This action cannot be undone. ")]),e(n.SL,[e(A.A),e(o.A,{attrs:{color:"grey darken-1",text:""},on:{click:function(e){t.deleteDialog=!1}}},[t._v(" Cancel ")]),e(o.A,{attrs:{color:"error",loading:t.loading},on:{click:t.handleDelete}},[t._v(" Delete ")])],1)],1)],1),e(y.A,{attrs:{color:t.snackbarColor,timeout:3e3,top:""},scopedSlots:t._u([{key:"action",fn:function({attrs:s}){return[e(o.A,t._b({attrs:{text:""},on:{click:function(e){t.showSnackbar=!1}}},"v-btn",s,!1),[t._v(" Close ")])]}}]),model:{value:t.showSnackbar,callback:function(e){t.showSnackbar=e},expression:"showSnackbar"}},[t._v(" "+t._s(t.snackbarText)+" ")])],1)},_=[],C=(s(4114),s(5353)),$={name:"UserListView",data:()=>({valid:!1,options:{page:1,itemsPerPage:10,search:""},createDialog:!1,deleteDialog:!1,userToDelete:null,showError:!1,showSnackbar:!1,snackbarText:"",snackbarColor:"success",form:{email:"",password:"",roles:"",username:""},repeatPassword:"",editMode:!1,roleOptions:["admin","teacher"],formRules:{email:[t=>!!t||"Email is required",t=>/.+@.+\..+/.test(t)||"Email must be valid"],password:[t=>!!t||"Password is required",t=>t&&t.length>=4||"Password must be at least 4 characters"],roles:[t=>!!t||"Role is required"],username:[t=>!!t||"Username is required",t=>t&&t.length>=3||"Username must be at least 3 characters",t=>/^[a-zA-Z0-9_]+$/.test(t)||"Username can only contain letters, numbers and underscore"]},headers:[{text:"Email",align:"start",value:"email"},{text:"Username",align:"start",value:"username"},{text:"Roles",value:"roles",sortable:!1},{text:"Status",value:"isActive"},{text:"Actions",value:"actions",sortable:!1,align:"end"}],viewDialog:!1,selectedUser:null,updatingId:null}),computed:{...(0,C.aH)("users",["users","loading","error"]),users(){return this.$store.state.users.users||[]},repeatPasswordRules(){return[t=>!!t||"Please confirm password",t=>!!t&&t===this.form.password||"Passwords must match"]}},methods:{...(0,C.i0)("users",["fetchUsers","createUser","deleteUser","toggleUserStatus"]),getRoleColor(t){switch(t){case"admin":return"#b22222";case"teacher":return"#d2691e";default:return"#d2b48c"}},openCreateDialog(){this.createDialog=!0,this.$nextTick((()=>{this.$refs.form&&this.$refs.form.reset()}))},closeCreateDialog(){this.createDialog=!1,this.form={email:"",password:"",username:"",roles:""},this.repeatPassword="",this.$refs.form&&this.$refs.form.reset()},async handleCreate(){if(this.$refs.form.validate())try{await this.createUser({...this.form}),this.closeCreateDialog(),await this.fetchUsers(),this.showMessage("User created successfully")}catch(t){this.showMessage(this.error,"error")}},editUser(t){this.$router.push(`/users/${t._id}/edit`)},confirmDelete(t){this.userToDelete=t,this.deleteDialog=!0},async handleDelete(){if(this.userToDelete)try{await this.deleteUser(this.userToDelete._id),this.deleteDialog=!1,this.userToDelete=null,await this.fetchUsers(),this.showMessage("User created successfully")}catch(t){this.showError=!0,this.showMessage(this.error,"error")}},viewUser(t){this.selectedUser=t,this.viewDialog=!0},async toggleStatus(t){try{this.updatingId=t._id,await this.toggleUserStatus(t._id),await this.fetchUsers(),this.showMessage(`User ${t.isActive?"deactivated":"activated"} successfully`)}catch(e){this.showMessage(this.error,"error"),this.showError=!0}finally{this.updatingId=null}},showMessage(t,e="success"){this.snackbarText=t,this.snackbarColor=e,this.showSnackbar=!0}},async created(){try{await this.fetchUsers()}catch(t){this.showError=!0}},watch:{options:{handler(){this.fetchUsers()},deep:!0},"form.email":{handler(t){if(t){const t=Math.random().toString(36).substring(2,8);this.form.username=`user_${t}`}else this.form.username=""}}}},x=$,S=s(1656),B=(0,S.A)(x,k,_,!1,null,null,null),D=B.exports},1965:function(t,e,s){s.d(e,{A:function(){return m}});var i=s(9375),o=s(4728),r=s(569),n=s(428),a=s(3381),l=s(5471),c=l.Ay.extend({name:"transitionable",props:{mode:String,origin:String,transition:String}}),h=s(5803),d=s(6988),u=s(4152),m=(0,h.A)(i.A,n.A,c).extend({name:"v-alert",props:{border:{type:String,validator(t){return["top","right","bottom","left"].includes(t)}},closeLabel:{type:String,default:"$vuetify.close"},coloredBorder:Boolean,dense:Boolean,dismissible:Boolean,closeIcon:{type:String,default:"$cancel"},icon:{default:"",type:[Boolean,String],validator(t){return"string"===typeof t||!1===t}},outlined:Boolean,prominent:Boolean,text:Boolean,type:{type:String,validator(t){return["info","error","success","warning"].includes(t)}},value:{type:Boolean,default:!0}},computed:{__cachedBorder(){if(!this.border)return null;let t={staticClass:"v-alert__border",class:{[`v-alert__border--${this.border}`]:!0}};return this.coloredBorder&&(t=this.setBackgroundColor(this.computedColor,t),t.class["v-alert__border--has-color"]=!0),this.$createElement("div",t)},__cachedDismissible(){if(!this.dismissible)return null;const t=this.iconColor;return this.$createElement(o.A,{staticClass:"v-alert__dismissible",props:{color:t,icon:!0,small:!0},attrs:{"aria-label":this.$vuetify.lang.t(this.closeLabel)},on:{click:()=>this.isActive=!1}},[this.$createElement(r.A,{props:{color:t}},this.closeIcon)])},__cachedIcon(){return this.computedIcon?this.$createElement(r.A,{staticClass:"v-alert__icon",props:{color:this.iconColor}},this.computedIcon):null},classes(){const t={...i.A.options.computed.classes.call(this),"v-alert--border":Boolean(this.border),"v-alert--dense":this.dense,"v-alert--outlined":this.outlined,"v-alert--prominent":this.prominent,"v-alert--text":this.text};return this.border&&(t[`v-alert--border-${this.border}`]=!0),t},computedColor(){return this.color||this.type},computedIcon(){return!1!==this.icon&&("string"===typeof this.icon&&this.icon?this.icon:!!["error","info","success","warning"].includes(this.type)&&`$${this.type}`)},hasColoredIcon(){return this.hasText||Boolean(this.border)&&this.coloredBorder},hasText(){return this.text||this.outlined},iconColor(){return this.hasColoredIcon?this.computedColor:void 0},isDark(){return!(!this.type||this.coloredBorder||this.outlined)||a.A.options.computed.isDark.call(this)}},created(){this.$attrs.hasOwnProperty("outline")&&(0,d.q4)("outline","outlined",this)},methods:{genWrapper(){const t=[(0,u.$c)(this,"prepend")||this.__cachedIcon,this.genContent(),this.__cachedBorder,(0,u.$c)(this,"append"),this.$scopedSlots.close?this.$scopedSlots.close({toggle:this.toggle}):this.__cachedDismissible],e={staticClass:"v-alert__wrapper"};return this.$createElement("div",e,t)},genContent(){return this.$createElement("div",{staticClass:"v-alert__content"},(0,u.$c)(this))},genAlert(){let t={staticClass:"v-alert",attrs:{role:"alert"},on:this.listeners$,class:this.classes,style:this.styles,directives:[{name:"show",value:this.isActive}]};if(!this.coloredBorder){const e=this.hasText?this.setTextColor:this.setBackgroundColor;t=e(this.computedColor,t)}return this.$createElement("div",t,[this.genWrapper()])},toggle(){this.isActive=!this.isActive}},render(t){const e=this.genAlert();return this.transition?t("transition",{props:{name:this.transition,origin:this.origin,mode:this.mode}},[e]):e}})},9991:function(t,e,s){s.d(e,{A:function(){return p}});var i=s(4596),o=s(5030),r=s(2031),n=s(7631),a=s(5949),l=s(7198),c=s(5648),h=s(4598),d=s(5803),u=s(6988),m=s(4152);const v=(0,d.A)(r.A,n.A,a.A,l.A,c.A,o.A);var p=v.extend({name:"v-dialog",directives:{ClickOutside:h.A},props:{dark:Boolean,disabled:Boolean,fullscreen:Boolean,light:Boolean,maxWidth:[String,Number],noClickAnimation:Boolean,origin:{type:String,default:"center center"},persistent:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"},width:[String,Number]},data(){return{activatedBy:null,animate:!1,animateTimeout:-1,stackMinZIndex:200,previousActiveElement:null}},computed:{classes(){return{[`v-dialog ${this.contentClass}`.trim()]:!0,"v-dialog--active":this.isActive,"v-dialog--persistent":this.persistent,"v-dialog--fullscreen":this.fullscreen,"v-dialog--scrollable":this.scrollable,"v-dialog--animated":this.animate}},contentClasses(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive(t){var e;t?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind(),null===(e=this.previousActiveElement)||void 0===e||e.focus())},fullscreen(t){this.isActive&&(t?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},created(){this.$attrs.hasOwnProperty("full-width")&&(0,u.rq)("full-width",this)},beforeMount(){this.$nextTick((()=>{this.isBooted=this.isActive,this.isActive&&this.show()}))},beforeDestroy(){"undefined"!==typeof window&&this.unbind()},methods:{animateClick(){this.animate=!1,this.$nextTick((()=>{this.animate=!0,window.clearTimeout(this.animateTimeout),this.animateTimeout=window.setTimeout((()=>this.animate=!1),150)}))},closeConditional(t){const e=t.target;return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(e)||this.overlay&&e&&!this.overlay.$el.contains(e))&&this.activeZIndex>=this.getMaxZIndex()},hideScroll(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):a.A.options.methods.hideScroll.call(this)},show(){!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$nextTick((()=>{this.$nextTick((()=>{var t,e;(null===(t=this.$refs.dialog)||void 0===t?void 0:t.contains(document.activeElement))||(this.previousActiveElement=document.activeElement,null===(e=this.$refs.dialog)||void 0===e||e.focus()),this.bind()}))}))},bind(){window.addEventListener("focusin",this.onFocusin)},unbind(){window.removeEventListener("focusin",this.onFocusin)},onClickOutside(t){this.$emit("click:outside",t),this.persistent?this.noClickAnimation||this.animateClick():this.isActive=!1},onKeydown(t){if(t.keyCode===m.uP.esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;const t=this.getActivator();this.$nextTick((()=>t&&t.focus()))}this.$emit("keydown",t)},onFocusin(t){if(!t||!this.retainFocus)return;const e=t.target;if(e&&this.$refs.dialog&&![document,this.$refs.dialog].includes(e)&&!this.$refs.dialog.contains(e)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some((t=>t.contains(e)))){const t=this.$refs.dialog.querySelectorAll('button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'),e=[...t].find((t=>!t.hasAttribute("disabled")&&!t.matches('[tabindex="-1"]')));e&&e.focus()}},genContent(){return this.showLazyContent((()=>[this.$createElement(i.A,{props:{root:!0,light:this.light,dark:this.dark}},[this.$createElement("div",{class:this.contentClasses,attrs:{role:"dialog","aria-modal":this.hideOverlay?void 0:"true",...this.getScopeIdAttrs()},on:{keydown:this.onKeydown},style:{zIndex:this.activeZIndex},ref:"content"},[this.genTransition()])])]))},genTransition(){const t=this.genInnerContent();return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,appear:!0}},[t]):t},genInnerContent(){const t={class:this.classes,attrs:{tabindex:this.isActive?0:void 0},ref:"dialog",directives:[{name:"click-outside",value:{handler:this.onClickOutside,closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],style:{transformOrigin:this.origin}};return this.fullscreen||(t.style={...t.style,maxWidth:(0,m.Dg)(this.maxWidth),width:(0,m.Dg)(this.width)}),this.$createElement("div",t,this.getContentSlot())}},render(t){return t("div",{staticClass:"v-dialog__container",class:{"v-dialog__container--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},[this.genActivator(),this.genContent()])}})},174:function(t,e,s){s(4114);var i=s(5803),o=s(7717),r=s(7540),n=s(4152);e.A=(0,i.A)(o.A,(0,r.G)("form")).extend({name:"v-form",provide(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:()=>({inputs:[],watchers:[],errorBag:{}}),watch:{errorBag:{handler(t){const e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput(t){const e=t=>t.$watch("hasError",(e=>{this.$set(this.errorBag,t._uid,e)}),{immediate:!0}),s={_uid:t._uid,valid:()=>{},shouldValidate:()=>{}};return this.lazyValidation?s.shouldValidate=t.$watch("shouldValidate",(i=>{i&&(this.errorBag.hasOwnProperty(t._uid)||(s.valid=e(t)))})):s.valid=e(t),s},validate(){return 0===this.inputs.filter((t=>!t.validate(!0))).length},reset(){this.inputs.forEach((t=>t.reset())),this.resetErrorBag()},resetErrorBag(){this.lazyValidation&&setTimeout((()=>{this.errorBag={}}),0)},resetValidation(){this.inputs.forEach((t=>t.resetValidation())),this.resetErrorBag()},register(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister(t){const e=this.inputs.find((e=>e._uid===t._uid));if(!e)return;const s=this.watchers.find((t=>t._uid===e._uid));s&&(s.valid(),s.shouldValidate()),this.watchers=this.watchers.filter((t=>t._uid!==e._uid)),this.inputs=this.inputs.filter((t=>t._uid!==e._uid)),this.$delete(this.errorBag,e._uid)}},render(t){return t("form",{staticClass:"v-form",attrs:{novalidate:!0,...this.attrs$},on:{submit:t=>this.$emit("submit",t)}},(0,n.$c)(this))}})},4414:function(t,e,s){s(4114),s(125);var i=s(5471),o=s(8041),r=s(4152);const n=["sm","md","lg","xl"],a=(()=>n.reduce(((t,e)=>(t[e]={type:[Boolean,String,Number],default:!1},t)),{}))(),l=(()=>n.reduce(((t,e)=>(t["offset"+(0,r.Zb)(e)]={type:[String,Number],default:null},t)),{}))(),c=(()=>n.reduce(((t,e)=>(t["order"+(0,r.Zb)(e)]={type:[String,Number],default:null},t)),{}))(),h={col:Object.keys(a),offset:Object.keys(l),order:Object.keys(c)};function d(t,e,s){let i=t;if(null!=s&&!1!==s){if(e){const s=e.replace(t,"");i+=`-${s}`}return"col"!==t||""!==s&&!0!==s?(i+=`-${s}`,i.toLowerCase()):i.toLowerCase()}}const u=new Map;e.A=i.Ay.extend({name:"v-col",functional:!0,props:{cols:{type:[Boolean,String,Number],default:!1},...a,offset:{type:[String,Number],default:null},...l,order:{type:[String,Number],default:null},...c,alignSelf:{type:String,default:null,validator:t=>["auto","start","end","center","baseline","stretch"].includes(t)},tag:{type:String,default:"div"}},render(t,{props:e,data:s,children:i,parent:r}){let n="";for(const o in e)n+=String(e[o]);let a=u.get(n);if(!a){let t;for(t in a=[],h)h[t].forEach((s=>{const i=e[s],o=d(t,s,i);o&&a.push(o)}));const s=a.some((t=>t.startsWith("col-")));a.push({col:!s||!e.cols,[`col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),u.set(n,a)}return t(e.tag,(0,o.Ay)(s,{class:a}),i)}})},2756:function(t,e,s){s(4114),s(125);var i=s(5471),o=s(8041),r=s(4152);const n=["sm","md","lg","xl"],a=["start","end","center"];function l(t,e){return n.reduce(((s,i)=>(s[t+(0,r.Zb)(i)]=e(),s)),{})}const c=t=>[...a,"baseline","stretch"].includes(t),h=l("align",(()=>({type:String,default:null,validator:c}))),d=t=>[...a,"space-between","space-around"].includes(t),u=l("justify",(()=>({type:String,default:null,validator:d}))),m=t=>[...a,"space-between","space-around","stretch"].includes(t),v=l("alignContent",(()=>({type:String,default:null,validator:m}))),p={align:Object.keys(h),justify:Object.keys(u),alignContent:Object.keys(v)},g={align:"align",justify:"justify",alignContent:"align-content"};function f(t,e,s){let i=g[t];if(null!=s){if(e){const s=e.replace(t,"");i+=`-${s}`}return i+=`-${s}`,i.toLowerCase()}}const y=new Map;e.A=i.Ay.extend({name:"v-row",functional:!0,props:{tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:c},...h,justify:{type:String,default:null,validator:d},...u,alignContent:{type:String,default:null,validator:m},...v},render(t,{props:e,data:s,children:i}){let r="";for(const o in e)r+=String(e[o]);let n=y.get(r);if(!n){let t;for(t in n=[],p)p[t].forEach((s=>{const i=e[s],o=f(t,s,i);o&&n.push(o)}));n.push({"no-gutters":e.noGutters,"row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),y.set(r,n)}return t(e.tag,(0,o.Ay)(s,{staticClass:"row",class:n}),i)}})},8907:function(t,e,s){s.d(e,{A:function(){return l}});s(4114);var i=s(8743),o=s(3381),r=s(428),n=s(5803),a=s(4152),l=(0,n.A)(i.A,o.A,r.A).extend({name:"v-overlay",props:{absolute:Boolean,color:{type:String,default:"#212121"},dark:{type:Boolean,default:!0},opacity:{type:[Number,String],default:.46},value:{default:!0},zIndex:{type:[Number,String],default:5}},computed:{__scrim(){const t=this.setBackgroundColor(this.color,{staticClass:"v-overlay__scrim",style:{opacity:this.computedOpacity}});return this.$createElement("div",t)},classes(){return{"v-overlay--absolute":this.absolute,"v-overlay--active":this.isActive,...this.themeClasses}},computedOpacity(){return Number(this.isActive?this.opacity:0)},styles(){return{zIndex:this.zIndex}}},methods:{genContent(){return this.$createElement("div",{staticClass:"v-overlay__content"},(0,a.$c)(this))}},render(t){const e=[this.__scrim];return this.isActive&&e.push(this.genContent()),t("div",{staticClass:"v-overlay",on:this.$listeners,class:this.classes,style:this.styles},e)}})},7150:function(t,e,s){s.d(e,{A:function(){return d}});var i=s(8184),o=s(8743),r=s(3381),n=s(428),a=s(6763),l=s(5803),c=s(4152),h=s(6988),d=(0,l.A)(i.A,o.A,n.A,(0,a.P)(["absolute","bottom","left","right","top"])).extend({name:"v-snackbar",props:{app:Boolean,centered:Boolean,contentClass:{type:String,default:""},multiLine:Boolean,text:Boolean,timeout:{type:[Number,String],default:5e3},transition:{type:[Boolean,String],default:"v-snack-transition",validator:t=>"string"===typeof t||!1===t},vertical:Boolean},data:()=>({activeTimeout:-1}),computed:{classes(){return{"v-snack--absolute":this.absolute,"v-snack--active":this.isActive,"v-snack--bottom":this.bottom||!this.top,"v-snack--centered":this.centered,"v-snack--has-background":this.hasBackground,"v-snack--left":this.left,"v-snack--multi-line":this.multiLine&&!this.vertical,"v-snack--right":this.right,"v-snack--text":this.text,"v-snack--top":this.top,"v-snack--vertical":this.vertical}},hasBackground(){return!this.text&&!this.outlined},isDark(){return this.hasBackground?!this.light:r.A.options.computed.isDark.call(this)},styles(){if(this.absolute||!this.app)return{};const{bar:t,bottom:e,footer:s,insetFooter:i,left:o,right:r,top:n}=this.$vuetify.application;return{paddingBottom:(0,c.Dg)(e+s+i),paddingLeft:(0,c.Dg)(o),paddingRight:(0,c.Dg)(r),paddingTop:(0,c.Dg)(t+n)}}},watch:{isActive:"setTimeout",timeout:"setTimeout"},mounted(){this.isActive&&this.setTimeout()},created(){this.$attrs.hasOwnProperty("auto-height")&&(0,h.rq)("auto-height",this),0==this.timeout&&(0,h.CI)('timeout="0"',"-1",this)},methods:{genActions(){return this.$createElement("div",{staticClass:"v-snack__action "},[(0,c.$c)(this,"action",{attrs:{class:"v-snack__btn"}})])},genContent(){return this.$createElement("div",{staticClass:"v-snack__content",class:{[this.contentClass]:!0},attrs:{role:"status","aria-live":"polite"}},[(0,c.$c)(this)])},genWrapper(){const t=this.hasBackground?this.setBackgroundColor:this.setTextColor,e=t(this.color,{staticClass:"v-snack__wrapper",class:i.A.options.computed.classes.call(this),style:i.A.options.computed.styles.call(this),directives:[{name:"show",value:this.isActive}],on:{pointerenter:()=>window.clearTimeout(this.activeTimeout),pointerleave:this.setTimeout}});return this.$createElement("div",e,[this.genContent(),this.genActions()])},genTransition(){return this.$createElement("transition",{props:{name:this.transition}},[this.genWrapper()])},setTimeout(){window.clearTimeout(this.activeTimeout);const t=Number(this.timeout);this.isActive&&![0,-1].includes(t)&&(this.activeTimeout=window.setTimeout((()=>{this.isActive=!1}),t))}},render(t){return t("div",{staticClass:"v-snack",class:this.classes,style:this.styles},[!1!==this.transition?this.genTransition():this.genWrapper()])}})},7270:function(t,e,s){s.d(e,{A:function(){return d}});var i=s(5030),o=s(8743),r=s(7391),n=s(2031),a=s(9975),l=s(4152),c=s(6988),h=s(5803),d=(0,h.A)(o.A,r.A,n.A,a.A).extend({name:"v-tooltip",props:{closeDelay:{type:[Number,String],default:0},disabled:Boolean,openDelay:{type:[Number,String],default:0},openOnHover:{type:Boolean,default:!0},openOnFocus:{type:Boolean,default:!0},tag:{type:String,default:"span"},transition:String},data:()=>({calculatedMinWidth:0,closeDependents:!1}),computed:{calculatedLeft(){const{activator:t,content:e}=this.dimensions,s=!this.bottom&&!this.left&&!this.top&&!this.right,i=!1!==this.attach?t.offsetLeft:t.left;let o=0;return this.top||this.bottom||s?o=i+t.width/2-e.width/2:(this.left||this.right)&&(o=i+(this.right?t.width:-e.width)+(this.right?10:-10)),this.nudgeLeft&&(o-=parseInt(this.nudgeLeft)),this.nudgeRight&&(o+=parseInt(this.nudgeRight)),`${this.calcXOverflow(o,this.dimensions.content.width)}px`},calculatedTop(){const{activator:t,content:e}=this.dimensions,s=!1!==this.attach?t.offsetTop:t.top;let i=0;return this.top||this.bottom?i=s+(this.bottom?t.height:-e.height)+(this.bottom?10:-10):(this.left||this.right)&&(i=s+t.height/2-e.height/2),this.nudgeTop&&(i-=parseInt(this.nudgeTop)),this.nudgeBottom&&(i+=parseInt(this.nudgeBottom)),!1===this.attach&&(i+=this.pageYOffset),`${this.calcYOverflow(i)}px`},classes(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left,"v-tooltip--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},computedTransition(){return this.transition?this.transition:this.isActive?"scale-transition":"fade-transition"},offsetY(){return this.top||this.bottom},offsetX(){return this.left||this.right},styles(){return{left:this.calculatedLeft,maxWidth:(0,l.Dg)(this.maxWidth),minWidth:(0,l.Dg)(this.minWidth),top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount(){this.$nextTick((()=>{this.value&&this.callActivate()}))},mounted(){"v-slot"===(0,l.fo)(this,"activator",!0)&&(0,c.yA)("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},deactivate(){this.runDelay("close")},genActivatorListeners(){const t=i.A.options.methods.genActivatorListeners.call(this);return this.openOnFocus&&(t.focus=t=>{this.getActivator(t),this.runDelay("open")},t.blur=t=>{this.getActivator(t),this.runDelay("close")}),t.keydown=t=>{t.keyCode===l.uP.esc&&(this.getActivator(t),this.runDelay("close"))},t},genActivatorAttributes(){return{"aria-haspopup":!0,"aria-expanded":String(this.isActive)}},genTransition(){const t=this.genContent();return this.computedTransition?this.$createElement("transition",{props:{name:this.computedTransition}},[t]):t},genContent(){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:{[this.contentClass]:!0,menuable__content__active:this.isActive,"v-tooltip__content--fixed":this.activatorFixed},style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.getContentSlot())}},render(t){return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[this.showLazyContent((()=>[this.genTransition()])),this.genActivator()])}})},5949:function(t,e,s){s.d(e,{A:function(){return a}});var i=s(8907),o=i.A,r=s(4152),n=s(5471),a=n.Ay.extend().extend({name:"overlayable",props:{hideOverlay:Boolean,overlayColor:String,overlayOpacity:[Number,String]},data(){return{animationFrame:0,overlay:null}},watch:{hideOverlay(t){this.isActive&&(t?this.removeOverlay():this.genOverlay())}},beforeDestroy(){this.removeOverlay()},methods:{createOverlay(){const t=new o({propsData:{absolute:this.absolute,value:!1,color:this.overlayColor,opacity:this.overlayOpacity}});t.$mount();const e=this.absolute?this.$el.parentNode:document.querySelector("[data-app]");e&&e.insertBefore(t.$el,e.firstChild),this.overlay=t},genOverlay(){if(this.hideScroll(),!this.hideOverlay)return this.overlay||this.createOverlay(),this.animationFrame=requestAnimationFrame((()=>{this.overlay&&(void 0!==this.activeZIndex?this.overlay.zIndex=String(this.activeZIndex-1):this.$el&&(this.overlay.zIndex=(0,r.fl)(this.$el)),this.overlay.value=!0)})),!0},removeOverlay(t=!0){this.overlay&&((0,r.d7)(this.overlay.$el,"transitionend",(()=>{this.overlay&&this.overlay.$el&&this.overlay.$el.parentNode&&!this.overlay.value&&!this.isActive&&(this.overlay.$el.parentNode.removeChild(this.overlay.$el),this.overlay.$destroy(),this.overlay=null)})),cancelAnimationFrame(this.animationFrame),this.overlay.value=!1),t&&this.showScroll()},scrollListener(t){if("key"in t){if(["INPUT","TEXTAREA","SELECT"].includes(t.target.tagName)||t.target.isContentEditable)return;const e=[r.uP.up,r.uP.pageup],s=[r.uP.down,r.uP.pagedown];if(e.includes(t.keyCode))t.deltaY=-1;else{if(!s.includes(t.keyCode))return;t.deltaY=1}}(t.target===this.overlay||"keydown"!==t.type&&t.target===document.body||this.checkPath(t))&&t.preventDefault()},hasScrollbar(t){if(!t||t.nodeType!==Node.ELEMENT_NODE)return!1;const e=window.getComputedStyle(t);return(["auto","scroll"].includes(e.overflowY)||"SELECT"===t.tagName)&&t.scrollHeight>t.clientHeight||["auto","scroll"].includes(e.overflowX)&&t.scrollWidth>t.clientWidth},shouldScroll(t,e){if(t.hasAttribute("data-app"))return!1;const s=e.shiftKey||e.deltaX?"x":"y",i="y"===s?e.deltaY:e.deltaX||e.deltaY;let o,r;"y"===s?(o=0===t.scrollTop,r=t.scrollTop+t.clientHeight===t.scrollHeight):(o=0===t.scrollLeft,r=t.scrollLeft+t.clientWidth===t.scrollWidth);const n=i<0,a=i>0;return!(o||!n)||(!(r||!a)||!(!o&&!r||!t.parentNode)&&this.shouldScroll(t.parentNode,e))},isInside(t,e){return t===e||null!==t&&t!==document.body&&this.isInside(t.parentNode,e)},checkPath(t){const e=(0,r.K9)(t);if("keydown"===t.type&&e[0]===document.body){const e=this.$refs.dialog,s=window.getSelection().anchorNode;return!(e&&this.hasScrollbar(e)&&this.isInside(s,e))||!this.shouldScroll(e,t)}for(let s=0;s<e.length;s++){const i=e[s];if(i===document)return!0;if(i===document.documentElement)return!0;if(i===this.$refs.content)return!0;if(this.hasScrollbar(i))return!this.shouldScroll(i,t)}return!0},hideScroll(){this.$vuetify.breakpoint.smAndDown?document.documentElement.classList.add("overflow-y-hidden"):((0,r.P4)(window,"wheel",this.scrollListener,{passive:!1}),window.addEventListener("keydown",this.scrollListener))},showScroll(){document.documentElement.classList.remove("overflow-y-hidden"),window.removeEventListener("wheel",this.scrollListener),window.removeEventListener("keydown",this.scrollListener)}}})}}]);
//# sourceMappingURL=347.f295dbbe.js.map