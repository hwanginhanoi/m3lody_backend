"use strict";(self.webpackChunkreacttypescript=self.webpackChunkreacttypescript||[]).push([[377],{377:(t,e,s)=>{s.r(e),s.d(e,{DeleteEmployeeCompo:()=>u,default:()=>l});var n=s(791),a=(s(508),s(336));const c=async function(t){try{const e=await fetch("http://localhost:3001/api/employees/delete/".concat(t),{method:"DELETE",headers:{"Content-Type":"application/json"}});if(!e.ok)throw new Error("HTTP error! Status: ".concat(e.status));if(!(await e.json()).success)throw new Error("Can't retrieve data");return"Successful"}catch(e){(0,a.Z)(e)}};var r=s(689),i=s(700),o=s(184);function u(){const[t,e]=(0,n.useState)(""),[s,a]=(0,n.useState)(""),[u,l]=(0,n.useState)(!1),p=(0,r.s0)();if((0,n.useEffect)((()=>{(async()=>{await(0,i.Z)()?l(!0):p("/login")})()}),[p]),!u)return null;return(0,o.jsx)(o.Fragment,{children:(0,o.jsx)("form",{onSubmit:t=>{t.preventDefault()},children:(0,o.jsxs)("div",{className:"api_section",children:[(0,o.jsx)("h1",{children:"Delete"}),(0,o.jsx)("label",{htmlFor:"did",children:"Choose the ID:"}),(0,o.jsx)("input",{value:t,type:"text",id:"did",name:"did",onChange:t=>e(t.target.value)}),(0,o.jsx)("br",{}),(0,o.jsx)("input",{className:"input_button",type:"submit",value:"Submit",onClick:async function(){const e=await c(parseInt(t));void 0!==e&&a(e)}}),(0,o.jsx)("p",{children:s})]})})})}const l=u}}]);
//# sourceMappingURL=377.15ae9a96.chunk.js.map