(()=>{var e={};e.id=2866,e.ids=[2866],e.modules={53681:(e,t,s)=>{var n={"./en/ability.json":[21695,1695],"./en/common.json":[7790,7790],"./en/pokemon.json":[52763,2763],"./en/rule.json":[19166,9166],"./en/skill.json":[68591,8591],"./zh-Hans/ability.json":[47321,7321],"./zh-Hans/common.json":[26476,6476],"./zh-Hans/pokemon.json":[73407,3407],"./zh-Hans/rule.json":[59620,9620],"./zh-Hans/skill.json":[61529,1529],"./zh-Hant/ability.json":[48380,8380],"./zh-Hant/common.json":[87097,7097],"./zh-Hant/pokemon.json":[88636,8636],"./zh-Hant/rule.json":[42877,2877],"./zh-Hant/skill.json":[88227,8227]};function r(e){if(!s.o(n,e))return Promise.resolve().then(()=>{var t=Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t});var t=n[e],r=t[0];return s.e(t[1]).then(()=>s.t(r,19))}r.keys=()=>Object.keys(n),r.id=53681,e.exports=r},53524:e=>{"use strict";e.exports=require("@prisma/client")},67096:e=>{"use strict";e.exports=require("bcrypt")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},209:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},79348:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},30412:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},27790:e=>{"use strict";e.exports=require("assert")},78893:e=>{"use strict";e.exports=require("buffer")},84770:e=>{"use strict";e.exports=require("crypto")},17702:e=>{"use strict";e.exports=require("events")},32615:e=>{"use strict";e.exports=require("http")},35240:e=>{"use strict";e.exports=require("https")},55315:e=>{"use strict";e.exports=require("path")},86624:e=>{"use strict";e.exports=require("querystring")},17360:e=>{"use strict";e.exports=require("url")},21764:e=>{"use strict";e.exports=require("util")},71568:e=>{"use strict";e.exports=require("zlib")},22789:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>o.a,__next_app__:()=>m,pages:()=>d,routeModule:()=>u,tree:()=>c});var n=s(3003),r=s(14293),i=s(66550),o=s.n(i),a=s(86979),l={};for(let e in a)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>a[e]);s.d(t,l);let c=["",{children:["[lng]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,73697)),"D:\\MyCode\\GameMantine\\app\\[lng]\\page.tsx"]}]},{layout:[()=>Promise.resolve().then(s.bind(s,51028)),"D:\\MyCode\\GameMantine\\app\\[lng]\\layout.tsx"],"not-found":[()=>Promise.resolve().then(s.bind(s,20691)),"D:\\MyCode\\GameMantine\\app\\[lng]\\not-found.tsx"]}]},{"not-found":[()=>Promise.resolve().then(s.t.bind(s,52075,23)),"next/dist/client/components/not-found-error"]}],d=["D:\\MyCode\\GameMantine\\app\\[lng]\\page.tsx"],m={require:s,loadChunk:()=>Promise.resolve()},u=new n.AppPageRouteModule({definition:{kind:r.RouteKind.APP_PAGE,page:"/[lng]/page",pathname:"/[lng]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},68272:(e,t,s)=>{Promise.resolve().then(s.bind(s,46856)),Promise.resolve().then(s.bind(s,41737)),Promise.resolve().then(s.bind(s,11348)),Promise.resolve().then(s.bind(s,55987))},46856:(e,t,s)=>{"use strict";s.d(t,{default:()=>v});var n=s(68819),r=s(39299),i=s(73366),o=s(14100),a=s(51036),l=s(93610),c=s(11348),d=s(67852),m=s(20020),u=s(22887),x=s(10083),p=s(68234),h=s.n(p),j=s(24103),g=s(35047);let v=({lng:e})=>{let{t}=(0,j.$)(e,["common"]),s=(0,g.useRouter)(),p=[{title:t("common:navigation.cards"),icon:r.Z,color:"violet",href:"/cards"},{title:t("common:navigation.deck"),icon:i.Z,color:"indigo",href:"/decks/list"},{title:t("common:pokedex_collection"),icon:o.Z,color:"blue",href:"/recommend"},{title:t("common:community"),icon:a.Z,color:"blue",href:"/community/friend"}],v=e=>{s.push(e)},y=p.map(e=>(0,n.jsxs)(l.k,{className:h().item,onClick:()=>v(e.href),children:[(0,n.jsx)(e.icon,{size:32}),(0,n.jsx)(c.Text,{size:"xs",mt:7,children:e.title})]},e.title));return(0,n.jsx)(d.W,{size:"lg",children:(0,n.jsxs)(m.Z,{withBorder:!0,radius:"md",className:h().card,children:[(0,n.jsx)(u.Z,{justify:"space-between",children:(0,n.jsx)(c.Text,{className:h().title,children:t("common:feature")})}),(0,n.jsx)(x.M,{cols:3,mt:"md",children:y})]})})}},41737:(e,t,s)=>{"use strict";s.d(t,{default:()=>R});var n=s(68819),r=s(17266),i=s(28964),o=s(64058),a=s(22887),l=s(65582),c=s(91603),d=s(15700),m=s(26622),u=s(11348),x=s(61495),p=s(10773),h=s(80104),j=s(7380),g=s(41295),v=s(10128),y=s(64443);function b(){let{colorScheme:e,toggleColorScheme:t}=(0,v.X)(),[s,i]=(0,r.useState)(()=>y.Z);return(0,n.jsx)(m.A,{variant:"default","aria-label":"Toggle theme",size:"lg",onClick:()=>t(),children:(0,n.jsx)(s,{style:{width:"80%",height:"80%"},stroke:1.5})})}s(75382);var f=s(26699),k=s.n(f),_=s(35047),w=s(77109),C=s(17561),z=s(24103);let G=({opened:e,toggle:t,desktopOpened:s,toggleDesktop:r,lng:i})=>{let o=(0,_.useRouter)(),v=(0,_.usePathname)(),{data:y,status:f}=(0,w.useSession)(),{t:G}=(0,z.$)(i,["common"]),Z=e=>{o.push(e)},P=async()=>{await (0,w.signOut)({callbackUrl:"/"})},q=e=>{if(e===i)return;let t=v.split("/");C.Mj.includes(t[1])?t[1]=e:t.splice(1,0,e);let s=t.join("/")||"/";o.push(s)};return(0,n.jsxs)("div",{className:k().inner,children:[(0,n.jsxs)(a.Z,{h:"100%",px:"md",children:[(0,n.jsx)(l.O,{opened:e,onClick:t,hiddenFrom:"sm",size:"sm"}),(0,n.jsx)(l.O,{opened:s,onClick:r,visibleFrom:"sm",size:"sm"}),(0,n.jsx)(p.Z,{style:{width:(0,c.h)(36),height:(0,c.h)(36)},stroke:1.5,color:"var(--mantine-color-red-filled)"}),(0,n.jsx)("div",{children:"Pokemon Nier"})]}),(0,n.jsx)("div",{className:k().actionIcon,children:(0,n.jsxs)(a.Z,{children:[(0,n.jsx)(b,{}),(0,n.jsxs)(d.v,{withArrow:!0,children:[(0,n.jsx)(d.v.Target,{children:(0,n.jsx)(m.A,{variant:"default",size:"lg","aria-label":"Language",children:(0,n.jsx)(h.Z,{})})}),(0,n.jsxs)(d.v.Dropdown,{children:[(0,n.jsx)(d.v.Label,{children:G("common:navigation.language_selection")}),(0,n.jsx)(d.v.Item,{onClick:()=>q("en"),children:(0,n.jsx)(u.Text,{children:"English"})}),(0,n.jsx)(d.v.Item,{onClick:()=>q("zh-Hans"),children:(0,n.jsx)(u.Text,{children:"简体中文"})}),(0,n.jsx)(d.v.Item,{onClick:()=>q("zh-Hant"),children:(0,n.jsx)(u.Text,{children:"繁體中文"})})]})]}),"loading"===f?(0,n.jsx)(m.A,{variant:"default",size:"lg","aria-label":"Loading",children:(0,n.jsx)(x.a,{color:"blue"})}):y?(0,n.jsx)(m.A,{variant:"default",size:"lg","aria-label":"Logout",onClick:P,children:(0,n.jsx)(j.Z,{})}):(0,n.jsx)(m.A,{variant:"default",size:"lg","aria-label":"Login",onClick:()=>Z("/login"),children:(0,n.jsx)(g.Z,{})})]})})]})};var Z=s(52165),P=s(3484),q=s(43684),M=s(39299),S=s(73366),O=s(14100),N=s(51036),A=s(24089),T=s(94468),H=s(93610),D=s(38018),E=s(30856),F=s.n(E);let L=({})=>{let{data:e,status:t}=(0,w.useSession)();return(0,n.jsx)(H.k,{className:F().user,children:(0,n.jsxs)(a.Z,{children:[(0,n.jsx)(D.q,{radius:"xl",style:{cursor:"pointer"},name:e?.user.name??"",color:"initials"},e?.user.name??""),(0,n.jsxs)("div",{style:{flex:1},children:[(0,n.jsx)(u.Text,{size:"sm",fw:500,children:e?.user.name??""}),(0,n.jsx)(u.Text,{c:"dimmed",size:"xs",children:e?.user.email})]}),(0,n.jsx)(T.Z,{size:14,stroke:1.5})]})})};var $=s(74984),I=s.n($);let X=({lng:e})=>{let t=(0,_.useRouter)(),{data:s,status:r}=(0,w.useSession)(),{t:i}=(0,z.$)(e,["common"]),o=e=>{t.push(e)};return(0,n.jsxs)(Z.K,{justify:"space-between",h:"100%",children:[(0,n.jsxs)("nav",{children:[(0,n.jsx)(P.O,{component:"button",label:i("common:navigation.home"),leftSection:(0,n.jsx)(q.Z,{size:"1rem",stroke:1.5}),onClick:()=>o("/")}),(0,n.jsx)(P.O,{component:"button",label:i("common:navigation.cards"),leftSection:(0,n.jsx)(M.Z,{size:"1rem",stroke:1.5}),onClick:()=>o("/cards")}),(0,n.jsxs)(P.O,{component:"button",label:i("common:navigation.deck"),leftSection:(0,n.jsx)(S.Z,{size:"1rem",stroke:1.5}),children:[(0,n.jsx)(P.O,{label:i("common:navigation.deck_list"),onClick:()=>o("/decks/list")}),(0,n.jsx)(P.O,{label:i("common:navigation.create_deck"),onClick:()=>o("/decks/build")}),s&&(0,n.jsx)(P.O,{label:i("common:navigation.my_decks"),onClick:()=>o("/decks/user")})]}),(0,n.jsx)(P.O,{component:"button",label:i("common:pokedex_collection"),leftSection:(0,n.jsx)(O.Z,{size:"1rem",stroke:1.5}),onClick:()=>o("/recommend")}),(0,n.jsx)(P.O,{component:"button",label:i("common:community"),leftSection:(0,n.jsx)(N.Z,{size:"1rem",stroke:1.5}),children:(0,n.jsx)(P.O,{label:i("common:friend"),onClick:()=>o("/community/friend")})}),(0,n.jsx)(P.O,{component:"button",label:i("common:navigation.about"),leftSection:(0,n.jsx)(A.Z,{size:"1rem",stroke:1.5}),onClick:()=>o("/about")})]}),s&&(0,n.jsx)("div",{className:I().footer,onClick:()=>o("/user"),children:(0,n.jsx)(L,{})})]})};function R({children:e,lng:t}){let[s,{toggle:r}]=(0,o.q)(),[a,{toggle:l}]=(0,o.q)(!0);return(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)(i.V,{header:{height:60},navbar:{width:300,breakpoint:"sm",collapsed:{mobile:!s,desktop:!a}},padding:"md",children:[(0,n.jsx)(i.V.Header,{children:(0,n.jsx)(G,{opened:s,toggle:r,desktopOpened:a,toggleDesktop:l,lng:t})}),(0,n.jsx)(i.V.Navbar,{p:"md",children:(0,n.jsx)(X,{lng:t})}),(0,n.jsx)(i.V.Main,{children:e})]})})}},68234:e=>{e.exports={card:"ActionsGrid_card__EE60P",title:"ActionsGrid_title__R_LI5",item:"ActionsGrid_item__5q5vK"}},26699:e=>{e.exports={inner:"Header_inner__BWOOt",link:"Header_link___GWEF",actionIcon:"Header_actionIcon__d8zIz"}},74984:e=>{e.exports={footer:"NavbarNested_footer__gOMUs"}},30856:e=>{e.exports={user:"UserButton_user__IEgLw"}},79321:e=>{e.exports={title:"Welcome_title__Cz_nm"}},73697:(e,t,s)=>{"use strict";s.a(e,async(e,n)=>{try{s.r(t),s.d(t,{default:()=>d});var r=s(89351),i=s(72024),o=s(60985),a=s(38859),l=s(46061),c=e([i,o,a]);async function d({params:e}){let{lng:t}=await e,{t:s}=await (0,l.$)(t,"common");return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(a.Z,{lng:t,children:[(0,r.jsx)(i.c,{}),(0,r.jsx)(o.Z,{lng:t})]})})}[i,o,a]=c.then?(await c)():c,n()}catch(e){n(e)}})},46061:(e,t,s)=>{"use strict";s.d(t,{$:()=>l});var n=s(95131),r=s(25369),i=s(7372),o=s(24546);let a=async(e,t)=>{let a=(0,n.Fs)();return await a.use(i.D).use((0,r.Z)((e,t)=>s(53681)(`./${e}/${t}.json`))).init({...(0,o.FW)(e,t),load:"currentOnly"}),a};async function l(e,t,s={}){let n=await a(e,t);return{t:n.getFixedT(e,Array.isArray(t)?t[0]:t),i18n:n}}},60985:(e,t,s)=>{"use strict";s.a(e,async(e,n)=>{try{s.d(t,{Z:()=>e});var r=s(71851);let e=(await (0,r.createProxy)(String.raw`D:\MyCode\GameMantine\components\ActionsGrid\ActionsGrid.tsx`)).default;n()}catch(e){n(e)}},1)},38859:(e,t,s)=>{"use strict";s.a(e,async(e,n)=>{try{s.d(t,{Z:()=>e});var r=s(71851);let e=(await (0,r.createProxy)(String.raw`D:\MyCode\GameMantine\components\Layout\Layout.tsx`)).default;n()}catch(e){n(e)}},1)},72024:(e,t,s)=>{"use strict";s.a(e,async(e,n)=>{try{s.d(t,{c:()=>d});var r=s(89351),i=s(75143),o=s(79901),a=s(79321),l=s.n(a),c=e([i,o]);function d(){return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(i.D,{className:l().title,ta:"center",mt:100,children:["Welcome to"," ",(0,r.jsx)(o.x,{inherit:!0,variant:"gradient",component:"span",gradient:{from:"pink",to:"yellow"},children:"Pokemon Nier"})]})})}[i,o]=c.then?(await c)():c,n()}catch(e){n(e)}})},20020:(e,t,s)=>{"use strict";s.d(t,{Z:()=>y});var n=s(68819),r=s(17266),i=s(95540),o=s(7755),a=s(4531),l=s(89655),c=s(11115),d=s(64414);let[m,u]=(0,s(99109).R)("Card component was not found in tree");var x=s(48013),p={root:"m_e615b15f",section:"m_599a2148"};let h={},j=(0,c.b)((e,t)=>{let{classNames:s,className:r,style:i,styles:o,vars:l,withBorder:c,inheritPadding:d,mod:m,...p}=(0,a.w)("CardSection",h,e),j=u();return(0,n.jsx)(x.x,{ref:t,mod:[{"with-border":c,"inherit-padding":d},m],...j.getStyles("section",{className:r,style:i,styles:o,classNames:s}),...p})});j.classes=p,j.displayName="@mantine/core/CardSection";let g={},v=(0,o.Z)((e,{padding:t})=>({root:{"--card-padding":(0,i.bG)(t)}})),y=(0,c.b)((e,t)=>{let s=(0,a.w)("Card",g,e),{classNames:i,className:o,style:c,styles:u,unstyled:x,vars:h,children:y,padding:b,...f}=s,k=(0,l.y)({name:"Card",props:s,classes:p,className:o,style:c,classNames:i,styles:u,unstyled:x,vars:h,varsResolver:v}),_=r.Children.toArray(y),w=_.map((e,t)=>"object"==typeof e&&e&&"type"in e&&e.type===j?(0,r.cloneElement)(e,{"data-first-section":0===t||void 0,"data-last-section":t===_.length-1||void 0}):e);return(0,n.jsx)(m,{value:{getStyles:k},children:(0,n.jsx)(d.X,{ref:t,unstyled:x,...k("root"),...f,children:w})})});y.classes=p,y.displayName="@mantine/core/Card",y.Section=j},64414:(e,t,s)=>{"use strict";s.d(t,{X:()=>x});var n=s(68819);s(17266);var r=s(95540),i=s(7755),o=s(4531),a=s(89655),l=s(48013),c=s(11115),d={root:"m_1b7284a3"};let m={},u=(0,i.Z)((e,{radius:t,shadow:s})=>({root:{"--paper-radius":void 0===t?void 0:(0,r.H5)(t),"--paper-shadow":(0,r.Xj)(s)}})),x=(0,c.b)((e,t)=>{let s=(0,o.w)("Paper",m,e),{classNames:r,className:i,style:c,styles:x,unstyled:p,withBorder:h,vars:j,radius:g,shadow:v,variant:y,mod:b,...f}=s,k=(0,a.y)({name:"Paper",props:s,classes:d,className:i,style:c,classNames:r,styles:x,unstyled:p,vars:j,varsResolver:u});return(0,n.jsx)(l.x,{ref:t,mod:[{"data-with-border":h},b],...k("root"),variant:y,...f})});x.classes=d,x.displayName="@mantine/core/Paper"},10083:(e,t,s)=>{"use strict";s.d(t,{M:()=>k});var n=s(68819);s(17266);var r=s(4531),i=s(89655),o=s(46382),a=s(48013),l=s(84362),c=s(60896),d=s(56590),m=s(84099),u=s(95540),x=s(79010),p=s(88058),h=s(46709),j=s(40013);function g({spacing:e,verticalSpacing:t,cols:s,selector:r}){let i=(0,h.rZ)(),o=void 0===t?e:t,a=(0,m.L)({"--sg-spacing-x":(0,u.bG)((0,p.v)(e)),"--sg-spacing-y":(0,u.bG)((0,p.v)(o)),"--sg-cols":p.v(s)?.toString()}),l=(0,c.X)(i.breakpoints).reduce((t,n)=>(t[n]||(t[n]={}),"object"==typeof e&&void 0!==e[n]&&(t[n]["--sg-spacing-x"]=(0,u.bG)(e[n])),"object"==typeof o&&void 0!==o[n]&&(t[n]["--sg-spacing-y"]=(0,u.bG)(o[n])),"object"==typeof s&&void 0!==s[n]&&(t[n]["--sg-cols"]=s[n]),t),{}),d=(0,x.I)((0,c.X)(l),i.breakpoints).filter(e=>(0,c.X)(l[e.value]).length>0).map(e=>({query:`(min-width: ${i.breakpoints[e.value]})`,styles:l[e.value]}));return(0,n.jsx)(j.f,{styles:a,media:d,selector:r})}function v(e){return"object"==typeof e&&null!==e?(0,c.X)(e):[]}function y({spacing:e,verticalSpacing:t,cols:s,selector:r}){let i=void 0===t?e:t,o=(0,m.L)({"--sg-spacing-x":(0,u.bG)((0,p.v)(e)),"--sg-spacing-y":(0,u.bG)((0,p.v)(i)),"--sg-cols":p.v(s)?.toString()}),a=function({spacing:e,verticalSpacing:t,cols:s}){return Array.from(new Set([...v(e),...v(t),...v(s)])).sort((e,t)=>(0,d.px)(e)-(0,d.px)(t))}({spacing:e,verticalSpacing:t,cols:s}),l=a.reduce((t,n)=>(t[n]||(t[n]={}),"object"==typeof e&&void 0!==e[n]&&(t[n]["--sg-spacing-x"]=(0,u.bG)(e[n])),"object"==typeof i&&void 0!==i[n]&&(t[n]["--sg-spacing-y"]=(0,u.bG)(i[n])),"object"==typeof s&&void 0!==s[n]&&(t[n]["--sg-cols"]=s[n]),t),{}),c=a.map(e=>({query:`simple-grid (min-width: ${e})`,styles:l[e]}));return(0,n.jsx)(j.f,{styles:o,container:c,selector:r})}var b={container:"m_925c2d2c",root:"m_2415a157"};let f={cols:1,spacing:"md",type:"media"},k=(0,l.d5)((e,t)=>{let s=(0,r.w)("SimpleGrid",f,e),{classNames:l,className:c,style:d,styles:m,unstyled:u,vars:x,cols:p,verticalSpacing:h,spacing:j,type:v,...k}=s,_=(0,i.y)({name:"SimpleGrid",classes:b,props:s,className:c,style:d,classNames:l,styles:m,unstyled:u,vars:x}),w=(0,o.m)();return"container"===v?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(y,{...s,selector:`.${w}`}),(0,n.jsx)("div",{..._("container"),children:(0,n.jsx)(a.x,{ref:t,..._("root",{className:w}),...k})})]}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(g,{...s,selector:`.${w}`}),(0,n.jsx)(a.x,{ref:t,..._("root",{className:w}),...k})]})});k.classes=b,k.displayName="@mantine/core/SimpleGrid"},88058:(e,t,s)=>{"use strict";function n(e){return"object"==typeof e&&null!==e?"base"in e?e.base:void 0:e}s.d(t,{v:()=>n})},79901:(e,t,s)=>{"use strict";s.a(e,async(e,n)=>{try{s.d(t,{x:()=>e});var r=s(71851);let e=(await (0,r.createProxy)(String.raw`D:\MyCode\GameMantine\node_modules\@mantine\core\esm\components\Text\Text.mjs`)).Text;n()}catch(e){n(e)}},1)},75143:(e,t,s)=>{"use strict";s.a(e,async(e,n)=>{try{s.d(t,{D:()=>e});var r=s(71851);let e=(await (0,r.createProxy)(String.raw`D:\MyCode\GameMantine\node_modules\@mantine\core\esm\components\Title\Title.mjs`)).Title;n()}catch(e){n(e)}},1)}};var t=require("../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),n=t.X(0,[4147,9908,3828,5080,6429,7139],()=>s(22789));module.exports=n})();