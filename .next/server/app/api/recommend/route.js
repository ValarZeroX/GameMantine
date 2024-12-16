(()=>{var e={};e.id=2653,e.ids=[2653],e.modules={53524:e=>{"use strict";e.exports=require("@prisma/client")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},79348:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},30412:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},27506:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>g,routeModule:()=>d,serverHooks:()=>f,workAsyncStorage:()=>l,workUnitAsyncStorage:()=>m});var s={};r.r(s),r.d(s,{GET:()=>c,POST:()=>p});var n=r(52412),a=r(14293),o=r(94147),i=r(77856),u=r(3089);async function c(e){try{let{searchParams:t}=new URL(e.url),r=t.get("userId"),s=t.get("set");if(!r||!s)return i.NextResponse.json({message:"缺少必要參數"},{status:400});let n=await u._.favoriteCard.findUnique({where:{userId_set:{userId:r,set:s}}});if(!n)return i.NextResponse.json({message:"未找到收藏的卡牌数据"},{status:404});return i.NextResponse.json({success:!0,favoriteCard:n},{status:200})}catch(e){return console.error("Error retrieving favorite cards:",e),i.NextResponse.json({message:"伺服器錯誤"},{status:500})}}async function p(e){try{let{userId:t,cards:r,set:s}=await e.json();if(!t||!r||!s)return i.NextResponse.json({message:"缺少必要參數"},{status:400});if(!Array.isArray(r)||!r.every(e=>"string"==typeof e))return i.NextResponse.json({message:"cards 參數格式部正確"},{status:400});let n=await u._.favoriteCard.upsert({where:{userId_set:{userId:t,set:s}},update:{mycards:r},create:{userId:t,set:s,mycards:r}});return i.NextResponse.json({success:!0,favoriteCard:n},{status:200})}catch(e){return console.error("Error saving favorite cards:",e),i.NextResponse.json({message:"伺服器錯誤"},{status:500})}}let d=new n.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/recommend/route",pathname:"/api/recommend",filename:"route",bundlePath:"app/api/recommend/route"},resolvedPagePath:"D:\\MyCode\\GameMantine\\app\\api\\recommend\\route.ts",nextConfigOutput:"",userland:s}),{workAsyncStorage:l,workUnitAsyncStorage:m,serverHooks:f}=d;function g(){return(0,o.patchFetch)({workAsyncStorage:l,workUnitAsyncStorage:m})}},35303:()=>{},3089:(e,t,r)=>{"use strict";r.d(t,{_:()=>n});var s=r(53524);let n=global.prisma||new s.PrismaClient({log:["query","info","warn","error"]})},21152:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"ReflectAdapter",{enumerable:!0,get:function(){return r}});class r{static get(e,t,r){let s=Reflect.get(e,t,r);return"function"==typeof s?s.bind(e):s}static set(e,t,r,s){return Reflect.set(e,t,r,s)}static has(e,t){return Reflect.has(e,t)}static deleteProperty(e,t){return Reflect.deleteProperty(e,t)}}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[4147,8814],()=>r(27506));module.exports=s})();