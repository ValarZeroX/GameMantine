"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[111],{41198:(e,o,l)=>{l.d(o,{V:()=>x});var r=l(57437),i=l(20322);l(2265);var t=l(94120),a=l(15593),n=l(65762),c=l(45027),s=l(78928),d=l(50591),u=l(86348),h=l(17750),p=l(73147),v={root:"m_ddec01c0",icon:"m_dde7bd57",cite:"m_dde51a35"};let b={iconSize:48},m=(0,a.Z)((e,o)=>{let{color:l,iconSize:r,radius:a}=o,d=(0,n.E)({color:l||e.primaryColor,theme:e,colorScheme:"dark"}),u=(0,n.E)({color:l||e.primaryColor,theme:e,colorScheme:"light"});return{root:{"--bq-bg-light":(0,s.m)(u.value,.07),"--bq-bg-dark":(0,s.m)(d.value,.06),"--bq-bd":(0,c.p)(l,e),"--bq-icon-size":(0,i.h)(r),"--bq-radius":(0,t.H5)(a)}}}),x=(0,p.d5)((e,o)=>{let l=(0,d.w)("Blockquote",b,e),{classNames:i,className:t,style:a,styles:n,unstyled:c,vars:s,children:p,icon:x,iconSize:C,cite:y,...f}=l,k=(0,u.y)({name:"Blockquote",classes:v,props:l,className:t,style:a,classNames:i,styles:n,unstyled:c,vars:s,varsResolver:m});return(0,r.jsxs)(h.x,{component:"blockquote",ref:o,...k("root"),...f,children:[x&&(0,r.jsx)("span",{...k("icon"),children:x}),p,y&&(0,r.jsx)("cite",{...k("cite"),children:y})]})});x.classes=v,x.displayName="@mantine/core/Blockquote"},47464:(e,o,l)=>{l.d(o,{P:()=>a,n:()=>t});var r=l(57437),i=l(20322);function t(e){let{size:o,style:l,...t}=e,a=void 0!==o?{width:(0,i.h)(o),height:(0,i.h)(o),...l}:l;return(0,r.jsx)("svg",{viewBox:"0 0 10 7",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:a,"aria-hidden":!0,...t,children:(0,r.jsx)("path",{d:"M4 4.586L1.707 2.293A1 1 0 1 0 .293 3.707l3 3a.997.997 0 0 0 1.414 0l5-5A1 1 0 1 0 8.293.293L4 4.586z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"})})}function a(e){let{indeterminate:o,...l}=e;return o?(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 32 6","aria-hidden":!0,...l,children:(0,r.jsx)("rect",{width:"32",height:"6",fill:"currentColor",rx:"3"})}):(0,r.jsx)(t,{...l})}l(2265)},39717:(e,o,l)=>{l.d(o,{X:()=>A});var r=l(57437),i=l(27011),t=l(2265),a=l(94120),n=l(15593),c=l(65762),s=l(45027),d=l(19955),u=l(58834),h=l(50591),p=l(86348),v=l(17622),b=l(17750),m=l(73147),x=l(39712),C=l(30712);let y=(0,t.createContext)(null),f=y.Provider,k=()=>(0,t.useContext)(y),[_,w]=(0,l(58725).V)();var g={card:"m_26775b0a"};let j={withBorder:!0},I=(0,n.Z)((e,o)=>{let{radius:l}=o;return{card:{"--card-radius":(0,a.H5)(l)}}}),z=(0,m.d5)((e,o)=>{let l=(0,h.w)("CheckboxCard",j,e),{classNames:i,className:t,style:a,styles:n,unstyled:c,vars:s,checked:d,mod:u,withBorder:v,value:b,onClick:m,...x}=l,y=(0,p.y)({name:"CheckboxCard",classes:g,props:l,className:t,style:a,classNames:i,styles:n,unstyled:c,vars:s,varsResolver:I,rootSelector:"card"}),f=k(),w="boolean"==typeof d?d:(null==f?void 0:f.value.includes(b||""))||!1;return(0,r.jsx)(_,{value:{checked:w},children:(0,r.jsx)(C.k,{ref:o,mod:[{"with-border":v,checked:w},u],...y("card"),...x,role:"checkbox","aria-checked":w,onClick:e=>{null==m||m(e),null==f||f.onChange(b||"")}})})});z.displayName="@mantine/core/CheckboxCard",z.classes=g;var Z=l(15057),M=l(49304),S=l(41124);let N={},P=(0,m.d5)((e,o)=>{let{value:l,defaultValue:i,onChange:t,size:a,wrapperProps:n,children:c,readOnly:s,...d}=(0,h.w)("CheckboxGroup",N,e),[u,p]=(0,Z.C)({value:l,defaultValue:i,finalValue:[],onChange:t});return(0,r.jsx)(f,{value:{value:u,onChange:e=>{let o="string"==typeof e?e:e.currentTarget.value;s||p(u.includes(o)?u.filter(e=>e!==o):[...u,o])},size:a},children:(0,r.jsx)(M.I.Wrapper,{size:a,ref:o,...n,...d,labelElement:"div",__staticSelector:"CheckboxGroup",children:(0,r.jsx)(S.m,{role:"group",children:c})})})});P.classes=M.I.Wrapper.classes,P.displayName="@mantine/core/CheckboxGroup";var D=l(47464),E={indicator:"m_5e5256ee",icon:"m_1b1c543a","indicator--outline":"m_76e20374"};let T={icon:D.P},R=(0,n.Z)((e,o)=>{let{radius:l,color:r,size:i,iconColor:t,variant:n,autoContrast:h}=o,p=(0,c.E)({color:r||e.primaryColor,theme:e}),v=p.isThemeColor&&void 0===p.shade?"var(--mantine-color-".concat(p.color,"-outline)"):p.color;return{indicator:{"--checkbox-size":(0,a.ap)(i,"checkbox-size"),"--checkbox-radius":void 0===l?void 0:(0,a.H5)(l),"--checkbox-color":"outline"===n?v:(0,s.p)(r,e),"--checkbox-icon-color":t?(0,s.p)(t,e):(0,u.o)(h,e)?(0,d.R)({color:r,theme:e,autoContrast:h}):void 0}}}),q=(0,m.d5)((e,o)=>{let l=(0,h.w)("CheckboxIndicator",T,e),{classNames:i,className:t,style:a,styles:n,unstyled:c,vars:s,icon:d,indeterminate:u,radius:v,color:m,iconColor:x,autoContrast:C,checked:y,mod:f,variant:k,disabled:_,...g}=l,j=(0,p.y)({name:"CheckboxIndicator",classes:E,props:l,className:t,style:a,classNames:i,styles:n,unstyled:c,vars:s,varsResolver:R,rootSelector:"indicator"}),I=w(),z="boolean"==typeof y||"boolean"==typeof u?y||u:(null==I?void 0:I.checked)||!1;return(0,r.jsx)(b.x,{ref:o,...j("indicator",{variant:k}),variant:k,mod:[{checked:z,disabled:_},f],...g,children:(0,r.jsx)(d,{indeterminate:u,...j("icon")})})});q.displayName="@mantine/core/CheckboxIndicator",q.classes=E;var B={root:"m_bf2d988c",inner:"m_26062bec",input:"m_26063560",icon:"m_bf295423","input--outline":"m_215c4542"};let L={labelPosition:"right",icon:D.P},W=(0,n.Z)((e,o)=>{let{radius:l,color:r,size:i,iconColor:t,variant:n,autoContrast:h}=o,p=(0,c.E)({color:r||e.primaryColor,theme:e}),v=p.isThemeColor&&void 0===p.shade?"var(--mantine-color-".concat(p.color,"-outline)"):p.color;return{root:{"--checkbox-size":(0,a.ap)(i,"checkbox-size"),"--checkbox-radius":void 0===l?void 0:(0,a.H5)(l),"--checkbox-color":"outline"===n?v:(0,s.p)(r,e),"--checkbox-icon-color":t?(0,s.p)(t,e):(0,u.o)(h,e)?(0,d.R)({color:r,theme:e,autoContrast:h}):void 0}}}),A=(0,m.d5)((e,o)=>{let l=(0,h.w)("Checkbox",L,e),{classNames:t,className:a,style:n,styles:c,unstyled:s,vars:d,color:u,label:m,id:C,size:y,radius:f,wrapperProps:_,checked:w,labelPosition:g,description:j,error:I,disabled:z,variant:Z,indeterminate:M,icon:S,rootRef:N,iconColor:P,onChange:D,autoContrast:E,mod:T,...R}=l,q=k(),A=y||(null==q?void 0:q.size),F=(0,p.y)({name:"Checkbox",props:l,classes:B,className:a,style:n,classNames:t,styles:c,unstyled:s,vars:d,varsResolver:W}),{styleProps:G,rest:V}=(0,v.c)(R),H=(0,i.M)(C),J=q?{checked:q.value.includes(V.value),onChange:e=>{q.onChange(e),null==D||D(e)}}:{};return(0,r.jsx)(x.Z,{...F("root"),__staticSelector:"Checkbox",__stylesApiProps:l,id:H,size:A,labelPosition:g,label:m,description:j,error:I,disabled:z,classNames:t,styles:c,unstyled:s,"data-checked":J.checked||w||void 0,variant:Z,ref:N,mod:T,...G,..._,children:(0,r.jsxs)(b.x,{...F("inner"),mod:{"data-label-position":g},children:[(0,r.jsx)(b.x,{component:"input",id:H,ref:o,checked:w,disabled:z,mod:{error:!!I,indeterminate:M},...F("input",{focusable:!0,variant:Z}),onChange:D,...V,...J,type:"checkbox"}),(0,r.jsx)(S,{indeterminate:M,...F("icon")})]})})});A.classes={...B,...x.J},A.displayName="@mantine/core/Checkbox",A.Group=P,A.Indicator=q,A.Card=z},91601:(e,o,l)=>{l.d(o,{i:()=>v});var r=l(57437);l(2265);var i=l(94120),t=l(15593),a=l(45027),n=l(50591),c=l(86348),s=l(17750),d=l(73147),u={root:"m_3eebeb36",label:"m_9e365f20"};let h={orientation:"horizontal"},p=(0,t.Z)((e,o)=>{let{color:l,variant:r,size:t}=o;return{root:{"--divider-color":l?(0,a.p)(l,e):void 0,"--divider-border-style":r,"--divider-size":(0,i.ap)(t,"divider-size")}}}),v=(0,d.d5)((e,o)=>{let l=(0,n.w)("Divider",h,e),{classNames:i,className:t,style:a,styles:d,unstyled:v,vars:b,color:m,orientation:x,label:C,labelPosition:y,mod:f,...k}=l,_=(0,c.y)({name:"Divider",classes:u,props:l,className:t,style:a,classNames:i,styles:d,unstyled:v,vars:b,varsResolver:p});return(0,r.jsx)(s.x,{ref:o,mod:[{orientation:x,"with-label":!!C},f],..._("root"),...k,role:"separator",children:C&&(0,r.jsx)(s.x,{component:"span",mod:{position:y},..._("label"),children:C})})});v.classes=u,v.displayName="@mantine/core/Divider"},39712:(e,o,l)=>{l.d(o,{Z:()=>u,J:()=>d});var r=l(57437),i=l(2265),t=l(94120),a=l(86348),n=l(17750),c=l(49304),s={root:"m_5f75b09e",body:"m_5f6e695e",labelWrapper:"m_d3ea56bb",label:"m_8ee546b8",description:"m_328f68c0",error:"m_8e8a99cc"};let d=s,u=(0,i.forwardRef)((e,o)=>{let{__staticSelector:l,__stylesApiProps:i,className:d,classNames:u,styles:h,unstyled:p,children:v,label:b,description:m,id:x,disabled:C,error:y,size:f,labelPosition:k="left",bodyElement:_="div",labelElement:w="label",variant:g,style:j,vars:I,mod:z,...Z}=e,M=(0,a.y)({name:l,props:i,className:d,style:j,classes:s,classNames:u,styles:h,unstyled:p});return(0,r.jsx)(n.x,{...M("root"),ref:o,__vars:{"--label-fz":(0,t.yv)(f),"--label-lh":(0,t.ap)(f,"label-lh")},mod:[{"label-position":k},z],variant:g,size:f,...Z,children:(0,r.jsxs)(n.x,{component:_,htmlFor:"label"===_?x:void 0,...M("body"),children:[v,(0,r.jsxs)("div",{...M("labelWrapper"),"data-disabled":C||void 0,children:[b&&(0,r.jsx)(n.x,{component:w,htmlFor:"label"===w?x:void 0,...M("label"),"data-disabled":C||void 0,children:b}),m&&(0,r.jsx)(c.I.Description,{size:f,__inheritStyles:!1,...M("description"),children:m}),y&&"boolean"!=typeof y&&(0,r.jsx)(c.I.Error,{size:f,__inheritStyles:!1,...M("error"),children:y})]})]})})});u.displayName="@mantine/core/InlineInput"},41124:(e,o,l)=>{l.d(o,{m:()=>t});var r=l(57437);l(2265);var i=l(99970);function t(e){let{children:o,role:l}=e,t=(0,i.D)();return t?(0,r.jsx)("div",{role:l,"aria-labelledby":t.labelId,"aria-describedby":t.describedBy,children:o}):(0,r.jsx)(r.Fragment,{children:o})}},75513:(e,o,l)=>{l.d(o,{W:()=>f});var r=l(57437),i=l(44839),t=l(27011),a=l(15057);l(2265);var n=l(94120),c=l(15593),s=l(63361),d=l(86348),u=l(50591),h=l(17622),p=l(73147),v=l(7497),b=l(49304),m=l(29498),x={root:"m_f61ca620",input:"m_ccf8da4c",innerInput:"m_f2d85dd2",visibilityToggle:"m_b1072d44"};let C={visibilityToggleIcon:e=>{let{reveal:o}=e;return(0,r.jsx)("svg",{viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{width:"var(--psi-icon-size)",height:"var(--psi-icon-size)"},children:(0,r.jsx)("path",{d:o?"M13.3536 2.35355C13.5488 2.15829 13.5488 1.84171 13.3536 1.64645C13.1583 1.45118 12.8417 1.45118 12.6464 1.64645L10.6828 3.61012C9.70652 3.21671 8.63759 3 7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C0.902945 9.08812 2.02314 10.1861 3.36061 10.9323L1.64645 12.6464C1.45118 12.8417 1.45118 13.1583 1.64645 13.3536C1.84171 13.5488 2.15829 13.5488 2.35355 13.3536L4.31723 11.3899C5.29348 11.7833 6.36241 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C14.0971 5.9119 12.9769 4.81391 11.6394 4.06771L13.3536 2.35355ZM9.90428 4.38861C9.15332 4.1361 8.34759 4 7.5 4C4.80285 4 2.52952 5.37816 1.09622 7.50001C1.87284 8.6497 2.89609 9.58106 4.09974 10.1931L9.90428 4.38861ZM5.09572 10.6114L10.9003 4.80685C12.1039 5.41894 13.1272 6.35031 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11C6.65241 11 5.84668 10.8639 5.09572 10.6114Z":"M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"})})}},y=(0,c.Z)((e,o)=>{let{size:l}=o;return{root:{"--psi-icon-size":(0,n.ap)(l,"psi-icon-size"),"--psi-button-size":(0,n.ap)(l,"psi-button-size")}}}),f=(0,p.d5)((e,o)=>{let l=(0,u.w)("PasswordInput",C,e),{classNames:n,className:c,style:p,styles:m,unstyled:f,vars:k,required:_,error:w,leftSection:g,disabled:j,id:I,variant:z,inputContainer:Z,description:M,label:S,size:N,errorProps:P,descriptionProps:D,labelProps:E,withAsterisk:T,inputWrapperOrder:R,wrapperProps:q,radius:B,rightSection:L,rightSectionWidth:W,rightSectionPointerEvents:A,leftSectionWidth:F,visible:G,defaultVisible:V,onVisibilityChange:H,visibilityToggleIcon:J,visibilityToggleButtonProps:K,rightSectionProps:X,leftSectionProps:O,leftSectionPointerEvents:Q,withErrorStyles:U,mod:Y,...$}=l,ee=(0,t.M)(I),[eo,el]=(0,a.C)({value:G,defaultValue:V,finalValue:!1,onChange:H}),er=()=>el(!eo),ei=(0,d.y)({name:"PasswordInput",classes:x,props:l,className:c,style:p,classNames:n,styles:m,unstyled:f,vars:k,varsResolver:y}),{resolvedClassNames:et,resolvedStyles:ea}=(0,s.h)({classNames:n,styles:m,props:l}),{styleProps:en,rest:ec}=(0,h.c)($),es=(0,r.jsx)(v.A,{...ei("visibilityToggle"),disabled:j,radius:B,"aria-hidden":!K,tabIndex:-1,...K,variant:"subtle",color:"gray",unstyled:f,onTouchEnd:e=>{var o;e.preventDefault(),null==K||null===(o=K.onTouchEnd)||void 0===o||o.call(K,e),er()},onMouseDown:e=>{var o;e.preventDefault(),null==K||null===(o=K.onMouseDown)||void 0===o||o.call(K,e),er()},onKeyDown:e=>{var o;null==K||null===(o=K.onKeyDown)||void 0===o||o.call(K,e)," "===e.key&&(e.preventDefault(),er())},children:(0,r.jsx)(J,{reveal:eo})});return(0,r.jsx)(b.I.Wrapper,{required:_,id:ee,label:S,error:w,description:M,size:N,classNames:et,styles:ea,__staticSelector:"PasswordInput",errorProps:P,descriptionProps:D,unstyled:f,withAsterisk:T,inputWrapperOrder:R,inputContainer:Z,variant:z,labelProps:{...E,htmlFor:ee},mod:Y,...ei("root"),...en,...q,children:(0,r.jsx)(b.I,{component:"div",error:w,leftSection:g,size:N,classNames:{...et,input:(0,i.Z)(x.input,et.input)},styles:ea,radius:B,disabled:j,__staticSelector:"PasswordInput",rightSectionWidth:W,rightSection:null!=L?L:es,variant:z,unstyled:f,leftSectionWidth:F,rightSectionPointerEvents:A||"all",rightSectionProps:X,leftSectionProps:O,leftSectionPointerEvents:Q,withAria:!1,withErrorStyles:U,children:(0,r.jsx)("input",{required:_,"data-invalid":!!w||void 0,"data-with-left-section":!!g||void 0,...ei("innerInput"),disabled:j,id:ee,ref:o,...ec,autoComplete:ec.autoComplete||"off",type:eo?"text":"password"})})})});f.classes={...m.M.classes,...x},f.displayName="@mantine/core/PasswordInput"},11736:(e,o,l)=>{l.d(o,{o:()=>c});var r=l(57437);l(2265);var i=l(50591),t=l(73147),a=l(29498);let n={},c=(0,t.d5)((e,o)=>{let l=(0,i.w)("TextInput",n,e);return(0,r.jsx)(a.M,{component:"input",ref:o,...l,__staticSelector:"TextInput"})});c.classes=a.M.classes,c.displayName="@mantine/core/TextInput"},58834:(e,o,l)=>{l.d(o,{o:()=>r});function r(e,o){return"boolean"==typeof e?e:o.autoContrast}},19955:(e,o,l)=>{l.d(o,{R:()=>t,a:()=>a});var r=l(76900),i=l(65762);function t(e){let{color:o,theme:l,autoContrast:r}=e;return("boolean"==typeof r?r:l.autoContrast)&&(0,i.E)({color:o||l.primaryColor,theme:l}).isLight?"var(--mantine-color-black)":"var(--mantine-color-white)"}function a(e,o){return t({color:e.colors[e.primaryColor][(0,r.j)(e,o)],theme:e,autoContrast:null})}},54537:(e,o,l)=>{l.d(o,{Z:()=>r});var r=(0,l(55487).Z)("filled","brand-google-filled","IconBrandGoogleFilled",[["path",{d:"M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z",key:"svg-0"}]])},77967:(e,o,l)=>{l.d(o,{Z:()=>r});var r=(0,l(55487).Z)("outline","info-circle","IconInfoCircle",[["path",{d:"M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0",key:"svg-0"}],["path",{d:"M12 9h.01",key:"svg-1"}],["path",{d:"M11 12h1v4h1",key:"svg-2"}]])}}]);