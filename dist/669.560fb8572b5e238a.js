"use strict";(self.webpackChunkModernize=self.webpackChunkModernize||[]).push([[669],{3669:(ne,C,h)=>{h.d(C,{A0:()=>ie});var _=h(2223),b=(h(6406),h(3101),h(4755));RegExp(/[&<>"']/g.source);const X=new _.OlP("ng-select-selection-model");function ee(){return new te}class te{constructor(){this._selected=[]}get value(){return this._selected}select(t,e,i){if(t.selected=!0,(!t.children||!e&&i)&&this._selected.push(t),e)if(t.parent){const s=t.parent.children.length,l=t.parent.children.filter(o=>o.selected).length;t.parent.selected=s===l}else t.children&&(this._setChildrenSelectedState(t.children,!0),this._removeChildren(t),this._selected=i&&this._activeChildren(t)?[...this._selected.filter(s=>s.parent!==t),t]:[...this._selected,...t.children.filter(s=>!s.disabled)])}unselect(t,e){if(this._selected=this._selected.filter(i=>i!==t),t.selected=!1,e)if(t.parent&&t.parent.selected){const i=t.parent.children;this._removeParent(t.parent),this._removeChildren(t.parent),this._selected.push(...i.filter(s=>s!==t&&!s.disabled)),t.parent.selected=!1}else t.children&&(this._setChildrenSelectedState(t.children,!1),this._removeChildren(t))}clear(t){this._selected=t?this._selected.filter(e=>e.disabled):[]}_setChildrenSelectedState(t,e){for(const i of t)i.disabled||(i.selected=e)}_removeChildren(t){this._selected=[...this._selected.filter(e=>e.parent!==t),...t.children.filter(e=>e.parent===t&&e.disabled&&e.selected)]}_removeParent(t){this._selected=this._selected.filter(e=>e!==t)}_activeChildren(t){return t.children.every(e=>!e.disabled||e.selected)}}let ie=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=_.oAB({type:n}),n.\u0275inj=_.cJS({providers:[{provide:X,useValue:ee}],imports:[b.ez]}),n})()}}]);