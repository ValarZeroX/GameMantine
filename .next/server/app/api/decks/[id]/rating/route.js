(()=>{var e={};e.id=5247,e.ids=[5247],e.modules={53524:e=>{"use strict";e.exports=require("@prisma/client")},67096:e=>{"use strict";e.exports=require("bcrypt")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},79348:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},30412:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},27790:e=>{"use strict";e.exports=require("assert")},78893:e=>{"use strict";e.exports=require("buffer")},84770:e=>{"use strict";e.exports=require("crypto")},17702:e=>{"use strict";e.exports=require("events")},32615:e=>{"use strict";e.exports=require("http")},35240:e=>{"use strict";e.exports=require("https")},86624:e=>{"use strict";e.exports=require("querystring")},17360:e=>{"use strict";e.exports=require("url")},21764:e=>{"use strict";e.exports=require("util")},71568:e=>{"use strict";e.exports=require("zlib")},69837:(e,r,t)=>{"use strict";t.r(r),t.d(r,{patchFetch:()=>x,routeModule:()=>_,serverHooks:()=>w,workAsyncStorage:()=>g,workUnitAsyncStorage:()=>m});var s={};t.r(s),t.d(s,{GET:()=>l,POST:()=>p});var i=t(52412),a=t(14293),n=t(94147),o=t(77856),u=t(11820),c=t(97802),d=t(3089);async function p(e,{params:r}){try{let{id:t}=await r,s=await (0,u.getServerSession)(c.L);if(!s||!s.user||!s.user.id)return o.NextResponse.json({message:"未授權"},{status:401});let i=s.user.id,{rating:a,comment:n}=await e.json();if("number"!=typeof a||a<0||a>5)return o.NextResponse.json({message:"評分無效"},{status:400});if(!await d._.deck.findUnique({where:{id:t}}))return o.NextResponse.json({message:"找不到該牌組"},{status:404});let p=await d._.deckRating.upsert({where:{userId_deckId:{userId:i,deckId:t}},update:{rating:a,comment:n},create:{userId:i,deckId:t,rating:a,comment:n}});return o.NextResponse.json({message:"評價已提交",deckRating:p},{status:200})}catch(e){return console.error("提交評價時發生錯誤：",e),o.NextResponse.json({message:"伺服器錯誤"},{status:500})}}async function l(e,{params:r}){try{let{id:e}=await r;if(!await d._.deck.findUnique({where:{id:e}}))return o.NextResponse.json({message:"找不到該牌組"},{status:404});let t=await d._.deckRating.aggregate({_avg:{rating:!0},where:{deckId:e}}),s=await d._.deckRating.count({where:{deckId:e}});return o.NextResponse.json({averageRating:t._avg.rating||0,ratingCount:s},{status:200})}catch(e){return console.error("獲取平均評分時發生錯誤：",e),o.NextResponse.json({message:"伺服器錯誤"},{status:500})}}let _=new i.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/decks/[id]/rating/route",pathname:"/api/decks/[id]/rating",filename:"route",bundlePath:"app/api/decks/[id]/rating/route"},resolvedPagePath:"D:\\MyCode\\GameMantine\\app\\api\\decks\\[id]\\rating\\route.ts",nextConfigOutput:"",userland:s}),{workAsyncStorage:g,workUnitAsyncStorage:m,serverHooks:w}=_;function x(){return(0,n.patchFetch)({workAsyncStorage:g,workUnitAsyncStorage:m})}},35303:()=>{},97802:(e,r,t)=>{"use strict";t.d(r,{L:()=>d});var s=t(62346),i=t(23429),a=t(85085),n=t(13584),o=t(3089),u=t(67096),c=t.n(u);let d={providers:[(0,s.Z)({clientId:process.env.GOOGLE_CLIENT_ID,clientSecret:process.env.GOOGLE_CLIENT_SECRET}),(0,i.Z)({clientId:process.env.FACEBOOK_CLIENT_ID,clientSecret:process.env.FACEBOOK_CLIENT_SECRET}),(0,a.Z)({name:"Credentials",credentials:{email:{label:"电子邮件",type:"email",placeholder:"your@email.com"},password:{label:"密码",type:"password"}},async authorize(e,r){if(!e?.email||!e.password)return null;let t=await o._.user.findUnique({where:{email:e.email}});if(t&&t.password){if(!t.emailVerified)throw Error("請先驗證您的電子郵件");if(await c().compare(e.password,t.password))return t}return null}})],adapter:(0,n.N)(o._),session:{strategy:"jwt"},callbacks:{jwt:async({token:e,user:r})=>(r&&(e.id=r.id),e),session:async({session:e,token:r})=>(r&&e.user&&(e.user.id=r.id),e),async signIn({user:e,account:r,profile:t}){if(r?.provider==="google"||r?.provider==="facebook"){if(!e.email)return!1;let t=await o._.user.findUnique({where:{email:e.email},include:{accounts:!0}});t?(t.accounts.some(e=>e.provider===r.provider&&e.providerAccountId===r.providerAccountId)||await o._.account.create({data:{userId:t.id,type:r.type,provider:r.provider,providerAccountId:r.providerAccountId,refresh_token:r.refresh_token,access_token:r.access_token,expires_at:r.expires_at,token_type:r.token_type,scope:r.scope,id_token:r.id_token,session_state:r.session_state}}),t.email&&!t.emailVerified&&await o._.user.update({where:{email:t.email},data:{emailVerified:new Date}})):await o._.user.create({data:{email:e.email,name:e.name||null,emailVerified:new Date,accounts:{create:{type:r.type,provider:r.provider,providerAccountId:r.providerAccountId,refresh_token:r.refresh_token,access_token:r.access_token,expires_at:r.expires_at,token_type:r.token_type,scope:r.scope,id_token:r.id_token,session_state:r.session_state}}}})}return!0}},pages:{signIn:"/login"},secret:process.env.NEXTAUTH_SECRET,logger:{error(e,r){console.error("NextAuth error:",e,r)},warn(e){console.warn("NextAuth warning:",e)},debug(e,r){console.debug("NextAuth debug:",e,r)}}}},3089:(e,r,t)=>{"use strict";t.d(r,{_:()=>i});var s=t(53524);let i=global.prisma||new s.PrismaClient({log:["query","info","warn","error"]})}};var r=require("../../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[4147,9908,8814],()=>t(69837));module.exports=s})();