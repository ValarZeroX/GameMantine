(()=>{var e={};e.id=3519,e.ids=[3519],e.modules={53524:e=>{"use strict";e.exports=require("@prisma/client")},67096:e=>{"use strict";e.exports=require("bcrypt")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},79348:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},30412:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},27790:e=>{"use strict";e.exports=require("assert")},78893:e=>{"use strict";e.exports=require("buffer")},84770:e=>{"use strict";e.exports=require("crypto")},17702:e=>{"use strict";e.exports=require("events")},32615:e=>{"use strict";e.exports=require("http")},35240:e=>{"use strict";e.exports=require("https")},86624:e=>{"use strict";e.exports=require("querystring")},17360:e=>{"use strict";e.exports=require("url")},21764:e=>{"use strict";e.exports=require("util")},71568:e=>{"use strict";e.exports=require("zlib")},6914:(e,r,s)=>{"use strict";s.r(r),s.d(r,{patchFetch:()=>g,routeModule:()=>w,serverHooks:()=>k,workAsyncStorage:()=>_,workUnitAsyncStorage:()=>x});var t={};s.r(t),s.d(t,{DELETE:()=>m,GET:()=>p,POST:()=>l});var i=s(52412),a=s(14293),o=s(94147),n=s(77856),u=s(11820),d=s(97802),c=s(3089);async function p(e,{params:r}){try{let{id:e}=await r,s=await (0,u.getServerSession)(d.L);if(!s?.user?.id)return n.NextResponse.json({message:"未授權"},{status:401});let t=await c._.deckUser.findFirst({where:{userId:s.user.id,deckId:e}});return n.NextResponse.json({isSaved:!!t},{status:200})}catch(e){return console.error("Error updating DeckUser:",e),n.NextResponse.json({message:"更新牌組失敗"},{status:500})}}async function l(e,{params:r}){try{let{id:s}=await r,t=await (0,u.getServerSession)(d.L);if(!t?.user?.id)return n.NextResponse.json({message:"未授權"},{status:401});let{deckName:i}=await e.json();if(!await c._.deckUser.findFirst({where:{userId:t.user.id,deckId:s}}))return await c._.deckUser.create({data:{userId:t.user.id,deckId:s,deckName:i}}),n.NextResponse.json({message:"牌組已儲存"},{status:200});return n.NextResponse.json({message:"牌組已儲存"},{status:200})}catch(e){return n.NextResponse.json({message:"更新牌組失敗"},{status:500})}}async function m(e,{params:r}){try{let{id:e}=await r,s=await (0,u.getServerSession)(d.L);if(!s?.user?.id)return n.NextResponse.json({message:"未授權"},{status:401});let t=await c._.deckUser.findFirst({where:{userId:s.user.id,deckId:e}});if(t)return await c._.deckUser.delete({where:{id:t.id}}),n.NextResponse.json({message:"牌組已刪除"},{status:200});return n.NextResponse.json({message:"牌組未找到"},{status:404})}catch(e){return n.NextResponse.json({message:"刪除牌組失敗"},{status:500})}}let w=new i.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/decks/[id]/route",pathname:"/api/decks/[id]",filename:"route",bundlePath:"app/api/decks/[id]/route"},resolvedPagePath:"D:\\MyCode\\GameMantine\\app\\api\\decks\\[id]\\route.ts",nextConfigOutput:"",userland:t}),{workAsyncStorage:_,workUnitAsyncStorage:x,serverHooks:k}=w;function g(){return(0,o.patchFetch)({workAsyncStorage:_,workUnitAsyncStorage:x})}},35303:()=>{},97802:(e,r,s)=>{"use strict";s.d(r,{L:()=>c});var t=s(62346),i=s(23429),a=s(85085),o=s(13584),n=s(3089),u=s(67096),d=s.n(u);let c={providers:[(0,t.Z)({clientId:process.env.GOOGLE_CLIENT_ID,clientSecret:process.env.GOOGLE_CLIENT_SECRET}),(0,i.Z)({clientId:process.env.FACEBOOK_CLIENT_ID,clientSecret:process.env.FACEBOOK_CLIENT_SECRET}),(0,a.Z)({name:"Credentials",credentials:{email:{label:"电子邮件",type:"email",placeholder:"your@email.com"},password:{label:"密码",type:"password"}},async authorize(e,r){if(!e?.email||!e.password)return null;let s=await n._.user.findUnique({where:{email:e.email}});if(s&&s.password){if(!s.emailVerified)throw Error("請先驗證您的電子郵件");if(await d().compare(e.password,s.password))return s}return null}})],adapter:(0,o.N)(n._),session:{strategy:"jwt"},callbacks:{jwt:async({token:e,user:r})=>(r&&(e.id=r.id),e),session:async({session:e,token:r})=>(r&&e.user&&(e.user.id=r.id),e),async signIn({user:e,account:r,profile:s}){if(r?.provider==="google"||r?.provider==="facebook"){if(!e.email)return!1;let s=await n._.user.findUnique({where:{email:e.email},include:{accounts:!0}});s?(s.accounts.some(e=>e.provider===r.provider&&e.providerAccountId===r.providerAccountId)||await n._.account.create({data:{userId:s.id,type:r.type,provider:r.provider,providerAccountId:r.providerAccountId,refresh_token:r.refresh_token,access_token:r.access_token,expires_at:r.expires_at,token_type:r.token_type,scope:r.scope,id_token:r.id_token,session_state:r.session_state}}),s.email&&!s.emailVerified&&await n._.user.update({where:{email:s.email},data:{emailVerified:new Date}})):await n._.user.create({data:{email:e.email,name:e.name||null,emailVerified:new Date,accounts:{create:{type:r.type,provider:r.provider,providerAccountId:r.providerAccountId,refresh_token:r.refresh_token,access_token:r.access_token,expires_at:r.expires_at,token_type:r.token_type,scope:r.scope,id_token:r.id_token,session_state:r.session_state}}}})}return!0}},pages:{signIn:"/login"},secret:process.env.NEXTAUTH_SECRET,logger:{error(e,r){console.error("NextAuth error:",e,r)},warn(e){console.warn("NextAuth warning:",e)},debug(e,r){console.debug("NextAuth debug:",e,r)}}}},3089:(e,r,s)=>{"use strict";s.d(r,{_:()=>i});var t=s(53524);let i=global.prisma||new t.PrismaClient({log:["query","info","warn","error"]})}};var r=require("../../../../webpack-runtime.js");r.C(e);var s=e=>r(r.s=e),t=r.X(0,[4147,9908,8814],()=>s(6914));module.exports=t})();