(()=>{var e={};e.id=3126,e.ids=[3126],e.modules={53524:e=>{"use strict";e.exports=require("@prisma/client")},67096:e=>{"use strict";e.exports=require("bcrypt")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},79348:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},30412:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},27790:e=>{"use strict";e.exports=require("assert")},78893:e=>{"use strict";e.exports=require("buffer")},84770:e=>{"use strict";e.exports=require("crypto")},17702:e=>{"use strict";e.exports=require("events")},32615:e=>{"use strict";e.exports=require("http")},35240:e=>{"use strict";e.exports=require("https")},86624:e=>{"use strict";e.exports=require("querystring")},17360:e=>{"use strict";e.exports=require("url")},21764:e=>{"use strict";e.exports=require("util")},71568:e=>{"use strict";e.exports=require("zlib")},18265:(e,r,t)=>{"use strict";t.r(r),t.d(r,{patchFetch:()=>g,routeModule:()=>l,serverHooks:()=>w,workAsyncStorage:()=>k,workUnitAsyncStorage:()=>_});var s={};t.r(s),t.d(s,{GET:()=>p});var i=t(52412),a=t(14293),n=t(94147),o=t(77856),d=t(3089),c=t(11820),u=t(97802);async function p(e){try{let r=await (0,c.getServerSession)(u.L),{searchParams:t}=new URL(e.url),s=parseInt(t.get("limit")||"20",10),i=parseInt(t.get("cursor")||"0",10),a=t.get("sortOrder")||"desc",n=t.get("card"),p={version:0};if(n&&(p.OR=[{deckCards:n},{deckCards:{startsWith:`${n},`}},{deckCards:{endsWith:`,${n}`}},{deckCards:{contains:`,${n},`}}]),!["asc","desc"].includes(a))return o.NextResponse.json({message:"无效的排序顺序"},{status:400});let l=await d._.deck.findMany({where:p}),k=await d._.deck.findMany({where:p,orderBy:{createdAt:a},skip:i,take:s}),_=i,w=!1;l.length>s&&(_=i+s),i+s>l.length&&(w=!0);let g=k.map(e=>e.id),m=await d._.deckUser.groupBy({by:["deckId"],_count:{deckId:!0},where:{deckId:{in:g}}}),h=new Map;m.forEach(e=>{h.set(e.deckId,e._count.deckId||0)});let v=await d._.deckRating.groupBy({by:["deckId"],_avg:{rating:!0},where:{deckId:{in:g}}}),y=new Map;v.forEach(e=>{y.set(e.deckId,e._avg.rating||0)});let x=await d._.deckUser.groupBy({by:["deckId"],_count:{deckId:!0},where:{deckId:{in:g}}}),I=new Map;x.forEach(e=>{I.set(e.deckId,e._count.deckId||0)});let f=new Set;if(r?.user?.id){let e=await d._.deckUser.findMany({where:{userId:r.user.id,deckId:{in:g}},select:{deckId:!0}});f=new Set(e.map(e=>e.deckId))}let E=new Map;k.forEach(e=>{E.set(e.id,e)});let q={decks:k.map(e=>{let r=E.get(e.id),t=I.get(e.id)||0,s=y.get(e.id)||0,i=f.has(e.id);return{...r,isSaved:i,usageCount:t,averageRating:s}}),nextCursor:_,endCursor:w};return o.NextResponse.json(q)}catch(e){return console.error("Error fetching Decks:",e),o.NextResponse.json({message:"获取牌组失败"},{status:500})}}let l=new i.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/decks/list/route",pathname:"/api/decks/list",filename:"route",bundlePath:"app/api/decks/list/route"},resolvedPagePath:"D:\\MyCode\\GameMantine\\app\\api\\decks\\list\\route.ts",nextConfigOutput:"",userland:s}),{workAsyncStorage:k,workUnitAsyncStorage:_,serverHooks:w}=l;function g(){return(0,n.patchFetch)({workAsyncStorage:k,workUnitAsyncStorage:_})}},35303:()=>{},97802:(e,r,t)=>{"use strict";t.d(r,{L:()=>u});var s=t(62346),i=t(23429),a=t(85085),n=t(13584),o=t(3089),d=t(67096),c=t.n(d);let u={providers:[(0,s.Z)({clientId:process.env.GOOGLE_CLIENT_ID,clientSecret:process.env.GOOGLE_CLIENT_SECRET}),(0,i.Z)({clientId:process.env.FACEBOOK_CLIENT_ID,clientSecret:process.env.FACEBOOK_CLIENT_SECRET}),(0,a.Z)({name:"Credentials",credentials:{email:{label:"电子邮件",type:"email",placeholder:"your@email.com"},password:{label:"密码",type:"password"}},async authorize(e,r){if(!e?.email||!e.password)return null;let t=await o._.user.findUnique({where:{email:e.email}});if(t&&t.password){if(!t.emailVerified)throw Error("請先驗證您的電子郵件");if(await c().compare(e.password,t.password))return t}return null}})],adapter:(0,n.N)(o._),session:{strategy:"jwt"},callbacks:{jwt:async({token:e,user:r})=>(r&&(e.id=r.id),e),session:async({session:e,token:r})=>(r&&e.user&&(e.user.id=r.id),e),async signIn({user:e,account:r,profile:t}){if(r?.provider==="google"||r?.provider==="facebook"){if(!e.email)return!1;let t=await o._.user.findUnique({where:{email:e.email},include:{accounts:!0}});t?(t.accounts.some(e=>e.provider===r.provider&&e.providerAccountId===r.providerAccountId)||await o._.account.create({data:{userId:t.id,type:r.type,provider:r.provider,providerAccountId:r.providerAccountId,refresh_token:r.refresh_token,access_token:r.access_token,expires_at:r.expires_at,token_type:r.token_type,scope:r.scope,id_token:r.id_token,session_state:r.session_state}}),t.email&&!t.emailVerified&&await o._.user.update({where:{email:t.email},data:{emailVerified:new Date}})):await o._.user.create({data:{email:e.email,name:e.name||null,emailVerified:new Date,accounts:{create:{type:r.type,provider:r.provider,providerAccountId:r.providerAccountId,refresh_token:r.refresh_token,access_token:r.access_token,expires_at:r.expires_at,token_type:r.token_type,scope:r.scope,id_token:r.id_token,session_state:r.session_state}}}})}return!0}},pages:{signIn:"/login"},secret:process.env.NEXTAUTH_SECRET,logger:{error(e,r){console.error("NextAuth error:",e,r)},warn(e){console.warn("NextAuth warning:",e)},debug(e,r){console.debug("NextAuth debug:",e,r)}}}},3089:(e,r,t)=>{"use strict";t.d(r,{_:()=>i});var s=t(53524);let i=global.prisma||new s.PrismaClient({log:["query","info","warn","error"]})}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[4147,9908,8814],()=>t(18265));module.exports=s})();