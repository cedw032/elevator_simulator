(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,function(e,n,t){e.exports=t(13)},,,,,,function(e,n,t){},function(e,n,t){},function(e,n,t){"use strict";t.r(n);var r,o=t(0),i=t.n(o),u=t(4),c=t.n(u),a=(t(11),t(12),function(e){for(var n=0,t=0,r=0,o=1,i=[],u=[],c=1,a=[],l=1;l<=e;++l)a.push(l);var f=function(){return i.length?i[0]:u.length?u[0].floor:void 0},s=function(){if(v().length)return!0;if(d().length){if(0==h())return!0;if(m().length)return!0}return!1},v=function(){return i.filter(function(e){return e==o})},d=function(){return u.filter(function(e){return e.floor==o})},m=function(){return d().filter(function(e){return e.direction==h()})},h=function(){return f()>o?1:f()<o?-1:0},p=function(){r=0,n=2},E=function(){n=0,N()},g=[],w=[],O=[],b=function(){g.forEach(function(e){return e()})},k=function(){w.forEach(function(e){return e()})},N=function(){O.forEach(function(e){return e()})};return{addDestination:function(e){i.push(e),1==n&&E()},requestElevator:function(e,n){return u.push({floor:e,direction:n})},elapseTime:function(){switch(n){case 0:return s()?void function(){t=0,i=i.filter(function(e){return e!=o});var e=0==h()?function(e){return e.floor!=o}:function(e){return e.floor!=o||e.direction!=h()};u=u.filter(e),n=1,k()}():f()?void p():void 0;case 1:return t>=c?void E():void++t;case 2:return r?(1==h()?(++o,b()):-1==h()&&(--o,b()),s()?void(n=0):void p()):void++r}},setOpenTimeout:function(e){return c=e},currentFloor:function(){return o},floors:function(){return[].concat(a)},isOpen:function(){return 1==n},isDestination:function(e){return 0!=i.filter(function(n){return n==e}).length},isRequested:function(e,n){return 0!=u.filter(function(t){return t.floor==e&&t.direction==n}).length},onFloorChange:function(e){return g.push(e)},onDoorsOpen:function(e){return w.push(e)},onDoorsClose:function(e){return O.push(e)}}}),l=t(2),f=t(1),s=t.n(f),v=function(e){r||(r={value:e});var n=Object(o.useState)(),t=Object(l.a)(n,2),i=(t[0],t[1]);return[r,function(e){e!==r.value&&(r.value=e,i({}))}]},d=function(e){var n=e.elevator,t=v(!0),r=Object(l.a)(t,2),u=r[0],c=r[1];Object(o.useEffect)(function(){u.value&&a()},[]);var a=function(){c(!0),n.setOpenTimeout(30),setTimeout(f)},f=function e(){if(u.value)return n.elapseTime(),void setTimeout(e,200);n.setOpenTimeout(1)};return i.a.createElement("div",{className:"row"},i.a.createElement("button",{children:"|>",onClick:function(){c(!1),n.elapseTime()}}),i.a.createElement("button",{children:">>",className:s()(u.value&&"toggled"),onClick:a}))},m=function(){var e=Object(o.useState)(),n=Object(l.a)(e,2),t=(n[0],n[1]);return function(){return t({})}},h=function(e){var n=m();Object(o.useEffect)(function(){e.forEach(function(e){return e(n)})},[])},p=function(e){var n=e.floor,t=e.elevator,r=m();h([t.onFloorChange,t.onDoorsOpen,t.onDoorsClose]);var o=function(e){return t.isRequested(n,e)},u=function(e){return function(){t.requestElevator(n,e),r()}};return i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:s()(t.currentFloor()==n&&"highlight")},"Floor ",n),i.a.createElement("button",{className:s()(o(-1)&&"toggled"),onClick:u(-1),children:"Down"}),i.a.createElement("button",{className:s()(o(1)&&"toggled"),onClick:u(1),children:"Up"}),t.currentFloor()==n&&t.isOpen()?i.a.createElement("div",{className:"highlight2"},"Open"):i.a.createElement("div",null,"Closed"))},E=function(e){var n=e.elevator,t=m();return h([n.onDoorsOpen]),i.a.createElement("div",{className:"elevator-display"},n.floors().map(function(e){return i.a.createElement("button",{children:e,key:e,className:s()(n.isDestination(e)&&"toggled"),onClick:function(){n.addDestination(e),t()}})}))},g=a(10);var w=function(){return i.a.createElement("div",{className:"app"},i.a.createElement(d,{elevator:g}),i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:"floor-bank"},g.floors().map(function(e){return i.a.createElement(p,{floor:e,elevator:g,key:e})})),i.a.createElement(E,{elevator:g})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(i.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[5,1,2]]]);
//# sourceMappingURL=main.a3f561d4.chunk.js.map