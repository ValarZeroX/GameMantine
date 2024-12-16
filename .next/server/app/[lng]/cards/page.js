(()=>{var e={};e.id=5763,e.ids=[5763],e.modules={53524:e=>{"use strict";e.exports=require("@prisma/client")},67096:e=>{"use strict";e.exports=require("bcrypt")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},209:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},79348:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},30412:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},27790:e=>{"use strict";e.exports=require("assert")},78893:e=>{"use strict";e.exports=require("buffer")},84770:e=>{"use strict";e.exports=require("crypto")},17702:e=>{"use strict";e.exports=require("events")},32615:e=>{"use strict";e.exports=require("http")},35240:e=>{"use strict";e.exports=require("https")},55315:e=>{"use strict";e.exports=require("path")},86624:e=>{"use strict";e.exports=require("querystring")},17360:e=>{"use strict";e.exports=require("url")},21764:e=>{"use strict";e.exports=require("util")},71568:e=>{"use strict";e.exports=require("zlib")},24147:(e,t,a)=>{"use strict";a.r(t),a.d(t,{GlobalError:()=>i.a,__next_app__:()=>m,pages:()=>d,routeModule:()=>x,tree:()=>o});var r=a(3003),s=a(14293),l=a(66550),i=a.n(l),n=a(86979),c={};for(let e in n)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(c[e]=()=>n[e]);a.d(t,c);let o=["",{children:["[lng]",{children:["cards",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,28249)),"D:\\MyCode\\GameMantine\\app\\[lng]\\cards\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(a.bind(a,51028)),"D:\\MyCode\\GameMantine\\app\\[lng]\\layout.tsx"],"not-found":[()=>Promise.resolve().then(a.bind(a,20691)),"D:\\MyCode\\GameMantine\\app\\[lng]\\not-found.tsx"]}]},{"not-found":[()=>Promise.resolve().then(a.t.bind(a,52075,23)),"next/dist/client/components/not-found-error"]}],d=["D:\\MyCode\\GameMantine\\app\\[lng]\\cards\\page.tsx"],m={require:a,loadChunk:()=>Promise.resolve()},x=new r.AppPageRouteModule({definition:{kind:s.RouteKind.APP_PAGE,page:"/[lng]/cards/page",pathname:"/[lng]/cards",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:o}})},40835:(e,t,a)=>{Promise.resolve().then(a.bind(a,62674)),Promise.resolve().then(a.bind(a,41737))},62674:(e,t,a)=>{"use strict";a.d(t,{default:()=>J});var r=a(68819),s=a(17266),l=a(10128),i=a(22887),n=a(19040),c=a(11348),o=a(71260),d=a(67852),m=a(46948),x=a(55987),h=a(82631),p=a(26622),u=a(30270),g=a(93610),j=a(58970),y=a(35466),b=a(56872),f=a(38750),_=a(64611),v=a(52165),k=a(93422),w=a(75923),C=a(61495),$=a(20020),Z=a(99705),T=a(47662),z=a(14420),S=a(48013),P=a(11439),E=a(99884),q=a(69928),M=a(57909),N=a(53036),G=a(64885),A=a(40688),D=a(23603),R=a(86231),L=a(90434),F=a(24103),O=a(67251),K=a.n(O),H=a(35047),I=a(33118),U=a(34462),W=a(46260);let J=({lng:e})=>{let{colorScheme:t}=(0,l.X)(),[a,O]=(0,s.useState)("#228be6"),[J,X]=(0,s.useState)("red");(0,s.useEffect)(()=>{"dark"===t?(O("white"),X("white")):(O("#228be6"),X("red"))},[t]),(0,H.useRouter)();let{t:B}=(0,F.$)(e,["pokemon","common","skill","ability","rule"]),[V,Q]=(0,I.Z)("searchTerm",""),[Y,ee]=(0,s.useState)([]),[et,ea]=(0,s.useState)([]),[er,es]=(0,s.useState)(null),[el,ei]=(0,s.useState)({}),[en,ec]=(0,s.useState)("grid"),[eo,ed]=(0,s.useState)("grid"),[em,ex]=(0,I.Z)("isFilterOpen",!0),[eh,ep]=(0,I.Z)("selectedSets",["A1"]),[eu,eg]=(0,I.Z)("selectedDexs",[]),[ej,ey]=(0,I.Z)("selectedAspects",[]),[eb,ef]=(0,I.Z)("selectedRarity",[]),[e_,ev]=(0,I.Z)("selectedType",[]),[ek,ew]=(0,I.Z)("selectedWeakness",[]),[eC,e$]=(0,I.Z)("selectedRetreat",[]),[eZ,eT]=(0,I.Z)("hpRange",[0,250]),[ez,eS]=(0,I.Z)("attackRange",[0,250]),[eP,eE]=(0,s.useState)(20);(0,s.useEffect)(()=>{let e=localStorage.getItem("displayMode");("grid"===e||"list"===e)&&(ed(e),ec(e))},[]);let eq=e=>{ed(e),ec(e),localStorage.setItem("displayMode",e)},eM=e=>t=>{el[e]=t,ei(el)},eN=["A1","PROMO-A"].map(e=>({value:e,label:`(${e})${B(`common:cardSet.${e}`)}`})),eG=(0,s.useMemo)(()=>{let e=new Set;return eh.forEach(t=>{W.x9[t].forEach(t=>e.add(t))}),Array.from(e).map(e=>({value:e,label:`(${e})${B(`common:cardDex.${e}`)}`}))},[eh,B]);(0,s.useEffect)(()=>{let e=eG.map(e=>e.value),t=eu.filter(t=>e.includes(t));t.length!==eu.length&&eg(t)},[eG,eu,eg]);let eA=["grass","fire","water","lightning","psychic","fighting","darkness","metal","dragon","colorless"].map(e=>({value:e,label:`${B(`common:${e}`)}`})),eD=["Common","Uncommon","Rare","DoubleRare","ArtRare","SuperRare","ImmersiveRare","UltraRare"].map(e=>({value:e,label:`${B(`common:${e}`)}`})),eR=["pokemon","item","supporter"].map(e=>({value:e,label:`${B(`common:${e}`)}`})),eL=["1","2","3","4","5"].map(e=>({value:e,label:e})),eF=async e=>{try{let t=e.length>0?`?sets=${e.join(",")}`:"",a=await fetch(`/api/card${t}`);if(!a.ok)throw Error("無法取得卡片資料。");let r=await a.json();ea(r)}catch(e){ea([])}};(0,s.useEffect)(()=>{0===eh.length?(ea([]),ee([])):eF(eh)},[eh]),(0,s.useEffect)(()=>{let e=et;if(V){let t=V.toLowerCase();e=e.filter(e=>B(`pokemon:${e.name}`).toLowerCase().includes(t)||B(`pokemon:${e.number}`).toLowerCase().includes(t)||B(`skill:${e.attack_name_1}.name`).toLowerCase().includes(t)||B(`skill:${e.attack_name_1}.description`).toLowerCase().includes(t)||B(`skill:${e.attack_name_2}.name`).toLowerCase().includes(t)||B(`skill:${e.attack_name_2}.description`).toLowerCase().includes(t)||B(`ability:${e.ability_name}.name`).toLowerCase().includes(t)||B(`ability:${e.ability_name}.description`).toLowerCase().includes(t))}if(eh.length>0&&(e=e.filter(e=>eh.includes(e.set))),eu.length>0&&(e=e.filter(e=>e.dex.some(e=>eu.includes(e)))),ej.length>0){let t=ej.map(e=>W.KH[e]).filter(e=>"number"==typeof e);e=e.filter(e=>t.includes(e.aspects))}if(eb.length>0){let t=eb.map(e=>W.l6[e]).filter(e=>"number"==typeof e);e=e.filter(e=>t.includes(e.rarity))}if(e_.length>0){let t=e_.map(e=>W.D[e]).filter(e=>"number"==typeof e);e=e.filter(e=>t.includes(e.type))}if(ek.length>0){let t=ek.map(e=>W.KH[e]).filter(e=>"number"==typeof e);e=e.filter(e=>t.includes(e.weakness))}if(eC.length>0){let t=eC.map(e=>Number(e)).filter(e=>!isNaN(e));e=e.filter(e=>t.includes(e.retreat))}ee(e=(e=e.filter(e=>e.hp>=eZ[0]&&e.hp<=eZ[1])).filter(e=>e.attack_1>=ez[0]&&e.attack_1<=ez[1]||null!=e.attack_2&&e.attack_2>=ez[0]&&e.attack_2<=ez[1])),eE(20)},[et,V,eh,eu,ej,eb,e_,ek,eC,eZ,ez]);let eO=({option:e})=>(0,r.jsxs)(i.Z,{gap:"sm",children:[(0,r.jsx)(n.E,{src:`/common/${e.value}.webp`,alt:B(`common:${e.value}`),height:20,width:20}),(0,r.jsx)(c.Text,{size:"sm",children:B(`common:${e.value}`)})]}),eK=(0,r.jsx)(E.Z,{}),eH=[{title:B("common:navigation.home"),href:"/"},{title:B("common:navigation.cards"),href:"#"}].map((e,t)=>(0,r.jsx)(o.e,{href:e.href,children:e.title},t));return(0,r.jsxs)(d.W,{size:"lg",children:[(0,r.jsx)(m.O,{children:eH}),(0,r.jsx)(x.Title,{order:1,mt:"sm",children:B("common:title.cards_title")}),(0,r.jsxs)(i.Z,{align:"center",justify:"space-between",mb:"md",mt:"md",children:[(0,r.jsx)(h.N,{placeholder:B("common:set"),data:eN,searchable:!0,clearable:!0,value:eh,onChange:ep,maxValues:3}),(0,r.jsxs)(i.Z,{children:[(0,r.jsx)(p.A,{variant:"default",size:"lg",onClick:()=>{eg([]),ey([]),ef([]),ev([]),ew([]),e$([]),Q(""),eT([0,250]),eS([0,250])},children:(0,r.jsx)(q.Z,{})}),(0,r.jsx)(p.A,{variant:"default",size:"lg",onClick:()=>ex(!em),children:(0,r.jsx)(M.Z,{})}),(0,r.jsxs)("div",{className:K().root,dir:"ltr",ref:es,children:[(0,r.jsx)(u.G,{target:el[en],parent:er,className:K().indicator}),(0,r.jsxs)("div",{className:K().controlsGroup,children:[(0,r.jsx)(g.k,{variant:"default",size:"lg",className:K().control,"aria-label":"Category",onClick:()=>{ec("grid"),eq("grid")},ref:eM("grid"),mod:{active:"grid"===en},children:(0,r.jsx)(N.Z,{})}),(0,r.jsx)(g.k,{variant:"default",size:"lg",className:K().control,"aria-label":"ListDetails",onClick:()=>{ec("list"),eq("list")},ref:eM("list"),mod:{active:"list"===en},children:(0,r.jsx)(G.Z,{})})]})]})]})]}),(0,r.jsx)(j.V,{color:"blue",icon:eK,mt:"xl",children:(0,r.jsx)(c.Text,{children:B("common:please_select_up_to_3_series")})}),(0,r.jsxs)(y.U,{in:em,children:[(0,r.jsx)(b.i,{my:"xs",label:B("common:advancedFiltering"),labelPosition:"left"}),(0,r.jsx)(i.Z,{children:(0,r.jsx)(f.o,{placeholder:B("common:search_card"),value:V,onChange:e=>Q(e.target.value),leftSection:(0,r.jsx)(A.Z,{size:16}),radius:"md",size:"md",styles:{input:{width:300}}})}),(0,r.jsxs)(_.r,{mb:"md",children:[(0,r.jsx)(_.r.Col,{span:4,children:(0,r.jsx)(h.N,{label:B("common:dex"),placeholder:B("common:dex"),data:eG,searchable:!0,clearable:!0,value:eu,onChange:eg})}),(0,r.jsx)(_.r.Col,{span:4,children:(0,r.jsx)(h.N,{label:B("common:aspects"),placeholder:B("common:aspects"),data:eA,clearable:!0,renderOption:eO,value:ej,onChange:ey})}),(0,r.jsx)(_.r.Col,{span:4,children:(0,r.jsx)(h.N,{label:B("common:rarity"),placeholder:B("common:rarity"),data:eD,clearable:!0,renderOption:({option:e})=>(0,r.jsxs)(i.Z,{gap:"sm",children:[(0,r.jsx)(n.E,{src:`/common/${e.value}.webp`,alt:B(`common:${e.value}`),height:20,width:20}),(0,r.jsx)(c.Text,{size:"sm",children:B(`common:${e.value}`)})]}),value:eb,onChange:ef})})]}),(0,r.jsxs)(_.r,{mb:"md",children:[(0,r.jsx)(_.r.Col,{span:4,children:(0,r.jsx)(h.N,{label:B("common:type"),placeholder:B("common:type"),data:eR,clearable:!0,value:e_,onChange:ev})}),(0,r.jsx)(_.r.Col,{span:4,children:(0,r.jsx)(h.N,{label:B("common:weakness"),placeholder:B("common:weakness"),data:eA,clearable:!0,renderOption:eO,value:ek,onChange:ew})}),(0,r.jsx)(_.r.Col,{span:4,children:(0,r.jsx)(h.N,{label:B("common:retreat"),placeholder:B("common:retreat"),data:eL,clearable:!0,value:eC,onChange:e$})})]}),(0,r.jsxs)(_.r,{mb:"md",gutter:"md",children:[(0,r.jsx)(_.r.Col,{span:{base:12,sm:6,md:6},mt:"sm",children:(0,r.jsx)(v.K,{children:(0,r.jsx)(k.U,{min:0,max:250,value:eZ,onChange:eT,marks:[{value:0,label:"0"},{value:50,label:"50"},{value:100,label:"100"},{value:150,label:"150"},{value:200,label:"200"},{value:250,label:"250"}],"aria-label":B("common:hp_range"),thumbSize:26,thumbChildren:[(0,r.jsx)(D.Z,{size:"1rem",color:J},"1"),(0,r.jsx)(D.Z,{size:"1rem",color:J},"2")],color:"red"})})}),(0,r.jsx)(_.r.Col,{span:{base:12,sm:6,md:6},mt:"sm",children:(0,r.jsx)(v.K,{children:(0,r.jsx)(k.U,{min:0,max:250,value:ez,onChange:eS,marks:[{value:0,label:"0"},{value:50,label:"50"},{value:100,label:"100"},{value:150,label:"150"},{value:200,label:"200"},{value:250,label:"250"}],"aria-label":B("common:attack_range"),thumbSize:26,thumbChildren:[(0,r.jsx)(R.Z,{size:"1rem",color:a},"3"),(0,r.jsx)(R.Z,{size:"1rem",color:a},"4")]})})})]})]}),(0,r.jsx)(U.Z,{dataLength:eP,next:()=>{eE(e=>e+20)},hasMore:eP<Y.length,loader:(0,r.jsx)(w.M,{children:(0,r.jsx)(C.a,{size:"md",my:"md"})}),endMessage:(0,r.jsx)(r.Fragment,{}),style:{width:"100%",overflow:"hidden"},children:"grid"===eo?(0,r.jsx)(_.r,{mt:"md",columns:10,children:Y.slice(0,eP).map(t=>(0,r.jsx)(_.r.Col,{span:{base:5,sm:2,md:2,lg:2},children:(0,r.jsx)(L.default,{href:`/${e}/cards/${t.number}`,passHref:!0,style:{textDecoration:"none"},children:(0,r.jsxs)($.Z,{shadow:"sm",padding:"lg",radius:"md",withBorder:!0,children:[(0,r.jsx)($.Z.Section,{children:(0,r.jsx)(n.E,{src:`/${e}/${t.set}/${t.number}.webp`,alt:B(`pokemon:${t.name}`),loading:"lazy"})}),(0,r.jsxs)(v.K,{mt:"md",align:"center",gap:"xs",children:[(0,r.jsx)(c.Text,{fw:700,size:"lg",children:B(`pokemon:${t.name}`)}),(0,r.jsx)(c.Text,{c:"dimmed",size:"sm",children:t.number}),(0,r.jsxs)(Z.k,{gap:"xs",justify:"center",wrap:"wrap",children:[(0,r.jsx)(T.C,{color:"blue",variant:"light",children:B(`common:cardSet.${t.set}`)}),t.dex.filter(e=>"NO"!==e&&"HIDDEN"!==e).map((e,t)=>(0,r.jsx)(T.C,{color:"green",variant:"outline",children:B(`common:cardDex.${e}`)},t))]})]})]})})},t.id))}):(0,r.jsx)(i.Z,{mt:"md",children:(0,r.jsx)($.Z,{shadow:"sm",padding:"lg",radius:"md",withBorder:!0,children:(0,r.jsx)(z.x,{children:(0,r.jsx)(S.x,{w:1068,children:(0,r.jsxs)(P.i,{striped:!0,verticalSpacing:"lg",children:[(0,r.jsx)(P.i.Thead,{children:(0,r.jsxs)(P.i.Tr,{children:[(0,r.jsx)(P.i.Th,{style:{textAlign:"center"},children:B("common:name")}),(0,r.jsx)(P.i.Th,{children:B("common:aspects")}),(0,r.jsx)(P.i.Th,{children:B("common:hp")}),(0,r.jsx)(P.i.Th,{children:B("common:stage")}),(0,r.jsx)(P.i.Th,{children:B("common:rarity")}),(0,r.jsx)(P.i.Th,{children:B("common:weakness")}),(0,r.jsx)(P.i.Th,{children:B("common:retreat")}),(0,r.jsxs)(P.i.Th,{style:{width:280},children:[B("common:attack")," & ",B("common:ability")]})]})}),(0,r.jsx)(P.i.Tbody,{children:Y.slice(0,eP).map(t=>(0,r.jsxs)(P.i.Tr,{children:[(0,r.jsx)(P.i.Td,{children:(0,r.jsxs)(i.Z,{children:[(0,r.jsx)(L.default,{href:`/${e}/cards/${t.number}`,passHref:!0,style:{textDecoration:"none"},children:(0,r.jsx)(n.E,{src:`/${e}/${t.set}/${t.number}.webp`,alt:B(`pokemon:${t.name}`),loading:"lazy",style:{width:100}})}),(0,r.jsxs)(v.K,{gap:"xs",align:"center",children:[(0,r.jsx)(c.Text,{mt:"xs",children:B(`pokemon:${t.name}`)}),(0,r.jsxs)(c.Text,{c:"dimmed",size:"xs",mt:"xs",children:["#",t.number]})]})]})}),(0,r.jsx)(P.i.Td,{children:0===t.type?(0,r.jsx)(i.Z,{children:(0,r.jsx)(n.E,{src:W.PZ[t.aspects],alt:"Element Aspect",height:20,width:20})}):null}),(0,r.jsx)(P.i.Td,{children:(0,r.jsx)(T.C,{size:"lg",circle:!0,variant:"gradient",gradient:{from:"red",to:"violet",deg:90},children:(0,r.jsx)(c.Text,{size:"xs",children:t.hp})})}),(0,r.jsx)(P.i.Td,{children:(0,r.jsx)(T.C,{color:"blue",children:B(`common:cardStage.${t.stage}`)})}),(0,r.jsx)(P.i.Td,{children:0!==t.rarity&&(0,r.jsx)(i.Z,{children:(0,r.jsx)(n.E,{src:W.JG[t.rarity],alt:"Rarity",height:20,width:20})})}),(0,r.jsx)(P.i.Td,{children:10!==t.weakness&&(0,r.jsxs)(i.Z,{children:[(0,r.jsx)(n.E,{src:W.PZ[t.weakness],alt:"Weakness",height:20,width:20}),(0,r.jsx)(T.C,{size:"lg",circle:!0,variant:"gradient",gradient:{from:"red",to:"violet",deg:90},children:(0,r.jsx)(c.Text,{size:"xs",children:t.weakness_value})})]})}),(0,r.jsx)(P.i.Td,{children:(0,r.jsx)(i.Z,{gap:"xs",children:t.retreat_aspects.filter(e=>99!==e).map((e,t)=>(0,r.jsx)(n.E,{src:W.PZ[e],alt:`Aspect ${e}`,height:20,width:20},t))})}),(0,r.jsx)(P.i.Td,{children:0===t.type?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(T.C,{children:B(`skill:${t.attack_name_1}.name`)}),(0,r.jsxs)(i.Z,{gap:"xs",mt:"xs",children:[(0,r.jsx)(T.C,{size:"lg",circle:!0,variant:"gradient",gradient:{from:"red",to:"violet",deg:90},children:(0,r.jsx)(c.Text,{size:"xs",children:t.attack_1})}),t.attack_aspects_1.map((e,t)=>(0,r.jsx)(n.E,{src:W.PZ[e],alt:"Aspect",height:20,width:20},t))]}),t.attack_skill_name_1&&t.attack_skill_name_1.length>0&&(0,r.jsx)(c.Text,{c:"dimmed",size:"xs",mt:"xs",children:B(`skill:${t.attack_name_1}.description`)}),t.attack_aspects_2&&t.attack_aspects_2.length>0&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(b.i,{my:"md"}),(0,r.jsx)(T.C,{children:B(`skill:${t.attack_name_2}.name`)}),(0,r.jsxs)(i.Z,{gap:"xs",mt:"xs",children:[(0,r.jsx)(T.C,{size:"lg",circle:!0,variant:"gradient",gradient:{from:"red",to:"violet",deg:90},children:(0,r.jsx)(c.Text,{size:"xs",children:t.attack_2})}),t.attack_aspects_2.map((e,t)=>(0,r.jsx)(n.E,{src:W.PZ[e],alt:"Aspect",height:20,width:20},t))]})]}),t.attack_skill_name_2&&t.attack_skill_name_2.length>0&&(0,r.jsx)(c.Text,{c:"dimmed",size:"xs",mt:"xs",children:B(`skill:${t.attack_name_2}.description`)}),t.ability_name&&t.ability_name.length>0&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(b.i,{my:"md"}),(0,r.jsx)(T.C,{color:"orange",children:(0,r.jsx)(c.Text,{size:"xs",children:B(`ability:${t.ability_name}.name`)})}),(0,r.jsx)(c.Text,{c:"dimmed",size:"xs",mt:"xs",children:B(`ability:${t.ability_name}.description`)})]})]}):(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(c.Text,{c:"dimmed",children:B(`rule:${t.attack_skill_name_1}`)})})})]},t.number))})]})})})})})})]})}},33118:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});var r=a(17266);let s=function(e,t){let[a,s]=(0,r.useState)(t);return[a,t=>{try{s(t),localStorage.setItem(e,JSON.stringify(t))}catch(t){console.error(`Error setting localStorage key "${e}":`,t)}}]}},67251:e=>{e.exports={root:"CardsPage_root__Jqhv8",indicator:"CardsPage_indicator__XwNHG",controlsGroup:"CardsPage_controlsGroup__fxcj2",control:"CardsPage_control__kxZAS"}},79816:(e,t,a)=>{"use strict";a.a(e,async(e,r)=>{try{a.r(t),a.d(t,{default:()=>e});var s=a(71851);let e=(await (0,s.createProxy)(String.raw`D:\MyCode\GameMantine\app\[lng]\cards\CardsListClient.tsx`)).default;r()}catch(e){r(e)}},1)},28249:(e,t,a)=>{"use strict";a.a(e,async(e,r)=>{try{a.r(t),a.d(t,{default:()=>d,generateMetadata:()=>o});var s=a(89351);a(22052);var l=a(38859),i=a(46061),n=a(79816),c=e([l,n]);async function o({params:e}){let{lng:t}=await e,{t:a}=await (0,i.$)(t,"common");return{title:a("metadata.cards_page_title"),description:a("metadata.cards_page_description"),keywords:a("metadata.cards_page_keywords")}}[l,n]=c.then?(await c)():c;let d=async({params:e})=>{let{lng:t}=await e;return(0,s.jsx)(l.default,{lng:t,children:(0,s.jsx)(n.default,{lng:t})})};r()}catch(e){r(e)}})},99705:(e,t,a)=>{"use strict";a.d(t,{k:()=>g});var r=a(68819),s=a(84099);a(17266);var l=a(46709),i=a(4531),n=a(89655),c=a(40013),o=a(2209),d=a(46382),m=a(48013),x=a(11115);let h={gap:{type:"spacing",property:"gap"},rowGap:{type:"spacing",property:"rowGap"},columnGap:{type:"spacing",property:"columnGap"},align:{type:"identity",property:"alignItems"},justify:{type:"identity",property:"justifyContent"},wrap:{type:"identity",property:"flexWrap"},direction:{type:"identity",property:"flexDirection"}};var p={root:"m_8bffd616"};let u={},g=(0,x.b)((e,t)=>{let a=(0,i.w)("Flex",u,e),{classNames:x,className:g,style:j,styles:y,unstyled:b,vars:f,gap:_,rowGap:v,columnGap:k,align:w,justify:C,wrap:$,direction:Z,...T}=a,z=(0,n.y)({name:"Flex",classes:p,props:a,className:g,style:j,classNames:x,styles:y,unstyled:b,vars:f}),S=(0,l.rZ)(),P=(0,d.m)(),E=(0,o.n)({styleProps:{gap:_,rowGap:v,columnGap:k,align:w,justify:C,wrap:$,direction:Z},theme:S,data:h});return(0,r.jsxs)(r.Fragment,{children:[E.hasResponsiveStyles&&(0,r.jsx)(c.f,{selector:`.${P}`,styles:E.styles,media:E.media}),(0,r.jsx)(m.x,{ref:t,...z("root",{className:P,style:(0,s.L)(E.inlineStyles)}),...T})]})});g.classes=p,g.displayName="@mantine/core/Flex"}};var t=require("../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),r=t.X(0,[4147,9908,3828,5080,6429,434,292,4333,3515,5454,7139,7815],()=>a(24147));module.exports=r})();