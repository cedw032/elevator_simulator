(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,function(e,n,t){e.exports=t(13)},,,,,,function(e,n,t){},function(e,n,t){},function(e,n,t){"use strict";t.r(n);var r,o=t(0),a=t.n(o),i=t(4),u=t.n(i),c=(t(11),t(12),function(e){var n={};return e.reduce(function(e,t){return n[t]=[],e.on[t]=function(e){return n[t].push(e),function(){n[t]=n[t].filter(function(n){return n!==e})}},e.dispatch[t]=function(){for(var e=arguments.length,r=new Array(e),o=0;o<e;o++)r[o]=arguments[o];n[t].forEach(function(e){return e.apply(void 0,r)})},e},{dispatch:{},on:{}})}),l=["doorsOpen","doorsClose","floorChange","timeElapsed","elevatorRequested","destinationAdded"],f=function(e){for(var n=0,t=0,r=0,o=1,a=1,i=[],u=[],f=0,s=[],d=1;d<=e;++d)s.push(d);var m=function(){var e=function(e){return e*a>o*a},n=i.filter(e);return!(u.map(function(e){return e.floor}).filter(e).length+n.length)},v=function(){if(p().length)return!0;if(h().length){if(m())return!0;if(g().length)return!0}return!1},p=function(){return i.filter(function(e){return e==o})},h=function(){return u.filter(function(e){return e.floor==o})},g=function(){return h().filter(function(e){return e.direction==a})},E=function(){return 1==n},b=function(){r=0,n=2},w=function(){n=0,O.doorsClose()},k=c(l),O=k.dispatch,N=k.on;return{addDestination:function(e){i.push(e),1==n&&w(),O.destinationAdded()},requestElevator:function(e,n){u.push({floor:e,direction:n}),O.elevatorRequested()},elapseTime:function(){switch(n){case 0:if(v()){!function(){t=0,i=i.filter(function(e){return e!=o});var e=m()?function(e){return e.floor!=o}:function(e){return e.floor!=o||e.direction!=a};u=u.filter(e),n=1,O.doorsOpen(o,a,m())}();break}if(i.length+u.length){m()&&(a*=-1),b();break}break;case 1:if(t>=f){w();break}++t;break;case 2:if(r>=0){if(o+=a,O.floorChange(),v()){n=0;break}b();break}++r}O.timeElapsed()},forceOpenTimeout:function(){E()&&(t=f)},setOpenTimeout:function(e){return f=e},currentFloor:function(){return o},floors:function(){return[].concat(s)},isOpen:E,isDestination:function(e){return 0!=i.filter(function(n){return n==e}).length},isRequested:function(e,n){return 0!=u.filter(function(t){return t.floor==e&&t.direction==n}).length},on:N}},s=function(e){var n,t=function(){return!!n},r=function(){var n=function(e,n){var t=n-e+1;return Math.floor(t*Math.random())+e},t=0,r=0;switch(n(0,2)){case 0:t=e.floors[0];break;case 1:r=e.floors[0]}if(t||(t=n(e.floors()[0],e.floors().slice(-1))),r||(r=n(e.floors()[0],e.floors().slice(-1))),t!==r){var o=t<r?1:-1,a=!1,i=e.on.doorsOpen(function(n,u,c){if(a||n!==t||!c&&u!==o)a&&n===r&&(e.forceOpenTimeout(),i());else{var l=!0,f=e.on.timeElapsed(function(){l?l=!1:(e.addDestination(r),f())});a=!0}});e.requestElevator(t,o)}},o=function(){Math.random()<.16&&r()};return{toggle:function(){if(t())return n(),void(n=void 0);n=e.on.timeElapsed(o)},spawn:r,enabled:t}},d=t(2),m=t(1),v=t.n(m),p=function(){var e=Object(o.useState)(),n=Object(d.a)(e,2)[1];return function(){return n({})}},h=function(e){r||(r={value:e});var n=p();return[r,function(e){e!==r.value&&(r.value=e,n())}]},g=function(e){var n=e.elevator,t=h(!0),r=Object(d.a)(t,2),i=r[0],u=r[1];Object(o.useEffect)(function(){i.value&&c()},[]);var c=function(){u(!0),n.setOpenTimeout(5),setTimeout(l)},l=function e(){if(i.value)return n.elapseTime(),void setTimeout(e,800);n.setOpenTimeout(0)};return a.a.createElement("div",{className:"row"},a.a.createElement("button",{children:"|>",onClick:function(){u(!1),n.elapseTime()}}),a.a.createElement("button",{children:">>",className:v()(i.value&&"toggled"),onClick:c}))},E=function(e){var n=e.usageSimulator,t=p();return a.a.createElement("div",{className:"row"},a.a.createElement("button",{onClick:function(){n.spawn(),t()},children:"Random passenger"}),a.a.createElement("button",{className:v()(n.enabled()&&"toggled"),onClick:function(){n.toggle(),t()},children:"Simulate usage"}))},b=function(e){var n=p();Object(o.useEffect)(function(){var t=[];return e.forEach(function(e){return t.push(e(n))}),function(){return t.forEach(function(e){return e()})}},[])},w=function(e){var n=e.floor,t=e.elevator;b([t.on.floorChange,t.on.doorsOpen,t.on.doorsClose,t.on.elevatorRequested]);var r=function(e){return t.isRequested(n,e)},o=function(e){return function(){return t.requestElevator(n,e)}};return a.a.createElement("div",{className:v()("row","floor-display",t.currentFloor()==n&&"highlight")},a.a.createElement("div",null,"Floor ",n),a.a.createElement("button",{className:v()(r(-1)&&"toggled"),onClick:o(-1),children:"Down"}),a.a.createElement("button",{className:v()(r(1)&&"toggled"),onClick:o(1),children:"Up"}),t.currentFloor()==n&&t.isOpen()?a.a.createElement("div",{className:"highlight2"},"Open"):a.a.createElement("div",{className:"hidden"},"Open"))},k=function(e){var n=e.elevator;return b([n.on.doorsOpen,n.on.destinationAdded]),a.a.createElement("div",{className:"elevator-display"},n.floors().map(function(e){return a.a.createElement("button",{children:e,key:e,className:v()(n.isDestination(e)&&"toggled"),onClick:function(){return n.addDestination(e)}})}))},O=f(10),N=s(O);var C=function(){return a.a.createElement("div",{className:"app"},a.a.createElement("div",{className:"panel row top-bar"},a.a.createElement(g,{elevator:O}),a.a.createElement(E,{usageSimulator:N})),a.a.createElement("div",{className:"row"},a.a.createElement("div",{className:"floor-bank panel"},O.floors().map(function(e){return a.a.createElement(w,{floor:e,elevator:O,key:e})})),a.a.createElement(k,{elevator:O})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(a.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[5,1,2]]]);
//# sourceMappingURL=main.a9ff45ce.chunk.js.map