!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(1);new(function(){return function(){var e=this;new n.default({coocieName:"Denchik",callBack:function(){console.warn(e)},period:1e-6})}}())},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){return function(e){var t=this,r=e.coocieName,n=e.callBack,o=e.period;this.internalLogic=function(){t.stop();var e=Date.parse(localStorage.getItem(t.timerName)),r=new Date;(isNaN(e)||(+r-e)/1e3/60/60>=t.period)&&(localStorage.setItem(t.timerName,""+r),t.callBack()),t.start()},this.start=function(){t.timer=setTimeout(t.internalLogic,6e4)},this.stop=function(){clearInterval(t.timer)},this.callBack=n,this.period=o,this.timerName="timer_"+r,setTimeout(this.internalLogic,1e3)}}();t.default=n}]);