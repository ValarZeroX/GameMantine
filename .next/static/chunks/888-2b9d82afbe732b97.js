"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{59731:e=>{e.exports=function e(t,r){if(t===r)return!0;if(t&&r&&"object"==typeof t&&"object"==typeof r){if(t.constructor!==r.constructor)return!1;if(Array.isArray(t)){if((n=t.length)!=r.length)return!1;for(l=n;0!=l--;)if(!e(t[l],r[l]))return!1;return!0}if(t.constructor===RegExp)return t.source===r.source&&t.flags===r.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===r.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===r.toString();if((n=(o=Object.keys(t)).length)!==Object.keys(r).length)return!1;for(l=n;0!=l--;)if(!Object.prototype.hasOwnProperty.call(r,o[l]))return!1;for(l=n;0!=l--;){var n,l,o,a=o[l];if(!e(t[a],r[a]))return!1}return!0}return t!=t&&r!=r}},85254:(e,t,r)=>{r.d(t,{z:()=>E});var n=r(57437),l=r(20322);r(2265);var o=r(94120),a=r(15593),u=r(50591),c=r(86348),s=r(17750),i=r(869),d=r(34479),f=r(41392),p=r(30712),b=r(73147),h={root:"m_77c9d27d",inner:"m_80f1301b",label:"m_811560b9",section:"m_a74036a",loader:"m_a25b86ee",group:"m_80d6d844"};let m={orientation:"horizontal"},v=(0,a.Z)((e,t)=>{let{borderWidth:r}=t;return{group:{"--button-border-width":(0,l.h)(r)}}}),y=(0,b.d5)((e,t)=>{let r=(0,u.w)("ButtonGroup",m,e),{className:l,style:o,classNames:a,styles:i,unstyled:d,orientation:f,vars:p,borderWidth:b,variant:y,mod:g,...C}=(0,u.w)("ButtonGroup",m,e),k=(0,c.y)({name:"ButtonGroup",props:r,classes:h,className:l,style:o,classNames:a,styles:i,unstyled:d,vars:p,varsResolver:v,rootSelector:"group"});return(0,n.jsx)(s.x,{...k("group"),ref:t,variant:y,mod:[{"data-orientation":f},g],role:"group",...C})});y.classes=h,y.displayName="@mantine/core/ButtonGroup";let g={in:{opacity:1,transform:"translate(-50%, calc(-50% + ".concat((0,l.h)(1),"))")},out:{opacity:0,transform:"translate(-50%, -200%)"},common:{transformOrigin:"center"},transitionProperty:"transform, opacity"},C={},k=(0,a.Z)((e,t)=>{let{radius:r,color:n,gradient:l,variant:a,size:u,justify:c,autoContrast:s}=t,i=e.variantColorResolver({color:n||e.primaryColor,theme:e,gradient:l,variant:a||"filled",autoContrast:s});return{root:{"--button-justify":c,"--button-height":(0,o.ap)(u,"button-height"),"--button-padding-x":(0,o.ap)(u,"button-padding-x"),"--button-fz":(null==u?void 0:u.includes("compact"))?(0,o.yv)(u.replace("compact-","")):(0,o.yv)(u),"--button-radius":void 0===r?void 0:(0,o.H5)(r),"--button-bg":n||a?i.background:void 0,"--button-hover":n||a?i.hover:void 0,"--button-color":i.color,"--button-bd":n||a?i.border:void 0,"--button-hover-color":n||a?i.hoverColor:void 0}}}),E=(0,i.b)((e,t)=>{let r=(0,u.w)("Button",C,e),{style:l,vars:o,className:a,color:i,disabled:b,children:m,leftSection:v,rightSection:y,fullWidth:E,variant:j,radius:w,loading:V,loaderProps:S,gradient:O,classNames:x,styles:D,unstyled:F,"data-disabled":I,autoContrast:_,mod:L,...T}=r,A=(0,c.y)({name:"Button",props:r,classes:h,className:a,style:l,classNames:x,styles:D,unstyled:F,vars:o,varsResolver:k}),P=!!v,M=!!y;return(0,n.jsxs)(p.k,{ref:t,...A("root",{active:!b&&!V&&!I}),unstyled:F,variant:j,disabled:b||V,mod:[{disabled:b||I,loading:V,block:E,"with-left-section":P,"with-right-section":M},L],...T,children:[(0,n.jsx)(f.u,{mounted:!!V,transition:g,duration:150,children:e=>(0,n.jsx)(s.x,{component:"span",...A("loader",{style:e}),"aria-hidden":!0,children:(0,n.jsx)(d.a,{color:"var(--button-color)",size:"calc(var(--button-height) / 1.8)",...S})})}),(0,n.jsxs)("span",{...A("inner"),children:[v&&(0,n.jsx)(s.x,{component:"span",...A("section"),mod:{position:"left"},children:v}),(0,n.jsx)(s.x,{component:"span",mod:{loading:V},...A("label"),children:m}),y&&(0,n.jsx)(s.x,{component:"span",...A("section"),mod:{position:"right"},children:y})]})]})});E.classes=h,E.displayName="@mantine/core/Button",E.Group=y},75513:(e,t,r)=>{r.d(t,{W:()=>C});var n=r(57437),l=r(44839),o=r(27011),a=r(15057);r(2265);var u=r(94120),c=r(15593),s=r(63361),i=r(86348),d=r(50591),f=r(17622),p=r(73147),b=r(7497),h=r(49304),m=r(29498),v={root:"m_f61ca620",input:"m_ccf8da4c",innerInput:"m_f2d85dd2",visibilityToggle:"m_b1072d44"};let y={visibilityToggleIcon:e=>{let{reveal:t}=e;return(0,n.jsx)("svg",{viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{width:"var(--psi-icon-size)",height:"var(--psi-icon-size)"},children:(0,n.jsx)("path",{d:t?"M13.3536 2.35355C13.5488 2.15829 13.5488 1.84171 13.3536 1.64645C13.1583 1.45118 12.8417 1.45118 12.6464 1.64645L10.6828 3.61012C9.70652 3.21671 8.63759 3 7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C0.902945 9.08812 2.02314 10.1861 3.36061 10.9323L1.64645 12.6464C1.45118 12.8417 1.45118 13.1583 1.64645 13.3536C1.84171 13.5488 2.15829 13.5488 2.35355 13.3536L4.31723 11.3899C5.29348 11.7833 6.36241 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C14.0971 5.9119 12.9769 4.81391 11.6394 4.06771L13.3536 2.35355ZM9.90428 4.38861C9.15332 4.1361 8.34759 4 7.5 4C4.80285 4 2.52952 5.37816 1.09622 7.50001C1.87284 8.6497 2.89609 9.58106 4.09974 10.1931L9.90428 4.38861ZM5.09572 10.6114L10.9003 4.80685C12.1039 5.41894 13.1272 6.35031 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11C6.65241 11 5.84668 10.8639 5.09572 10.6114Z":"M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"})})}},g=(0,c.Z)((e,t)=>{let{size:r}=t;return{root:{"--psi-icon-size":(0,u.ap)(r,"psi-icon-size"),"--psi-button-size":(0,u.ap)(r,"psi-button-size")}}}),C=(0,p.d5)((e,t)=>{let r=(0,d.w)("PasswordInput",y,e),{classNames:u,className:c,style:p,styles:m,unstyled:C,vars:k,required:E,error:j,leftSection:w,disabled:V,id:S,variant:O,inputContainer:x,description:D,label:F,size:I,errorProps:_,descriptionProps:L,labelProps:T,withAsterisk:A,inputWrapperOrder:P,wrapperProps:M,radius:R,rightSection:z,rightSectionWidth:N,rightSectionPointerEvents:B,leftSectionWidth:Z,visible:W,defaultVisible:G,onVisibilityChange:H,visibilityToggleIcon:K,visibilityToggleButtonProps:U,rightSectionProps:q,leftSectionProps:X,leftSectionPointerEvents:$,withErrorStyles:J,mod:Q,...Y}=r,ee=(0,o.M)(S),[et,er]=(0,a.C)({value:W,defaultValue:G,finalValue:!1,onChange:H}),en=()=>er(!et),el=(0,i.y)({name:"PasswordInput",classes:v,props:r,className:c,style:p,classNames:u,styles:m,unstyled:C,vars:k,varsResolver:g}),{resolvedClassNames:eo,resolvedStyles:ea}=(0,s.h)({classNames:u,styles:m,props:r}),{styleProps:eu,rest:ec}=(0,f.c)(Y),es=(0,n.jsx)(b.A,{...el("visibilityToggle"),disabled:V,radius:R,"aria-hidden":!U,tabIndex:-1,...U,variant:"subtle",color:"gray",unstyled:C,onTouchEnd:e=>{var t;e.preventDefault(),null==U||null===(t=U.onTouchEnd)||void 0===t||t.call(U,e),en()},onMouseDown:e=>{var t;e.preventDefault(),null==U||null===(t=U.onMouseDown)||void 0===t||t.call(U,e),en()},onKeyDown:e=>{var t;null==U||null===(t=U.onKeyDown)||void 0===t||t.call(U,e)," "===e.key&&(e.preventDefault(),en())},children:(0,n.jsx)(K,{reveal:et})});return(0,n.jsx)(h.I.Wrapper,{required:E,id:ee,label:F,error:j,description:D,size:I,classNames:eo,styles:ea,__staticSelector:"PasswordInput",errorProps:_,descriptionProps:L,unstyled:C,withAsterisk:A,inputWrapperOrder:P,inputContainer:x,variant:O,labelProps:{...T,htmlFor:ee},mod:Q,...el("root"),...eu,...M,children:(0,n.jsx)(h.I,{component:"div",error:j,leftSection:w,size:I,classNames:{...eo,input:(0,l.Z)(v.input,eo.input)},styles:ea,radius:R,disabled:V,__staticSelector:"PasswordInput",rightSectionWidth:N,rightSection:null!=z?z:es,variant:O,unstyled:C,leftSectionWidth:Z,rightSectionPointerEvents:B||"all",rightSectionProps:q,leftSectionProps:X,leftSectionPointerEvents:$,withAria:!1,withErrorStyles:J,children:(0,n.jsx)("input",{required:E,"data-invalid":!!j||void 0,"data-with-left-section":!!w||void 0,...el("innerInput"),disabled:V,id:ee,ref:t,...ec,autoComplete:ec.autoComplete||"off",type:et?"text":"password"})})})});C.classes={...m.M.classes,...v},C.displayName="@mantine/core/PasswordInput"},4301:(e,t,r)=>{r.d(t,{c:()=>E});var n=r(2265);let l="undefined"!=typeof window?n.useLayoutEffect:n.useEffect;function o(e,t){l(()=>{if(e)return window.addEventListener(e,t),()=>window.removeEventListener(e,t)},[e])}function a(e){return null===e||"object"!=typeof e?{}:Object.keys(e).reduce((t,r)=>{let n=e[r];return null!=n&&!1!==n&&(t[r]=n),t},{})}function u(e,t){if(null===t||"object"!=typeof t)return{};let r={...t};return Object.keys(t).forEach(t=>{t.includes("".concat(String(e),"."))&&delete r[t]}),r}function c(e,t){return parseInt(e.substring(t.length+1).split(".")[0],10)}function s(e,t,r,n){if(void 0===t)return r;let l="".concat(String(e)),o=r;-1===n&&(o=u("".concat(l,".").concat(t),o));let a={...o},s=new Set;return Object.entries(o).filter(e=>{let[r]=e;if(!r.startsWith("".concat(l,".")))return!1;let n=c(r,l);return!Number.isNaN(n)&&n>=t}).forEach(e=>{let[t,r]=e,o=c(t,l),u=t.replace("".concat(l,".").concat(o),"".concat(l,".").concat(o+n));a[u]=r,s.add(u),s.has(t)||delete a[t]}),a}function i(e){return"string"!=typeof e?[]:e.split(".")}function d(e,t){let r=i(e);if(0===r.length||"object"!=typeof t||null===t)return;let n=t[r[0]];for(let e=1;e<r.length&&null!=n;e+=1)n=n[r[e]];return n}function f(e,t,r){"object"==typeof r.value&&(r.value=p(r.value)),r.enumerable&&!r.get&&!r.set&&r.configurable&&r.writable&&"__proto__"!==t?e[t]=r.value:Object.defineProperty(e,t,r)}function p(e){if("object"!=typeof e)return e;var t,r,n,l=0,o=Object.prototype.toString.call(e);if("[object Object]"===o?n=Object.create(e.__proto__||null):"[object Array]"===o?n=Array(e.length):"[object Set]"===o?(n=new Set,e.forEach(function(e){n.add(p(e))})):"[object Map]"===o?(n=new Map,e.forEach(function(e,t){n.set(p(t),p(e))})):"[object Date]"===o?n=new Date(+e):"[object RegExp]"===o?n=new RegExp(e.source,e.flags):"[object DataView]"===o?n=new e.constructor(p(e.buffer)):"[object ArrayBuffer]"===o?n=e.slice(0):"Array]"===o.slice(-6)&&(n=new e.constructor(e)),n){for(r=Object.getOwnPropertySymbols(e);l<r.length;l++)f(n,r[l],Object.getOwnPropertyDescriptor(e,r[l]));for(l=0,r=Object.getOwnPropertyNames(e);l<r.length;l++)Object.hasOwnProperty.call(n,t=r[l])&&n[t]===e[t]||f(n,t,Object.getOwnPropertyDescriptor(e,t))}return n||e}function b(e,t,r){let n=i(e);if(0===n.length)return r;let l=p(r);if(1===n.length)return l[n[0]]=t,l;let o=l[n[0]];for(let e=1;e<n.length-1;e+=1){if(void 0===o)return l;o=o[n[e]]}return o[n[n.length-1]]=t,l}var h=r(59731);function m(e,t){let r=Object.keys(e);if("string"==typeof t){let n=r.filter(e=>e.startsWith("".concat(t,".")));return e[t]||n.some(t=>e[t])||!1}return r.some(t=>e[t])}function v(e,t){return e?"".concat(e,"-").concat(t.toString()):t.toString()}function y(e){let t=a(e);return{hasErrors:Object.keys(t).length>0,errors:t}}function g(e,t){return"function"==typeof e?y(e(t)):y(function e(t,r){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return"object"!=typeof t||null===t?l:Object.keys(t).reduce((l,o)=>{let a=t[o],u="".concat(""===n?"":"".concat(n,".")).concat(o),c=d(u,r),s=!1;return"function"==typeof a&&(l[u]=a(c,r,u)),"object"==typeof a&&Array.isArray(c)&&(s=!0,c.forEach((t,n)=>e(a,r,"".concat(u,".").concat(n),l))),"object"!=typeof a||"object"!=typeof c||null===c||s||e(a,r,u,l),l},l)}(e,t))}function C(e,t,r){if("string"!=typeof e)return{hasError:!1,error:null};let n=g(t,r),l=Object.keys(n.errors).find(t=>e.split(".").every((e,r)=>e===t.split(".")[r]));return{hasError:!!l,error:l?n.errors[l]:null}}function k(e,t){return!!t&&("boolean"==typeof t?t:!!Array.isArray(t)&&t.includes(e.replace(/[.][0-9]+/g,".".concat("__MANTINE_FORM_INDEX__"))))}function E(){let{name:e,mode:t="controlled",initialValues:r,initialErrors:l={},initialDirty:c={},initialTouched:i={},clearInputErrorOnChange:f=!0,validateInputOnChange:p=!1,validateInputOnBlur:y=!1,onValuesChange:E,transformValues:j=e=>e,enhanceGetInputProps:w,validate:V}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},S=function(e){let[t,r]=(0,n.useState)(a(e)),l=(0,n.useRef)(t),o=(0,n.useCallback)(e=>{r(t=>{let r=a("function"==typeof e?e(t):e);return l.current=r,r})},[]),u=(0,n.useCallback)(()=>o({}),[]),c=(0,n.useCallback)(e=>{void 0!==l.current[e]&&o(t=>{let r={...t};return delete r[e],r})},[t]),s=(0,n.useCallback)((e,t)=>{null==t||!1===t?c(e):l.current[e]!==t&&o(r=>({...r,[e]:t}))},[t]);return{errorsState:t,setErrors:o,clearErrors:u,setFieldError:s,clearFieldError:c}}(l),O=function(e){let{initialValues:t,onValuesChange:r,mode:l}=e,o=(0,n.useRef)(!1),[a,u]=(0,n.useState)(t||{}),c=(0,n.useRef)(a),s=(0,n.useRef)(a),i=(0,n.useCallback)(e=>{let{values:t,subscribers:n,updateState:l=!0,mergeWithPreviousValues:o=!0}=e,a=c.current,s=t instanceof Function?t(c.current):t,i=o?{...a,...s}:s;c.current=i,l&&u(i),null==r||r(i,a),null==n||n.filter(Boolean).forEach(e=>e({updatedValues:i,previousValues:a}))},[r]),f=(0,n.useCallback)(e=>{let t=d(e.path,c.current),r=e.value instanceof Function?e.value(t):e.value;if(t!==r){var n;let t=c.current,l=b(e.path,r,c.current);i({values:l,updateState:e.updateState}),null===(n=e.subscribers)||void 0===n||n.filter(Boolean).forEach(r=>r({path:e.path,updatedValues:l,previousValues:t}))}},[i]),p=(0,n.useCallback)(e=>{s.current=e},[]),h=(0,n.useCallback)((e,t)=>{o.current||(o.current=!0,i({values:e,updateState:"controlled"===l}),p(e),t())},[i]),m=(0,n.useCallback)(()=>{i({values:s.current,updateState:!0,mergeWithPreviousValues:!1})},[i]),v=(0,n.useCallback)(()=>c.current,[]),y=(0,n.useCallback)(()=>s.current,[]);return{initialized:o,stateValues:a,refValues:c,valuesSnapshot:s,setValues:i,setFieldValue:f,resetValues:m,setValuesSnapshot:p,initialize:h,getValues:v,getValuesSnapshot:y}}({initialValues:r,onValuesChange:E,mode:t}),x=function(e){let{initialDirty:t,initialTouched:r,mode:l,$values:o}=e,[a,c]=(0,n.useState)(r),[s,i]=(0,n.useState)(t),f=(0,n.useRef)(r),p=(0,n.useRef)(t),b=(0,n.useCallback)(e=>{let t="function"==typeof e?e(f.current):e;f.current=t,"controlled"===l&&c(t)},[]),v=(0,n.useCallback)(function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r="function"==typeof e?e(p.current):e;p.current=r,("controlled"===l||t)&&i(r)},[]),y=(0,n.useCallback)(()=>b({}),[]),g=(0,n.useCallback)(e=>{let t=e?{...e,...o.refValues.current}:o.refValues.current;o.setValuesSnapshot(t),v({})},[]),C=(0,n.useCallback)((e,t)=>{b(r=>m(r,e)===t?r:{...r,[e]:t})},[]),k=(0,n.useCallback)((e,t,r)=>{v(r=>m(r,e)===t?r:{...r,[e]:t},r)},[]),E=(0,n.useCallback)((e,t)=>{let r=m(p.current,e),n=!h(d(e,o.getValuesSnapshot()),t),l=u(e,p.current);l[e]=n,v(l,r!==n)},[]),j=(0,n.useCallback)(e=>m(f.current,e),[]),w=(0,n.useCallback)(e=>v(t=>{if("string"!=typeof e)return t;let r=u(e,t);return(delete r[e],h(r,t))?t:r}),[]),V=(0,n.useCallback)(e=>{if(e){let t=d(e,p.current);return"boolean"==typeof t?t:!h(d(e,o.refValues.current),d(e,o.valuesSnapshot.current))}return Object.keys(p.current).length>0?m(p.current):!h(o.refValues.current,o.valuesSnapshot.current)},[]),S=(0,n.useCallback)(()=>p.current,[]),O=(0,n.useCallback)(()=>f.current,[]);return{touchedState:a,dirtyState:s,touchedRef:f,dirtyRef:p,setTouched:b,setDirty:v,resetDirty:g,resetTouched:y,isTouched:j,setFieldTouched:C,setFieldDirty:k,setTouchedState:c,setDirtyState:i,clearFieldDirty:w,isDirty:V,getDirty:S,getTouched:O,setCalculatedFieldDirty:E}}({initialDirty:c,initialTouched:i,$values:O,mode:t}),D=function(e){let{$values:t,$errors:r,$status:l}=e,o=(0,n.useCallback)((e,n)=>{l.clearFieldDirty(e),r.setErrors(t=>(function(e,t,r){let{from:n,to:l}=t,o="".concat(e,".").concat(n),a="".concat(e,".").concat(l),u={...r};return Object.keys(r).every(e=>{let t,r;if(e.startsWith(o)&&(t=e,r=e.replace(o,a)),e.startsWith(a)&&(t=e.replace(a,o),r=e),t&&r){let e=u[t],n=u[r];return void 0===n?delete u[t]:u[t]=n,void 0===e?delete u[r]:u[r]=e,!1}return!0}),u})(e,n,t)),t.setValues({values:function(e,t,r){let{from:n,to:l}=t,o=d(e,r);if(!Array.isArray(o))return r;let a=[...o],u=o[n];return a.splice(n,1),a.splice(l,0,u),b(e,a,r)}(e,n,t.refValues.current),updateState:!0})},[]);return{reorderListItem:o,removeListItem:(0,n.useCallback)((e,n)=>{l.clearFieldDirty(e),r.setErrors(t=>s(e,n,t,-1)),t.setValues({values:function(e,t,r){let n=d(e,r);return Array.isArray(n)?b(e,n.filter((e,r)=>r!==t),r):r}(e,n,t.refValues.current),updateState:!0})},[]),insertListItem:(0,n.useCallback)((e,n,o)=>{l.clearFieldDirty(e),r.setErrors(t=>s(e,o,t,1)),t.setValues({values:function(e,t,r,n){let l=d(e,n);if(!Array.isArray(l))return n;let o=[...l];return o.splice("number"==typeof r?r:o.length,0,t),b(e,o,n)}(e,n,o,t.refValues.current),updateState:!0})},[]),replaceListItem:(0,n.useCallback)((e,r,n)=>{l.clearFieldDirty(e),t.setValues({values:function(e,t,r,n){let l=d(e,n);if(!Array.isArray(l)||l.length<=r)return n;let o=[...l];return o[r]=t,b(e,o,n)}(e,n,r,t.refValues.current),updateState:!0})},[])}}({$values:O,$errors:S,$status:x}),F=function(e){let{$status:t}=e,r=(0,n.useRef)({}),l=(0,n.useCallback)((e,t)=>{(0,n.useEffect)(()=>(r.current[e]=r.current[e]||[],r.current[e].push(t),()=>{r.current[e]=r.current[e].filter(e=>e!==t)}),[t])},[]),o=(0,n.useCallback)(e=>r.current[e]?r.current[e].map(r=>n=>r({previousValue:d(e,n.previousValues),value:d(e,n.updatedValues),touched:t.isTouched(e),dirty:t.isDirty(e)})):[],[]);return{subscribers:r,watch:l,getFieldSubscribers:o}}({$status:x}),[I,_]=(0,n.useState)(0),[L,T]=(0,n.useState)({}),A=(0,n.useCallback)(()=>{O.resetValues(),S.clearErrors(),x.resetDirty(),x.resetTouched(),"uncontrolled"===t&&_(e=>e+1)},[]),P=(0,n.useCallback)(e=>{f&&S.clearErrors(),"uncontrolled"===t&&_(e=>e+1),Object.keys(F.subscribers.current).forEach(t=>{d(t,O.refValues.current)!==d(t,e)&&F.getFieldSubscribers(t).forEach(t=>t({previousValues:e,updatedValues:O.refValues.current}))})},[f]),M=(0,n.useCallback)(e=>{let r=O.refValues.current;O.initialize(e,()=>"uncontrolled"===t&&_(e=>e+1)),P(r)},[P]),R=(0,n.useCallback)((e,r,n)=>{let l=k(e,p),o=r instanceof Function?r(d(e,O.refValues.current)):r;x.setCalculatedFieldDirty(e,o),x.setFieldTouched(e,!0),!l&&f&&S.clearFieldError(e),O.setFieldValue({path:e,value:r,updateState:"controlled"===t,subscribers:[...F.getFieldSubscribers(e),l?t=>{let r=C(e,V,t.updatedValues);r.hasError?S.setFieldError(e,r.error):S.clearFieldError(e)}:null,(null==n?void 0:n.forceUpdate)!==!1&&"controlled"!==t?()=>T(t=>({...t,[e]:(t[e]||0)+1})):null]})},[E,V]),z=(0,n.useCallback)(e=>{let r=O.refValues.current;O.setValues({values:e,updateState:"controlled"===t}),P(r)},[E,P]),N=(0,n.useCallback)(()=>{let e=g(V,O.refValues.current);return S.setErrors(e.errors),e},[V]),B=(0,n.useCallback)(e=>{let t=C(e,V,O.refValues.current);return t.hasError?S.setFieldError(e,t.error):S.clearFieldError(e),t},[V]),Z=(0,n.useCallback)(e=>{e.preventDefault(),A()},[]),W=(0,n.useCallback)(e=>e?!C(e,V,O.refValues.current).hasError:!g(V,O.refValues.current).hasErrors,[V]),G=(0,n.useCallback)(t=>document.querySelector('[data-path="'.concat(v(e,t),'"]')),[]),H={watch:F.watch,initialized:O.initialized.current,values:O.stateValues,getValues:O.getValues,setInitialValues:O.setValuesSnapshot,initialize:M,setValues:z,setFieldValue:R,errors:S.errorsState,setErrors:S.setErrors,setFieldError:S.setFieldError,clearFieldError:S.clearFieldError,clearErrors:S.clearErrors,resetDirty:x.resetDirty,setTouched:x.setTouched,setDirty:x.setDirty,isTouched:x.isTouched,resetTouched:x.resetTouched,isDirty:x.isDirty,getTouched:x.getTouched,getDirty:x.getDirty,reorderListItem:D.reorderListItem,insertListItem:D.insertListItem,removeListItem:D.removeListItem,replaceListItem:D.replaceListItem,reset:A,validate:N,validateField:B,getInputProps:function(r){var n;let{type:l="input",withError:o=!0,withFocus:a=!0,...u}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},c={onChange:(n=e=>R(r,e,{forceUpdate:!1}),e=>{if(e){if("function"==typeof e)n(e);else if("object"==typeof e&&"nativeEvent"in e){let{currentTarget:t}=e;t instanceof HTMLInputElement?"checkbox"===t.type?n(t.checked):n(t.value):(t instanceof HTMLTextAreaElement||t instanceof HTMLSelectElement)&&n(t.value)}else n(e)}else n(e)}),"data-path":v(e,r)};return o&&(c.error=S.errorsState[r]),"checkbox"===l?c["controlled"===t?"checked":"defaultChecked"]=d(r,O.refValues.current):c["controlled"===t?"value":"defaultValue"]=d(r,O.refValues.current),a&&(c.onFocus=()=>x.setFieldTouched(r,!0),c.onBlur=()=>{if(k(r,y)){let e=C(r,V,O.refValues.current);e.hasError?S.setFieldError(r,e.error):S.clearFieldError(r)}}),Object.assign(c,null==w?void 0:w({inputProps:c,field:r,options:{type:l,withError:o,withFocus:a,...u},form:H}))},onSubmit:(e,t)=>r=>{null==r||r.preventDefault();let n=N();n.hasErrors?null==t||t(n.errors,O.refValues.current,r):null==e||e(j(O.refValues.current),r)},onReset:Z,isValid:W,getTransformedValues:e=>j(e||O.refValues.current),key:e=>"".concat(I,"-").concat(e,"-").concat(L[e]||0),getInputNode:G};return e&&function(e){if(!/^[0-9a-zA-Z-]+$/.test(e))throw Error('[@mantine/use-form] Form name "'.concat(e,'" is invalid, it should contain only letters, numbers and dashes'))}(e),o("mantine-form:".concat(e,":set-field-value"),e=>H.setFieldValue(e.detail.path,e.detail.value)),o("mantine-form:".concat(e,":set-values"),e=>H.setValues(e.detail)),o("mantine-form:".concat(e,":set-initial-values"),e=>H.setInitialValues(e.detail)),o("mantine-form:".concat(e,":set-errors"),e=>H.setErrors(e.detail)),o("mantine-form:".concat(e,":set-field-error"),e=>H.setFieldError(e.detail.path,e.detail.error)),o("mantine-form:".concat(e,":clear-field-error"),e=>H.clearFieldError(e.detail)),o("mantine-form:".concat(e,":clear-errors"),H.clearErrors),o("mantine-form:".concat(e,":reset"),H.reset),o("mantine-form:".concat(e,":validate"),H.validate),o("mantine-form:".concat(e,":validate-field"),e=>H.validateField(e.detail)),o("mantine-form:".concat(e,":reorder-list-item"),e=>H.reorderListItem(e.detail.path,e.detail.payload)),o("mantine-form:".concat(e,":remove-list-item"),e=>H.removeListItem(e.detail.path,e.detail.index)),o("mantine-form:".concat(e,":insert-list-item"),e=>H.insertListItem(e.detail.path,e.detail.item,e.detail.index)),o("mantine-form:".concat(e,":set-dirty"),e=>H.setDirty(e.detail)),o("mantine-form:".concat(e,":set-touched"),e=>H.setTouched(e.detail)),o("mantine-form:".concat(e,":reset-dirty"),e=>H.resetDirty(e.detail)),o("mantine-form:".concat(e,":reset-touched"),H.resetTouched),H}}}]);