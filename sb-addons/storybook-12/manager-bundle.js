try{
(()=>{var _=Object.defineProperty;var x=Object.getOwnPropertyDescriptor;var E=Object.getOwnPropertyNames;var O=Object.prototype.hasOwnProperty;var d=(e,t)=>()=>(e&&(t=e(e=0)),t);var R=(e,t)=>{for(var u in t)_(e,u,{get:t[u],enumerable:!0})},T=(e,t,u,f)=>{if(t&&typeof t=="object"||typeof t=="function")for(let c of E(t))!O.call(e,c)&&c!==u&&_(e,c,{get:()=>t[c],enumerable:!(f=x(t,c))||f.enumerable});return e};var C=e=>T(_({},"__esModule",{value:!0}),e);var r=d(()=>{});var o=d(()=>{});var n=d(()=>{});var y={};R(y,{__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:()=>M,createPortal:()=>A,createRoot:()=>P,default:()=>I,findDOMNode:()=>B,flushSync:()=>D,hydrate:()=>N,hydrateRoot:()=>L,render:()=>G,unmountComponentAtNode:()=>U,unstable_batchedUpdates:()=>H,unstable_renderSubtreeIntoContainer:()=>Y,version:()=>w});var I,M,A,P,B,D,N,L,G,U,H,Y,w,b=d(()=>{r();o();n();I=__REACT_DOM__,{__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:M,createPortal:A,createRoot:P,findDOMNode:B,flushSync:D,hydrate:N,hydrateRoot:L,render:G,unmountComponentAtNode:U,unstable_batchedUpdates:H,unstable_renderSubtreeIntoContainer:Y,version:w}=__REACT_DOM__});r();o();n();r();o();n();r();o();n();var l=__REACT__,{Children:J,Component:Q,Fragment:X,Profiler:Z,PureComponent:$,StrictMode:ee,Suspense:te,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:re,cloneElement:oe,createContext:ne,createElement:ae,createFactory:se,createRef:ie,forwardRef:le,isValidElement:ue,lazy:ce,memo:de,startTransition:_e,unstable_act:pe,useCallback:me,useContext:fe,useDebugValue:he,useDeferredValue:Se,useEffect:ye,useId:be,useImperativeHandle:xe,useInsertionEffect:Ee,useLayoutEffect:Oe,useMemo:Re,useReducer:Te,useRef:Ce,useState:ge,useSyncExternalStore:ve,useTransition:ke,version:Ie}=__REACT__;r();o();n();var De=__STORYBOOK_API__,{ActiveTabs:Ne,Consumer:Le,ManagerContext:Ge,Provider:Ue,RequestResponseError:He,addons:h,combineParameters:Ye,controlOrMetaKey:we,controlOrMetaSymbol:ze,eventMatchesShortcut:Fe,eventToShortcut:Ke,experimental_MockUniversalStore:qe,experimental_UniversalStore:Ve,experimental_requestResponse:je,experimental_useUniversalStore:We,isMacLike:Je,isShortcutTaken:Qe,keyToSymbol:Xe,merge:Ze,mockChannel:$e,optionOrAltSymbol:et,shortcutMatchesShortcut:tt,shortcutToHumanString:rt,types:ot,useAddonState:nt,useArgTypes:at,useArgs:st,useChannel:it,useGlobalTypes:lt,useGlobals:ut,useParameter:ct,useSharedState:dt,useStoryPrepared:_t,useStorybookApi:pt,useStorybookState:mt}=__STORYBOOK_API__;r();o();n();r();o();n();var bt=__STORYBOOK_THEMING__,{CacheProvider:xt,ClassNames:Et,Global:Ot,ThemeProvider:Rt,background:Tt,color:Ct,convert:gt,create:vt,createCache:kt,createGlobal:It,createReset:Mt,css:At,darken:Pt,ensure:Bt,ignoreSsrWarning:Dt,isPropValid:Nt,jsx:Lt,keyframes:Gt,lighten:Ut,styled:p,themes:Ht,typography:Yt,useTheme:wt,withTheme:zt}=__STORYBOOK_THEMING__;var g=p.div`
  background: #24292e;
  color: white;
  padding: 12px;
  text-align: center;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`,v=p.a`
  color: #58a6ff;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`,k=()=>l.createElement(g,null,l.createElement("span",null,"\u2B50 If you like this headless tooltip, please"),l.createElement(v,{href:"https://github.com/rezasohrabi/headlessui-tooltip",target:"_blank",rel:"noopener noreferrer"},"star it on GitHub")),S=k;h.setConfig({sidebar:{showRoots:!0},toolbar:{title:{hidden:!1},zoom:{hidden:!1},eject:{hidden:!1},copy:{hidden:!1},fullscreen:{hidden:!1}}});var m=document.querySelector("#root");if(m){let e=document.createElement("div");e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.right="0",e.style.zIndex="9999",m.insertBefore(e,m.firstChild);let t=document.createElement("div");e.appendChild(t),(b(),C(y)).render(l.createElement(S,null),t)}})();
}catch(e){ console.error("[Storybook] One of your manager-entries failed: " + import.meta.url, e); }
