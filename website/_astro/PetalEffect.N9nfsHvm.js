import{j as i}from"./jsx-runtime.D_zvdyIk.js";import{r as d}from"./index.CEK5zJnf.js";import{r as tt}from"./index.CYHvl-95.js";const at=`
  @keyframes blume-falling-petal-fall {
    0% {
      transform: translate3d(var(--falling-petal-start-x), var(--falling-petal-start-y), 0);
      opacity: var(--falling-petal-start-opacity);
    }
    7% {
      opacity: var(--falling-petal-opacity);
    }
    86% {
      opacity: var(--falling-petal-opacity);
    }
    100% {
      transform: translate3d(var(--falling-petal-end-x), var(--falling-petal-end-y), 0);
      opacity: 0;
    }
  }

  @keyframes blume-falling-petal-sway {
    0%, 100% {
      transform: translate3d(0, 0, 0);
    }
    28% {
      transform: translate3d(var(--falling-petal-sway), 0, 0);
    }
    58% {
      transform: translate3d(var(--falling-petal-sway-back), 0, 0);
    }
    82% {
      transform: translate3d(var(--falling-petal-sway-soft), 0, 0);
    }
  }

  @keyframes blume-falling-petal-tumble {
    0% {
      transform: rotate(var(--falling-petal-start-rotation)) rotateY(0deg) scale(0.82);
    }
    35% {
      transform: rotate(calc(var(--falling-petal-start-rotation) + 95deg)) rotateY(150deg) scale(1);
    }
    68% {
      transform: rotate(calc(var(--falling-petal-start-rotation) + 210deg)) rotateY(300deg) scale(0.9);
    }
    100% {
      transform: rotate(calc(var(--falling-petal-start-rotation) + var(--falling-petal-tumble))) rotateY(420deg)
        scale(0.78);
    }
  }

  .blume-falling-petal-motion {
    display: block;
    width: 100%;
    height: 100%;
    pointer-events: none;
    will-change: transform, opacity;
    animation-name: blume-falling-petal-fall;
    animation-timing-function: cubic-bezier(0.24, 0.02, 0.72, 0.64);
    animation-fill-mode: both;
  }

  .blume-falling-petal-motion__sway {
    display: block;
    width: 100%;
    height: 100%;
    animation-name: blume-falling-petal-sway;
    animation-timing-function: ease-in-out;
    animation-iteration-count: 1;
    animation-fill-mode: both;
  }

  .blume-falling-petal-motion__shape {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
    /* The theme's squircle corners would square a petal off. */
    corner-shape: round;
    background: linear-gradient(
      145deg,
      color-mix(in srgb, var(--falling-petal-color) 62%, var(--tint-base)),
      var(--falling-petal-color)
    );
    box-shadow: 0 2px 3px var(--petal-shadow);
    animation-name: blume-falling-petal-tumble;
    animation-timing-function: ease-in-out;
    animation-iteration-count: 1;
    animation-fill-mode: both;
  }

  @media (prefers-reduced-motion: reduce) {
    .blume-falling-petal-motion {
      display: none;
    }
  }
`;function B({color:a,delayMs:e,durationMs:n,endY:t,motion:o,startOpacity:r=o.opacity,startX:s="0px",startY:l="0px",endX:p="0px",tumbleDelayMs:b=e}){const g={animationDelay:`${e}ms`,animationDuration:`${n}ms`,"--falling-petal-color":a,"--falling-petal-opacity":`${o.opacity}`,"--falling-petal-start-opacity":`${r}`,"--falling-petal-start-x":s,"--falling-petal-start-y":l,"--falling-petal-end-x":p,"--falling-petal-end-y":t,"--falling-petal-sway":`${o.sway}px`,"--falling-petal-sway-back":`${o.swayBack}px`,"--falling-petal-sway-soft":`${o.swaySoft}px`,"--falling-petal-start-rotation":`${o.startRotation}deg`,"--falling-petal-tumble":`${o.tumble}deg`};return i.jsx("span",{className:"blume-falling-petal-motion",style:g,children:i.jsx("span",{className:"blume-falling-petal-motion__sway",style:{animationDelay:`${e}ms`,animationDuration:`${n}ms`},children:i.jsx("span",{className:"blume-falling-petal-motion__shape",style:{animationDelay:`${b}ms`,animationDuration:`${Math.round(n*o.tumbleDurationRatio)}ms`}})})})}const W=4200,Q=.1,j=120,et=2e3,nt=550,C=.88,J=1.16,lt=300,ot=a=>a*(Math.PI/180);function H(a,e){for(let n=a.length-1;n>0;n-=1){const t=Math.floor(e()*(n+1));[a[n],a[t]]=[a[t],a[n]]}return a}function rt(a,e=Math.random){const n=Math.max(2,Math.floor(a)),t=Array.from({length:n},(r,s)=>(s+e())/n);H(t,e);const o=H(Array.from({length:n},(r,s)=>s),e);return t.map((r,s)=>({fanRatio:r,startRank:o[s]}))}function st(a,e=Math.random){const n=a%2===0?1:-1,t=n*(18+e()*28);return{opacity:.66+e()*.24,sway:t,swayBack:-t*.65,swaySoft:t*.45,startRotation:Math.round(e()*180),tumble:n*Math.round(280+e()*300),tumbleDurationRatio:.68+e()*.35}}function it(a,e=Math.random){return Math.round(a*(C+e()*(J-C)))}function q(a){return a*(1-Q)}function bt(a=W){const e=a*J;return Math.ceil(e+j+lt)}function ct({fanRatio:a,width:e,height:n,originY:t,verticalPlacement:o}){const r=n*(.08+Math.min(1,Math.max(0,o))*.84),s=ot(-160+a*140),l=Math.min(78,Math.max(28,e*.17+n*.38)),p=Math.sin(s)*l;return r-t+p}function pt({viewportHeight:a,targetTop:e,originY:n,extraDrop:t}){return Math.max(260,a-e-n+t)}function ft(a){return Math.min(240,Math.max(70,a*.4))}function ut(a,e=Math.random){const n=e()*Math.PI*2,t=.25+e()*.75,o=typeof a=="number"?a:a.x,r=typeof a=="number"?a:a.y;return{x:Math.cos(n)*t*o,y:Math.sin(n)*t*r}}function U(a,e){return Math.max(a==="page"?2:1,Math.min(a==="page"?80:40,Math.floor(e)))}function wt(a,e,n){const o=[...e.scope==="page"?a.filter(l=>l.scope!=="page"):a,e],r=[];let s=0;for(let l=o.length-1;l>=0;l-=1){const p=o[l];if(r.length>=n.maxActiveRewards)break;r.length>0&&s+p.petalCount>n.maxActivePetals||(r.unshift(p),s+=p.petalCount)}return r}const mt=`
  ${at}

  @keyframes blume-petal-click-explosion {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(var(--petal-fan-x), var(--petal-fan-y), 0);
    }
  }

  @keyframes blume-petal-drift {
    0% {
      transform: translate3d(var(--petal-start-x), -8px, 0);
      opacity: 0;
    }
    10% {
      opacity: var(--petal-opacity);
    }
    28% {
      transform: translate3d(calc(var(--petal-start-x) + var(--petal-sway)), 28px, 0);
    }
    52% {
      transform: translate3d(calc(var(--petal-start-x) + var(--petal-sway-back)), 62px, 0);
    }
    76% {
      transform: translate3d(calc(var(--petal-start-x) + var(--petal-sway-soft)), 98px, 0);
      opacity: var(--petal-opacity);
    }
    100% {
      transform: translate3d(var(--petal-end-x), var(--petal-drop), 0);
      opacity: 0;
    }
  }

  @keyframes blume-petal-tumble {
    0% {
      transform: rotate(var(--petal-start-rotation)) rotateY(0deg) scale(0.82);
    }
    35% {
      transform: rotate(calc(var(--petal-start-rotation) + 95deg)) rotateY(150deg) scale(1);
    }
    68% {
      transform: rotate(calc(var(--petal-start-rotation) + 210deg)) rotateY(300deg) scale(0.9);
    }
    100% {
      transform: rotate(calc(var(--petal-start-rotation) + var(--petal-tumble))) rotateY(420deg)
        scale(0.78);
    }
  }

  .blume-petal-effect__petal {
    position: absolute;
    width: var(--petal-width);
    height: var(--petal-height);
    opacity: 0;
    pointer-events: none;
    will-change: transform, opacity;
    animation-name: blume-petal-drift;
    animation-timing-function: cubic-bezier(0.22, 0.58, 0.34, 1);
    animation-fill-mode: both;
  }

  .blume-petal-effect__petal--click-launch {
    opacity: 1;
    animation-name: blume-petal-click-explosion;
    animation-timing-function: cubic-bezier(0.14, 0.86, 0.26, 1);
  }

  .blume-petal-effect__petal--fall {
    opacity: 1;
    animation-name: none;
  }

  .blume-petal-effect__sway {
    display: block;
    width: 100%;
    height: 100%;
  }

  .blume-petal-effect__shape {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
    /* The theme's squircle corners would square a petal off. */
    corner-shape: round;
    background: linear-gradient(145deg, color-mix(in srgb, var(--petal-color) 62%, var(--tint-base)), var(--petal-color));
    box-shadow: 0 2px 3px var(--petal-shadow);
    animation-name: blume-petal-tumble;
    animation-timing-function: ease-in-out;
    animation-iteration-count: 1;
    animation-fill-mode: both;
  }

  @media (prefers-reduced-motion: reduce) {
    .blume-petal-effect__petal {
      display: none;
    }
  }
`;function dt(){return i.jsx("style",{"data-blume-petal-styles":"",dangerouslySetInnerHTML:{__html:mt}})}const ht=d.memo(function({isActive:e,color:n,rect:t,petalCount:o=8,duration:r,activationKey:s,origin:l,motion:p="drift",launchShape:b="fan",launchRadius:g,includeStyles:k=!0,coordinateSpace:c="viewport",followViewportUntilLaunch:m=!1}){const w=d.useRef(null),h=d.useRef({x:0,y:0});d.useLayoutEffect(()=>{if(!e||!m||c!=="page")return;h.current={x:window.scrollX,y:window.scrollY};const f=()=>{w.current?.style.setProperty("--pending-scroll-x",`${window.scrollX-h.current.x}px`),w.current?.style.setProperty("--pending-scroll-y",`${window.scrollY-h.current.y}px`)},v=w.current,x=D=>{const M=D.target;if(!(M instanceof HTMLElement)||!M.classList.contains("blume-petal-effect__petal--click-launch"))return;const $=M.parentElement;$&&!$.dataset.launched&&($.dataset.launched="true",$.style.translate=`${window.scrollX-h.current.x}px ${window.scrollY-h.current.y}px`)};f(),v?.addEventListener("animationstart",x),window.addEventListener("scroll",f,{passive:!0});const _=window.setTimeout(()=>window.removeEventListener("scroll",f),j+100);return()=>{window.clearTimeout(_),v?.removeEventListener("animationstart",x),window.removeEventListener("scroll",f)}},[e,s,m,c]);const Z=d.useMemo(()=>{if(!e||!t||t.width===0||t.height===0||typeof window>"u")return[];const f=U("element",o),v=[],x=p==="fall",_=!!l||x,D=r??(_?W:et),M=_?rt(f):null,$=_?Math.min((f-1)*.022,j/1e3):Math.min((f-1)*.11,nt/1e3);for(let u=0;u<f;u+=1){const V=M?.[u]?.startRank??u,A=f>1?(V/(f-1)*$).toFixed(2):"0",R=it(D),y=st(u),F=l?0:(Math.random()-.5)*Math.max(38,t.width*.8),T=M?.[u]?.fanRatio??(f>1?u/(f-1):.5),S=x?t.height*(.08+Math.random()*.84):0,E=l&&b==="circle"?ut(g??ft(t.width)):null,O=E?E.x:l?t.width*(.03+T*.94)-l.x:F+(Math.random()-.5)*70,G=E?E.y:l?ct({fanRatio:T,width:t.width,height:t.height,originY:l.y,verticalPlacement:u===0?0:u===f-1?1:Math.random()}):0,N=7+Math.random()*5,I=11+Math.random()*7,Y=_?pt({viewportHeight:window.innerHeight,targetTop:c==="page"?t.top-window.scrollY:t.top,originY:l?.y??S,extraDrop:55+Math.random()*95}):105+Math.random()*75,L={top:l?`${l.y-I/2}px`:x?`${S-I/2}px`:`${-12+Math.random()*34}%`,left:l?`${l.x-N/2}px`:x?`${t.width*(.03+T*.94)-N/2}px`:`${-8+Math.random()*116}%`,animationDelay:`${A}s`,animationDuration:`${R}ms`,"--petal-color":n,"--petal-width":`${N}px`,"--petal-height":`${I}px`,"--petal-opacity":`${y.opacity}`,"--petal-start-x":`${F}px`,"--petal-fan-x":`${O}px`,"--petal-fan-y":`${G}px`,"--petal-end-x":`${O}px`,"--petal-sway":`${y.sway}px`,"--petal-sway-back":`${y.swayBack}px`,"--petal-sway-soft":`${y.swaySoft}px`,"--petal-drop":`${Y}px`,"--petal-start-rotation":`${y.startRotation}deg`,"--petal-tumble":`${y.tumble}deg`};if(l){const P=Number(A)*1e3,z=R*Q,K=q(R);L.animationDuration=`${z}ms`;const X=i.jsx("div",{className:"blume-petal-effect__petal blume-petal-effect__petal--click-launch",style:L,children:i.jsx(B,{color:n,delayMs:P+z,durationMs:K,endY:`${Y-G}px`,motion:y,tumbleDelayMs:P})},u);v.push(m&&c==="page"?i.jsx("div",{style:{position:"absolute",inset:0,translate:"var(--pending-scroll-x, 0px) var(--pending-scroll-y, 0px)"},children:X},u):X);continue}if(x){const P=Number(A)*1e3;v.push(i.jsx("div",{className:"blume-petal-effect__petal blume-petal-effect__petal--fall",style:L,children:i.jsx(B,{color:n,delayMs:P,durationMs:q(R),endY:`${Y}px`,motion:y,tumbleDelayMs:P})},u));continue}v.push(i.jsx("div",{className:"blume-petal-effect__petal",style:L,children:i.jsx("span",{className:"blume-petal-effect__sway",children:i.jsx("span",{className:"blume-petal-effect__shape",style:{animationDuration:`${Math.round(R*y.tumbleDurationRatio)}ms`}})})},u))}return v},[e,s,t?.top,t?.width,t?.height,n,r,o,p,c,m,b,g,l?.x,l?.y]);return!e||!t||t.width<=0||t.height<=0||typeof document>"u"?null:tt.createPortal(i.jsxs("div",{ref:w,"data-blume-petal-effect":"","data-petal-motion":l?"click-launch":p,"data-petal-coordinate-space":c,"data-petal-launch-shape":l?b:void 0,"data-petal-count":U("element",o),"data-petal-origin-x":l?.x,"data-petal-origin-y":l?.y,"aria-hidden":"true",style:{position:c==="page"?"absolute":"fixed",top:t.top,left:t.left,width:t.width,height:t.height,pointerEvents:"none",zIndex:9999,overflow:"visible"},children:[k?i.jsx(dt,{}):null,i.jsx("div",{style:{position:"absolute",inset:0},children:Z})]},s),document.body)});d.forwardRef(function({isActive:e,color:n,petalCount:t=8,duration:o,activationKey:r,children:s},l){const p=d.useRef(null),[b,g]=d.useState(null);d.useEffect(()=>{if(!e){g(null);return}const c=p.current;if(!c){g(null);return}const m=()=>{const h=c.getBoundingClientRect();g({top:h.top,left:h.left,width:h.width,height:h.height})};m();const w=typeof ResizeObserver>"u"?null:new ResizeObserver(()=>m());return w?.observe(c),window.addEventListener("resize",m),window.addEventListener("scroll",m,{passive:!0}),()=>{w?.disconnect(),window.removeEventListener("resize",m),window.removeEventListener("scroll",m)}},[e,r]);const k=d.isValidElement(s)?d.cloneElement(s,{ref:c=>{p.current=c,typeof l=="function"?l(c):l&&(l.current=c)}}):s;return i.jsxs(i.Fragment,{children:[k,i.jsx(ht,{isActive:e,color:n,rect:b,petalCount:t,duration:o,activationKey:r})]})});export{W as F,ht as P,B as a,dt as b,U as c,bt as d,st as e,it as f,q as g,wt as r};
