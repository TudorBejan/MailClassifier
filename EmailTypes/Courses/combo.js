/*
YUI 3.7.2 (build 5639)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("widget-htmlparser",function(e,t){var n=e.Widget,r=e.Node,i=e.Lang,s="srcNode",o="contentBox";n.HTML_PARSER={},n._buildCfg={aggregates:["HTML_PARSER"]},n.ATTRS[s]={value:null,setter:r.one,getter:"_getSrcNode",writeOnce:!0},e.mix(n.prototype,{_getSrcNode:function(e){return e||this.get(o)},_applyParsedConfig:function(t,n,r){return r?e.mix(n,r,!1):n},_applyParser:function(t){var n=this,r=this._getNodeToParse(),s=n._getHtmlParser(),o,u;s&&r&&e.Object.each(s,function(e,t,s){u=null,i.isFunction(e)?u=e.call(n,r):i.isArray(e)?(u=r.all(e[0]),u.isEmpty()&&(u=null)):u=r.one(e),u!==null&&u!==undefined&&(o=o||{},o[t]=u)}),t=n._applyParsedConfig(r,t,o)},_getNodeToParse:function(){var e=this.get("srcNode");return this._cbFromTemplate?null:e},_getHtmlParser:function(){var t=this._getClasses(),n={},r,i;for(r=t.length-1;r>=0;r--)i=t[r].HTML_PARSER,i&&e.mix(n,i,!0);return n}})},"3.7.2",{requires:["widget-base"]});
/*
YUI 3.7.2 (build 5639)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("widget-skin",function(e,t){var n="boundingBox",r="contentBox",i="skin",s=e.ClassNameManager.getClassName;e.Widget.prototype.getSkinName=function(){var e=this.get(r)||this.get(n),t=new RegExp("\\b"+s(i)+"-(\\S+)"),o;return e&&e.ancestor(function(e){return o=e.get("className").match(t),o}),o?o[1]:null}},"3.7.2",{requires:["widget-base"]});
/*
YUI 3.7.2 (build 5639)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("widget-uievents",function(e,t){var n="boundingBox",r=e.Widget,i="render",s=e.Lang,o=":",u=e.Widget._uievts=e.Widget._uievts||{};e.mix(r.prototype,{_destroyUIEvents:function(){var t=e.stamp(this,!0);e.each(u,function(n,r){n.instances[t]&&(delete n.instances[t],e.Object.isEmpty(n.instances)&&(n.handle.detach(),u[r]&&delete u[r]))})},UI_EVENTS:e.Node.DOM_EVENTS,_getUIEventNode:function(){return this.get(n)},_createUIEvent:function(t){var n=this._getUIEventNode(),i=e.stamp(n)+t,s=u[i],o;s||(o=n.delegate(t,function(e){var t=r.getByNode(this);t&&t._filterUIEvent(e)&&t.fire(e.type,{domEvent:e})},"."+e.Widget.getClassName()),u[i]=s={instances:{},handle:o}),s.instances[e.stamp(this)]=1},_filterUIEvent:function(e){return e.currentTarget.compareTo(e.container)||e.container.compareTo(this._getUIEventNode())},_getUIEvent:function(e){if(s.isString(e)){var t=this.parseType(e)[1],n,r;return t&&(n=t.indexOf(o),n>-1&&(t=t.substring(n+o.length)),this.UI_EVENTS[t]&&(r=t)),r}},_initUIEvent:function(e){var t=this._getUIEvent(e),n=this._uiEvtsInitQueue||{};t&&!n[t]&&(this._uiEvtsInitQueue=n[t]=1,this.after(i,function(){this._createUIEvent(t),delete this._uiEvtsInitQueue[t]}))},on:function(e){return this._initUIEvent(e),r.superclass.on.apply(this,arguments)},publish:function(e,t){var n=this._getUIEvent(e);return n&&t&&t.defaultFn&&this._initUIEvent(n),r.superclass.publish.apply(this,arguments)}},!0)},"3.7.2",{requires:["node-event-delegate","widget-base"]});
/*
YUI 3.7.2 (build 5639)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("widget-stdmod",function(e,t){function H(t){this._stdModNode=this.get(w),e.before(this._renderUIStdMod,this,O),e.before(this._bindUIStdMod,this,M),e.before(this._syncUIStdMod,this,_)}var n=e.Lang,r=e.Node,i=e.UA,s=e.Widget,o="",u="hd",a="bd",f="ft",l="header",c="body",h="footer",p="fillHeight",d="stdmod",v="Node",m="Content",g="firstChild",y="childNodes",b="ownerDocument",w="contentBox",E="height",S="offsetHeight",x="auto",T="headerContentChange",N="bodyContentChange",C="footerContentChange",k="fillHeightChange",L="heightChange",A="contentUpdate",O="renderUI",M="bindUI",_="syncUI",D="_applyParsedConfig",P=e.Widget.UI_SRC;H.HEADER=l,H.BODY=c,H.FOOTER=h,H.AFTER="after",H.BEFORE="before",H.REPLACE="replace";var B=H.HEADER,j=H.BODY,F=H.FOOTER,I=B+m,q=F+m,R=j+m;H.ATTRS={headerContent:{value:null},footerContent:{value:null},bodyContent:{value:null},fillHeight:{value:H.BODY,validator:function(e){return this._validateFillHeight(e)}}},H.HTML_PARSER={headerContent:function(e){return this._parseStdModHTML(B)},bodyContent:function(e){return this._parseStdModHTML(j)},footerContent:function(e){return this._parseStdModHTML(F)}},H.SECTION_CLASS_NAMES={header:s.getClassName(u),body:s.getClassName(a),footer:s.getClassName(f)},H.TEMPLATES={header:'<div class="'+H.SECTION_CLASS_NAMES[B]+'"></div>',body:'<div class="'+H.SECTION_CLASS_NAMES[j]+'"></div>',footer:'<div class="'+H.SECTION_CLASS_NAMES[F]+'"></div>'},H.prototype={_syncUIStdMod:function(){var e=this._stdModParsed;(!e||!e[I])&&this._uiSetStdMod(B,this.get(I)),(!e||!e[R])&&this._uiSetStdMod(j,this.get(R)),(!e||!e[q])&&this._uiSetStdMod(F,this.get(q)),this._uiSetFillHeight(this.get(p))},_renderUIStdMod:function(){this._stdModNode.addClass(s.getClassName(d)),this._renderStdModSections(),this.after(T,this._afterHeaderChange),this.after(N,this._afterBodyChange),this.after(C,this._afterFooterChange)},_renderStdModSections:function(){n.isValue(this.get(I))&&this._renderStdMod(B),n.isValue(this.get(R))&&this._renderStdMod(j),n.isValue(this.get(q))&&this._renderStdMod(F)},_bindUIStdMod:function(){this.after(k,this._afterFillHeightChange),this.after(L,this._fillHeight),this.after(A,this._fillHeight)},_afterHeaderChange:function(e){e.src!==P&&this._uiSetStdMod(B,e.newVal,e.stdModPosition)},_afterBodyChange:function(e){e.src!==P&&this._uiSetStdMod(j,e.newVal,e.stdModPosition)},_afterFooterChange:function(e){e.src!==P&&this._uiSetStdMod(F,e.newVal,e.stdModPosition)},_afterFillHeightChange:function(e){this._uiSetFillHeight(e.newVal)},_validateFillHeight:function(e){return!e||e==H.BODY||e==H.HEADER||e==H.FOOTER},_uiSetFillHeight:function(e){var t=this.getStdModNode(e),n=this._currFillNode;n&&t!==n&&n.setStyle(E,o),t&&(this._currFillNode=t),this._fillHeight()},_fillHeight:function(){if(this.get(p)){var e=this.get(E);e!=o&&e!=x&&this.fillHeight(this._currFillNode)}},_uiSetStdMod:function(e,t,r){if(n.isValue(t)){var i=this.getStdModNode(e,!0);this._addStdModContent(i,t,r),this.set(e+m,this._getStdModContent(e),{src:P})}else this._eraseStdMod(e);this.fire(A)},_renderStdMod:function(e){var t=this.get(w),n=this._findStdModSection(e);return n||(n=this._getStdModTemplate(e)),this._insertStdModSection(t,e,n),this[e+v]=n,this[e+v]},_eraseStdMod:function(e){var t=this.getStdModNode(e);t&&(t.remove(!0),delete this[e+v])},_insertStdModSection:function(e,t,n){var r=e.get(g);if(t===F||!r)e.appendChild(n);else if(t===B)e.insertBefore(n,r);else{var i=this[F+v];i?e.insertBefore(n,i):e.appendChild(n)}},_getStdModTemplate:function(e){return r.create(H.TEMPLATES[e],this._stdModNode.get(b))},_addStdModContent:function(e,t,n){switch(n){case H.BEFORE:n=0;break;case H.AFTER:n=undefined;break;default:n=H.REPLACE}e.insert(t,n)},_getPreciseHeight:function(e){var t=e?e.get(S):0,n="getBoundingClientRect";if(e&&e.hasMethod(n)){var r=e.invoke(n);r&&(t=r.bottom-r.top)}return t},_findStdModSection:function(e){return this.get(w).one("> ."+H.SECTION_CLASS_NAMES[e])},_parseStdModHTML:function(t){var n=this._findStdModSection(t);return n?(this._stdModParsed||(this._stdModParsed={},e.before(this._applyStdModParsedConfig,this,D)),this._stdModParsed[t+m]=1,n.get("innerHTML")):null},_applyStdModParsedConfig:function(e,t,n){var r=this._stdModParsed;r&&(r[I]=!(I in t)&&I in r,r[R]=!(R in t)&&R in r,r[q]=!(q in t)&&q in r)},_getStdModContent:function(e){return this[e+v]?this[e+v].get(y):null},setStdModContent:function(e,t,n){this.set(e+m,t,{stdModPosition:n})},getStdModNode:function(e,t){var n=this[e+v]||null;return!n&&t&&(n=this._renderStdMod(e)),n},fillHeight:function(e){if(e){var t=this.get(w),r=[this.headerNode,this.bodyNode,this.footerNode],s,o,u=0,a=0,f=!1;for(var l=0,c=r.length;l<c;l++)s=r[l],s&&(s!==e?u+=this._getPreciseHeight(s):f=!0);f&&((i.ie||i.opera)&&e.set(S,0),o=t.get(S)-parseInt(t.getComputedStyle("paddingTop"),10)-parseInt(t.getComputedStyle("paddingBottom"),10)-parseInt(t.getComputedStyle("borderBottomWidth"),10)-parseInt(t.getComputedStyle("borderTopWidth"),10),n.isNumber(o)&&(a=o-u,a>=0&&e.set(S,a)))}}},e.WidgetStdMod=H},"3.7.2",{requires:["base-build","widget"]});
