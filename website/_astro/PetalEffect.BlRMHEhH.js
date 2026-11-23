import{j as p}from"./jsx-runtime.D_zvdyIk.js";import{r as o}from"./index.CEK5zJnf.js";import{r as E}from"./index.CYHvl-95.js";function P(){const[s,n]=o.useState(!1),[e,c]=o.useState(""),a=o.useRef(null),t=o.useRef(null),u=f=>{a.current!==null&&(cancelAnimationFrame(a.current),a.current=null),t.current!==null&&(clearTimeout(t.current),t.current=null),n(!1),c(f.color),a.current=requestAnimationFrame(()=>{a.current=null,n(!0),t.current=window.setTimeout(()=>{n(!1),t.current=null},f.duration||1200)})};return o.useEffect(()=>()=>{a.current!==null&&cancelAnimationFrame(a.current),t.current!==null&&clearTimeout(t.current)},[]),{isActive:s,petalColor:e,triggerEffect:u}}function w(s,n){typeof s=="function"?s(n):s&&(s.current=n)}const b=`
  @keyframes petalFall1 {
    0% {
      transform: scale(0.3) rotate(0deg) translate(0, 0);
      opacity: 0;
    }
    5% {
      opacity: 0.8;
      transform: scale(0.8) rotate(20deg) translate(-5px, 5px);
    }
    100% {
      transform: scale(0.3) rotate(360deg) translate(-40px, 60px);
      opacity: 0;
    }
  }

  @keyframes petalFall2 {
    0% {
      transform: scale(0.2) rotate(0deg) translate(0, 0);
      opacity: 0;
    }
    3% {
      opacity: 0.9;
      transform: scale(0.9) rotate(-15deg) translate(5px, 3px);
    }
    100% {
      transform: scale(0.2) rotate(-270deg) translate(50px, 70px);
      opacity: 0;
    }
  }

  @keyframes petalFall3 {
    0% {
      transform: scale(0.4) rotate(0deg) translate(0, 0);
      opacity: 0;
    }
    4% {
      opacity: 1;
      transform: scale(1) rotate(45deg) translate(-3px, 8px);
    }
    100% {
      transform: scale(0.4) rotate(450deg) translate(20px, 80px);
      opacity: 0;
    }
  }

  @keyframes petalFloat {
    0% {
      transform: scale(0.2) rotate(0deg) translate(0, 0);
      opacity: 0;
    }
    6% {
      opacity: 0.7;
      transform: scale(0.8) rotate(30deg) translate(2px, -5px);
    }
    100% {
      transform: scale(0.1) rotate(300deg) translate(-30px, -40px);
      opacity: 0;
    }
  }

  .petal {
    position: absolute;
    width: 12px;
    height: 20px;
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
    /* Pages that load the app's styles make corners squircles. */
    corner-shape: round;
    opacity: 0;
    pointer-events: none;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
  }

  .petal-fall1 {
    animation: petalFall1 1s ease-out both;
  }

  .petal-fall2 {
    animation: petalFall2 1.1s ease-out both;
  }

  .petal-fall3 {
    animation: petalFall3 0.9s ease-out both;
  }

  .petal-float {
    animation: petalFloat 0.8s ease-out both;
  }

  @media (prefers-reduced-motion: reduce) {
    .petal {
      display: none;
    }
  }
`;function R({isActive:s,color:n,rect:e,petalCount:c=8,activationKey:a}){const t=e?.width??0,u=e?.height??0,f=o.useMemo(()=>{if(!s||t===0||u===0)return[];const d=(()=>{if(c!=null)return Math.max(2,Math.min(40,Math.floor(c)));const l=t*u;return Math.max(3,Math.min(36,Math.round(l*35e-5)))})(),m=["petal-fall1","petal-fall2","petal-fall3","petal-float"],h=[],y=Math.min((d-1)*.05,.4);for(let l=0;l<d;l++){const i=m[l%m.length],r=d>1?(l/(d-1)*y).toFixed(2):"0",g=Math.random()*40,x=Math.random()*90+5;h.push(p.jsx("div",{className:`petal ${i}`,style:{backgroundColor:n,top:`${g}%`,left:`${x}%`,animationDelay:`${r}s`}},l))}return h},[s,a,t,u,n,c]);return!s||!e||e.width<=0||e.height<=0?null:E.createPortal(p.jsxs("div",{style:{position:"fixed",top:e.top,left:e.left,width:e.width,height:e.height,pointerEvents:"none",zIndex:9999,overflow:"visible"},children:[p.jsx("style",{dangerouslySetInnerHTML:{__html:b}}),p.jsx("div",{style:{position:"absolute",inset:0},children:f})]},a),document.body)}const j=o.forwardRef(function({isActive:n,color:e,petalCount:c=8,activationKey:a,children:t},u){const f=o.useRef(null),[d,m]=o.useState(null);o.useEffect(()=>{const i=f.current;if(!i){m(null);return}const r=()=>{const x=i.getBoundingClientRect();m({top:x.top,left:x.left,width:x.width,height:x.height})};r();let g=null;return typeof ResizeObserver<"u"&&(g=new ResizeObserver(()=>r()),g.observe(i)),window.addEventListener("resize",r),window.addEventListener("scroll",r,{passive:!0}),()=>{g?.disconnect(),window.removeEventListener("resize",r),window.removeEventListener("scroll",r),m(null)}},[n,a]);const h=o.isValidElement(t)?t:null,y=h?.props.ref,l=h?o.cloneElement(h,{ref:i=>{const r=i;f.current=r,w(y,r),w(u,r)}}):t;return p.jsxs(p.Fragment,{children:[l,p.jsx(R,{isActive:n,color:e,rect:d,petalCount:c,activationKey:a})]})});export{j as P,P as u};
