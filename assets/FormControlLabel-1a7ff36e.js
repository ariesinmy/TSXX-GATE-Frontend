import{g as w,a as M,s as R,y as $,_ as p,r as x,u as E,b as U,aa as A,ab as D,T as v,j as d,c as F,S as I,d as W}from"./index-71303cf2.js";function z(e){return M("MuiFormControlLabel",e)}const B=w("MuiFormControlLabel",["root","labelPlacementStart","labelPlacementTop","labelPlacementBottom","disabled","label","error","required","asterisk"]),t=B,H=["checked","className","componentsProps","control","disabled","disableTypography","inputRef","label","labelPlacement","name","onChange","required","slotProps","value"],G=e=>{const{classes:o,disabled:l,labelPlacement:n,error:s,required:r}=e,m={root:["root",l&&"disabled",`labelPlacement${$(n)}`,s&&"error",r&&"required"],label:["label",l&&"disabled"],asterisk:["asterisk",s&&"error"]};return W(m,z,o)},J=R("label",{name:"MuiFormControlLabel",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:l}=e;return[{[`& .${t.label}`]:o.label},o.root,o[`labelPlacement${$(l.labelPlacement)}`]]}})(({theme:e,ownerState:o})=>p({display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,[`&.${t.disabled}`]:{cursor:"default"}},o.labelPlacement==="start"&&{flexDirection:"row-reverse",marginLeft:16,marginRight:-11},o.labelPlacement==="top"&&{flexDirection:"column-reverse",marginLeft:16},o.labelPlacement==="bottom"&&{flexDirection:"column",marginLeft:16},{[`& .${t.label}`]:{[`&.${t.disabled}`]:{color:(e.vars||e).palette.text.disabled}}})),K=R("span",{name:"MuiFormControlLabel",slot:"Asterisk",overridesResolver:(e,o)=>o.asterisk})(({theme:e})=>({[`&.${t.error}`]:{color:(e.vars||e).palette.error.main}})),O=x.forwardRef(function(o,l){var n,s;const r=E({props:o,name:"MuiFormControlLabel"}),{className:m,componentsProps:k={},control:i,disabled:P,disableTypography:q,label:j,labelPlacement:S="end",required:h,slotProps:T={}}=r,N=U(r,H),b=A(),y=(n=P??i.props.disabled)!=null?n:b==null?void 0:b.disabled,u=h??i.props.required,L={disabled:y,required:u};["checked","name","onChange","value","inputRef"].forEach(c=>{typeof i.props[c]>"u"&&typeof r[c]<"u"&&(L[c]=r[c])});const _=D({props:r,muiFormControl:b,states:["error"]}),f=p({},r,{disabled:y,labelPlacement:S,required:u,error:_.error}),g=G(f),C=(s=T.typography)!=null?s:k.typography;let a=j;return a!=null&&a.type!==v&&!q&&(a=d.jsx(v,p({component:"span"},C,{className:F(g.label,C==null?void 0:C.className),children:a}))),d.jsxs(J,p({className:F(g.root,m),ownerState:f,ref:l},N,{children:[x.cloneElement(i,L),u?d.jsxs(I,{direction:"row",alignItems:"center",children:[a,d.jsxs(K,{ownerState:f,"aria-hidden":!0,className:g.asterisk,children:[" ","*"]})]}):a]}))}),V=O;export{V as F};
