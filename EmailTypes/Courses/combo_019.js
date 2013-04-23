YUI.add("common-ui-listview-ext",function(E){var c=E.Node,V=E.one,G=E.Lang,M=E.Array,J=c.getDOMNode,b=E.Object,N="#",F="list",d="requestSize",L="pageSize",S="page",A="pageCount",Z="loading",K=".",X="setrange",I="selected",B="input",P="remove",W="display",a="update",U="renderComplete",R="getElementsByTagName",D="KEY",e="reverse",H="click",Q=5,O="focused",C="tabIndex",T="height";E.mix(E.common.ui.ListView.prototype,{_selectRange:function(j,k,Y){if(!j){return;}var m=this,l=m._getIndex,g=l(j),h,f;if(Y){h=l(Y);f=g<=h?-1:1;while(h!=g+f){m._selectByIndex(h,k,0,1,0,1);h+=f;}}m.set("selectionCount",m.selCount());},_updateItem:function(l,m){var o=this,p=m?o.stop()-1:l,q=o._model.valueAt(p),f=V(N+o._id(l)),k=o.get("activeItem"),n=(o.get(O)&&k),Y=(f==o._lastSel),j=(f==o._lastSS),h,g;if(q){o.fire("beforeItemUpdate");g=c.create(o._renderItem(q,p,o._sel[p],o._id(p)));if(m){if(n||Y){h=f.next(K+o.ITEM_CLASS_NAME)||g;}f.remove();g&&o._srcNode.append(g);}else{f&&f.replace(g);if((n||Y)&&k!==null&&o._getIndex(k)==l){h=g;}}o.fire("itemUpdate");if(h){o._focusItem(h);}if(Y){o._lastSel=h;}if(j){o._lastSS=g;}if((l==o.start())&&!k){g&&g.set(C,0);o._focusItem(g,1);}}},_listchange:function(q){var n=this,j,s,t,h=n._sel,o,g,m={},f,r,l,k,u,Y,p=n.checkmode;switch(q.subtype){case X:if(n.start()==q.start){b.size(n._ss)&&(n._sel=n._model.indexesOf(n._ss));n._sync();n._lastSS=0;b.some(n._sel,function(w,v){n._lastSel=n.getItemEl(v);return 1;});n._ss=0;}break;case a:n._updateItem(q.index);break;case e:u=b.keys(h);r=u.length;o=n._model.get("length");if(r==1){l=u[0];Y=(l==(o-l))?l:o-l-1;n.set(S,Math.floor(Y*1/n.get(L)));m[Y]=h[u[0]];}else{n.set(S,0);}n._clearSelect(1);n._sel=m;s=1;n.checkmode=p;break;case P:n._clearSelect(1);if(q.list&&q.list.length&&(t=n.getItemEl(q.list[0]))){n._set("activeItem",t);n._select(t,1);}if(!(n.get("isActive"))){n._set("activeItem",null);}f=n.get(A);if(n.get(S)>=f){n.set(S,f-1);}s=1;break;default:s=1;break;}s&&n._sync();},_sync:function(Y){var g=this;if(g.tmSync){g.tmSync.cancel();}g._tmSync=G.later(0,g,f);function f(){var t=this,q,y,u=t._model.get(F),j=t.start(),w=t.stop(),n=Y,o=t._srcNode,v,s=t._statusNode,h=t._maxLength,m=t._sel,p=t.get("activeItem"),k,r,x=[],l=[];if(t._r){t.fire("beforeRender");t.set("showFocus",false);if((p=t.get("activeItem"))){r=p.get("id");}for(q=j;q<w;q++){y=u[q];if(y){l.push(u[q]);x.push(t._renderItem(y,q,m[q],t._id(q)));}else{n=1;}}if(n){t._model.request(j,t.get(d));o.setStyle(T,Math.max(500,h)+"px");}else{s&&s.setStyle(W,"none");o.setContent(x.join(""));o.setStyle(T,"auto");}t._maxLength=Math.max(h,o.get("offsetHeight"));if(t.get(O)){if((k=E.one(document.activeElement))&&k.hasClass("col-hd")){t.set("activeItem",null);}else{v=t._parentNode;p=r?v.one(N+r):v.one(K+t.ITEM_CLASS_NAME+K+I)||v.one(K+t.ITEM_CLASS_NAME);if(p){t._focusItem(p);}else{t.setAttrs({activeItem:null,focused:false});}}}if(!n){if(this.selCount()){if(t._lastSel){q=t._getIndex(t._lastSel);}else{for(q in m){break;}}t._lastSS=t._lastSel=t.getItemEl(q);}t._prefetch();t.fire("listview:prefetchMessage",{msgsList:l});t.fire(U);}}}},_setStatus:function(f){var i=this,Y=i._statusNode,h=false,g="";f=f||"";h=f.hideLoader||false;g=f.tmpl||f;if(!Y&&i._parentNode){Y=E.Node.create('<div role="'+i.STATUS_ROLE+'" tabindex="-1" class="'+i.STATUS_CLASS_NAME+'" style="display:none;text-align:center;padding-top:10px;padding-bottom:100px;"></div>');Y.setStyles({"position":"absolute","width":"100%","height":"auto","top":"30px","left":"-1px","margin":0,"zIndex":10000,"overflow":"visible"});i._statusNode=Y;i._parentNode.append(Y);i._maxLength=Math.max(500,i._srcNode.get("offsetHeight"));}if(Y){if(h){Y.removeClass(Z);}else{Y.addClass(Z);}i._status=g||"";if(g&&i.get("focused")){Y.focus();}Y.setContent(i._status);Y.setStyle("display","");i._srcNode.setContent("");i._srcNode.setStyle(T,i._maxLength+"px");}},_prefetch:function(){var g=this,Y=g._model.get(F),f=g.stop();if((f<Y.length)&&!Y[f+Q]){g._model.request(f,g.get(d));}},_setSelection:function(i){var j=this,f,g=j._model.get(F),h={};j._clearSelect();i=i?(G.isObject(i)?b.keys(i):(G.isArray(i)?i:[i])):[];function Y(){g=j._model.get(F);M.each(i,function(k){h[k]=g[k]||1;f=k;});j._sel=h;}Y();if(f){if(!g[f]){j.once(U,Y,j);}j.set("page",Math.floor(f/j.get(L)),{noupdate:1});}j._sync();},_blur:function(Y){return;},_moveToItem:function(f,g){var i=this,h=true,Y={188:1,190:1};if(f){i._focusItem(f);if(!(g.metaKey||g.ctrlKey)||(g.ctrlKey&&Y[g.keyCode])){if(g.shiftKey&&i._lastSel){i._select(i._lastSel,0,f,1);}else{i._clearSelect();}i._lastSel=f;i._select(f,1,i._lastSS,g.shiftKey);if((i.selCount()==1)||(!g.shiftKey)){i._lastSS=f;}h=false;}i.set("showFocus",h);}g.halt();},_keydown:function(k){var j=this,h=j.get("activeItem"),l,f,m=K+j.ITEM_CLASS_NAME,Y,g=j._getListItem(k,1),i=g?g.hasClass(I):0;if(!h){h=j._lastSel||j.getItemEl(j.start());j._set("activeItem",h);}switch(k.keyCode){case 38:case 40:if(k.altKey){l=j.getItemEl(k.keyCode==38?j.start():(j.stop()-1));}else{if(h){l=j.selCount()?h[(k.keyCode==38?"previous":"next")](m):h;if(k.keyCode==38&&!j.selCount()){f=l;l=l["previous"](m);if(!l){l=f;}}if(!k.shiftKey&&!(k.metaKey||k.ctrlKey)&&j._lastSel&&(j._lastSel!=h)){l=h;}}}if(l){if(!k.shiftKey&&!(k.metaKey||k.ctrlKey)&&j.selCount()){j._clearSelect();}j._moveToItem(l,k);}break;case 32:if(k.metaKey||k.ctrlKey||k.altKey){return;}if(!j._checkbox(k)){if(k.shiftKey){j._selectRange(j._lastSS,!j._sel[j._getIndex(h)],g);}else{if(i&&!j.checkmode){Y=1;}else{Y=!i;}j._select(g,Y,0,1);j._lastSel=j._lastSS=Y?g:0;}if(!j._isTextField(k)){k.halt();}}break;case 13:if(j.selCount()==1){j.fire("command",{e:k,item:j._model.valueAt(j._getIndex(h))});}break;case 188:if(k.ctrlKey&&h){l=j.selCount()?h["previous"](m):h;j._moveToItem(l,k);}break;case 190:if(k.ctrlKey&&h){l=j.selCount()?h["next"](m):h;j._moveToItem(l,k);}break;}},_isCheckboxBorder:function(k){var j=k.target,i,h=0,f=0,g,Y;if(j.hasClass("list-view-item")){if(!NeoConfig.hoverPreview){Y=j.one("div.info");if(Y){h=Y.get("offsetWidth");}}g=j.one("input");if(g){f=g.get("offsetWidth");
}i=j.getX()||0;return((k.clientX>i)&&(k.clientX<i+f+h));}},getPageIndex:function(i){var k=this,h=k.get("page"),Y=k.get("pageSize"),g=k._getListItem(i,1),f=k._getIndex(g),j=f-(h*Y);return j;}},1);E.mix(E.common.ui.ListModel.prototype,{setRange:function(k,f){var j=this,g=f.length,f=f||[],h=j.get(F),Y=h.length;if(j._refresh){h=[];h.length=Y;j._refresh=0;}while(g--){h[k+g]=f[g];}j.set(F,h,{subtype:X,start:k});},update:function(Y,f){var g=this.get(F);g[Y]=f;this.set(F,g,{subtype:a,index:Y});},remove:function(f){var j=this,Y=G.isObject(f)?b.keys(f):M(f).sort(M.numericSort),g=Y.length,h=j.get(F);Y=M(Y).sort(M.numericSort);while(g--){h.splice(Y[g],1);}j.set(F,h,{subtype:P,list:Y});},reverse:function(){var f=this,Y=f.get(F);Y.reverse();f.set(F,Y,{subtype:e});},indexesOf:function(m,f){var g,j=this,o,n=j.get(D),l=j.get(F),Y={},k={},h=l.length;m=G.isArray(m)?m:[m];M.each(m,function(i){Y[i[n]]=i;});for(g=0;g<h;g++){o=l[g];if(o=l[g]&&Y[o[n]]){k[g]=o;}}f&&f(k);return k;}},1);},"1.0.0",{requires:["common-ui-listview"]});