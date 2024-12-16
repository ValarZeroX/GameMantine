(()=>{var e={};e.id=4125,e.ids=[4125],e.modules={53524:e=>{"use strict";e.exports=require("@prisma/client")},67096:e=>{"use strict";e.exports=require("bcrypt")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},209:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},79348:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},30412:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},27790:e=>{"use strict";e.exports=require("assert")},78893:e=>{"use strict";e.exports=require("buffer")},84770:e=>{"use strict";e.exports=require("crypto")},17702:e=>{"use strict";e.exports=require("events")},32615:e=>{"use strict";e.exports=require("http")},35240:e=>{"use strict";e.exports=require("https")},55315:e=>{"use strict";e.exports=require("path")},86624:e=>{"use strict";e.exports=require("querystring")},17360:e=>{"use strict";e.exports=require("url")},21764:e=>{"use strict";e.exports=require("util")},71568:e=>{"use strict";e.exports=require("zlib")},59430:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>n.a,__next_app__:()=>m,pages:()=>d,routeModule:()=>u,tree:()=>c});var a=s(3003),l=s(14293),r=s(66550),n=s.n(r),i=s(86979),o={};for(let e in i)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>i[e]);s.d(t,o);let c=["",{children:["[lng]",{children:["decks",{children:["list",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,74306)),"D:\\MyCode\\GameMantine\\app\\[lng]\\decks\\list\\page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,51028)),"D:\\MyCode\\GameMantine\\app\\[lng]\\layout.tsx"],"not-found":[()=>Promise.resolve().then(s.bind(s,20691)),"D:\\MyCode\\GameMantine\\app\\[lng]\\not-found.tsx"]}]},{"not-found":[()=>Promise.resolve().then(s.t.bind(s,52075,23)),"next/dist/client/components/not-found-error"]}],d=["D:\\MyCode\\GameMantine\\app\\[lng]\\decks\\list\\page.tsx"],m={require:s,loadChunk:()=>Promise.resolve()},u=new a.AppPageRouteModule({definition:{kind:l.RouteKind.APP_PAGE,page:"/[lng]/decks/list/page",pathname:"/[lng]/decks/list",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},2697:(e,t,s)=>{Promise.resolve().then(s.bind(s,96896)),Promise.resolve().then(s.bind(s,41737))},96896:(e,t,s)=>{"use strict";s.d(t,{default:()=>Q});var a=s(68819),l=s(17266),r=s(10128),n=s(22887),i=s(19040),o=s(11348),c=s(71260),d=s(67852),m=s(46948),u=s(55987),p=s(58970),h=s(82631),g=s(26622),x=s(35466),f=s(56872),j=s(48013),b=s(38750),v=s(64611),y=s(52165),k=s(93422),w=s(14420),C=s(20020),_=s(99705),Z=s(47662),S=s(75923),$=s(19941),z=s(13576),M=s(61495),P=s(94118),E=s(60740),D=s(99884),O=s(57909),L=s(36854),R=s(69928),T=s(40688),q=s(23603),N=s(86231),I=s(57864),A=s(95413),F=s(14333),G=s(90434),B=s(77109),K=s(24103),U=s(9531),V=s(34462),H=s(33118),W=s(46260),X=s(35047),J=s(70012);let Q=({lng:e})=>{let{data:t}=(0,B.useSession)(),s=(0,X.useSearchParams)(),{t:Q}=(0,K.$)(e,["pokemon","common","skill","ability","rule"]),[Y,ee]=(0,l.useState)([]),[et,es]=(0,l.useState)(!0),[ea,el]=(0,l.useState)(0),[er,en]=(0,l.useState)("createdAt"),[ei,eo]=(0,l.useState)("desc"),{colorScheme:ec}=(0,r.X)(),[ed,em]=(0,l.useState)("#228be6"),[eu,ep]=(0,l.useState)("red");(0,l.useEffect)(()=>{"dark"===ec?(em("white"),ep("white")):(em("#228be6"),ep("red"))},[ec]);let[eh,eg]=(0,H.Z)("searchTerm",""),[ex,ef]=(0,l.useState)([]),[ej,eb]=(0,l.useState)([]),[ev,ey]=(0,H.Z)("isFilterOpenList",!1),[ek,ew]=(0,H.Z)("selectedSetsList",[]),[eC,e_]=(0,H.Z)("selectedDexsList",[]),[eZ,eS]=(0,H.Z)("selectedAspectsList",[]),[e$,ez]=(0,H.Z)("selectedRarityList",[]),[eM,eP]=(0,H.Z)("selectedTypeList",[]),[eE,eD]=(0,H.Z)("selectedWeaknessList",[]),[eO,eL]=(0,H.Z)("selectedRetreatList",[]),[eR,eT]=(0,H.Z)("hpRangeList",[0,250]),[eq,eN]=(0,H.Z)("attackRangeList",[0,250]),[eI,eA]=(0,l.useState)(""),[eF,eG]=(0,l.useState)(20),eB=["A1","PROMO-A"].map(e=>({value:e,label:`(${e})${Q(`common:cardSet.${e}`)}`})),eK=(0,l.useMemo)(()=>{let e=new Set;return ek.forEach(t=>{W.x9[t].forEach(t=>e.add(t))}),Array.from(e).map(e=>({value:e,label:`(${e})${Q(`common:cardDex.${e}`)}`}))},[ek,Q]);(0,l.useEffect)(()=>{let e=eK.map(e=>e.value),t=eC.filter(t=>e.includes(t));t.length!==eC.length&&e_(t)},[eK,eC,e_]);let eU=["grass","fire","water","lightning","psychic","fighting","darkness","metal","dragon","colorless"].map(e=>({value:e,label:`${Q(`common:${e}`)}`})),eV=["Common","Uncommon","Rare","DoubleRare","ArtRare","SuperRare","ImmersiveRare","UltraRare"].map(e=>({value:e,label:`${Q(`common:${e}`)}`})),eH=["pokemon","item","supporter"].map(e=>({value:e,label:`${Q(`common:${e}`)}`})),eW=["1","2","3","4","5"].map(e=>({value:e,label:e})),eX=async e=>{try{let t=e.length>0?`?sets=${e.join(",")}`:"",s=await fetch(`/api/card${t}`);if(!s.ok)throw Error("無法取得卡片資料。");let a=await s.json();eb(a)}catch(e){eb([])}};(0,l.useEffect)(()=>{0===ek.length?(eb([]),ef([])):eX(ek)},[ek]),(0,l.useEffect)(()=>{let e=ej;if(eh){let t=eh.toLowerCase();e=e.filter(e=>Q(`pokemon:${e.name}`).toLowerCase().includes(t)||Q(`skill:${e.attack_name_1}.name`).toLowerCase().includes(t)||Q(`skill:${e.attack_name_1}.description`).toLowerCase().includes(t)||Q(`skill:${e.attack_name_2}.name`).toLowerCase().includes(t)||Q(`skill:${e.attack_name_2}.description`).toLowerCase().includes(t)||Q(`ability:${e.ability_name}.name`).toLowerCase().includes(t)||Q(`ability:${e.ability_name}.description`).toLowerCase().includes(t))}if(ek.length>0&&(e=e.filter(e=>ek.includes(e.set))),eC.length>0&&(e=e.filter(e=>e.dex.some(e=>eC.includes(e)))),eZ.length>0){let t=eZ.map(e=>W.KH[e]).filter(e=>"number"==typeof e);e=e.filter(e=>t.includes(e.aspects))}if(e$.length>0){let t=e$.map(e=>W.l6[e]).filter(e=>"number"==typeof e);e=e.filter(e=>t.includes(e.rarity))}if(eM.length>0){let t=eM.map(e=>W.D[e]).filter(e=>"number"==typeof e);e=e.filter(e=>t.includes(e.type))}if(eE.length>0){let t=eE.map(e=>W.KH[e]).filter(e=>"number"==typeof e);e=e.filter(e=>t.includes(e.weakness))}if(eO.length>0){let t=eO.map(e=>Number(e)).filter(e=>!isNaN(e));e=e.filter(e=>t.includes(e.retreat))}ef(e=(e=e.filter(e=>e.hp>=eR[0]&&e.hp<=eR[1])).filter(e=>e.attack_1>=eq[0]&&e.attack_1<=eq[1]||null!=e.attack_2&&e.attack_2>=eq[0]&&e.attack_2<=eq[1])),eG(20)},[ej,eh,ek,eC,eZ,e$,eM,eE,eO,eR,eq]);let eJ=({option:e})=>(0,a.jsxs)(n.Z,{gap:"sm",children:[(0,a.jsx)(i.E,{src:`/common/${e.value}.webp`,alt:Q(`common:${e.value}`),height:20,width:20}),(0,a.jsx)(o.Text,{size:"sm",children:Q(`common:${e.value}`)})]});(0,l.useEffect)(()=>{let e=s.get("selectedCard");e?eA(e):eA("")},[s]);let eQ=async(e,t)=>{try{let s=new URL("/api/decks/list",window.location.origin);"usageCount"===er&&(s=new URL("/api/decks/list/usage",window.location.origin)),"averageRating"===er&&(s=new URL("/api/decks/list/rating",window.location.origin)),s.searchParams.append("limit","10"),null!==t?s.searchParams.append("cursor",t.toString()):s.searchParams.append("cursor",ea.toString()),s.searchParams.append("sortBy",er),s.searchParams.append("sortOrder",ei),null!==e?s.searchParams.append("card",e):s.searchParams.append("card",eI);let a=await fetch(s.toString());if(!a.ok)throw Error("Failed to fetch decks");let l=await a.json(),r=l.decks.map(e=>e.id);new Set(r).size!==r.length&&console.warn("Duplicate deck IDs found in the response:",r),ee(e=>{let s=null!==t?l.decks:[...e,...l.decks],a=new Map;return s.forEach(e=>{a.set(e.id,e)}),Array.from(a.values())}),el(l.nextCursor),es(!l.endCursor)}catch(e){console.error("Error fetching decks:",e),(0,U.c0)({title:Q("common:error"),message:Q("common:failedToFetchDecks"),color:"red"})}};(0,l.useEffect)(()=>{let e=s.get("selectedCard");el(0),eQ(e,0)},[]);let eY=e=>e.split(",").map(e=>{let t=e.lastIndexOf("-");return -1===t?{set:e.trim(),number:""}:{set:e.substring(0,t).trim(),number:e.substring(t+1).trim()}}),e0=async e=>{if(!t?.user){(0,U.c0)({title:Q("common:notification.error_not_logged_in"),message:Q("common:notification.error_please_login"),color:"red",icon:(0,a.jsx)(P.Z,{size:16})});return}try{let t=await fetch(`/api/decks/${e}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({deckName:Q("common:notification.notification_unnamed")})}),s=await t.json();t.ok?((0,U.c0)({title:Q("common:notification.success"),message:Q("common:notification.success_deck_saved"),color:"green",icon:(0,a.jsx)(E.Z,{size:16})}),ee(t=>t.map(t=>t.id===e?{...t,isSaved:!0,usageCount:t.usageCount+1}:t))):(0,U.c0)({title:Q("common:notification.error"),message:s.message||Q("common:notification.error_save_deck_failed"),color:"red",icon:(0,a.jsx)(P.Z,{size:16})})}catch(e){(0,U.c0)({title:Q("common:notification.error"),message:Q("common:notification.error_save_deck"),color:"red",icon:(0,a.jsx)(P.Z,{size:16})})}finally{}},e1=async e=>{if(!t?.user){(0,U.c0)({title:Q("common:notification.error_not_logged_in"),message:Q("common:notification.error_please_login"),color:"red",icon:(0,a.jsx)(P.Z,{size:16})});return}try{let t=await fetch(`/api/decks/${e}`,{method:"DELETE",headers:{"Content-Type":"application/json"}}),s=await t.json();t.ok?((0,U.c0)({title:Q("common:notification.success"),message:Q("common:notification.success_deck_deleted"),color:"green",icon:(0,a.jsx)(E.Z,{size:16})}),ee(t=>t.map(t=>t.id===e?{...t,isSaved:!1,usageCount:t.usageCount-1}:t))):(0,U.c0)({title:Q("common:notification.error_title"),message:s.message||Q("common:notification.error_delete_deck_failed"),color:"red",icon:(0,a.jsx)(P.Z,{size:16})})}catch(e){(0,U.c0)({title:Q("common:notification.error_title"),message:Q("common:notification.error_delete_deck"),color:"red",icon:(0,a.jsx)(P.Z,{size:16})})}finally{}},e5=[{title:Q("common:navigation.home"),href:"/"},{title:Q("common:navigation.deck_list"),href:"#"}].map((e,t)=>(0,a.jsx)(c.e,{href:e.href,children:e.title},t)),e2=(0,a.jsx)(D.Z,{});return(0,a.jsxs)(d.W,{size:"lg",children:[(0,a.jsx)(m.O,{children:e5}),(0,a.jsx)(u.Title,{order:1,mt:"sm",children:Q("common:navigation.deck_list")}),(0,a.jsx)(p.V,{color:"blue",icon:e2,mt:"xl",children:(0,a.jsx)(o.Text,{children:(0,a.jsx)(J.cC,{i18nKey:"common:filterInstruction",components:[(0,a.jsx)(O.Z,{size:18}),(0,a.jsx)(L.Z,{size:18})]})})}),(0,a.jsxs)(n.Z,{align:"center",justify:"space-between",mb:"md",mt:"md",children:[(0,a.jsx)(h.N,{placeholder:Q("common:set"),data:eB,searchable:!0,clearable:!0,value:ek,onChange:ew,maxValues:1}),(0,a.jsxs)(n.Z,{children:[(0,a.jsx)(g.A,{variant:"default",size:"lg",onClick:()=>{e_([]),eS([]),ez([]),eP([]),eD([]),eL([]),eg(""),eT([0,250]),eN([0,250]),eA("")},children:(0,a.jsx)(R.Z,{})}),(0,a.jsx)(g.A,{variant:"default",size:"lg",onClick:()=>ey(!ev),children:(0,a.jsx)(O.Z,{})})]})]}),(0,a.jsxs)(x.U,{in:ev,children:[(0,a.jsx)(f.i,{my:"xs",label:Q("common:advancedFiltering"),labelPosition:"left"}),(0,a.jsxs)(j.x,{mb:"md",children:[(0,a.jsx)(n.Z,{children:(0,a.jsx)(b.o,{placeholder:Q("common:search_card"),value:eh,onChange:e=>eg(e.target.value),leftSection:(0,a.jsx)(T.Z,{size:16}),radius:"md",size:"md",styles:{input:{width:300}}})}),(0,a.jsxs)(v.r,{mb:"md",children:[(0,a.jsx)(v.r.Col,{span:4,children:(0,a.jsx)(h.N,{label:Q("common:dex"),placeholder:Q("common:dex"),data:eK,searchable:!0,clearable:!0,value:eC,onChange:e_})}),(0,a.jsx)(v.r.Col,{span:4,children:(0,a.jsx)(h.N,{label:Q("common:aspects"),placeholder:Q("common:aspects"),data:eU,clearable:!0,renderOption:eJ,value:eZ,onChange:eS})}),(0,a.jsx)(v.r.Col,{span:4,children:(0,a.jsx)(h.N,{label:Q("common:rarity"),placeholder:Q("common:rarity"),data:eV,clearable:!0,renderOption:({option:e})=>(0,a.jsxs)(n.Z,{gap:"sm",children:[(0,a.jsx)(i.E,{src:`/common/${e.value}.webp`,alt:Q(`common:${e.value}`),height:20,width:20}),(0,a.jsx)(o.Text,{size:"sm",children:Q(`common:${e.value}`)})]}),value:e$,onChange:ez})})]}),(0,a.jsxs)(v.r,{mb:"md",children:[(0,a.jsx)(v.r.Col,{span:4,children:(0,a.jsx)(h.N,{label:Q("common:type"),placeholder:Q("common:type"),data:eH,clearable:!0,value:eM,onChange:eP})}),(0,a.jsx)(v.r.Col,{span:4,children:(0,a.jsx)(h.N,{label:Q("common:weakness"),placeholder:Q("common:weakness"),data:eU,clearable:!0,renderOption:eJ,value:eE,onChange:eD})}),(0,a.jsx)(v.r.Col,{span:4,children:(0,a.jsx)(h.N,{label:Q("common:retreat"),placeholder:Q("common:retreat"),data:eW,clearable:!0,value:eO,onChange:eL})})]}),(0,a.jsxs)(v.r,{mb:"md",gutter:"md",children:[(0,a.jsx)(v.r.Col,{span:{base:12,sm:6,md:6},mt:"sm",mb:"md",children:(0,a.jsx)(y.K,{children:(0,a.jsx)(k.U,{min:0,max:250,value:eR,onChange:eT,marks:[{value:0,label:"0"},{value:50,label:"50"},{value:100,label:"100"},{value:150,label:"150"},{value:200,label:"200"},{value:250,label:"250"}],"aria-label":Q("common:hp_range"),thumbSize:26,thumbChildren:[(0,a.jsx)(q.Z,{size:"1rem",color:eu},"1"),(0,a.jsx)(q.Z,{size:"1rem",color:eu},"2")],color:"red"})})}),(0,a.jsx)(v.r.Col,{span:{base:12,sm:6,md:6},mt:"sm",mb:"md",children:(0,a.jsx)(y.K,{children:(0,a.jsx)(k.U,{min:0,max:250,value:eq,onChange:eN,marks:[{value:0,label:"0"},{value:50,label:"50"},{value:100,label:"100"},{value:150,label:"150"},{value:200,label:"200"},{value:250,label:"250"}],"aria-label":Q("common:attack_range"),thumbSize:26,thumbChildren:[(0,a.jsx)(N.Z,{size:"1rem",color:ed},"3"),(0,a.jsx)(N.Z,{size:"1rem",color:ed},"4")]})})})]})]}),(0,a.jsx)(w.x,{h:440,scrollbars:"y",mt:"md",id:"scrollableDiv",children:(0,a.jsxs)(j.x,{mt:"md",h:610,children:[(0,a.jsx)(v.r,{mt:"md",columns:10,children:ex.slice(0,eF).map(t=>(0,a.jsx)(v.r.Col,{span:{base:5,sm:2,md:2,lg:2},children:(0,a.jsxs)(C.Z,{shadow:"sm",padding:"lg",radius:"md",withBorder:!0,onClick:()=>eA(eI===t.number?"":t.number),style:{cursor:"pointer",filter:eI&&eI!==t.number?"grayscale(100%)":"none"},children:[(0,a.jsx)(C.Z.Section,{children:(0,a.jsx)(i.E,{src:`/${e}/${t.set}/${t.number}.webp`,alt:Q(`pokemon:${t.name}`),loading:"lazy"})}),(0,a.jsxs)(y.K,{mt:"md",align:"center",gap:"xs",children:[(0,a.jsx)(o.Text,{fw:700,size:"lg",children:Q(`pokemon:${t.name}`)}),(0,a.jsx)(o.Text,{c:"dimmed",size:"sm",children:t.number}),(0,a.jsxs)(_.k,{gap:"xs",justify:"center",wrap:"wrap",children:[(0,a.jsx)(Z.C,{color:"blue",variant:"light",children:Q(`common:cardSet.${t.set}`)}),t.dex.filter(e=>"NO"!==e).map((e,t)=>(0,a.jsx)(Z.C,{color:"green",variant:"outline",children:Q(`common:cardDex.${e}`)},t))]})]})]})},t.id))}),eF<ex.length&&(0,a.jsx)(S.M,{mt:"md",children:(0,a.jsx)($.z,{onClick:()=>{eG(e=>e+20)},children:"載入更多"})})]})})]}),(0,a.jsx)(f.i,{my:"xs",label:Q("common:navigation.deck_list"),labelPosition:"left"}),(0,a.jsxs)(_.k,{mt:"md",align:"flex-end",gap:"md",children:[(0,a.jsx)(z.P,{label:Q("common:sorting.sortingMode"),placeholder:Q("common:sorting.chooseSortingMode"),data:[{value:"averageRating",label:Q("common:sorting.rating")},{value:"usageCount",label:Q("common:sorting.favorite")},{value:"createdAt",label:Q("common:sorting.creationTime")}],value:er,onChange:e=>{null!==e&&en(e)},style:{width:200}}),(0,a.jsx)(z.P,{label:Q("common:sorting.sortingOrder"),placeholder:Q("common:sorting.chooseSortingOrder"),data:[{value:"desc",label:Q("common:sorting.descendingNewest")},{value:"asc",label:Q("common:sorting.ascendingOldest")}],value:ei,onChange:e=>{null!==e&&eo(e)},style:{width:200}}),(0,a.jsxs)($.z,{onClick:()=>{ee([]),el(0),es(!0),eQ(null,0)},style:{height:36},children:[(0,a.jsx)(L.Z,{}),Q("common:sorting.submit")]})]}),(0,a.jsx)(V.Z,{dataLength:Y.length,next:()=>{eQ(null,null)},hasMore:et,loader:(0,a.jsx)(S.M,{mt:"md",children:(0,a.jsx)(M.a,{})}),endMessage:(0,a.jsx)(a.Fragment,{}),style:{width:"100%",overflow:"hidden"},children:(0,a.jsx)(v.r,{mt:"md",children:Y.map(t=>(0,a.jsx)(v.r.Col,{children:(0,a.jsxs)(C.Z,{shadow:"sm",padding:"lg",radius:"md",withBorder:!0,children:[(0,a.jsx)(C.Z.Section,{withBorder:!0,inheritPadding:!0,py:"xs",children:(0,a.jsxs)(n.Z,{style:{marginBottom:5},justify:"space-between",children:[(0,a.jsx)(u.Title,{order:4,children:t.id}),(0,a.jsxs)(n.Z,{children:[(0,a.jsx)(I.Z,{color:"#fcc419"}),(0,a.jsx)(o.Text,{fw:500,children:t.averageRating.toFixed(2)}),t.isSaved?(0,a.jsx)(g.A,{variant:"default",size:"lg",onClick:()=>e1(t.id),children:(0,a.jsx)(A.Z,{color:"#fcc419"})}):(0,a.jsx)(g.A,{variant:"default",size:"lg",onClick:()=>e0(t.id),children:(0,a.jsx)(F.Z,{color:"#fcc419"})}),(0,a.jsx)(o.Text,{fw:500,children:t.usageCount})]})]})}),(0,a.jsx)(G.default,{href:`/decks/${t.id}`,passHref:!0,style:{textDecoration:"none"},children:(0,a.jsx)(v.r,{columns:10,mt:"md",children:eY(t.deckCards).map((s,l)=>(0,a.jsx)(v.r.Col,{span:{base:2,sm:2,md:1,lg:1},children:(0,a.jsx)(i.E,{radius:"md",src:`/${e}/${s.set}/${s.set}-${s.number}.webp`,alt:`${s.set}-${s.number}`,loading:"lazy"})},`${t.id}-${s.set}-${s.number}-${l}`))})})]})},t.id))})})]})}},33118:(e,t,s)=>{"use strict";s.d(t,{Z:()=>l});var a=s(17266);let l=function(e,t){let[s,l]=(0,a.useState)(t);return[s,t=>{try{l(t),localStorage.setItem(e,JSON.stringify(t))}catch(t){console.error(`Error setting localStorage key "${e}":`,t)}}]}},42650:(e,t,s)=>{"use strict";s.a(e,async(e,a)=>{try{s.d(t,{Z:()=>e});var l=s(71851);let e=(await (0,l.createProxy)(String.raw`D:\MyCode\GameMantine\app\[lng]\decks\list\DecksListPageClient.tsx`)).default;a()}catch(e){a(e)}},1)},74306:(e,t,s)=>{"use strict";s.a(e,async(e,a)=>{try{s.r(t),s.d(t,{default:()=>d,generateMetadata:()=>c});var l=s(89351);s(22052);var r=s(38859),n=s(46061),i=s(42650),o=e([r,i]);async function c({params:e}){let{lng:t}=await e,{t:s}=await (0,n.$)(t,"common");return{title:s("metadata.decks_list_title"),description:s("metadata.decks_list_description"),keywords:s("metadata.decks_list_keywords")}}[r,i]=o.then?(await o)():o;let d=async({params:e})=>{let{lng:t}=await e;return(0,l.jsx)(r.Z,{lng:t,children:(0,l.jsx)(i.Z,{lng:t})})};a()}catch(e){a(e)}})},99705:(e,t,s)=>{"use strict";s.d(t,{k:()=>x});var a=s(68819),l=s(84099);s(17266);var r=s(46709),n=s(4531),i=s(89655),o=s(40013),c=s(2209),d=s(46382),m=s(48013),u=s(11115);let p={gap:{type:"spacing",property:"gap"},rowGap:{type:"spacing",property:"rowGap"},columnGap:{type:"spacing",property:"columnGap"},align:{type:"identity",property:"alignItems"},justify:{type:"identity",property:"justifyContent"},wrap:{type:"identity",property:"flexWrap"},direction:{type:"identity",property:"flexDirection"}};var h={root:"m_8bffd616"};let g={},x=(0,u.b)((e,t)=>{let s=(0,n.w)("Flex",g,e),{classNames:u,className:x,style:f,styles:j,unstyled:b,vars:v,gap:y,rowGap:k,columnGap:w,align:C,justify:_,wrap:Z,direction:S,...$}=s,z=(0,i.y)({name:"Flex",classes:h,props:s,className:x,style:f,classNames:u,styles:j,unstyled:b,vars:v}),M=(0,r.rZ)(),P=(0,d.m)(),E=(0,c.n)({styleProps:{gap:y,rowGap:k,columnGap:w,align:C,justify:_,wrap:Z,direction:S},theme:M,data:p});return(0,a.jsxs)(a.Fragment,{children:[E.hasResponsiveStyles&&(0,a.jsx)(o.f,{selector:`.${P}`,styles:E.styles,media:E.media}),(0,a.jsx)(m.x,{ref:t,...z("root",{className:P,style:(0,l.L)(E.inlineStyles)}),...$})]})});x.classes=h,x.displayName="@mantine/core/Flex"},13576:(e,t,s)=>{"use strict";s.d(t,{P:()=>f});var a=s(68819),l=s(17266),r=s(62509),n=s(12979),i=s(15875),o=s(4531),c=s(84362),d=s(98225),m=s(59510),u=s(25193),p=s(43714),h=s(62841),g=s(60292);let x={searchable:!1,withCheckIcon:!0,allowDeselect:!0,checkIconPosition:"left"},f=(0,c.d5)((e,t)=>{let s=(0,o.w)("Select",x,e),{classNames:c,styles:f,unstyled:j,vars:b,dropdownOpened:v,defaultDropdownOpened:y,onDropdownClose:k,onDropdownOpen:w,onFocus:C,onBlur:_,onClick:Z,onChange:S,data:$,value:z,defaultValue:M,selectFirstOptionOnChange:P,onOptionSubmit:E,comboboxProps:D,readOnly:O,disabled:L,filter:R,limit:T,withScrollArea:q,maxDropdownHeight:N,size:I,searchable:A,rightSection:F,checkIconPosition:G,withCheckIcon:B,nothingFoundMessage:K,name:U,form:V,searchValue:H,defaultSearchValue:W,onSearchChange:X,allowDeselect:J,error:Q,rightSectionPointerEvents:Y,id:ee,clearable:et,clearButtonProps:es,hiddenInputProps:ea,renderOption:el,onClear:er,autoComplete:en,scrollAreaProps:ei,...eo}=s,ec=(0,l.useMemo)(()=>(0,d.R)($),[$]),ed=(0,l.useMemo)(()=>(0,m.g)(ec),[ec]),em=(0,r.M)(ee),[eu,ep,eh]=(0,n.C)({value:z,defaultValue:M,finalValue:null,onChange:S}),eg="string"==typeof eu?ed[eu]:void 0,ex=(0,l.useRef)().current,[ef,ej]=(0,n.C)({value:H,defaultValue:W,finalValue:eg?eg.label:"",onChange:X}),eb=(0,h.K)({opened:v,defaultOpened:y,onDropdownOpen:()=>{w?.(),eb.updateSelectedOptionIndex("active",{scrollIntoView:!0})},onDropdownClose:()=>{k?.(),eb.resetSelectedOption()}}),{resolvedClassNames:ev,resolvedStyles:ey}=(0,i.h)({props:s,styles:f,classNames:c});(0,l.useEffect)(()=>{P&&eb.selectFirstOption()},[P,eu]),(0,l.useEffect)(()=>{null===z&&ej(""),"string"==typeof z&&eg&&(ex?.value!==eg.value||ex?.label!==eg.label)&&ej(eg.label)},[z,eg]);let ek=et&&!!eu&&!L&&!O&&(0,a.jsx)(u.h.ClearButton,{size:I,...es,onClear:()=>{ep(null,null),ej(""),er?.()}});return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(u.h,{store:eb,__staticSelector:"Select",classNames:ev,styles:ey,unstyled:j,readOnly:O,onOptionSubmit:e=>{E?.(e);let t=J&&ed[e].value===eu?null:ed[e],s=t?t.value:null;s!==eu&&ep(s,t),eh||ej("string"==typeof s&&t?.label||""),eb.closeDropdown()},size:I,...D,children:[(0,a.jsx)(u.h.Target,{targetType:A?"input":"button",autoComplete:en,children:(0,a.jsx)(g.M,{id:em,ref:t,rightSection:F||ek||(0,a.jsx)(u.h.Chevron,{size:I,error:Q,unstyled:j}),rightSectionPointerEvents:Y||(ek?"all":"none"),...eo,size:I,__staticSelector:"Select",disabled:L,readOnly:O||!A,value:ef,onChange:e=>{ej(e.currentTarget.value),eb.openDropdown(),P&&eb.selectFirstOption()},onFocus:e=>{A&&eb.openDropdown(),C?.(e)},onBlur:e=>{A&&eb.closeDropdown(),ej(null!=eu&&ed[eu]?.label||""),_?.(e)},onClick:e=>{A?eb.openDropdown():eb.toggleDropdown(),Z?.(e)},classNames:ev,styles:ey,unstyled:j,pointer:!A,error:Q})}),(0,a.jsx)(p.r,{data:ec,hidden:O||L,filter:R,search:ef,limit:T,hiddenWhenEmpty:!K,withScrollArea:q,maxDropdownHeight:N,filterOptions:A&&eg?.label!==ef,value:eu,checkIconPosition:G,withCheckIcon:B,nothingFoundMessage:K,unstyled:j,labelId:eo.label?`${em}-label`:void 0,"aria-label":eo.label?void 0:eo["aria-label"],renderOption:el,scrollAreaProps:ei})]}),(0,a.jsx)(u.h.HiddenInput,{value:eu,name:U,form:V,disabled:L,...ea})]})});f.classes={...g.M.classes,...u.h.classes},f.displayName="@mantine/core/Select"},14333:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});var a=(0,s(3915).Z)("outline","bookmark","IconBookmark",[["path",{d:"M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4z",key:"svg-0"}]])},95413:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});var a=(0,s(3915).Z)("filled","bookmark-filled","IconBookmarkFilled",[["path",{d:"M14 2a5 5 0 0 1 5 5v14a1 1 0 0 1 -1.555 .832l-5.445 -3.63l-5.444 3.63a1 1 0 0 1 -1.55 -.72l-.006 -.112v-14a5 5 0 0 1 5 -5h4z",key:"svg-0"}]])},60740:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});var a=(0,s(3915).Z)("outline","check","IconCheck",[["path",{d:"M5 12l5 5l10 -10",key:"svg-0"}]])},36854:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});var a=(0,s(3915).Z)("outline","send","IconSend",[["path",{d:"M10 14l11 -11",key:"svg-0"}],["path",{d:"M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5",key:"svg-1"}]])},57864:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});var a=(0,s(3915).Z)("filled","star-filled","IconStarFilled",[["path",{d:"M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z",key:"svg-0"}]])},94118:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});var a=(0,s(3915).Z)("outline","x","IconX",[["path",{d:"M18 6l-12 12",key:"svg-0"}],["path",{d:"M6 6l12 12",key:"svg-1"}]])}};var t=require("../../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),a=t.X(0,[4147,9908,3828,5080,6429,434,292,4333,3515,7139,7815],()=>s(59430));module.exports=a})();