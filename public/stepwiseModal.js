"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[943],{169:()=>{class t{constructor(t,e,s,i={}){this.stepName=t,this.assignedVisibleEntity=e,this.parent=s,this.options=i,this.links=new Map,this.prepareOptions()}prepareOptions(){this.options.onEnter=this.options.onEnter||(()=>{}),this.options.onLeave=this.options.onLeave||(()=>{}),this.options.onShow=this.options.onShow||(()=>{}),this.options.onHide=this.options.onHide||(()=>{})}enter(){this.options.onEnter(this,this.parent)}leave(){this.options.onLeave(this,this.parent)}show(){this.assignedVisibleEntity.show(),this.options.onShow(this,this.parent)}hide(){this.assignedVisibleEntity.hide(),this.options.onHide(this,this.parent)}next(t=null){for(let e of this.links.entries())if(e[1].rule(this,this.parent,t))return e[1].step}name(){return this.stepName}assignedVisible(){return this.assignedVisibleEntity}link(t,e,s=null){let i=s;i||(i=t.name()),this.links.set(i,{rule:e,step:t})}}window.Widgets=window.Widgets||{},window.Widgets.Modal=window.Widgets.Modal||{},window.Widgets.Modal.StepwiseModal=class{constructor(t,e={}){this.name=t,this.options=e,this.currentStep=null,this.steps=new Map,this.prepareOptions(),this.bindEvents()}prepareOptions(){void 0===this.options.useDataAttribute&&(this.options.useDataAttribute=!1)}bindEvents(){this.options.useDataAttribute&&document.body.addEventListener("click",(t=>{const e=t.target.closest(`[data-next-for="${this.name}"]`);if(!e)return;let s=null;e.hasAttribute("data-user-object")&&(s=e.getAttribute("data-user-object")),this.nextStep(s)}).bind(this))}createStep(e,s,i={}){let n=new t(e,s,this,i);return this.steps.set(e,n),this.currentStep||this.setCurrentStep(e),n}nextStep(t=null){this.currentStep&&(this.currentStep.leave(),this.currentStep.hide(),this.currentStep=this.currentStep.next(t),this.currentStep&&(this.currentStep.enter(),this.currentStep.show()))}setCurrentStep(t){for(let e of this.steps.entries())return e[0]===t&&(this.currentStep=e[1],this.currentStep.enter()),!0;return!1}show(){this.currentStep&&this.currentStep.assignedVisible().show()}hide(){this.currentStep&&this.currentStep.assignedVisible().hide()}}}},t=>{t(t.s=169)}]);