"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[803],{8803:function(t,e,s){s.r(e),s.d(e,{default:function(){return b}});var r=s(1965),i=s(3740),o=s(3698),n=s(2938),a=s(4414),l=s(3449),d=s(174),c=s(2756),u=s(7112),h=function(){var t=this,e=t._self._c;return e(l.A,{staticClass:"login-container",attrs:{"fill-height":"",fluid:""}},[e(c.A,{attrs:{align:"center",justify:"center"}},[e(a.A,{attrs:{cols:"12",sm:"8",md:"4"}},[e(o.A,{staticClass:"login-card"},[e("div",{staticClass:"text-center pt-8"},[e("h1",{staticClass:"text-h4 font-weight-bold welcome-msg mb-4"},[t._v(" Welcome Back ")]),e("p",{staticClass:"text-subtitle-1 grey--text"},[t._v("Please sign in to continue")])]),e(n.OQ,{staticClass:"pt-6"},[e(d.A,{ref:"form",on:{submit:function(e){return e.preventDefault(),t.handleSubmit.apply(null,arguments)}}},[e(u.A,{staticClass:"custom-field mb-4",attrs:{label:"Email",name:"email","prepend-inner-icon":"mdi-email",type:"email",filled:"",rounded:"",dense:"","error-messages":t.emailError},on:{input:function(e){t.emailError=""}},model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}}),e(u.A,{staticClass:"custom-field",attrs:{label:"Password",name:"password","prepend-inner-icon":"mdi-lock",type:t.showPassword?"text":"password","append-icon":t.showPassword?"mdi-eye":"mdi-eye-off",filled:"",rounded:"",dense:"","error-messages":t.passwordError},on:{"click:append":function(e){t.showPassword=!t.showPassword},input:function(e){t.passwordError=""}},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}}),e(i.A,{staticClass:"font-weight-bold",attrs:{block:"",color:"#a52a2a",height:"44",rounded:"",loading:t.loading,dark:""},on:{click:t.handleSubmit}},[t._v(" Sign In ")]),t.error?e(r.A,{staticClass:"mt-4",attrs:{type:"error",dense:"",text:"",dismissible:""}},[t._v(" "+t._s(t.error)+" ")]):t._e()],1)],1)],1)],1)],1)],1)},p=[],f=(s(4114),s(5353)),g={name:"LoginView",data(){return{form:{email:"",password:""},showPassword:!1,emailError:"",passwordError:"",rules:{required:t=>!!t||"This field is required",email:t=>/.+@.+\..+/.test(t)||"Please enter a valid email address"},socialLogins:[{provider:"google",icon:"mdi-google",color:"red"},{provider:"facebook",icon:"mdi-facebook",color:"blue"},{provider:"twitter",icon:"mdi-twitter",color:"light-blue"}]}},computed:{...(0,f.aH)("auth",["loading","error"])},methods:{...(0,f.i0)("auth",["login","socialLogin"]),async handleSubmit(){if(this.$refs.form.validate())try{await this.login(this.form)}catch(t){"email"===t.response?.data?.field?this.emailError=t.response.data.message:"password"===t.response?.data?.field?this.passwordError=t.response.data.message:this.error=t.response?.data?.message||"Login failed. Please try again."}},async handleSocialLogin(t){try{await this.socialLogin(t),this.$router.push("/dashboard")}catch(e){this.error=`${t} login failed. Please try again.`}}}},m=g,v=s(1656),y=(0,v.A)(m,h,p,!1,null,"1ac95045",null),b=y.exports},1965:function(t,e,s){s.d(e,{A:function(){return p}});var r=s(9375),i=s(4728),o=s(569),n=s(428),a=s(3381),l=s(5471),d=l.Ay.extend({name:"transitionable",props:{mode:String,origin:String,transition:String}}),c=s(5803),u=s(6988),h=s(4152),p=(0,c.A)(r.A,n.A,d).extend({name:"v-alert",props:{border:{type:String,validator(t){return["top","right","bottom","left"].includes(t)}},closeLabel:{type:String,default:"$vuetify.close"},coloredBorder:Boolean,dense:Boolean,dismissible:Boolean,closeIcon:{type:String,default:"$cancel"},icon:{default:"",type:[Boolean,String],validator(t){return"string"===typeof t||!1===t}},outlined:Boolean,prominent:Boolean,text:Boolean,type:{type:String,validator(t){return["info","error","success","warning"].includes(t)}},value:{type:Boolean,default:!0}},computed:{__cachedBorder(){if(!this.border)return null;let t={staticClass:"v-alert__border",class:{[`v-alert__border--${this.border}`]:!0}};return this.coloredBorder&&(t=this.setBackgroundColor(this.computedColor,t),t.class["v-alert__border--has-color"]=!0),this.$createElement("div",t)},__cachedDismissible(){if(!this.dismissible)return null;const t=this.iconColor;return this.$createElement(i.A,{staticClass:"v-alert__dismissible",props:{color:t,icon:!0,small:!0},attrs:{"aria-label":this.$vuetify.lang.t(this.closeLabel)},on:{click:()=>this.isActive=!1}},[this.$createElement(o.A,{props:{color:t}},this.closeIcon)])},__cachedIcon(){return this.computedIcon?this.$createElement(o.A,{staticClass:"v-alert__icon",props:{color:this.iconColor}},this.computedIcon):null},classes(){const t={...r.A.options.computed.classes.call(this),"v-alert--border":Boolean(this.border),"v-alert--dense":this.dense,"v-alert--outlined":this.outlined,"v-alert--prominent":this.prominent,"v-alert--text":this.text};return this.border&&(t[`v-alert--border-${this.border}`]=!0),t},computedColor(){return this.color||this.type},computedIcon(){return!1!==this.icon&&("string"===typeof this.icon&&this.icon?this.icon:!!["error","info","success","warning"].includes(this.type)&&`$${this.type}`)},hasColoredIcon(){return this.hasText||Boolean(this.border)&&this.coloredBorder},hasText(){return this.text||this.outlined},iconColor(){return this.hasColoredIcon?this.computedColor:void 0},isDark(){return!(!this.type||this.coloredBorder||this.outlined)||a.A.options.computed.isDark.call(this)}},created(){this.$attrs.hasOwnProperty("outline")&&(0,u.q4)("outline","outlined",this)},methods:{genWrapper(){const t=[(0,h.$c)(this,"prepend")||this.__cachedIcon,this.genContent(),this.__cachedBorder,(0,h.$c)(this,"append"),this.$scopedSlots.close?this.$scopedSlots.close({toggle:this.toggle}):this.__cachedDismissible],e={staticClass:"v-alert__wrapper"};return this.$createElement("div",e,t)},genContent(){return this.$createElement("div",{staticClass:"v-alert__content"},(0,h.$c)(this))},genAlert(){let t={staticClass:"v-alert",attrs:{role:"alert"},on:this.listeners$,class:this.classes,style:this.styles,directives:[{name:"show",value:this.isActive}]};if(!this.coloredBorder){const e=this.hasText?this.setTextColor:this.setBackgroundColor;t=e(this.computedColor,t)}return this.$createElement("div",t,[this.genWrapper()])},toggle(){this.isActive=!this.isActive}},render(t){const e=this.genAlert();return this.transition?t("transition",{props:{name:this.transition,origin:this.origin,mode:this.mode}},[e]):e}})},4728:function(t,e,s){var r=s(3740);e.A=r.A},174:function(t,e,s){s(4114);var r=s(5803),i=s(7717),o=s(7540),n=s(4152);e.A=(0,r.A)(i.A,(0,o.G)("form")).extend({name:"v-form",provide(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:()=>({inputs:[],watchers:[],errorBag:{}}),watch:{errorBag:{handler(t){const e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput(t){const e=t=>t.$watch("hasError",(e=>{this.$set(this.errorBag,t._uid,e)}),{immediate:!0}),s={_uid:t._uid,valid:()=>{},shouldValidate:()=>{}};return this.lazyValidation?s.shouldValidate=t.$watch("shouldValidate",(r=>{r&&(this.errorBag.hasOwnProperty(t._uid)||(s.valid=e(t)))})):s.valid=e(t),s},validate(){return 0===this.inputs.filter((t=>!t.validate(!0))).length},reset(){this.inputs.forEach((t=>t.reset())),this.resetErrorBag()},resetErrorBag(){this.lazyValidation&&setTimeout((()=>{this.errorBag={}}),0)},resetValidation(){this.inputs.forEach((t=>t.resetValidation())),this.resetErrorBag()},register(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister(t){const e=this.inputs.find((e=>e._uid===t._uid));if(!e)return;const s=this.watchers.find((t=>t._uid===e._uid));s&&(s.valid(),s.shouldValidate()),this.watchers=this.watchers.filter((t=>t._uid!==e._uid)),this.inputs=this.inputs.filter((t=>t._uid!==e._uid)),this.$delete(this.errorBag,e._uid)}},render(t){return t("form",{staticClass:"v-form",attrs:{novalidate:!0,...this.attrs$},on:{submit:t=>this.$emit("submit",t)}},(0,n.$c)(this))}})},4414:function(t,e,s){s(4114),s(125);var r=s(5471),i=s(8041),o=s(4152);const n=["sm","md","lg","xl"],a=(()=>n.reduce(((t,e)=>(t[e]={type:[Boolean,String,Number],default:!1},t)),{}))(),l=(()=>n.reduce(((t,e)=>(t["offset"+(0,o.Zb)(e)]={type:[String,Number],default:null},t)),{}))(),d=(()=>n.reduce(((t,e)=>(t["order"+(0,o.Zb)(e)]={type:[String,Number],default:null},t)),{}))(),c={col:Object.keys(a),offset:Object.keys(l),order:Object.keys(d)};function u(t,e,s){let r=t;if(null!=s&&!1!==s){if(e){const s=e.replace(t,"");r+=`-${s}`}return"col"!==t||""!==s&&!0!==s?(r+=`-${s}`,r.toLowerCase()):r.toLowerCase()}}const h=new Map;e.A=r.Ay.extend({name:"v-col",functional:!0,props:{cols:{type:[Boolean,String,Number],default:!1},...a,offset:{type:[String,Number],default:null},...l,order:{type:[String,Number],default:null},...d,alignSelf:{type:String,default:null,validator:t=>["auto","start","end","center","baseline","stretch"].includes(t)},tag:{type:String,default:"div"}},render(t,{props:e,data:s,children:r,parent:o}){let n="";for(const i in e)n+=String(e[i]);let a=h.get(n);if(!a){let t;for(t in a=[],c)c[t].forEach((s=>{const r=e[s],i=u(t,s,r);i&&a.push(i)}));const s=a.some((t=>t.startsWith("col-")));a.push({col:!s||!e.cols,[`col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),h.set(n,a)}return t(e.tag,(0,i.Ay)(s,{class:a}),r)}})},2756:function(t,e,s){s(4114),s(125);var r=s(5471),i=s(8041),o=s(4152);const n=["sm","md","lg","xl"],a=["start","end","center"];function l(t,e){return n.reduce(((s,r)=>(s[t+(0,o.Zb)(r)]=e(),s)),{})}const d=t=>[...a,"baseline","stretch"].includes(t),c=l("align",(()=>({type:String,default:null,validator:d}))),u=t=>[...a,"space-between","space-around"].includes(t),h=l("justify",(()=>({type:String,default:null,validator:u}))),p=t=>[...a,"space-between","space-around","stretch"].includes(t),f=l("alignContent",(()=>({type:String,default:null,validator:p}))),g={align:Object.keys(c),justify:Object.keys(h),alignContent:Object.keys(f)},m={align:"align",justify:"justify",alignContent:"align-content"};function v(t,e,s){let r=m[t];if(null!=s){if(e){const s=e.replace(t,"");r+=`-${s}`}return r+=`-${s}`,r.toLowerCase()}}const y=new Map;e.A=r.Ay.extend({name:"v-row",functional:!0,props:{tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:d},...c,justify:{type:String,default:null,validator:u},...h,alignContent:{type:String,default:null,validator:p},...f},render(t,{props:e,data:s,children:r}){let o="";for(const i in e)o+=String(e[i]);let n=y.get(o);if(!n){let t;for(t in n=[],g)g[t].forEach((s=>{const r=e[s],i=v(t,s,r);i&&n.push(i)}));n.push({"no-gutters":e.noGutters,"row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),y.set(o,n)}return t(e.tag,(0,i.Ay)(s,{staticClass:"row",class:n}),r)}})}}]);
//# sourceMappingURL=803.9b6d2e7c.js.map