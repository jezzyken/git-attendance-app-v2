if(!self.define){let s,l={};const n=(n,i)=>(n=new URL(n+".js",i).href,l[n]||new Promise((l=>{if("document"in self){const s=document.createElement("script");s.src=n,s.onload=l,document.head.appendChild(s)}else s=n,importScripts(n),l()})).then((()=>{let s=l[n];if(!s)throw new Error(`Module ${n} didn’t register its module`);return s})));self.define=(i,e)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(l[r])return;let u={};const o=s=>n(s,r),c={module:{uri:r},exports:u,require:o};l[r]=Promise.all(i.map((s=>c[s]||o(s)))).then((s=>(e(...s),u)))}}define(["./workbox-6567b62a"],(function(s){"use strict";s.setCacheNameDetails({prefix:"client"}),self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"/css/147.b091e2ed.css",revision:null},{url:"/css/165.c066eafb.css",revision:null},{url:"/css/2.f074ebdb.css",revision:null},{url:"/css/200.7088f8bd.css",revision:null},{url:"/css/221.17b4bd9f.css",revision:null},{url:"/css/284.1fcb36d5.css",revision:null},{url:"/css/293.bf94a50f.css",revision:null},{url:"/css/296.f6a3e06f.css",revision:null},{url:"/css/347.231fc3a1.css",revision:null},{url:"/css/351.d331673b.css",revision:null},{url:"/css/356.a91d4411.css",revision:null},{url:"/css/397.9a54900a.css",revision:null},{url:"/css/516.3fb86192.css",revision:null},{url:"/css/681.2a0b2bc5.css",revision:null},{url:"/css/757.a7961344.css",revision:null},{url:"/css/769.d331673b.css",revision:null},{url:"/css/803.44e02de1.css",revision:null},{url:"/css/811.3855c279.css",revision:null},{url:"/css/848.264d971a.css",revision:null},{url:"/css/902.7d216282.css",revision:null},{url:"/css/903.ccff0301.css",revision:null},{url:"/css/921.6b1501e6.css",revision:null},{url:"/css/949.12cc5a50.css",revision:null},{url:"/css/chunk-vendors.ca977ff1.css",revision:null},{url:"/fonts/materialdesignicons-webfont.0766edc9.eot",revision:null},{url:"/fonts/materialdesignicons-webfont.714a4eee.ttf",revision:null},{url:"/fonts/materialdesignicons-webfont.e659bf56.woff",revision:null},{url:"/fonts/materialdesignicons-webfont.fbaef2a9.woff2",revision:null},{url:"/index.html",revision:"958790229773b48b586254e3d9ebb446"},{url:"/js/147.7a33dc9a.js",revision:null},{url:"/js/165.e8d1e06f.js",revision:null},{url:"/js/2.8f8abe36.js",revision:null},{url:"/js/200.88087502.js",revision:null},{url:"/js/218.a505bedc.js",revision:null},{url:"/js/246.bc4f7ec5.js",revision:null},{url:"/js/284.03b7b326.js",revision:null},{url:"/js/293.8e75a59f.js",revision:null},{url:"/js/296.f9388b40.js",revision:null},{url:"/js/347.f295dbbe.js",revision:null},{url:"/js/351.27af4976.js",revision:null},{url:"/js/354.c167d4b3.js",revision:null},{url:"/js/356.47885147.js",revision:null},{url:"/js/363.58139853.js",revision:null},{url:"/js/397.bc8f20f1.js",revision:null},{url:"/js/434.dc5cd773.js",revision:null},{url:"/js/446.d4da41d8.js",revision:null},{url:"/js/480.7cc33277.js",revision:null},{url:"/js/516.0b558dd2.js",revision:null},{url:"/js/681.f6798030.js",revision:null},{url:"/js/757.d0c55ddb.js",revision:null},{url:"/js/769.3b769e55.js",revision:null},{url:"/js/803.bdada8a2.js",revision:null},{url:"/js/811.c1c6448b.js",revision:null},{url:"/js/814.11318e7a.js",revision:null},{url:"/js/818.a46a9e08.js",revision:null},{url:"/js/838.97f902f2.js",revision:null},{url:"/js/848.ea9e0757.js",revision:null},{url:"/js/902.5117a72f.js",revision:null},{url:"/js/903.ca2b156b.js",revision:null},{url:"/js/app.683e80af.js",revision:null},{url:"/js/chunk-vendors.ba20cdea.js",revision:null},{url:"/manifest.json",revision:"8eff00fb23e5046e8587fb699e79e093"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
