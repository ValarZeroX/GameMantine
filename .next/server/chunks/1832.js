exports.id=1832,exports.ids=[1832],exports.modules={53681:(e,n,o)=>{var t={"./en/ability.json":[21695,1695],"./en/common.json":[7790,7790],"./en/pokemon.json":[52763,2763],"./en/rule.json":[19166,9166],"./en/skill.json":[68591,8591],"./zh-Hans/ability.json":[47321,7321],"./zh-Hans/common.json":[26476,6476],"./zh-Hans/pokemon.json":[73407,3407],"./zh-Hans/rule.json":[59620,9620],"./zh-Hans/skill.json":[61529,1529],"./zh-Hant/ability.json":[48380,8380],"./zh-Hant/common.json":[87097,7097],"./zh-Hant/pokemon.json":[88636,8636],"./zh-Hant/rule.json":[42877,2877],"./zh-Hant/skill.json":[88227,8227]};function s(e){if(!o.o(t,e))return Promise.resolve().then(()=>{var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n});var n=t[e],s=n[0];return o.e(n[1]).then(()=>o.t(s,19))}s.keys=()=>Object.keys(t),s.id=53681,e.exports=s},65886:(e,n,o)=>{"use strict";o.d(n,{default:()=>D});var t=o(68819),s=o(17266),r=o(28964),a=o(64058),i=o(22887),l=o(65582),c=o(91603),m=o(15700),d=o(26622),p=o(11348),u=o(61495),h=o(10773),j=o(80104),g=o(7380),x=o(41295),b=o(10128),y=o(64443);function k(){let{colorScheme:e,toggleColorScheme:n}=(0,b.X)(),[o,r]=(0,s.useState)(()=>y.Z);return(0,t.jsx)(d.A,{variant:"default","aria-label":"Toggle theme",size:"lg",onClick:()=>n(),children:(0,t.jsx)(o,{style:{width:"80%",height:"80%"},stroke:1.5})})}o(75382);var v=o(26699),w=o.n(v),f=o(35047),z=o(77109),O=o(17561),C=o(24103);let H=({opened:e,toggle:n,desktopOpened:o,toggleDesktop:s,lng:r})=>{let a=(0,f.useRouter)(),b=(0,f.usePathname)(),{data:y,status:v}=(0,z.useSession)(),{t:H}=(0,C.$)(r,["common"]),_=e=>{a.push(e)},S=async()=>{await (0,z.signOut)({callbackUrl:"/"})},Z=e=>{if(e===r)return;let n=b.split("/");O.Mj.includes(n[1])?n[1]=e:n.splice(1,0,e);let o=n.join("/")||"/";a.push(o)};return(0,t.jsxs)("div",{className:w().inner,children:[(0,t.jsxs)(i.Z,{h:"100%",px:"md",children:[(0,t.jsx)(l.O,{opened:e,onClick:n,hiddenFrom:"sm",size:"sm"}),(0,t.jsx)(l.O,{opened:o,onClick:s,visibleFrom:"sm",size:"sm"}),(0,t.jsx)(h.Z,{style:{width:(0,c.h)(36),height:(0,c.h)(36)},stroke:1.5,color:"var(--mantine-color-red-filled)"}),(0,t.jsx)("div",{children:"Pokemon Nier"})]}),(0,t.jsx)("div",{className:w().actionIcon,children:(0,t.jsxs)(i.Z,{children:[(0,t.jsx)(k,{}),(0,t.jsxs)(m.v,{withArrow:!0,children:[(0,t.jsx)(m.v.Target,{children:(0,t.jsx)(d.A,{variant:"default",size:"lg","aria-label":"Language",children:(0,t.jsx)(j.Z,{})})}),(0,t.jsxs)(m.v.Dropdown,{children:[(0,t.jsx)(m.v.Label,{children:H("common:navigation.language_selection")}),(0,t.jsx)(m.v.Item,{onClick:()=>Z("zh-Hans"),children:(0,t.jsx)(p.Text,{children:"简体中文"})}),(0,t.jsx)(m.v.Item,{onClick:()=>Z("zh-Hant"),children:(0,t.jsx)(p.Text,{children:"繁體中文"})})]})]}),"loading"===v?(0,t.jsx)(d.A,{variant:"default",size:"lg","aria-label":"Loading",children:(0,t.jsx)(u.a,{color:"blue"})}):y?(0,t.jsx)(d.A,{variant:"default",size:"lg","aria-label":"Logout",onClick:S,children:(0,t.jsx)(g.Z,{})}):(0,t.jsx)(d.A,{variant:"default",size:"lg","aria-label":"Login",onClick:()=>_("/login"),children:(0,t.jsx)(x.Z,{})})]})})]})};var _=o(3484),S=o(43684),Z=o(39299),R=o(73366),F=o(24089);let A=({lng:e})=>{let n=(0,f.useRouter)(),{data:o,status:s}=(0,z.useSession)(),{t:r}=(0,C.$)(e,["common"]),a=e=>{n.push(e)};return(0,t.jsxs)("nav",{children:[(0,t.jsx)(_.O,{component:"button",label:r("common:navigation.home"),leftSection:(0,t.jsx)(S.Z,{size:"1rem",stroke:1.5}),onClick:()=>a("/")}),(0,t.jsx)(_.O,{component:"button",label:r("common:navigation.cards"),leftSection:(0,t.jsx)(Z.Z,{size:"1rem",stroke:1.5}),onClick:()=>a("/cards")}),(0,t.jsxs)(_.O,{component:"button",label:r("common:navigation.deck"),leftSection:(0,t.jsx)(R.Z,{size:"1rem",stroke:1.5}),children:[(0,t.jsx)(_.O,{label:r("common:navigation.deck_list"),onClick:()=>a("/decks/list")}),(0,t.jsx)(_.O,{label:r("common:navigation.create_deck"),onClick:()=>a("/decks/build")}),o&&(0,t.jsx)(_.O,{label:r("common:navigation.my_decks"),onClick:()=>a("/decks/user")})]}),(0,t.jsx)(_.O,{component:"button",label:r("common:navigation.about"),leftSection:(0,t.jsx)(F.Z,{size:"1rem",stroke:1.5}),onClick:()=>a("/about")})]})};function D({children:e,lng:n}){let[o,{toggle:s}]=(0,a.q)(),[i,{toggle:l}]=(0,a.q)(!0);return(0,t.jsx)(t.Fragment,{children:(0,t.jsxs)(r.V,{header:{height:60},navbar:{width:300,breakpoint:"sm",collapsed:{mobile:!o,desktop:!i}},padding:"md",children:[(0,t.jsx)(r.V.Header,{children:(0,t.jsx)(H,{opened:o,toggle:s,desktopOpened:i,toggleDesktop:l,lng:n})}),(0,t.jsx)(r.V.Navbar,{p:"md",children:(0,t.jsx)(A,{lng:n})}),(0,t.jsx)(r.V.Main,{children:e})]})})}},46260:(e,n,o)=>{"use strict";o.d(n,{D:()=>i,JG:()=>l,KH:()=>r,PZ:()=>s,l6:()=>a,pt:()=>t});let t={0:0,1:35,2:70,3:150,4:500,5:400,6:1250,7:1500,8:2500},s={0:"/common/grass.webp",1:"/common/fire.webp",2:"/common/water.webp",3:"/common/lightning.webp",4:"/common/psychic.webp",5:"/common/fighting.webp",6:"/common/darkness.webp",7:"/common/metal.webp",8:"/common/dragon.webp",9:"/common/colorless.webp"},r={grass:0,fire:1,water:2,lightning:3,psychic:4,fighting:5,darkness:6,metal:7,dragon:8,colorless:9},a={Common:1,Uncommon:2,Rare:3,DoubleRare:4,ArtRare:5,SuperRare:6,ImmersiveRare:7,UltraRare:8},i={pokemon:0,item:1,supporter:2},l={0:"",1:"/common/Common.webp",2:"/common/Uncommon.webp",3:"/common/Rare.webp",4:"/common/DoubleRare.webp",5:"/common/ArtRare.webp",6:"/common/SuperRare.webp",7:"/common/ImmersiveRare.webp",8:"/common/UltraRare.webp"}},33118:(e,n,o)=>{"use strict";o.d(n,{Z:()=>s});var t=o(17266);let s=function(e,n){let[o,s]=(0,t.useState)(n);return[o,n=>{try{s(n),localStorage.setItem(e,JSON.stringify(n))}catch(n){console.error(`Error setting localStorage key "${e}":`,n)}}]}},26699:e=>{e.exports={inner:"Header_inner__BWOOt",link:"Header_link___GWEF",actionIcon:"Header_actionIcon__d8zIz"}},46061:(e,n,o)=>{"use strict";o.d(n,{$:()=>l});var t=o(95131),s=o(25369),r=o(7372),a=o(24546);let i=async(e,n)=>{let i=(0,t.Fs)();return await i.use(r.D).use((0,s.Z)((e,n)=>o(53681)(`./${e}/${n}.json`))).init({...(0,a.FW)(e,n),load:"currentOnly"}),i};async function l(e,n,o={}){let t=await i(e,n);return{t:t.getFixedT(e,Array.isArray(n)?n[0]:n),i18n:t}}},38859:(e,n,o)=>{"use strict";o.a(e,async(e,t)=>{try{o.d(n,{Z:()=>e});var s=o(71851);let e=(await (0,s.createProxy)(String.raw`D:\MyCode\GameMantine\components\Layout\Layout.tsx`)).default;t()}catch(e){t(e)}},1)},99705:(e,n,o)=>{"use strict";o.d(n,{k:()=>g});var t=o(68819),s=o(84099);o(17266);var r=o(46709),a=o(4531),i=o(89655),l=o(40013),c=o(2209),m=o(46382),d=o(48013),p=o(11115);let u={gap:{type:"spacing",property:"gap"},rowGap:{type:"spacing",property:"rowGap"},columnGap:{type:"spacing",property:"columnGap"},align:{type:"identity",property:"alignItems"},justify:{type:"identity",property:"justifyContent"},wrap:{type:"identity",property:"flexWrap"},direction:{type:"identity",property:"flexDirection"}};var h={root:"m_8bffd616"};let j={},g=(0,p.b)((e,n)=>{let o=(0,a.w)("Flex",j,e),{classNames:p,className:g,style:x,styles:b,unstyled:y,vars:k,gap:v,rowGap:w,columnGap:f,align:z,justify:O,wrap:C,direction:H,..._}=o,S=(0,i.y)({name:"Flex",classes:h,props:o,className:g,style:x,classNames:p,styles:b,unstyled:y,vars:k}),Z=(0,r.rZ)(),R=(0,m.m)(),F=(0,c.n)({styleProps:{gap:v,rowGap:w,columnGap:f,align:z,justify:O,wrap:C,direction:H},theme:Z,data:u});return(0,t.jsxs)(t.Fragment,{children:[F.hasResponsiveStyles&&(0,t.jsx)(l.f,{selector:`.${R}`,styles:F.styles,media:F.media}),(0,t.jsx)(d.x,{ref:n,...S("root",{className:R,style:(0,s.L)(F.inlineStyles)}),..._})]})});g.classes=h,g.displayName="@mantine/core/Flex"}};