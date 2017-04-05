"use strict";function getVisibleMinutes(e,t){e=new Date(e||new Date),e=new Date(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours());for(var n=[],i=e.getTime()+36e5;e.getTime()<i;)n.push(e),e=new Date(e.getTime()+60*t*1e3);return n}function getVisibleWeeks(e){e=new Date(e||new Date),e.setDate(1),e.setHours(0),e.setMinutes(0),e.setSeconds(0),e.setMilliseconds(0),e.setDate(0===e.getDay()?-5:e.getDate()-(e.getDay()-1)),1===e.getDate()&&e.setDate(-6);for(var t=[];t.length<6;){for(var n=[],i=0;7>i;i++)n.push(new Date(e)),e.setDate(e.getDate()+1);t.push(n)}return t}function getVisibleYears(e){var t=[];e=new Date(e||new Date),e.setFullYear(e.getFullYear()-e.getFullYear()%10);for(var n=0;12>n;n++)t.push(new Date(e.getFullYear()+(n-1),0,1));return t}function getDaysOfWeek(e){e=new Date(e||new Date),e=new Date(e.getFullYear(),e.getMonth(),e.getDate()),e.setDate(e.getDate()-(e.getDay()-1));for(var t=[],n=0;7>n;n++)t.push(new Date(e)),e.setDate(e.getDate()+1);return t}function getVisibleMonths(e){e=new Date(e||new Date);for(var t=e.getFullYear(),n=[],i=0;12>i;i++)n.push(new Date(t,i,1));return n}function getVisibleHours(e){e=new Date(e||new Date),e.setHours(0),e.setMinutes(0),e.setSeconds(0),e.setMilliseconds(0);for(var t=[],n=0;24>n;n++)t.push(e),e=new Date(e.getTime()+36e5);return t}var Module=angular.module("datePicker",[]);Module.constant("datePickerConfig",{template:"./app/lib/datepicker/templates/datepicker.html",view:"month",views:["year","month","date","hours","minutes"],step:5}),Module.directive("datePicker",["datePickerConfig",function(e){return{template:'<div ng-include="template"></div>',scope:{model:"=datePicker",after:"=?",before:"=?"},link:function(t,n,i){function s(){var e=t.view,n=t.date;switch(e){case"year":t.years=getVisibleYears(n);break;case"month":t.months=getVisibleMonths(n);break;case"date":t.weekdays=t.weekdays||getDaysOfWeek(),t.weeks=getVisibleWeeks(n);break;case"hours":t.hours=getVisibleHours(n);break;case"minutes":t.minutes=getVisibleMinutes(n,o)}}function a(){return"date"!==t.view?t.view:t.model?t.model.getMonth():null}t.date=new Date(t.model||new Date),t.views=e.views.concat(),t.view=i.view||e.view,t.now=new Date,t.template=i.template||e.template;var o=parseInt(i.step||e.step,10);t.views=t.views.slice(t.views.indexOf(i.maxView||"year"),t.views.indexOf(i.minView||"minutes")+1),(1===t.views.length||-1===t.views.indexOf(t.view))&&(t.view=t.views[0]),t.setView=function(e){-1!==t.views.indexOf(e)&&(t.view=e)},t.setDate=function(e){t.date=e;var n=t.views[t.views.indexOf(t.view)+1];if(!n||t.model){switch(t.model=new Date(t.model||e),t.view){case"minutes":t.model.setMinutes(e.getMinutes());case"hours":t.model.setHours(e.getHours());case"date":t.model.setDate(e.getDate());case"month":t.model.setMonth(e.getMonth());case"year":t.model.setFullYear(e.getFullYear())}t.$emit("setDate",t.model,t.view)}n&&t.setView(n)},t.$watch(a,s),t.next=function(e){var n=t.date;switch(e=e||1,t.view){case"year":case"month":n.setFullYear(n.getFullYear()+e);break;case"date":n.setMonth(n.getMonth()+e);break;case"hours":case"minutes":n.setHours(n.getHours()+e)}s()},t.prev=function(e){return t.next(-e||-1)},t.isAfter=function(e){return t.after?t.after.getTime()<=e.getTime():!1},t.isBefore=function(e){return t.before?t.before.getTime()>=e.getTime():!1},t.isSameMonth=function(e){return t.isSameYear(e)&&t.model.getMonth()===e.getMonth()},t.isSameYear=function(e){return t.model?t.model.getFullYear()===e.getFullYear():!1},t.isSameDay=function(e){return t.isSameMonth(e)&&t.model.getDate()===e.getDate()},t.isSameHour=function(e){return t.isSameDay(e)&&t.model.getHours()===e.getHours()},t.isSameMinutes=function(e){return t.isSameHour(e)&&t.model.getMinutes()===e.getMinutes()},t.isNow=function(e){var n=!0,i=t.now;switch(t.view){case"minutes":n&=~~(e.getMinutes()/o)===~~(i.getMinutes()/o);case"hours":n&=e.getHours()===i.getHours();case"date":n&=e.getDate()===i.getDate();case"month":n&=e.getMonth()===i.getMonth();case"year":n&=e.getFullYear()===i.getFullYear()}return n}}}}]),function(e,t){"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?module.exports=t():e.Layzr=t()}(this,function(){function e(e){this._lastScroll=0,this._ticking=!1,this._optionsAttr=e.attr||"data-layzr",this._optionsAttrRetina=e.retinaAttr||"data-layzr-retina",this._optionsThreshold=e.threshold||0,this._optionsCallback=e.callback||null,this._retina=window.devicePixelRatio>1,this._imgAttr=this._retina?this._optionsAttrRetina:this._optionsAttr,this._images=document.getElementsByTagName("img"),this._create()}return e.prototype._requestScroll=function(){this._lastScroll=window.scrollY||window.pageYOffset,this._requestTick()},e.prototype._requestTick=function(){this._ticking||(requestAnimationFrame(this.update.bind(this)),this._ticking=!0)},e.prototype._create=function(){this._requestScroll(),window.addEventListener("scroll",this._requestScroll.bind(this),!1),window.addEventListener("resize",this._requestScroll.bind(this),!1)},e.prototype._destroy=function(){window.removeEventListener("scroll",this._requestScroll.bind(this),!1),window.removeEventListener("resize",this._requestScroll.bind(this),!1)},e.prototype._getOffset=function(e){var t=0;do isNaN(e.offsetTop)||(t+=e.offsetTop);while(e=e.offsetParent);return t},e.prototype._inViewport=function(e){var t=this._lastScroll,n=t+window.innerHeight,i=this._getOffset(e),s=i+e.offsetHeight,a=this._optionsThreshold/100*window.innerHeight;return s>=t-a&&n+a>=s},e.prototype.update=function(){for(var e=this._images.length,t=0;e>t;t++){var n=this._images[t];(n.hasAttribute(this._imgAttr)||n.hasAttribute(this._optionsAttr))&&this._inViewport(n)&&this.reveal(n)}this._ticking=!1},e.prototype.reveal=function(e){var t=e.getAttribute(this._imgAttr)||e.getAttribute(this._optionsAttr);e.removeAttribute(this._optionsAttr),e.removeAttribute(this._optionsAttrRetina),t&&(e.setAttribute("src",t),"function"==typeof this._optionsCallback&&this._optionsCallback.call(e))},e}),function(e,t){var n,i,s=function(e,t,n){return new s.init(e,t,n)},a=1.05,o=40,r=40,l=50,c=0,d=0,u=3e3,p=0,h=!0,m=!1;s.prototype={validate:function(){if(!this.element)throw"You need to set elements jQuery selector"},appendCanvas:function(){this.canvas=document.createElement("canvas"),this.canvas.id="f-canvas",this.canvas.width=t(e).width(),this.canvas.height=t(e).height(),this.canvas.style.zIndex=1e3,this.canvas.style.position="fixed",this.canvas.style.margin=0,this.canvas.style.padding=0,this.canvas.style.left=0,this.canvas.style.top=0,this.canvas.style.pointerEvents="none";var n=document.getElementsByTagName("body")[0];return n.appendChild(this.canvas),this.setUpCanvasSize(),this},createContext:function(){return void 0!==this.canvas&&(n=this.canvas.getContext("2d")),this},createParticles:function(){i=[];for(var e=0;o>e;e++){var t={position:{x:r,y:l},shift:{x:r,y:l},size:.2,angle:1,speed:.01+1*Math.random(),targetSize:.2,fillColor:this.color,orbit:.5*this.radius};i.push(t)}},setUpCanvasSize:function(){this.canvas.width=e.innerWidth,this.canvas.height=e.innerHeight,self.radius=this.element.width()},drawParticles:function(){if(n.globalCompositeOperation="destination-out",n.fillStyle="rgba(235,235,235,0.17)",n.fillRect(0,0,n.canvas.width,n.canvas.height),1==h)return n.globalCompositeOperation="lighter",p+=40,void(p>=u&&(clearInterval(d),d=0,p=0));for(var e=0,t=i.length;t>e;e++){var s=i[e],o={x:s.position.x,y:s.position.y};s.angle+=s.speed,s.shift.x+=(r-s.shift.x)*s.speed,s.shift.y+=(l-s.shift.y)*s.speed,s.position.x=s.shift.x+Math.cos(e+s.angle)*s.orbit*a,s.position.y=s.shift.y+Math.sin(e+s.angle)*s.orbit*a,s.position.x=Math.max(Math.min(s.position.x,this.canvas.width),0),s.position.y=Math.max(Math.min(s.position.y,this.canvas.height),0),s.size+=.05*(s.targetSize-s.size),n.globalCompositeOperation="source-over",n.beginPath(),n.fillStyle=s.fillColor,n.strokeStyle=s.fillColor,n.lineWidth=s.size,n.moveTo(.5+o.x|0,.5+o.y|0),n.lineTo(.5+s.position.x|0,.5+s.position.y|0),n.stroke(),n.fill()}},moveParticles:function(){h=!1,0>=d&&m&&(d=setInterval(this.drawParticles.bind(this),40)),m||(h=!0),clearTimeout(c),c=setTimeout(function(){h=!0},3e3)},scrollCanvas:function(){h=!0;var e=0;clearInterval(d),d=0,n.globalCompositeOperation="destination-out",n.fillStyle="rgba(239,239,239,1.0)",n.fillRect(0,0,n.canvas.width,n.canvas.height),e++},stop:function(){this.element.unbind("mouseover"),this.element.unbind("mouseout"),t(document).unbind("mousemove")},restart:function(){this.bindMuseEvents()},bindMuseEvents:function(){t(document).mousemove(function(){this.moveParticles()}.bind(this)),this.element.mouseover(function(){m=!0,r=t(this).offset().left+.5*t(this).width(),l=t(this).offset().top-t(window).scrollTop()+.5*t(this).height()}),this.element.mouseout(function(){m=!1})},setUpEvents:function(){window.addEventListener("resize",self.setUpCanvasSize,!1),t(e).scroll(function(){m=!1,this.scrollCanvas()}.bind(this)),this.bindMuseEvents()}},s.init=function(e){var t=this;t.element=e.element,t.radius=e.elWidth||e.element.width(),t.color=e.color||"black",t.validate(),t.appendCanvas().createContext().createParticles(),this.setUpEvents()},s.init.prototype=s.prototype,e.Frills=e.F$=s}(window,jQuery),function(e){function t(e,t){e=new Date(e||new Date),e=new Date(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours());for(var n=[],i=e.getTime()+36e5;e.getTime()<i;)n.push(e),e=new Date(e.getTime()+60*t*1e3);return n}function n(e){e=new Date(e||new Date),e.setDate(1),e.setHours(0),e.setMinutes(0),e.setSeconds(0),e.setMilliseconds(0),e.setDate(0===e.getDay()?-5:e.getDate()-(e.getDay()-1)),1===e.getDate()&&e.setDate(-6);for(var t=[];t.length<6;){for(var n=[],i=0;7>i;i++)n.push(new Date(e)),e.setDate(e.getDate()+1);t.push(n)}return t}function i(e){var t=[];e=new Date(e||new Date),e.setFullYear(e.getFullYear()-e.getFullYear()%10);for(var n=0;12>n;n++)t.push(new Date(e.getFullYear()+(n-1),0,1));return t}function s(e){e=new Date(e||new Date),e=new Date(e.getFullYear(),e.getMonth(),e.getDate()),e.setDate(e.getDate()-(e.getDay()-1));for(var t=[],n=0;7>n;n++)t.push(new Date(e)),e.setDate(e.getDate()+1);return t}function a(e){e=new Date(e||new Date);for(var t=e.getFullYear(),n=[],i=0;12>i;i++)n.push(new Date(t,i,1));return n}function o(e){e=new Date(e||new Date),e.setHours(0),e.setMinutes(0),e.setSeconds(0),e.setMilliseconds(0);for(var t=[],n=0;24>n;n++)t.push(e),e=new Date(e.getTime()+36e5);return t}var r=e.module("datePicker",[]);r.constant("datePickerConfig",{template:"templates/datepicker.html",view:"month",views:["year","month","date","hours","minutes"],step:5}),r.directive("datePicker",["datePickerConfig",function(e){return{template:'<div ng-include="template"></div>',scope:{model:"=datePicker",after:"=?",before:"=?"},link:function(r,l,c){function d(){var e=r.view,l=r.date;switch(e){case"year":r.years=i(l);break;case"month":r.months=a(l);break;case"date":r.weekdays=r.weekdays||s(),r.weeks=n(l);break;case"hours":r.hours=o(l);break;case"minutes":r.minutes=t(l,p)}}function u(){return"date"!==r.view?r.view:r.model?r.model.getMonth():null}r.date=new Date(r.model||new Date),r.views=e.views.concat(),r.view=c.view||e.view,r.now=new Date,r.template=c.template||e.template;var p=parseInt(c.step||e.step,10);r.views=r.views.slice(r.views.indexOf(c.maxView||"year"),r.views.indexOf(c.minView||"minutes")+1),(1===r.views.length||-1===r.views.indexOf(r.view))&&(r.view=r.views[0]),r.setView=function(e){-1!==r.views.indexOf(e)&&(r.view=e)},r.setDate=function(e){r.date=e;var t=r.views[r.views.indexOf(r.view)+1];if(!t||r.model){switch(r.model=new Date(r.model||e),r.view){case"minutes":r.model.setMinutes(e.getMinutes());case"hours":r.model.setHours(e.getHours());case"date":r.model.setDate(e.getDate());case"month":r.model.setMonth(e.getMonth());case"year":r.model.setFullYear(e.getFullYear())}r.$emit("setDate",r.model,r.view)}t&&r.setView(t)},r.$watch(u,d),r.next=function(e){var t=r.date;switch(e=e||1,r.view){case"year":case"month":t.setFullYear(t.getFullYear()+e);break;case"date":t.setMonth(t.getMonth()+e);break;case"hours":case"minutes":t.setHours(t.getHours()+e)}d()},r.prev=function(e){return r.next(-e||-1)},r.isAfter=function(e){return r.after?r.after.getTime()<=e.getTime():!1},r.isBefore=function(e){return r.before?r.before.getTime()>=e.getTime():!1},r.isSameMonth=function(e){return r.isSameYear(e)&&r.model.getMonth()===e.getMonth()},r.isSameYear=function(e){return r.model?r.model.getFullYear()===e.getFullYear():!1},r.isSameDay=function(e){return r.isSameMonth(e)&&r.model.getDate()===e.getDate()},r.isSameHour=function(e){return r.isSameDay(e)&&r.model.getHours()===e.getHours()},r.isSameMinutes=function(e){return r.isSameHour(e)&&r.model.getMinutes()===e.getMinutes()},r.isNow=function(e){var t=!0,n=r.now;switch(r.view){case"minutes":t&=~~(e.getMinutes()/p)===~~(n.getMinutes()/p);case"hours":t&=e.getHours()===n.getHours();case"date":t&=e.getDate()===n.getDate();case"month":t&=e.getMonth()===n.getMonth();case"year":t&=e.getFullYear()===n.getFullYear()}return t}}}}]);var r=e.module("datePicker");r.directive("dateRange",function(){return{templateUrl:"templates/daterange.html",scope:{start:"=",end:"="},link:function(e){e.$watch("start.getTime()",function(t){t&&e.end&&t>e.end.getTime()&&(e.end=new Date(t))}),e.$watch("end.getTime()",function(t){t&&e.start&&t<e.start.getTime()&&(e.start=new Date(t))})}}});var l="ng-pristine",c="ng-dirty",r=e.module("datePicker");r.constant("dateTimeConfig",{template:function(e){return'<div date-picker="'+e.ngModel+'" '+(e.view?'view="'+e.view+'" ':"")+(e.maxView?'max-view="'+e.maxView+'" ':"")+(e.template?'template="'+e.template+'" ':"")+(e.minView?'min-view="'+e.minView+'" ':"")+'class="dropdown-menu"></div>'},format:"yyyy-MM-dd HH:mm",views:["date","year","month","hours","minutes"],dismiss:!1,position:"relative"}),r.directive("dateTimeAppend",function(){return{link:function(e,t){t.bind("click",function(){t.find("input")[0].focus()})}}}),r.directive("dateTime",["$compile","$document","$filter","dateTimeConfig","$parse",function(t,n,i,s,a){var o=n.find("body"),r=i("date");return{require:"ngModel",scope:!0,link:function(n,i,d,u){function p(e){return r(e,v)}function h(){return u.$modelValue}function m(e){e.stopPropagation(),u.$pristine&&(u.$dirty=!0,u.$pristine=!1,i.removeClass(l).addClass(c),w&&w.$setDirty(),u.$render())}function g(){D&&(D.remove(),D=null),_&&(_.remove(),_=null)}function f(){if(!D){if(D=t(A)(n),n.$digest(),n.$on("setDate",function(e,t,n){m(e),j&&b[b.length-1]===n&&g()}),n.$on("$destroy",g),"absolute"===M){var s=e.extend(i.offset(),{height:i[0].offsetHeight});D.css({top:s.top+s.height,left:s.left,display:"block",position:M}),o.append(D)}else _=e.element("<div date-picker-wrapper></div>"),i[0].parentElement.insertBefore(_[0],i[0]),_.append(D),D.css({top:i[0].offsetHeight+"px",display:"block"});D.bind("mousedown",function(e){e.preventDefault()})}}var v=d.format||s.format,w=i.inheritedData("$formController"),b=a(d.views)(n)||s.views.concat(),y=d.view||b[0],k=b.indexOf(y),j=d.dismiss?a(d.dismiss)(n):s.dismiss,D=null,M=d.position||s.position,_=null;-1===k&&b.splice(k,1),b.unshift(y),u.$formatters.push(p),u.$parsers.unshift(h);var A=s.template(d);i.bind("focus",f),i.bind("blur",g)}}}]),e.module("datePicker").run(["$templateCache",function(e){e.put("templates/datepicker.html",'<div ng-switch="view">\n  <div ng-switch-when="date">\n    <table>\n      <thead>\n      <tr>\n        <th ng-click="prev()">‹</th>\n        <th colspan="5" class="switch" ng-click="setView(\'month\')">{{date|date:"yyyy MMMM"}}</th>\n        <th ng-click="next()">›</i></th>\n      </tr>\n      <tr>\n        <th ng-repeat="day in weekdays" style="overflow: hidden">{{ day|date:"EEE" }}</th>\n      </tr>\n      </thead>\n      <tbody>\n      <tr ng-repeat="week in weeks">\n        <td ng-repeat="day in week">\n          <span\n            ng-class="{\'now\':isNow(day),\'active\':isSameDay(day),\'disabled\':(day.getMonth()!=date.getMonth()),\'after\':isAfter(day),\'before\':isBefore(day)}"\n            ng-click="setDate(day)" ng-bind="day.getDate()"></span>\n        </td>\n      </tr>\n      </tbody>\n    </table>\n  </div>\n  <div ng-switch-when="year">\n    <table>\n      <thead>\n      <tr>\n        <th ng-click="prev(10)">‹</th>\n        <th colspan="5" class="switch">{{years[0].getFullYear()}}-{{years[years.length-1].getFullYear()}}</th>\n        <th ng-click="next(10)">›</i></th>\n      </tr>\n      </thead>\n      <tbody>\n      <tr>\n        <td colspan="7">\n                    <span ng-class="{\'active\':isSameYear(year),\'now\':isNow(year)}"\n                          ng-repeat="year in years"\n                          ng-click="setDate(year)" ng-bind="year.getFullYear()"></span>\n\n\n        </td>\n      </tr>\n      </tbody>\n    </table>\n  </div>\n  <div ng-switch-when="month">\n    <table>\n      <thead>\n      <tr>\n        <th ng-click="prev()">‹</th>\n        <th colspan="5" class="switch" ng-click="setView(\'year\')">{{ date|date:"yyyy" }}</th>\n        <th ng-click="next()">›</i></th>\n      </tr>\n      </thead>\n      <tbody>\n      <tr>\n        <td colspan="7">\n                <span ng-repeat="month in months"\n                      ng-class="{\'active\':isSameMonth(month),\'after\':isAfter(month),\'before\':isBefore(month),\'now\':isNow(month)}"\n                      ng-click="setDate(month)">{{month|date:\'MMM\'}}</span>\n\n        </td>\n      </tr>\n      </tbody>\n    </table>\n  </div>\n  <div ng-switch-when="hours">\n    <table>\n      <thead>\n      <tr>\n        <th ng-click="prev(24)">‹</th>\n        <th colspan="5" class="switch" ng-click="setView(\'date\')">{{ date|date:"dd MMMM yyyy" }}</th>\n        <th ng-click="next(24)">›</i></th>\n      </tr>\n      </thead>\n      <tbody>\n      <tr>\n        <td colspan="7">\n                <span ng-repeat="hour in hours"\n                      ng-class="{\'now\':isNow(hour),\'active\':isSameHour(hour)}"\n                      ng-click="setDate(hour)" ng-bind="hour.getHours()+\':00\'"></span>\n        </td>\n      </tr>\n      </tbody>\n    </table>\n  </div>\n  <div ng-switch-when="minutes">\n    <table>\n      <thead>\n      <tr>\n        <th ng-click="prev()">‹</th>\n        <th colspan="5" class="switch" ng-click="setView(\'hours\')">{{ date|date:"dd MMMM yyyy" }}\n        </th>\n        <th ng-click="next()">›</i></th>\n      </tr>\n      </thead>\n      <tbody>\n      <tr>\n        <td colspan="7">\n                    <span ng-repeat="minute in minutes"\n                          ng-class="{active:isSameMinutes(minute),\'now\':isNow(minute)}"\n                          ng-click="setDate(minute)">{{minute|date:"HH:mm"}}</span>\n        </td>\n      </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n'),e.put("templates/daterange.html",'<div>\n    <table>\n        <tr>\n            <td valign="top">\n                <div date-picker="start" class="date-picker" date after="start" before="end" min-view="date" max-view="date"></div>\n            </td>\n            <td valign="top">\n                <div date-picker="end" class="date-picker" date after="start" before="end"  min-view="date" max-view="date"></div>\n            </td>\n        </tr>\n    </table>\n</div>\n')}])}(angular);var api=angular.module("kingaApi",[]);api.service("kingaApi",["http","User","Project","Photo","Flicker",function(e,t,n,i,s){var a={};return a.User=t,a.Project=n,a.Photo=i,a.Flicker=s,a}]);var api=angular.module("kingaApi");api.service("User",["http",function(e){var t={};return t.getToken=function(t){return e.post("users/login",t)},t["delete"]=function(t){return e.post("user/delete",{username:t.username,updateToken:t.updateToken})},t}]);var api=angular.module("kingaApi");api.service("Project",["http",function(e){var t={};return t.getAllProjects=function(){return e.get("projects",{filter:{include:"photos"}})},t.getPublishedProjects=function(){return e.get("projects",{filter:{include:"photos",where:{isPublished:!0}}})},t.getProject=function(t){return e.get("projects/"+t,{filter:{include:"photos"}})},t.create=function(t){return e.post("projects",t)},t.update=function(t){return e.update("projects/"+t.id,t)},t["delete"]=function(t){return e["delete"]("projects/"+t.id)},t}]);var api=angular.module("kingaApi");api.service("Photo",["http",function(e){var t={};return t.create=function(t){return e.post("projects/"+t.project_id+"/photos",t)},t["delete"]=function(t){return e["delete"]("projects/"+t.project_id+"/photos/"+t.id)},t.setUpFeatured=function(t){return e.update("photos/"+t.id,t)},t.removeFeatured=function(t){return e.update("projects/"+t.project_id+"/photos/"+t.id,t)},t.getFeaturedPhotos=function(){return e.get("photos/",{filter:{where:{isFeatured:!0}}})},t.getPhotos=function(t){return e.get("projects/"+t+"/photos")},t}]);var api=angular.module("kingaApi");api.service("http",["$http",function(e){var t={};return t.post=function(t,n){return e.post(Options.API_SERVER+t,n)},t.get=function(t,n){return e({url:Options.API_SERVER+t,method:"GET",params:n})},t["delete"]=function(t,n){return e["delete"](Options.API_SERVER+t,n)},t.update=function(t,n){return e.put(Options.API_SERVER+t,n)},t}]);var api=angular.module("kingaApi");api.service("Flicker",["http","$http",function(e){var t={};return t.getPhotosFromPhotoset=function(t){return e.get("flickr/"+t)},t}]);var kingaFrontend=angular.module("kingaFrontend",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngResource","ui.router","kingaApi","datePicker","angularFileUpload"]);kingaFrontend.config(["$httpProvider","$stateProvider","$urlRouterProvider","$locationProvider","$qProvider",function(e,t,n){t.state("home",{url:"/",templateUrl:"app/featured/featured.html",controller:"FeaturedCtrl",authenticate:!1}).state("projects",{url:"/projects",templateUrl:"app/main/main.html",controller:"MainCtrl",authenticate:!1}).state("contact",{url:"/contact",templateUrl:"app/contact/contact.html",controller:"ContactCtrl",authenticate:!1}).state("admin",{url:"/admin",templateUrl:"app/login/login.html",controller:"LoginCtrl",authenticate:!1}).state("editProject",{url:"/edit_project",templateUrl:"app/edit_project/edit_project.html",controller:"EditCtrl",authenticate:!0}).state("addNewProject",{url:"/add_project?id",templateUrl:"app/add_project/add_project.html",controller:"AddProjectCtrl",authenticate:!0,params:{title:!0,id:!0,description:!0,thumbnail:!0,project_date:!0,photos:!0,photoset_id:!0,flickr_name:!0}}).state("showProject",{url:"/project?id",templateUrl:"app/show_project/show_project.html",controller:"showProjectCtrl",authenticate:!1,params:{title:!0,id:!0,description:!0,project_date:!0,photos:!0,flickr_name:!0}}),n.otherwise("/"),e.defaults.headers.common.Authorization=localStorage.getItem("auth_token")}]),kingaFrontend.run(["$rootScope","$state",function(e,t){e.$on("$stateChangeSuccess",function(e,n){n.authenticate&&!localStorage.getItem("auth_token")&&t.go("admin")})}]);var kf=angular.module("kingaFrontend");kf.directive("flashMessages",function(){return{restrict:"E",templateUrl:"directives/flashMessages/flash-message-container.html",controller:"FlashMessageCtrl"}});var kf=angular.module("kingaFrontend");kf.controller("FlashMessageCtrl",["$scope","$timeout","$rootScope","FlashMessages",function(e,t,n,i){e.FlashMessages=i,e.$watch("FlashMessages.messages",function(e,n,s){e&&(s.messages=e,t(function(){i.dismissAll()},1e4))}),e.dismissMessage=function(e){i.dismiss(e)}}]);var kf=angular.module("kingaFrontend");kf.directive("adminGallery",function(){return{restrict:"E",templateUrl:"directives/adminGallery/admin-gallery.html",controller:"AdminGalleryCtrl"}});var kf=angular.module("kingaFrontend");kf.controller("AdminGalleryCtrl",["$scope","$timeout","$rootScope","kingaApi","FlashMessages",function(e,t,n,i){e.deletePhoto=function(t){t.project_id=e.project_id,i.Photo["delete"](t).success(function(){e.photos.splice(e.photos.indexOf(t),1)}).error(function(){})},e.setFeatured=function(t,n){t.project_id=e.project_id,t.isFeatured=n,i.Photo.setUpFeatured(t).success(function(){}).error(function(){})},e.setAvatar=function(t,n){t.project_id=e.project_id,t.isAvatar=n,i.Photo.setUpFeatured(t).success(function(){}).error(function(){})}}]),angular.module("kingaFrontend").controller("NavbarCtrl",["$scope",function(e){e.selectedIndex=0,e.select=function(t){e.selectedIndex=t}}]),angular.module("kingaFrontend").controller("showProjectCtrl",["$scope","$state","$stateParams","$http","kingaApi",function(e,t,n,i,s){return 1==n.title?(e.description="Loading...",e.title="...",window.frills&&window.frills.stop(),setTimeout(function(){new Layzr({threshold:100})}),s.Project.getProject(n.id).success(function(t){e.photos=t.photos.filter(function(e){return!e.isAvatar}),e.description=t.description,e.title=t.title}).error(function(e){switch(e&&e.code){default:console.log("error",e)}})):(window.frills&&window.frills.stop(),e.description=n.description,e.title=n.title,e.photos=n.photos.filter(function(e){return!e.isAvatar}),void 0)}]),angular.module("kingaFrontend").controller("MainCtrl",["$scope","kingaApi",function(e,t){e.findAvatar=function(e){return e.photos.find(function(e){return e.isAvatar===!0}).url},t.Project.getPublishedProjects().success(function(t){e.projects=t,setTimeout(function(){window.frills?frills.restart():(console.log("iniy"),window.frills=F$({element:$(".projectThumbnail")}));new Layzr({})})}).error(function(e){switch(e&&e.code){default:console.log("error",e)}})}]),angular.module("kingaFrontend").controller("LoginCtrl",["$scope","$http","$state","kingaApi","$timeout","FlashMessages",function(e,t,n,i,s,a){e.username=null,e.password=null,e.loginError=null,localStorage.getItem("auth_token")&&n.go("editProject"),e.attemptLogin=function(){return e.asyncLogin(),!0},e.asyncLogin=function(){if(e.loginError=null,!e.username)return void(e.loginError="Username and password cannot be blank.");var t={email:e.username,password:e.password};i.User.getToken(t).success(function(e){a.add({title:"You are logged in!",info:"Hello Kinga, add some awesome projects to your site"}),localStorage.setItem("auth_token",e.id),n.go("editProject")}).error(function(){})}}]),angular.module("kingaFrontend").controller("FeaturedCtrl",["$scope","kingaApi",function(e,t){e.photos=[{url:"./assets/images/1.jpg"},{url:"./assets/images/3.jpg"},{url:"./assets/images/4.jpg"},{url:"./assets/images/5.jpg"},{url:"./assets/images/6.jpg"}],setTimeout(function(){$(".rslides").responsiveSlides()},500),e.loader=!0,t.Photo.getFeaturedPhotos().success(function(t){e.photos=t,e.loader=!1,setTimeout(function(){$(".rslides").responsiveSlides()})}).error(function(e){switch(e&&e.code){default:console.log("error",e)}})}]),angular.module("kingaFrontend").controller("EditCtrl",["$scope","$state","$http","kingaApi","FlashMessages",function(e,t,n,i,s){e["delete"]=function(t){i.Project["delete"](t).success(function(){s.add({title:"You deleted the project:"+t.title,info:"All photos belongign to this picture were also deleted"}),e.projects.splice(e.projects.indexOf(t),1)})},e.publish=function(e,t){e.isPublished=t,i.Project.update(e).success(function(){s.add({title:"You published:"+e.title,info:"Your audience can see it now"})})},e.findAvatar=function(e){return e.photos.find(function(e){return e.isAvatar===!0}).url},e.edit=function(e){t.go("addNewProject",e)},i.Project.getAllProjects().success(function(t){e.projects=t}).error(function(e){switch(e&&e.code){default:console.log("error",e)}})}]),angular.module("kingaFrontend").controller("ContactCtrl",["$scope","$timeout",function(e,t){e.showAnimation=!1,t(function(){e.showAnimation=!0},400)}]),angular.module("kingaFrontend").controller("AddProjectCtrl",["$scope","$http","$state","$stateParams","kingaApi","FlashMessages","FileUploader","$q",function(e,t,n,i,s,a,o){e.uploader=new o({url:"https://kinga-api.herokuapp.com/api/containers/storage/upload",autoUpload:!0,queue:[],onAfterAddingAll:function(){a.add({title:"cierpliwości..",info:"loading.."})},onCompleteAll:function(){this.queue.forEach(function(t){return s.Photo.create({project_id:e.project_id,tempurl:t.file.name}).then(function(t){e.photos.push(t.data),a.add({title:"You upladed photo",info:"hurrey"})},function(){console.log("error")})}),this.queue=[]},onSuccessItem:function(){}}),1!=i.id?(e.title=i.title,e.thumbnail=i.thumbnail,e.description=i.description,e.project_date=new Date(i.project_date),e.project_id=i.id,e.photos=i.photos,e.projectError=null,e.projectExist=function(){return!0}):(e.title=null,e.thumbnail=null,e.description=null,e.project_date=null,e.project_id=null,e.photos=[],e.projectError=null,e.projectExist=function(){return!1}),e.attemptSave=function(){return e.asyncSave(),!0},e.asyncSave=function(){if(e.loginError=null,!e.title)return void(e.loginError="title and flickr name cannot be blank.");var t={title:e.title,description:e.description,project_date:$("#project_date").val()};1!=i.id?(t.id=i.id,s.Project.update(t).success(function(t){e.project_id=t.project.id}).error(function(){})):s.Project.create(t).success(function(t){e.project_id=t.id,e.projectExist=function(){return!0}}).error(function(){})},e.syncPhotos=function(){}}]),window.Options={API_SERVER:"https://kinga-api.herokuapp.com/api/"};var kf=angular.module("kingaFrontend");kf.factory("FlashMessages",["$rootScope",function(e){var t={};return t.messages=[],e.$on("flashMessage",function(e,n){t.messages.push(n)}),t.dismiss=function(e){t.messages.splice(e,1)},t.add=function(t){var n={showCloseIcon:!0};t=_.extend(n,t),e.$broadcast("flashMessage",t)},t.dismissAll=function(){t.messages=[]},t.dismissById=function(e){t.messages=t.messages.filter(function(t){return t.id!==e})},t}]),angular.module("kingaFrontend").run(["$templateCache",function(e){e.put("app/add_project/add_project.html",'<br><br><br><br><hr><button class="button" ui-sref="admin">go back to projects list</button><div class="row"><div class="small-6 columns panel"><form role="form" class="form-horizontal" ng-submit="attemptSave()" method="post"><p class="text-center">Add new project</p><div class="form-group"><div class="errors col-sm-offset-3 col-sm-6"><div class="tip">{{ projectError }}</div></div></div><div class="form-group"><label for="title">Title</label> <input id="title" type="text" class="form-control" ng-model="title" ng-disabled="asyncSave.isLoading()"></div><div class="form-group"><label for="username">Date (determine the order)</label> <input id="project_date" type="datetime" date-time="" ng-model="project_date"></div><div class="form-group"><label for="description">Description</label> <textarea ng-model="description" rows="4"></textarea></div><div class="form-group text-center"><button type="submit" class="button success" ng-disabled="asyncSave.isLoading()">{{!!project_id ? \'Update\' : \'Save\'}}</button></div></form></div><div ng-show="!!project_id" class="small-6 columns text-center panel"><p ng-bind="title"></p><div><input type="file" nv-file-select="" uploader="uploader" multiple=""><br><ul><li ng-repeat="item in uploader.queue">Name: <span ng-bind="item.file.name"></span><br></li></ul></div></div></div><div class="row"><admin-gallery></admin-gallery></div>'),e.put("app/contact/contact.html",'<br><br><br><br><hr><div class="row"><br><br><div class="small-10 center"><div class="about-text"><p class="repeat-animation" ng-if="showAnimation">I am a Montreal based visual artist specialised in portrait and event photography. My mission is to create intimate and authentic connections and provide a safer space for people to freely express themselves through my images. I am most interested in the issues of body, movement and gender.</p><p class="repeat-animation" ng-if="showAnimation">My passion for photography is primarily anchored in the documentary work of Mary-Ellen Young and Diane Arbus. I also take inspiration from the minimalist aesthetics of Rinko Kawauchi’s art and the otherworldly, campy ambient of Tsai Ming-liang’s movies. I graduated form Warsaw School of Photography in 2010 and from Cultural Studies at Warsaw University in 2012.</p><div class="repeat-animation" ng-if="showAnimation"><p>CONTACT ME FOR:</p><ul><li><p style="margin-bottom: 0"><strong>Photography:</strong> events, portraiture, dance, yoga and art documentation, film sets, family, promotional</p></li><li><p style="margin-bottom: 0"><strong>Photo assisting:</strong> studio and on location shoots</p></li><li><p style="margin-bottom: 0"><strong>Graphic design:</strong> logos, buisness cards, posters, flyers</p></li><li><p style="margin-bottom: 0"><strong>Video:</strong> documentation of events, performances</p></li><li><p><strong>Creative collaborations:</strong> feminist art projects</p></li></ul></div><br><br></div></div><div class="small-10 center text-center"><img src="./assets/images/kinga.jpg" class="repeat-animation" ng-if="showAnimation"><p class="copyright repeat-animation" ng-if="showAnimation">Photo taken by Brooks Yardley</p><div class="devider repeat-animation" ng-if="showAnimation"></div><a href="mailto:kingamichalska@yahoo.com" id="link_email" class="repeat-animation" ng-if="showAnimation">kingamichalska@yahoo.com</a><div class="devider repeat-animation" ng-if="showAnimation"></div><a href="cv.pdf" target="blank" id="link_email" class="repeat-animation" ng-if="showAnimation">Check out my CV</a><div class="devider repeat-animation" ng-if="showAnimation"></div></div><br><br><br><br><br></div>'),e.put("app/edit_project/edit_project.html",'<br><br><br><br><hr><div class="row"><br><br><div class="large-12 columns text-center"><button class="button success" ui-sref="addNewProject">add new project</button></div><div class="large-4 columns end text-center" ng-if="project" ng-repeat="project in projects | orderBy: \'project_date\':true"><div class="panel"><p>{{project.title}}</p><img class="thumbnail" ng-src="{{findAvatar(project)}}" alt="{{project.title}}"><ul class="button-group radius"><li><button class="button small alert" ng-click="delete(project)">X</button></li><li><button class="button small" ng-click="edit(project)">Edit</button></li><li><button class="button small success" ng-if="!project.isPublished" ng-click="publish(project, true)">Publish</button></li><li><button class="button small alert" ng-if="project.isPublished" ng-click="publish(project, false)">Unpublish</button></li></ul></div></div></div>'),e.put("app/featured/featured.html",'<ul class="rslides"><img ng-src="{{photo.url}}" ng-repeat="photo in photos"></ul><div class="loading" ng-if="loader"><div class="loader"><span></span> <span></span> <span></span> <span></span></div></div>'),e.put("app/login/login.html",'<br><br><br><br><hr><div class="small-5 small-centered columns panel"><p class="text-center">Hello Kinga, login to add new projects</p><br><form role="form" class="form-horizontal" ng-controller="LoginCtrl" ng-submit="attemptLogin()" method="post"><div class="form-group"><div class="errors"><div class="tip">{{ loginError }}</div></div></div><div class="form-group"><label for="username">email</label> <input id="username" type="email" class="form-control" ng-model="username" ng-disabled="asyncLogin.isLoading()" required=""> <i class="icon icon-user"></i></div><div class="form-group"><div class="errors"></div></div><div class="form-group"><label for="username" class="col-sm-3">password</label> <input id="password" type="password" class="form-control" ng-model="password" ng-disabled="asyncLogin.isLoading()" required=""> <i class="icon icon-password"></i></div><div class="form-group text-center"><button type="submit" class="button success" ng-disabled="asyncLogin.isLoading()">{{asyncLogin.isLoading() ? \'Logging in...\' : \'Log in\'}}</button></div></form></div>'),e.put("app/main/main.html",'<br><br><br><br><hr><div class="row"><div class="large-10 columns paddint-top"><div class="large-4 columns end thumbnail repeat-animation" ng-repeat="project in projects | orderBy: \'project_date\':true"><a ui-sref="showProject(project)"><img class="projectThumbnail" src="./assets/images/placeholder.gif" data-layzr="{{findAvatar(project)}}"> <span class="project-title">{{project.title}}</span></a></div></div><div class="large-2 columns"></div></div>'),e.put("app/show_project/show_project.html",'<div class="small-10 columns"><h2 class="project-title-show">{{title}}</h2><p ng-bind-html="description"></p><br></div><div class="small-2 columns"></div><hr><div class="small-11 columns" ng-animate-children=""><div class="show-photo text-center repeated-item" ng-repeat="photo in photos"><img class="horizontal-{{photo.horizontal}}" src="{{photo.url}}" data-layzr="{{photo.url}}"></div></div><div class="small-1 columns"></div>'),e.put("components/navbar/navbar.html",'<div ng-controller="NavbarCtrl" class="row"><div class="small-8 columns"><img src="./assets/images/logo.png"></div><nav class="small-4 columns"><ul><li><a ui-sref="home" ng-click="select(0)" ng-class="{active: 0 === selectedIndex}">Start</a></li><li><a ui-sref="projects" ng-click="select(1)" ng-class="{active: 1 === selectedIndex}">Works</a></li><li><a ui-sref="contact" ng-click="select(2)" ng-class="{active: 2 === selectedIndex}">About</a></li></ul></nav></div>'),e.put("directives/adminGallery/admin-gallery.html",'<div class="row"><p>Photos</p><div class="panel small-3 columns" ng-repeat="photo in photos"><img class="" ng-src="{{photo.url}}"><br><ul class="button-group radius"><li><button class="button small alert" ng-click="deletePhoto(photo)">Delete</button></li><li ng-if="photo.isFeatured"><button class="button small" ng-click="setFeatured(photo, false)">Unfeature</button></li><li ng-if="!photo.isFeatured"><button class="button small" ng-click="setFeatured(photo, true)">Feature</button></li><li ng-if="photo.isAvatar"><button class="button small" ng-click="setAvatar(photo, false)">Remove Avatar</button></li><li ng-if="!photo.isAvatar"><button class="button small" ng-click="setAvatar(photo, true)">Set Avatar</button></li></ul></div></div>'),e.put("directives/flashMessages/flash-message-container.html",'<div class="flash-message-container container" ng-show="messages.length"><div ng-repeat="message in messages" class="flash-message" ng-class="message.type"><i class="icon icon-close" ng-click="dismissMessage($index)" ng-show="message.showCloseIcon">X</i><div class="flash-body"><span ng-if="message.title" class="flash-title">{{ message.title }}</span> <span ng-if="message.info" class="flash-info">{{ message.info }}</span><div ng-if="message.template" class="flash-template" ng-include="message.template"></div></div><div class="flash-accent"></div></div></div>')
}]);