/*
YUI 3.7.2 (build 5639)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("overlay",function(e,t){e.Overlay=e.Base.create("overlay",e.Widget,[e.WidgetStdMod,e.WidgetPosition,e.WidgetStack,e.WidgetPositionAlign,e.WidgetPositionConstrain])},"3.7.2",{requires:["widget","widget-stdmod","widget-position","widget-position-align","widget-stack","widget-position-constrain"],skinnable:!0});
YUI.add("comms-ui-autocomplete-plugin",function(C){var B="autocomplete",F=C.Lang,G=C.Array.each,L=C.Plugin,E=L.Base,I="ac",D=13;function J(O,Q){var R=this,N="down",P=C.stamp(this)+"|";if(C.UA.gecko>0&&C.UA.gecko<5){N="press";C.on(P+"key",O.raiseFlag,Q,"down",O);}C.on(P+"valueChange",H,Q,O);C.on(P+"key",O.next,Q,N+":40",O);C.on(P+"key",O.previous,Q,N+":38",O);C.on(P+"key",O.close,Q,"down:27",O);Q.on("keyup",function(S){if(S.keyCode===D){S.type="select";this.select.call(O,S);}},O,"select");}function H(O){var N=O.newVal;if(!N){this._cachedValue=false;return this.close();}if(N===this._cachedValue||N.length<this.get("minQueryLength")){return false;}this._cachedValue=N;this.fire("ac:query",{value:O.newVal});return true;}function A(N){return function(){if(N){N.setAttribute(B,"on");}N=null;};}function K(N){var P=C.Node.getDOMNode(N),Q=P.getAttribute(B);if((Q&&Q!=="off")||Q===null||Q===undefined){var O=A(P);C.on("beforeunload",O,window);C.on("unload",O,window);}P.setAttribute(B,"off");}function M(){M.superclass.constructor.apply(this,arguments);}C.extend(M,E,{_defaultEventFn:null,initializer:function(){var N=this,O=N.get("host"),P=(!F.isNull(N._defaultEventFn)?N._defaultEventFn:{});J(N,O);G(["query","load","show","hide","next","previous","select"],function(Q){N.publish("ac:"+Q,{broadcast:1,bubbles:1,context:N,preventable:true,prefix:I,defaultFn:P[Q]||null});},N);K(O);},destructor:function(){var N=this;C.detach(C.stamp(N)+"|");N.detachAll();},open:function(){this.fire("ac:show");},next:function(N){if(this.conflictingKeyFlag&&C.UA.gecko){return;}N.preventDefault();this.fire("ac:next");},previous:function(N){if(this.conflictingKeyFlag&&C.UA.gecko){return;}N.preventDefault();this.fire("ac:previous");},raiseFlag:function(O,N){if((O.keyCode===55)||(O.keyCode==57)){N.conflictingKeyFlag=true;}else{N.conflictingKeyFlag=false;}},select:function(N){this.fire("ac:select",N);},hide:function(){},close:function(){this.fire("ac:hide");},reload:function(N){if(N){if(N.length<1){this.set("badResult",this.get("queryValue"));}this.fire("ac:load",{results:N,query:this.get("queryValue")});}}},{NAME:"ACPlugin",NS:I,ATTRS:{queryValue:{getter:function(){return this.get("host").get("value");},setter:function(N){this.get("host").set("value",N);return(this._cachedValue=N);}},dataSource:{value:[]},minQueryLength:{value:0,validator:F.isNumber},queryTemplate:{value:encodeURIComponent,setter:function(N){return(F.isFunction(N)?N:function(O){return N.replace(/(^|[^\\])((\\{2})*)\{query\}/,"$1$2"+encodeURIComponent(O)).replace(/(^|[^\\])((\\{2})*)\\(\{query\})/,"$1$2$4");});}},alignNode:null,conflictingKeyFlag:false,badResult:{value:false,setter:function(N){return(C.Lang.isString(N))?N:false;}}}});C.namespace("comms.ui");C.comms.ui.AutoCompleteEventsPlugin=M;},"1.0.0",{requires:["node","plugin","event-valuechange","event-key"]});YUI.add("comms-ui-autocomplete",function(C){var H=C.Array.each,F=C.Lang,B=C.Overlay,G="selectedIndex",A="queryValue",J="ac",D="_BOUND",I="_"+G,K="_originalValue";function E(){E.superclass.constructor.apply(this,arguments);this.delegated=false;this.listeners=[];}C.extend(E,B,{initializer:function(){var L=this;L.after({queryChanged:L.drawMarkUp,dataChanged:L.drawMarkUp});L.hide();L.publish(J+":complete",{broadcast:1,bubbles:1,context:L,preventable:true,prefix:J});},renderUI:function(){var M=this.get("ac"),L={"display":"none","overflow":"auto","maxHeight":"300px"};if(!M){return false;}this.get("contentBox").setStyles(L);this.get("contentBox").set("role","listbox");this.setSize();this.set("align",{node:this.get("ac").get("alignNode"),points:[C.WidgetPositionAlign.TL,C.WidgetPositionAlign.BL]});this.get("contentBox").setStyle("display","block");return true;},bind:function(P){var Q=this,L=Q.get("contentBox"),O=Q.get("ac"),N=C.stamp(Q)+"|";if(P&&O!==P&&Q[D]){C.detach(N);Q[D]=0;}P=P||O;if(P&&!Q[D]){var M=[];Q[D]=1;if(!Q.delegated){Q.delegated=true;M.push(L.delegate("click",Q.click,"li",Q));M.push(L.delegate("mouseover",Q.mouseover,"li",Q));M.push(L.delegate("mousemove",function(R){R.halt();R.currentTarget.addClass("over");},"li",Q));M.push(L.delegate("mouseleave",function(R){R.halt();R.currentTarget.removeClass("over");},"li",Q));M.push(C.on("click",function(R){if(!Q.isVisible()){return;}if(Q.get("contentBox").contains(R.target)){Q.get("ac").get("host").simulate("keydown",{keyCode:13});}Q.hide();},document,this));}M.push(P.on(N+J+":load",function(R){Q.setAttrs({query:R.query,data:R.results}).drawMarkUp().show().setAlign();}));M.push(P.on(N+J+":query",function(R){Q.set("query",R.value).drawMarkUp();}));M.push(P.on(N+J+":next",Q.next,Q));M.push(P.on(N+J+":previous",Q.previous,Q));M.push(P.on(N+J+":hide",Q.hide,Q));P.select=function(R){Q.selected.call(Q,R,"enter");};Q.listeners=M;}return Q;},bindUI:function(L){return this.bind(L);},setSize:function(){if(!this.get("expandWidthToContents")){this.set("width",this.get("ac").get("alignNode").get("offsetWidth"));}},setAlign:function(){var O=this,M=O.get("ac").get("alignNode"),L=M.get("region"),N=[L.left,L.bottom];if(O.get("xy")[0]!=N[0]||O.get("xy")[1]!=N[1]){O.set("xy",N);}return O;},drawMarkUp:function(){var L=this,M=L.get("data");if(!M){return L;}L[I]=-1;L[K]="";L.get("contentBox").set("innerHTML",L.getListMarkup(M));if(M.length>0){if(L.get("selectFirst")){this.set(G,0);}L.get("contentBox").setStyle("display","block");}else{L.get("contentBox").setStyle("display","none");}return L;},getListMarkup:function(O){var N=this,L=N.get("listTpl"),M=[];H(O,function(P){M.push(N.getItemMarkup(P));});return L.replace(/\{list\}/g,M.join(""));},getItemMarkup:function(M){var L=this;if(!F.isString(M)){return false;}return L.get("itemTpl").replace(/\{hilite\}/g,M);},_fixView:function(O){var R=this,N=R.get(G),L=R.get("contentBox"),Q,M,M,P;if(N===-1){L.set("scrollTop",0);return true;}M=R.item(N);Q=L.get("scrollTop");M=R.item(N);P=M.get("offsetTop");if(O){if((P>Q)&&!(R.itemsCount()==(N+1))){return true;}L.set("scrollTop",P);document.body.scrollIntoView();return false;}else{if((P+M.get("clientHeight"))>(Q+L.get("clientHeight"))){L.set("scrollTop",L.get("scrollTop")+M.get("clientHeight"));if(C.UA.ie<=0){M.scrollIntoView();}document.body.scrollIntoView(false);}return true;}},next:function(){var L=this;if(L.get("selectFirst")&&L.itemsCount()==1){return false;}return(L.get("visible")?L.selectNext():L);},selectNext:function(){var L=this;L.set(G,this.get(G)+1);L._fixView(false);return L.get(G);},selectPrevious:function(){var L=this;L.set(G,this.get(G)-1);L._fixView(true);return L.get(G);},previous:function(){var L=this;if(L.itemsCount()==1){return false;}return L.get("visible")?L.selectPrevious():L;},isVisible:function(){return this.get("visible");},item:function(L){return this.get("contentBox").all(this.get("itemSelector")).item(L);},itemsCount:function(){return this.get("contentBox").all(this.get("allItemsSelector")).size();},click:function(L){this.selected(L,"click");},mouseover:function(O){var M,L,N=this;M=O.currentTarget;L=N.get("contentBox").all("li").indexOf(M);N.set("selectedIndex",L);},autoManageSelect:function(L){var M=this,N=M.get("ac");if(!L){L=false;}if(L){N.on(J+":select",M.handleEnter,M);}else{N.detachAll(J+":select");}},handleEnter:function(P,M){if(!M){M=this;}var O=M.get("ac"),L=M[I],N,Q;P.halt();M.fire(J+":complete",M);if(L!=-1){N=M.item(L);if(N){Q=N.get("text");O.set(A,Q);}M[I]=-1;O.get("host").focus();M.hide();}},selected:function(Q,O){if(!O){O="click";}var M=null,N=this,P=N.get("ac"),L;M=N.item(this.get(G));L=this.get(G);if(!M){return false;}Q.selectedItem=M;Q.selectedIndex=L;Q.type=O;Q.container=N.get("contentBox");P.fire("ac:select",Q);N[I]=-1;return true;},setHostValue:function(M){var L=this;L.get("ac").set(A,M);L.get("ac").get("host").focus();L.hide();},reload:function(L){return this.get("ac").reload(L);},close:function(){var L=this;L.get("ac").close();L.hide();},destroy:function(){var M=this.listeners;if(M){var N=M.length,L;for(L=0;L<N;L++){if(M[L]){M[L].detach();M[L]=null;}}this.listeners=null;}if(this.get("ac")){this.get("ac").destructor();}E.superclass.destroy.apply(this,arguments);}},{NAME:"AutoCompleteWidget",ATTRS:{ac:{setter:function(L){if(!this[D]){return;}this.bind(L);},validator:function(L){return true;}},data:{},query:{value:""},listTpl:{value:'<ul role="presentation">{list}</ul>'},itemTpl:{value:'<li role="option">{hilite}</li>'},itemSelector:{value:"ul li"},allItemsSelector:{value:"ul li"},expandWidthToContents:{value:false},selectFirst:{value:true}}});E.ATTRS[G]={value:-1,validator:function(L){var M=this.get("data");return M&&C.Lang.isNumber(L);},getter:function(){return this[I];},setter:function(O){var T=this,Q=T.get(G),R=T.get("data"),L=T.itemsCount(),S=T.get("ac"),M=this.getClassName("selected"),P,N;if(isNaN(Q)){Q=-1;}if(!R||!L){return false;}while(O<-1){O+=L+1;}O=(O+1)%(L+1)-1;Q=(Q+1)%(L+1)-1;T[I]=O;if(Q===-1){T[K]=S.get(A);}if(Q===O){return false;
}var U=T.get("contentBox").one("."+M);if(U){U.removeClass(M);}if(O===-1){}else{P=T.item(O);if(P&&P.hasClass("corpmail.label")){N=O+(Q<O?1:-1);T[I]=N;P=T.item(N);}if(P){P.addClass(M);}}return O;}};C.namespace("comms.ui");C.comms.ui.AutoComplete=E;},"1.0.0",{requires:["overlay","comms-ui-autocomplete-plugin","node-event-simulate"]});YUI.add("filter-contacts",function(C){var T=C.contacts,E=T.api,R=T.utils,K={},H=function(Y,d){if(Y.emailField&&Y.emailField.id){return Y.emailField.id;}return Y.id;},O=function(Y,e){for(var d=0;d<e.length;d++){Y.push(e[d]);}return Y;},S=function(){var d=new Date().getTime(),n=R.getSortedFlatContacts(),f=function(r,s){var t=[];r.user&&t.push(r.user.charAt(s).toLowerCase());r.firstname&&t.push(r.firstname.charAt(s).toLowerCase());r.lastname&&t.push(r.lastname.charAt(s).toLowerCase());r.nickname&&t.push(r.nickname.charAt(s).toLowerCase());r.mobileno&&O(t,r.mobileno.toLowerCase());r.homeno&&O(t,r.homeno.toLowerCase());r.workno&&O(t,r.workno.toLowerCase());r.isCategory||(r.email&&t.push(r.email.charAt(s).toLowerCase()));return t;};var j,m,k,o=R.getCategories();for(m in o){var l=o[m],q=0,e=0;for(j in l.contacts){var h=R.getContactById(l.contacts[j]),p=R.getFieldsByType(h,"email");if(p){q+=1;e+=p.sc_score?p.sc_score:0;}}n.push({firstname:l.name,email:[q,"<span style='display:none'>___AC_CAT_ID:",l.id,"</span>"].join(""),id:l.id,sc_score:Math.floor((e/q)*(2/3)),isCategory:true});}k={};K=[];for(j in n){var h=n[j];if((!h.email)||(!h.email.length)){continue;}var Y,i=f(h,0);for(Y in i){var g=i[Y];if(!K[g]){K[g]={};}K[g][H(h)]=h;}}},A=function(l){var f={},d={},k={},h,m;h=l.filterItems;for(var e=0;e<h.length;e++){var n=h[e];var g=n.value.charAt(0).toLowerCase();var Y=K[g];for(m in Y){d[m]=Y[m];}}for(m in d){var j=d[m];if(l.filterContact(j)&&!k[j.email]){k[j.email]=true;f[H(j)]=j;}}var o=[];for(m in f){o.push(f[m]);}R.sortFlatContacts(o);return o;};C.on("contacts:api:contactChanged",S);C.on("contacts:api:loaded",S);if(R.areContactsLoaded()){S();}else{E.load();}function F(){this.filterItems=[];this.matchType=1;this.init_temp_data=true;this.del_temp_data=true;this.match_limit=50;}var D=["mobileno","homeno","workno","firstname","lastname","user","email","nickname"];var a=new RegExp("[\\+\\*\\?\\^\\[\\]\\{\\}\\$\\\\/%#~:<>()]","g");var U=new RegExp("[^0-9]","g");var G=new RegExp("[ _\\.\\-@]","g");var Z=new RegExp("[ _\\.\\-@][^ _\\.\\-@]","g");F.prototype.fastMatch=function(){return A(this).slice(0,this.match_limit);};var P=/___AC_CAT_ID\:([0-9]+)/;F.prototype.decodeCategory=function(j){var f=P.exec(j);if(f&&f.length>1){var h=R.getCategoryById(f[1]),e=[];for(var d in h.contacts){var i=R.getBasicFlatContacts(R.getContactById(h.contacts[d]));for(var g in i){var Y=i[g];if(Y.isPrimary){e[H(Y)]=Y;break;}}}return e;}else{return false;}};function I(e){var Y,d,g;var f=e.value;if(e.numeric){d=f.length;if(d>1){g=f.charAt(0);Y=1;while(Y<d){g+="[ _\\.\\-()]*";g+=f.charAt(Y);Y+=1;}}else{g=f;}}else{g=f;}e.regExp=new RegExp(g,"gi");}function c(e,d){var Y={};Y.value=e;if(!U.test(e)){Y.numeric=true;}Y.group_id=d;Y.match_siIndex=-1;I(Y);return Y;}function N(j){var d,Y,k,g,e;var l,f=[];Y=j.length;if(Y===0){return f;}var h=new RegExp("[ ]","g");for(d=0;d<Y;d++){k=j[d];g=0;while(h.test(k)){e=h.lastIndex-1;if(g<e){l=c(k.substring(g,e),d);f.push(l);}g=h.lastIndex;}if(g<k.length){l=c(k.substring(g),d);f.push(l);}}return f;}function X(g){var Y=[];var e,f,d;if(g.length>0){d=new RegExp("[,;]","g");e=0;while(d.test(g)){f=d.lastIndex-1;if(f>e){Y.push(g.substring(e,f));}e=d.lastIndex;}if(e<g.length){Y.push(g.substring(e));}}return Y;}F.prototype.updateFilterItems=function(f){if(f.length>2048){f=f.substring(0,2048);}f=f.replace(a," ");var Y=X(f);var e,d=C.common.Utils;for(e in Y){if(Y.hasOwnProperty(e)){Y[e]=d.regexpEscape(d.escapeHtml(Y[e]));}}this.filterItems=N(Y);};F.fuzzyMatch=function(f,d,p,Y){var i=f.length;var w=d.length;var r=[];var s=[];var o=[];var e,t,g,l,j,n,k,q;var x,u,m,h;for(e=0;e<=i;e++){s[e]=e;}l=w-p;if(l>i+Y){l=i+Y;}g=0;n="";for(t=0;t<l;t++){q=n;n=d.charAt(t+p).toLowerCase();if(g<=0){x=t+1;o[0]=x;m=x;g=0;j="";}else{x=Y+1;o[g]=x;m=x;j=f.charAt(e-1).toLowerCase();}for(e=g,g=-1;e<i;e++){k=j;j=f.charAt(e).toLowerCase();if(j===n){x=s[e];}else{x=s[e]+1;u=o[e]+1;if(x>u){x=u;}u=s[e+1]+1;if(x>u){x=u;}if(j===q&&k===n){u=r[e-1]+1;if(x>u){x=u;}}}o[e+1]=x;if(m>x){m=x;}if(g===-1&&x<=Y){if(e===0&&o[0]<=Y){g=0;}else{g=e+1;}}if(x>o[e]&&x>Y){break;}}if(e===i){if(x===0){s=o;t+=1;break;}u=s[i];if(u!==undefined&&u<x){break;}}if(m>Y){return null;}r=s;s=o;o=[];}x=s[i];if(x===undefined||x>Y){return null;}else{h={};h.start=p;h.end=t+p;h.diff=x;return h;}};function V(Y,d,j,p){var o;var m,k,h,g,n;var f,e,l;f=p.fuzzy_match_idx+1;n=p.fuzzy_matches;if(f<n.length){g=n[f];p.fuzzy_match_idx=f;return g;}else{if(!p.fuzzy_complete){o=Z;m=-1;while(true){if(m===-1&&p.fuzzy_match_idx===-1){m=0;}else{if(m<=0){o.lastIndex=(p.fuzzy_match_idx===-1)?0:n[p.fuzzy_match_idx].start+1;}if(o.test(Y)){m=o.lastIndex-1;}else{break;}}h=p.matches;for(f=0,e=h.length;f<e;f++){k=h[f];if(m>k.start){break;}else{if(m===k.start){g={};g.start=k.start;g.end=k.end;g.diff=0;n.push(g);p.fuzzy_match_idx+=1;j.match_idx=g.end;return g;}}}e=j.value.length;if(e<=2){l=0;if(p.complete){continue;}}else{if(e<=5){l=1;}else{l=2;}}if((g=F.fuzzyMatch(j.value,Y,m,l))!==null){n.push(g);p.fuzzy_match_idx+=1;j.match_idx=g.end;return g;}}p.fuzzy_complete=true;}p.fuzzy_match_idx=-1;return null;}}function J(Y,e,j,l){var k;var f,d,m,h,g;f=l.match_idx+1;g=l.matches;if(f<g.length){h=g[f];l.match_idx=f;return h;}else{if(!l.complete){k=j.regExp;k.lastIndex=(l.match_idx===-1)?0:g[l.match_idx].start+1;d=k.lastIndex;while(k.exec(Y)){if(e){m=Y.substring(d,k.lastIndex);d+=m.search(k);h={};h.end=k.lastIndex;h.start=d;g.push(h);l.match_idx+=1;j.match_idx=h.end;return h;}else{d=k.lastIndex-j.value.replace(/\\/g,"").length;if(d===0||Y.charAt(d-1).search(G)===0){h={};h.end=k.lastIndex;h.start=d;g.push(h);l.match_idx+=1;j.match_idx=h.end;return h;}}}l.complete=true;}l.match_idx=-1;return null;}}function Q(e,Y,d,f,h,i,k){var g;var j=(d||e.matchType!==2)?J:V;while((g=j(Y,d,f,h))!==null){if(k){if(g.start>=f.start_idx){f.start_idx=g.start;return true;}}else{if(f.start_siIndex===i&&f.start_idx===g.start){continue;}else{return true;}}}return false;}function W(m,l){var j=l.matches;var Y,k;var g,e,d,f,h;if(m.match_idx!==-1){Y=m.match_idx;
k=m.matches;}else{if(m.fuzzy_match_idx!==-1){Y=m.fuzzy_match_idx;k=m.fuzzy_matches;}else{return false;}}d=k[Y].start;f=k[Y].end;for(g=0,e=j.length;g<e;g++){h=j[g];if(!(h.end<=d||f<=h.start)){return false;}}for(g=0,e=l.length;g<e;g++){if((l[g].match_idx!==-1||l[g].fuzzy_match_idx!==-1)&&l[g].group_id!==m.group_id){return false;}}h={};h.start=d;h.end=f;l.matches.push(h);return true;}function M(g,m,q,d,n,p,r){if(n.phoneno&&!m.numeric){return false;}var j,f,o;var e,h,l,k;for(j=0,f=n.length;j<f;j++){if(n[j].index===q){o=n[j];break;}}if(!o){o={};o.index=q;o.group_id=m.group_id;o.match_idx=-1;o.matches=[];o.fuzzy_match_idx=-1;o.fuzzy_matches=[];n.push(o);}var Y=o.match_idx;while(Q(g,d,n.phoneno,m,o,p,r)){if(W(o,n)){return true;}}if(Y!==-1){k=n.matches;e=o.matches[Y].start;h=o.matches[Y].end;for(j=0,f=k.length;j<f;j++){l=k[j];if(l.start===e&&l.end===h){k.splice(j,1);}}}m.match_idx=-1;return false;}function B(f,i,g,m){var l,h,j,d,k,e,Y,n;h=D.length;n=false;if(g.match_siIndex===-1){n=true;g.start_siIndex=-1;g.start_idx=-1;if(m>0){Y=f.filterItems[m-1];if(Y.group_id===g.group_id){g.start_siIndex=Y.match_siIndex;g.start_idx=Y.match_idx;}}}if(n&&g.start_siIndex!==-1){l=g.start_siIndex;e=(l<3);if(e&&!g.numeric){}else{j=D[l];d=i[j];if(d&&d.length>0){k=i._matches[j];if(!k){k=[];k.matches=[];if(e){k.phoneno=true;}i._matches[j]=k;}if(M(f,g,m,d,k,l,true)){g.match_siIndex=l;g.special_match=true;return true;}}}}if(g.match_siIndex===-1){l=0;}else{if(g.special_match){g.special_match=false;l=0;}else{l=g.match_siIndex;}}while(l<h){e=(l<3);if(e&&!g.numeric){l+=1;continue;}j=D[l];d=i[j];if(d&&d.length>0){k=i._matches[j];if(!k){k=[];k.matches=[];if(e){k.phoneno=true;}i._matches[j]=k;}if(M(f,g,m,d,k,l,false)){g.match_siIndex=l;return true;}}l+=1;}g.match_siIndex=-1;return false;}F.prototype.filterContact=function(k){delete k.matches;if(this.filterItems.length===0){return false;}if(this.init_temp_data){k._matches={};}var e,d;d=this.filterItems.length;e=0;while(e<d){if(!B(this,k,this.filterItems[e],e)){if(e>0){e-=1;continue;}else{if(this.del_temp_data){delete k._matches;}return false;}}e+=1;}k.matches={};var o,j,l,m;var n,g,Y,f,h;j=D.length;o=0;while(o<j){l=D[o];m=k._matches[l];if(m&&m.length>0){for(e=0,d=m.length;e<d;e++){n=m[e];if((Y=n.match_idx)!==-1){g=this.filterItems[n.index];h=n.matches[Y];f={};f.term=g.value;f.startIndex=h.start;f.endIndex=h.end;if(!k.matches[l]){k.matches[l]=[];}k.matches[l].push(f);n.match_idx=-1;}else{if((Y=n.fuzzy_match_idx)!==-1){g=this.filterItems[n.index];h=n.fuzzy_matches[Y];f={};f.term=g.value;f.startIndex=h.start;f.endIndex=h.end;f.diff=h.diff;if(!k.matches[l]){k.matches[l]=[];}k.matches[l].push(f);n.fuzzy_match_idx=-1;}}}if(!this.del_temp_data){m.matches=[];}}o+=1;}if(this.del_temp_data){delete k._matches;}for(e=0,d=this.filterItems.length;e<d;e++){this.filterItems[e].match_siIndex=-1;}return true;};F.prototype.setConfigValues=function(e,Y,d){this.matchType=e;this.init_temp_data=C.Lang.isBoolean(Y)?Y:true;this.del_temp_data=C.Lang.isBoolean(d)?d:true;};F.prototype.filterContacts=function(h){var f,g,Y,e=true,j=[];if(this.filterItems.length===0){}else{this.setConfigValues(1,true,!e);for(var d in h){if(typeof h[d].email!="undefined"){if(this.filterContact(h[d])){j.push(h[d]);}}}}return j;};F.prototype.buildContactsIndex=function(){S();};function b(e,Y){var d,f;for(d=0,f=e.filterItems.length;d<f;d++){if(e.filterItems[d].match_siIndex!==-1){return false;}}return true;}function L(h){var f,e,d,g;var k,Y,l,m;if(!h._matches){return true;}for(f=0,g=D.length;f<g;f++){k=D[f];Y=h[k];if(Y&&Y.length>0){l=h._matches[k];if(l){if(l.matches.length>0){return false;}for(e=0,d=l.length;e<d;e++){m=l[e];if(m.match_idx!==-1){return false;}if(m.fuzzy_match_idx!==-1){return false;}}}}}return true;}F._test={validateFilterItems:b,validateTempMatchData:L};C.namespace("comms").FilterContacts=F;},"1.0.0",{requires:["contacts-api-utils","contacts-api"]});