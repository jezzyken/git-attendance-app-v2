if(!self.define){let s,l={};const n=(n,i)=>(n=new URL(n+".js",i).href,l[n]||new Promise((l=>{if("document"in self){const s=document.createElement("script");s.src=n,s.onload=l,document.head.appendChild(s)}else s=n,importScripts(n),l()})).then((()=>{let s=l[n];if(!s)throw new Error(`Module ${n} didn’t register its module`);return s})));self.define=(i,e)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(l[r])return;let u={};const c=s=>n(s,r),o={module:{uri:r},exports:u,require:c};l[r]=Promise.all(i.map((s=>o[s]||c(s)))).then((s=>(e(...s),u)))}}define(["./workbox-6567b62a"],(function(s){"use strict";s.setCacheNameDetails({prefix:"client"}),self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"/css/165.c066eafb.css",revision:null},{url:"/css/2.f074ebdb.css",revision:null},{url:"/css/200.7088f8bd.css",revision:null},{url:"/css/216.fd9e7df3.css",revision:null},{url:"/css/217.b64485f9.css",revision:null},{url:"/css/239.faeb1fc7.css",revision:null},{url:"/css/284.1fcb36d5.css",revision:null},{url:"/css/293.d095034b.css",revision:null},{url:"/css/313.37250d44.css",revision:null},{url:"/css/347.1f576fbb.css",revision:null},{url:"/css/351.6b3593c5.css",revision:null},{url:"/css/394.47e1d5dc.css",revision:null},{url:"/css/415.e7ff96fc.css",revision:null},{url:"/css/449.b11aab75.css",revision:null},{url:"/css/516.3fb86192.css",revision:null},{url:"/css/57.7f0bb513.css",revision:null},{url:"/css/757.a7961344.css",revision:null},{url:"/css/803.44e02de1.css",revision:null},{url:"/css/82.6b3593c5.css",revision:null},{url:"/css/84.c411e70b.css",revision:null},{url:"/css/chunk-vendors.ca977ff1.css",revision:null},{url:"/fonts/materialdesignicons-webfont.0766edc9.eot",revision:null},{url:"/fonts/materialdesignicons-webfont.714a4eee.ttf",revision:null},{url:"/fonts/materialdesignicons-webfont.e659bf56.woff",revision:null},{url:"/fonts/materialdesignicons-webfont.fbaef2a9.woff2",revision:null},{url:"/index.html",revision:"7f25b181cdccf5306295d5ba2cd0f42e"},{url:"/js/165.db9888cd.js",revision:null},{url:"/js/168.dc5bf276.js",revision:null},{url:"/js/2.b5c5a2eb.js",revision:null},{url:"/js/200.abc6a680.js",revision:null},{url:"/js/216.e40dcb21.js",revision:null},{url:"/js/217.f9502a0e.js",revision:null},{url:"/js/218.5c1d8afc.js",revision:null},{url:"/js/239.88b75e72.js",revision:null},{url:"/js/284.96ea303b.js",revision:null},{url:"/js/293.df4a2dce.js",revision:null},{url:"/js/313.de09c702.js",revision:null},{url:"/js/347.ec4335c0.js",revision:null},{url:"/js/351.a67fcaba.js",revision:null},{url:"/js/354.c167d4b3.js",revision:null},{url:"/js/363.d451ab32.js",revision:null},{url:"/js/394.991da09c.js",revision:null},{url:"/js/415.df36c199.js",revision:null},{url:"/js/449.8a6225ef.js",revision:null},{url:"/js/480.cdcbf6cf.js",revision:null},{url:"/js/516.d34a9f5f.js",revision:null},{url:"/js/57.acbb3afb.js",revision:null},{url:"/js/757.d42d88fa.js",revision:null},{url:"/js/803.9b6d2e7c.js",revision:null},{url:"/js/818.956d8632.js",revision:null},{url:"/js/82.0ddacf5f.js",revision:null},{url:"/js/838.97f902f2.js",revision:null},{url:"/js/84.eddcb88a.js",revision:null},{url:"/js/app.e898c9ad.js",revision:null},{url:"/js/chunk-vendors.e31780b7.js",revision:null},{url:"/manifest.json",revision:"8eff00fb23e5046e8587fb699e79e093"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
