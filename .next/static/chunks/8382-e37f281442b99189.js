"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8382],{35671:(e,t,n)=>{n.d(t,{Z:()=>b});var o=n(57437),a=n(2265),i=n(94120),r=n(15593),s=n(50591),c=n(86348),l=n(869),d=n(12194);let[m,p]=(0,n(1122).R)("Card component was not found in tree");var v=n(17750),h={root:"m_e615b15f",section:"m_599a2148"};let g={},u=(0,l.b)((e,t)=>{let{classNames:n,className:a,style:i,styles:r,vars:c,withBorder:l,inheritPadding:d,mod:m,...h}=(0,s.w)("CardSection",g,e),u=p();return(0,o.jsx)(v.x,{ref:t,mod:[{"with-border":l,"inherit-padding":d},m],...u.getStyles("section",{className:a,style:i,styles:r,classNames:n}),...h})});u.classes=h,u.displayName="@mantine/core/CardSection";let f={},y=(0,r.Z)((e,t)=>{let{padding:n}=t;return{root:{"--card-padding":(0,i.bG)(n)}}}),b=(0,l.b)((e,t)=>{let n=(0,s.w)("Card",f,e),{classNames:i,className:r,style:l,styles:p,unstyled:v,vars:g,children:b,padding:x,...j}=n,w=(0,c.y)({name:"Card",props:n,classes:h,className:r,style:l,classNames:i,styles:p,unstyled:v,vars:g,varsResolver:y}),S=a.Children.toArray(b),C=S.map((e,t)=>"object"==typeof e&&e&&"type"in e&&e.type===u?(0,a.cloneElement)(e,{"data-first-section":0===t||void 0,"data-last-section":t===S.length-1||void 0}):e);return(0,o.jsx)(m,{value:{getStyles:w},children:(0,o.jsx)(d.X,{ref:t,unstyled:v,...w("root"),...j,children:C})})});b.classes=h,b.displayName="@mantine/core/Card",b.Section=u},1959:(e,t,n)=>{n.d(t,{W:()=>v});var o=n(57437);n(2265);var a=n(94120),i=n(15593),r=n(50591),s=n(86348),c=n(17750),l=n(73147),d={root:"m_7485cace"};let m={},p=(0,i.Z)((e,t)=>{let{size:n,fluid:o}=t;return{root:{"--container-size":o?void 0:(0,a.ap)(n,"container-size")}}}),v=(0,l.d5)((e,t)=>{let n=(0,r.w)("Container",m,e),{classNames:a,className:i,style:l,styles:v,unstyled:h,vars:g,fluid:u,mod:f,...y}=n,b=(0,s.y)({name:"Container",classes:d,props:n,className:i,style:l,classNames:a,styles:v,unstyled:h,vars:g,varsResolver:p});return(0,o.jsx)(c.x,{ref:t,mod:[{fluid:u},f],...b("root"),...y})});v.classes=d,v.displayName="@mantine/core/Container"},12194:(e,t,n)=>{n.d(t,{X:()=>v});var o=n(57437);n(2265);var a=n(94120),i=n(15593),r=n(50591),s=n(86348),c=n(17750),l=n(869),d={root:"m_1b7284a3"};let m={},p=(0,i.Z)((e,t)=>{let{radius:n,shadow:o}=t;return{root:{"--paper-radius":void 0===n?void 0:(0,a.H5)(n),"--paper-shadow":(0,a.Xj)(o)}}}),v=(0,l.b)((e,t)=>{let n=(0,r.w)("Paper",m,e),{classNames:a,className:i,style:l,styles:v,unstyled:h,withBorder:g,vars:u,radius:f,shadow:y,variant:b,mod:x,...j}=n,w=(0,s.y)({name:"Paper",props:n,classes:d,className:i,style:l,classNames:a,styles:v,unstyled:h,vars:u,varsResolver:p});return(0,o.jsx)(c.x,{ref:t,mod:[{"data-with-border":g},x],...w("root"),variant:b,...j})});v.classes=d,v.displayName="@mantine/core/Paper"},22637:(e,t,n)=>{n.d(t,{M:()=>w});var o=n(57437);n(2265);var a=n(50591),i=n(86348),r=n(54803),s=n(17750),c=n(73147),l=n(29481),d=n(76726),m=n(20686),p=n(94120),v=n(1760),h=n(50848),g=n(15274),u=n(2040);function f(e){var t;let{spacing:n,verticalSpacing:a,cols:i,selector:r}=e,s=(0,g.rZ)(),c=void 0===a?n:a,d=(0,m.L)({"--sg-spacing-x":(0,p.bG)((0,h.v)(n)),"--sg-spacing-y":(0,p.bG)((0,h.v)(c)),"--sg-cols":null===(t=(0,h.v)(i))||void 0===t?void 0:t.toString()}),f=(0,l.X)(s.breakpoints).reduce((e,t)=>(e[t]||(e[t]={}),"object"==typeof n&&void 0!==n[t]&&(e[t]["--sg-spacing-x"]=(0,p.bG)(n[t])),"object"==typeof c&&void 0!==c[t]&&(e[t]["--sg-spacing-y"]=(0,p.bG)(c[t])),"object"==typeof i&&void 0!==i[t]&&(e[t]["--sg-cols"]=i[t]),e),{}),y=(0,v.I)((0,l.X)(f),s.breakpoints).filter(e=>(0,l.X)(f[e.value]).length>0).map(e=>({query:"(min-width: ".concat(s.breakpoints[e.value],")"),styles:f[e.value]}));return(0,o.jsx)(u.f,{styles:d,media:y,selector:r})}function y(e){return"object"==typeof e&&null!==e?(0,l.X)(e):[]}function b(e){var t;let{spacing:n,verticalSpacing:a,cols:i,selector:r}=e,s=void 0===a?n:a,c=(0,m.L)({"--sg-spacing-x":(0,p.bG)((0,h.v)(n)),"--sg-spacing-y":(0,p.bG)((0,h.v)(s)),"--sg-cols":null===(t=(0,h.v)(i))||void 0===t?void 0:t.toString()}),l=function(e){let{spacing:t,verticalSpacing:n,cols:o}=e;return Array.from(new Set([...y(t),...y(n),...y(o)])).sort((e,t)=>(0,d.px)(e)-(0,d.px)(t))}({spacing:n,verticalSpacing:a,cols:i}),v=l.reduce((e,t)=>(e[t]||(e[t]={}),"object"==typeof n&&void 0!==n[t]&&(e[t]["--sg-spacing-x"]=(0,p.bG)(n[t])),"object"==typeof s&&void 0!==s[t]&&(e[t]["--sg-spacing-y"]=(0,p.bG)(s[t])),"object"==typeof i&&void 0!==i[t]&&(e[t]["--sg-cols"]=i[t]),e),{}),g=l.map(e=>({query:"simple-grid (min-width: ".concat(e,")"),styles:v[e]}));return(0,o.jsx)(u.f,{styles:c,container:g,selector:r})}var x={container:"m_925c2d2c",root:"m_2415a157"};let j={cols:1,spacing:"md",type:"media"},w=(0,c.d5)((e,t)=>{let n=(0,a.w)("SimpleGrid",j,e),{classNames:c,className:l,style:d,styles:m,unstyled:p,vars:v,cols:h,verticalSpacing:g,spacing:u,type:y,...w}=n,S=(0,i.y)({name:"SimpleGrid",classes:x,props:n,className:l,style:d,classNames:c,styles:m,unstyled:p,vars:v}),C=(0,r.m)();return"container"===y?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(b,{...n,selector:".".concat(C)}),(0,o.jsx)("div",{...S("container"),children:(0,o.jsx)(s.x,{ref:t,...S("root",{className:C}),...w})})]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(f,{...n,selector:".".concat(C)}),(0,o.jsx)(s.x,{ref:t,...S("root",{className:C}),...w})]})});w.classes=x,w.displayName="@mantine/core/SimpleGrid"},99763:(e,t,n)=>{n.d(t,{Title:()=>g});var o=n(57437);n(2265);var a=n(15593),i=n(50591),r=n(86348),s=n(17750),c=n(73147),l=n(20322);let d=["h1","h2","h3","h4","h5","h6"],m=["xs","sm","md","lg","xl"];var p={root:"m_8a5d1357"};let v={order:1},h=(0,a.Z)((e,t)=>{let{order:n,size:o,lineClamp:a,textWrap:i}=t,r=function(e,t){let n=void 0!==t?t:"h".concat(e);return d.includes(n)?{fontSize:"var(--mantine-".concat(n,"-font-size)"),fontWeight:"var(--mantine-".concat(n,"-font-weight)"),lineHeight:"var(--mantine-".concat(n,"-line-height)")}:m.includes(n)?{fontSize:"var(--mantine-font-size-".concat(n,")"),fontWeight:"var(--mantine-h".concat(e,"-font-weight)"),lineHeight:"var(--mantine-h".concat(e,"-line-height)")}:{fontSize:(0,l.h)(n),fontWeight:"var(--mantine-h".concat(e,"-font-weight)"),lineHeight:"var(--mantine-h".concat(e,"-line-height)")}}(n,o);return{root:{"--title-fw":r.fontWeight,"--title-lh":r.lineHeight,"--title-fz":r.fontSize,"--title-line-clamp":"number"==typeof a?a.toString():void 0,"--title-text-wrap":i}}}),g=(0,c.d5)((e,t)=>{let n=(0,i.w)("Title",v,e),{classNames:a,className:c,style:l,styles:d,unstyled:m,order:g,vars:u,size:f,variant:y,lineClamp:b,textWrap:x,mod:j,...w}=n,S=(0,r.y)({name:"Title",props:n,classes:p,className:c,style:l,classNames:a,styles:d,unstyled:m,vars:u,varsResolver:h});return[1,2,3,4,5,6].includes(g)?(0,o.jsx)(s.x,{...S("root"),component:"h".concat(g),variant:y,ref:t,mod:[{order:g,"data-line-clamp":"number"==typeof b},j],size:f,...w}):null});g.classes=p,g.displayName="@mantine/core/Title"},50848:(e,t,n)=>{n.d(t,{v:()=>o});function o(e){return"object"==typeof e&&null!==e?"base"in e?e.base:void 0:e}}}]);