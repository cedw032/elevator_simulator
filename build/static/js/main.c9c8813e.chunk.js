(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,n){},13:function(e,t,n){},14:function(e,t,n){"use strict";n.r(t);for(var a=n(0),r=n.n(a),o=n(5),i=n.n(o),l=(n(12),n(1)),s=(n(13),n(3)),u=function(e){var t={};return e.reduce(function(e,n){return t[n]=[],e.on[n]=function(e){return t[n].push(e),function(){t[n]=t[n].filter(function(t){return t!==e})}},e.dispatch[n]=function(){for(var e=arguments.length,a=new Array(e),r=0;r<e;r++)a[r]=arguments[r];t[n].forEach(function(e){return e.apply(void 0,a)})},e},{dispatch:{},on:{}})},c=["doorsOpen","doorsChange","floorChanges","timePasses","requestsChange","destinationsChange","reset"],f=function(e){var t=0,n=1,a=1,r=[],o=[],i=0,l=0,f=0,d=function(){var e=function(e){return e*a>n*a},t=r.filter(e);return!(o.map(function(e){return e.floor}).filter(e).length+t.length)},h=function(){if(m().length)return!0;if(p().length){if(d())return!0;if(g().length)return!0}return!1},m=function(){return r.filter(function(e){return e===n})},p=function(){return o.filter(function(e){return e.floor===n})},g=function(){return p().filter(function(e){return e.direction===a})},b=function(){return 1===t},v=function(){l=0,t=2},E=function(){b()&&(f=i)},w=u(c),O=w.dispatch,k=w.on;return{addDestination:function(e){r.push(e),1===t&&E(),O.destinationsChange(Object(s.a)(r))},requestElevator:function(e,t){o.push({floor:e,direction:t}),O.requestsChange(Object(s.a)(o))},passTime:function(){switch(t){case 0:if(h()){!function(){f=0,r=r.filter(function(e){return e!==n});var e=d()?function(e){return e.floor!==n}:function(e){return e.floor!==n||e.direction!==a};o=o.filter(e),t=1,O.doorsOpen(n,a,d()),O.doorsChange(b()),O.destinationsChange(Object(s.a)(r)),O.requestsChange(Object(s.a)(o))}();break}if(r.length+o.length){d()&&(a*=-1),v();break}break;case 1:if(f>=i){t=0,O.doorsChange(b());break}++f;break;case 2:if(l>=0){if(n+=a,O.floorChanges(n),h()){t=0;break}v();break}++l}O.timePasses()},setOpenTimeout:function(e){i=e},allowDoorsToClose:E,reset:function(){t=0,f=0,l=0,n=1,a=1,r=[],o=[],O.reset(n,Object(s.a)(r),Object(s.a)(o),b())},on:k}},d=function(e,t){var n,a=function(){var n=function(e,t){return Math.round((t-e)*Math.random())+e},a=function(){return n(t[0],+t.slice(-1))},r=0,o=0;switch(n(1,-1)){case 1:r=t[0],o=a();break;case-1:r=a(),o=t[0];break;default:r=a(),o=a()}if(r!==o){var i=r<o?1:-1,l=!1,s=function(){u(),c()},u=e.on.reset(s),c=e.on.doorsOpen(function(t,n,a){if(!l&&t===r&&(a||n===i))return e.addDestination(o),void(l=!0);l&&t===o&&(e.allowDoorsToClose(),s())});e.requestElevator(r,i)}},r=function(){Math.random()<.16&&a()},o=u(["toggle"]),i=o.dispatch,l=o.on;return{toggle:function(){if(n)return n(),n=void 0,void i.toggle(!1);n=e.on.timePasses(r),i.toggle(!0)},spawn:a,on:l}},h=n(2),m=n.n(h),p=function(){var e=Object(a.useState)(),t=Object(l.a)(e,2)[1];return function(){return t({})}},g=[],b=function(e){var t=p(),n=Object(a.useState)(g.length),r=Object(l.a)(n,1)[0],o=g[r];o||(o={value:e},g.push(o));return[o,function(e){e!==o.value&&(o.value=e,t())}]},v=[800,140],E=function(e){var t=e.passTime,n=e.setOpenTimeout,o=b(!0),i=Object(l.a)(o,2),s=i[0],u=i[1],c=b(0),f=Object(l.a)(c,2),d=f[0],h=f[1];Object(a.useEffect)(function(){s.value&&g()},[]);var p=function(){h((d.value+1)%v.length)},g=function(){u(!0),n(5),setTimeout(E)},E=function e(){if(s.value)return t(),void setTimeout(e,v[d.value]);n(0)};return r.a.createElement("div",{className:"row"},r.a.createElement("button",{children:"|>",onClick:function(){u(!1),t()}}),r.a.createElement("button",{children:d.value?">>":">",className:m()(s.value&&"toggled"),onClick:function(){s.value?p():g()}}))},w=function(e){var t=e.spawnPassenger,n=e.toggleUsageSimulator,a=e.reset,o=e.usageSimulatorIsEnabled;return r.a.createElement("div",{className:"row"},r.a.createElement("button",{onClick:t,children:"Random passenger"}),r.a.createElement("button",{className:m()(o&&"toggled"),onClick:n,children:"Simulate usage"}),r.a.createElement("button",{onClick:a,children:"x"}))},O=function(e){var t=e.floor,n=e.floors,a=e.isCurrentFloor,o=e.elevatorDoorsOpen,i=e.requests,l=e.requestElevator,s=!!i.find(function(e){return 1===e.direction}),u=!!i.find(function(e){return-1===e.direction}),c=t===+n.slice(-1),f=t===n[0];return r.a.createElement("div",{className:m()("row","floor-display",a&&"highlight")},r.a.createElement("div",null,"Floor ",t),r.a.createElement("button",{className:m()(u&&"toggled"),onClick:function(){return l(t,-1)},disabled:f,children:"Down"}),r.a.createElement("button",{className:m()(s&&"toggled"),onClick:function(){return l(t,1)},disabled:c,children:"Up"}),r.a.createElement("div",{className:m()(o&&a?"highlight2":"hidden"),children:"Open"}))},k=function(e){var t=e.floors,n=e.currentFloor,a=e.requests,o=e.doorsOpen,i=e.requestElevator;return r.a.createElement("div",{className:"floor-bank panel"},t.map(function(e){return r.a.createElement(O,{floor:e,floors:t,isCurrentFloor:e===n,elevatorDoorsOpen:o,requests:a.filter(function(t){return t.floor===e}),requestElevator:i,key:e})}))},C=function(e){var t=e.floors,n=e.destinations,a=e.addDestination,o=function(e){return!!n.find(function(t){return t===e})};return r.a.createElement("div",{className:"elevator-display"},t.map(function(e){return r.a.createElement("button",{children:e,key:e,className:m()(o(e)&&"toggled"),onClick:function(){return a(e)}})}))},y=function(){return r.a.createElement("div",{className:"panel"},"A bried exlanation of the UI.",r.a.createElement("h3",null,"Top bar"),r.a.createElement("p",null,"From left to right"),r.a.createElement("p",null,r.a.createElement("b",null,"Step by step mode: ")," Clicking this button will enter step by step mode. This means the elevator will only run one cycle of its state machine with each click on this button.  This can be useful for watching what the elevator does under certain situations."),r.a.createElement("p",null,r.a.createElement("b",null,"Play/Fast Forward: ")," This button will exit step by step mode, and subsequent clicks will cycle between fast and regular play speeds."),r.a.createElement("p",null,r.a.createElement("b",null,"Random Passenger: ")," When you want to add a passenger to the simulation pushing this button will do so."),r.a.createElement("p",null,r.a.createElement("b",null,"Simulate usage: ")," This will periodically add random passengers to the simulation at random intervals.  Handy for seeing how the elevator will behave under normal circumstances. Clicking again will disable this feature."),r.a.createElement("p",null,r.a.createElement("b",null,"Reset: ")," If you want to put the elevator back into its initial state click this button. This is useful when you want to run specific test.  This button will not reset the play settings so you may want to make sure you enter step by step mode, and disabled usage simulation before resetting."),r.a.createElement("h3",null,"Left section"),r.a.createElement("p",null,"This section is broken up into floors. Pressing any up or down button will summon the elevator to that floor. When a floor is highlighted it means the elevator is at the floor. You will also see the word open when the elevator doors are open on that floor."),r.a.createElement("h3",null,"Right section"),r.a.createElement("p",null,"This represents the options available to a passenger inside the elevator. Pressing any of the numbered buttons will inform the elevator that you want to travel to that level."))},j=f(10),T=[],q=1;q<=10;++q)T.push(q);var N=d(j,T);var S=function(){var e=Object(a.useState)(0),t=Object(l.a)(e,2),n=t[0],o=t[1],i=Object(a.useState)([]),s=Object(l.a)(i,2),u=s[0],c=s[1],f=Object(a.useState)([]),d=Object(l.a)(f,2),h=d[0],m=d[1],p=Object(a.useState)(!1),g=Object(l.a)(p,2),b=g[0],v=g[1],O=Object(a.useState)(!1),q=Object(l.a)(O,2),S=q[0],D=q[1];Object(a.useEffect)(function(){var e=[];return e.push(j.on.floorChanges(o)),e.push(j.on.destinationsChange(c)),e.push(j.on.requestsChange(m)),e.push(j.on.doorsChange(v)),e.push(j.on.reset(function(e,t,n,a){o(e),c(t),m(n),v(a)})),e.push(N.on.toggle(D)),j.reset(),N.toggle(),function(){return e.forEach(function(e){return e()})}},[]);var P=j.addDestination,F=j.requestElevator,I=j.reset,x=j.passTime,R=j.setOpenTimeout,U=N.spawn,M=N.toggle;return r.a.createElement("div",{className:"app"},r.a.createElement("div",{className:"panel row top-bar"},r.a.createElement(E,{passTime:x,setOpenTimeout:R}),r.a.createElement(w,{spawnPassenger:U,toggleUsageSimulator:M,reset:I,usageSimulatorIsEnabled:S,elevator:j})),r.a.createElement("div",{className:"row"},r.a.createElement(k,{floors:T,currentFloor:n,requests:h,doorsOpen:b,requestElevator:F}),r.a.createElement(C,{floors:T,destinations:u,addDestination:P})),r.a.createElement(y,null))};i.a.render(r.a.createElement(S,null),document.getElementById("root"))},6:function(e,t,n){e.exports=n(14)}},[[6,1,2]]]);
//# sourceMappingURL=main.c9c8813e.chunk.js.map