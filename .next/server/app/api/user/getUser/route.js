(()=>{var e={};e.id=2330,e.ids=[2330],e.modules={53524:e=>{"use strict";e.exports=require("@prisma/client")},67096:e=>{"use strict";e.exports=require("bcrypt")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},79348:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},30412:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},27790:e=>{"use strict";e.exports=require("assert")},78893:e=>{"use strict";e.exports=require("buffer")},84770:e=>{"use strict";e.exports=require("crypto")},17702:e=>{"use strict";e.exports=require("events")},32615:e=>{"use strict";e.exports=require("http")},35240:e=>{"use strict";e.exports=require("https")},86624:e=>{"use strict";e.exports=require("querystring")},17360:e=>{"use strict";e.exports=require("url")},21764:e=>{"use strict";e.exports=require("util")},71568:e=>{"use strict";e.exports=require("zlib")},62802:(e,r,t)=>{"use strict";t.r(r),t.d(r,{patchFetch:()=>v,routeModule:()=>l,serverHooks:()=>x,workAsyncStorage:()=>_,workUnitAsyncStorage:()=>m});var s={};t.r(s),t.d(s,{GET:()=>d});var i=t(52412),o=t(14293),a=t(94147),n=t(77856),u=t(11820),p=t(97802),c=t(3089);async function d(e){let r=await (0,u.getServerSession)(p.L);if(!r||!r.user?.id)return n.NextResponse.json({error:"未授權"},{status:401});try{let e=await c._.user.findUnique({where:{id:r.user.id},select:{id:!0,name:!0,email:!0,image:!0,pokemonId:!0}});if(!e)return n.NextResponse.json({error:"使用者未找到"},{status:404});return n.NextResponse.json({user:e},{status:200})}catch(e){return console.error("取使用者資料失败:",e),n.NextResponse.json({error:"取使用者資料失败"},{status:500})}}let l=new i.AppRouteRouteModule({definition:{kind:o.RouteKind.APP_ROUTE,page:"/api/user/getUser/route",pathname:"/api/user/getUser",filename:"route",bundlePath:"app/api/user/getUser/route"},resolvedPagePath:"D:\\MyCode\\GameMantine\\app\\api\\user\\getUser\\route.ts",nextConfigOutput:"",userland:s}),{workAsyncStorage:_,workUnitAsyncStorage:m,serverHooks:x}=l;function v(){return(0,a.patchFetch)({workAsyncStorage:_,workUnitAsyncStorage:m})}},35303:()=>{},97802:(e,r,t)=>{"use strict";t.d(r,{L:()=>c});var s=t(62346),i=t(23429),o=t(85085),a=t(13584),n=t(3089),u=t(67096),p=t.n(u);let c={providers:[(0,s.Z)({clientId:process.env.GOOGLE_CLIENT_ID,clientSecret:process.env.GOOGLE_CLIENT_SECRET}),(0,i.Z)({clientId:process.env.FACEBOOK_CLIENT_ID,clientSecret:process.env.FACEBOOK_CLIENT_SECRET}),(0,o.Z)({name:"Credentials",credentials:{email:{label:"电子邮件",type:"email",placeholder:"your@email.com"},password:{label:"密码",type:"password"}},async authorize(e,r){if(!e?.email||!e.password)return null;let t=await n._.user.findUnique({where:{email:e.email}});if(t&&t.password){if(!t.emailVerified)throw Error("請先驗證您的電子郵件");if(await p().compare(e.password,t.password))return t}return null}})],adapter:(0,a.N)(n._),session:{strategy:"jwt"},callbacks:{jwt:async({token:e,user:r})=>(r&&(e.id=r.id),e),session:async({session:e,token:r})=>(r&&e.user&&(e.user.id=r.id),e),async signIn({user:e,account:r,profile:t}){if(r?.provider==="google"||r?.provider==="facebook"){if(!e.email)return!1;let t=await n._.user.findUnique({where:{email:e.email},include:{accounts:!0}});t?(t.accounts.some(e=>e.provider===r.provider&&e.providerAccountId===r.providerAccountId)||await n._.account.create({data:{userId:t.id,type:r.type,provider:r.provider,providerAccountId:r.providerAccountId,refresh_token:r.refresh_token,access_token:r.access_token,expires_at:r.expires_at,token_type:r.token_type,scope:r.scope,id_token:r.id_token,session_state:r.session_state}}),t.email&&!t.emailVerified&&await n._.user.update({where:{email:t.email},data:{emailVerified:new Date}})):await n._.user.create({data:{email:e.email,name:e.name||null,emailVerified:new Date,accounts:{create:{type:r.type,provider:r.provider,providerAccountId:r.providerAccountId,refresh_token:r.refresh_token,access_token:r.access_token,expires_at:r.expires_at,token_type:r.token_type,scope:r.scope,id_token:r.id_token,session_state:r.session_state}}}})}return!0}},pages:{signIn:"/login"},secret:process.env.NEXTAUTH_SECRET,logger:{error(e,r){console.error("NextAuth error:",e,r)},warn(e){console.warn("NextAuth warning:",e)},debug(e,r){console.debug("NextAuth debug:",e,r)}}}},3089:(e,r,t)=>{"use strict";t.d(r,{_:()=>i});var s=t(53524);let i=global.prisma||new s.PrismaClient({log:["query","info","warn","error"]})}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[4147,9908,8814],()=>t(62802));module.exports=s})();