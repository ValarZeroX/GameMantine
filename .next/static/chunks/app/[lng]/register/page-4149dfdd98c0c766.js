(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3842],{49938:(e,r,s)=>{Promise.resolve().then(s.bind(s,51023)),Promise.resolve().then(s.bind(s,46179))},51023:(e,r,s)=>{"use strict";s.d(r,{default:()=>b});var i=s(57437),t=s(2265),o=s(4301),a=s(1959),l=s(98557),n=s(99763),c=s(96293),d=s(22281),m=s(12194),g=s(11736),u=s(75513),h=s(85254),p=s(16463),f=s(87138),w=s(60327),j=s(29056),x=s(22966),P=s(47025);let b=e=>{let{lng:r}=e,{t:s}=(0,P.$)(r,"common"),b=(0,p.useRouter)(),[y,v]=(0,t.useState)(!1),z=(0,o.c)({initialValues:{name:"",email:"",password:"",confirmPassword:""},validate:{email:e=>/^\S+@\S+$/.test(e)?null:s("register.invalidEmail"),password:e=>e.length>=8?null:s("register.passwordLength"),confirmPassword:(e,r)=>e===r.password?null:s("register.passwordMismatch")}}),S=async e=>{v(!0);try{let t={...e,lng:r},o=await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),a=await o.json();o.ok?((0,w.c0)({title:s("notification.success"),message:s("notification.successMessage"),color:"green",icon:(0,i.jsx)(j.Z,{size:16})}),b.push("/".concat(r,"/login"))):(0,w.c0)({title:s("notification.errorTitle"),message:a.error||s("notification.errorMessage"),color:"red",icon:(0,i.jsx)(x.Z,{size:16})})}catch(e){(0,w.c0)({title:s("notification.errorTitle"),message:s("notification.errorMessage"),color:"red",icon:(0,i.jsx)(x.Z,{size:16})})}finally{v(!1)}};return(0,i.jsxs)(a.W,{size:420,my:40,children:[(0,i.jsx)(l.M,{children:(0,i.jsx)(n.Title,{children:s("register.createAccount")})}),(0,i.jsx)(l.M,{children:(0,i.jsxs)(c.Text,{c:"dimmed",size:"sm",children:[s("register.alreadyHaveAccount")," ",(0,i.jsx)(d.e,{component:f.default,href:"/login",size:"sm",children:s("login.login")})]})}),(0,i.jsx)(m.X,{withBorder:!0,shadow:"md",p:30,mt:30,radius:"md",children:(0,i.jsxs)("form",{onSubmit:z.onSubmit(S),children:[(0,i.jsx)(g.o,{label:s("register.name"),placeholder:s("register.yourName"),...z.getInputProps("name")}),(0,i.jsx)(g.o,{label:s("register.email"),placeholder:"your@email.com",required:!0,mt:"md",...z.getInputProps("email")}),(0,i.jsx)(u.W,{label:s("register.password"),placeholder:s("register.passwordPlaceholder"),required:!0,mt:"md",...z.getInputProps("password")}),(0,i.jsx)(u.W,{label:s("register.confirmPassword"),placeholder:s("register.confirmPasswordPlaceholder"),required:!0,mt:"md",...z.getInputProps("confirmPassword")}),(0,i.jsx)(h.z,{fullWidth:!0,mt:"xl",type:"submit",loading:y,children:s("register.register")})]})})]})}}},e=>{var r=r=>e(e.s=r);e.O(0,[7646,5501,8839,1141,5948,2008,7235,9498,1498,2005,6179,7130,6215,1744],()=>r(49938)),_N_E=e.O()}]);