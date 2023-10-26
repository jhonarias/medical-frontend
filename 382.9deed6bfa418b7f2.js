"use strict";(self.webpackChunkfrontend_practice=self.webpackChunkfrontend_practice||[]).push([[382],{5795:(K,g,a)=>{a.r(g),a.d(g,{AnswersContainerModule:()=>z});var c=a(6814),o=a(95),u=a(228),p=a(7944),l=(()=>((l=l||{}).ACTIVE="Active",l.INACTIVE="Inactive",l))(),e=a(4946),b=a(9126),d=a(1594),I=a(9862);let m=(()=>{class n extends b.Y{constructor(t){super(t),this.httpClient=t}retrieveAnswers(){return this.get(d.N.apiURLAnswer,"")}getAnswerById(t){return this.get(d.N.apiURLAnswer,t)}updateAnswer(t){return this.put(d.N.apiURLAnswer+"/"+t._id,"",t)}createAnswers(t){return this.post(d.N.apiURLAnswer,"",t)}deleteAnswer(t){return this.delete(d.N.apiURLAnswer+"/"+t,"")}}return n.\u0275fac=function(t){return new(t||n)(e.LFG(I.eN))},n.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac}),n})();function q(n,s){1&n&&(e.TgZ(0,"p",11),e._uU(1,"Ingresa la descripci\xf3n"),e.qZA())}function Z(n,s){if(1&n&&(e.ynx(0),e.TgZ(1,"option",12),e._uU(2),e.qZA(),e.BQk()),2&n){const t=s.$implicit;e.xp6(1),e.Q6J("value",t),e.xp6(1),e.Oqu(t)}}let w=(()=>{class n{constructor(){this.form=new o.cw({}),this.statusList=[],this.index=0}ngOnInit(){}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["answer-create-form"]],inputs:{form:"form",statusList:"statusList",index:"index"},decls:16,vars:5,consts:[[1,"row",3,"formGroup"],[1,"col-12","mb-3"],["for","description",1,"form-label"],["type","text","id","description","formControlName","description","placeholder","Descripci\xf3n",1,"form-control"],["class","text-danger",4,"ngIf"],[1,"form-check"],["type","checkbox","formControlName","isCorrect",1,"form-check-input",3,"id"],[1,"form-check-label",3,"for"],["for","status",1,"form-label"],["id","status","autocomplete","status","placeholder","status","formControlName","status",1,"form-control"],[4,"ngFor","ngForOf"],[1,"text-danger"],[3,"value"]],template:function(t,r){if(1&t&&(e.TgZ(0,"form",0)(1,"div",1)(2,"label",2),e._uU(3,"Descripci\xf3n"),e.qZA(),e._UZ(4,"textarea",3),e.YNc(5,q,2,0,"p",4),e.qZA(),e.TgZ(6,"div",1)(7,"div",5),e._UZ(8,"input",6),e.TgZ(9,"label",7),e._uU(10,"Marcar como correcta"),e.qZA()()(),e.TgZ(11,"div",1)(12,"label",8),e._uU(13,"Estado"),e.qZA(),e.TgZ(14,"select",9),e.YNc(15,Z,3,2,"ng-container",10),e.qZA()()()),2&t){let i;e.Q6J("formGroup",r.form),e.xp6(5),e.Q6J("ngIf",(null==(i=r.form.get("description"))?null:i.invalid)&&((null==(i=r.form.get("description"))?null:i.dirty)||(null==(i=r.form.get("description"))?null:i.touched))),e.xp6(3),e.Q6J("id","isCorrect"+r.index),e.xp6(1),e.Q6J("for","isCorrect"+r.index),e.xp6(6),e.Q6J("ngForOf",r.statusList)}},dependencies:[c.sg,c.O5,o._Y,o.YN,o.Kr,o.Fj,o.Wl,o.EJ,o.JJ,o.JL,o.sg,o.u],encapsulation:2}),n})();function T(n,s){if(1&n&&(e.ynx(0),e.TgZ(1,"h1"),e._uU(2),e.qZA(),e.BQk()),2&n){const t=e.oxw();e.xp6(2),e.hij("Crear respuesta de la pregunta ",t.questionId,"")}}function y(n,s){1&n&&(e.TgZ(0,"h1"),e._uU(1,"Crear respuesta"),e.qZA())}function L(n,s){1&n&&(e.ynx(0),e.TgZ(1,"div",3)(2,"div",4)(3,"span",5),e._uU(4,"Loading..."),e.qZA()()(),e.BQk())}function N(n,s){if(1&n){const t=e.EpF();e.ynx(0),e._UZ(1,"answer-create-form",12),e.TgZ(2,"div",13)(3,"button",14),e.NdJ("click",function(){const f=e.CHM(t).index,D=e.oxw(2);return e.KtG(D.deleteForm(f))}),e._uU(4,"Eliminar"),e.qZA()(),e.BQk()}if(2&n){const t=s.$implicit,r=s.index,i=e.oxw(2);e.xp6(1),e.Q6J("form",t)("statusList",i.statusList)("index",r)}}function F(n,s){if(1&n){const t=e.EpF();e.ynx(0),e.YNc(1,N,5,3,"ng-container",6),e.TgZ(2,"div",7)(3,"div",8)(4,"button",9),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.addForm())}),e._uU(5,"Agregar respuesta"),e.qZA()(),e.TgZ(6,"button",10),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.validate())}),e.TgZ(7,"span",11),e._uU(8," Guardar "),e.qZA()()(),e.BQk()}if(2&n){const t=e.oxw();e.xp6(1),e.Q6J("ngForOf",t.forms.controls),e.xp6(5),e.Q6J("disabled",t.isLoading?"disabled":null)}}let h=(()=>{class n{constructor(t,r,i){this.answerHttpService=t,this.route=r,this.router=i,this.questionId="",this.forms=new o.Oe([]),this.statusList=[],this.isLoading=!1}ngOnInit(){this.internalInit()}addForm(){const t=new o.cw({description:new o.NI("",[o.kI.required]),isCorrect:new o.NI(!1,[o.kI.required]),status:new o.NI(l.ACTIVE,[o.kI.required])});this.forms.push(t)}deleteForm(t){this.forms.controls.splice(t,1)}validate(){this.forms.valid?this.register():alert("form invalid")}internalInit(){this.subscribeToParams(),this.setStatusList(),this.addForm()}subscribeToParams(){this.route.queryParams.subscribe(t=>{this.questionId=t.questionId})}setStatusList(){this.statusList=[],Object.values(l).forEach(t=>{this.statusList.push(t)})}buildRequest(){return this.forms.value.map(r=>({...r,question:this.questionId}))}register(){this.isLoading=!0;const t=this.buildRequest();console.log(t),this.answerHttpService.createAnswers(t).subscribe({next:r=>{this.handleRegisterSuccess(r)},error:r=>{console.error(r),this.isLoading=!1}})}handleRegisterSuccess(t){this.forms.reset(),this.router.navigate(this.questionId?["/questions/question-show/"+this.questionId]:["/answers"])}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(m),e.Y36(u.gz),e.Y36(u.F0))},n.\u0275cmp=e.Xpm({type:n,selectors:[["answers-create-container"]],decls:5,vars:4,consts:[[4,"ngIf","ngIfElse"],["noQuestionId",""],[4,"ngIf"],[1,"d-flex","justify-content-center","mb-5"],["role","status",1,"spinner-border"],[1,"visually-hidden"],[4,"ngFor","ngForOf"],[1,"text-center"],[1,"mb-3"],[1,"btn","btn-warning",3,"click"],[1,"btn","btn-success",3,"disabled","click"],[1,"button_label"],[3,"form","statusList","index"],[1,"mb-3","text-end"],[1,"btn","btn-danger",3,"click"]],template:function(t,r){if(1&t&&(e.YNc(0,T,3,1,"ng-container",0),e.YNc(1,y,2,0,"ng-template",null,1,e.W1O),e.YNc(3,L,5,0,"ng-container",2),e.YNc(4,F,9,2,"ng-container",2)),2&t){const i=e.MAs(2);e.Q6J("ngIf",r.questionId)("ngIfElse",i),e.xp6(3),e.Q6J("ngIf",r.isLoading),e.xp6(1),e.Q6J("ngIf",r.forms&&r.forms.controls.length)}},dependencies:[c.sg,c.O5,w],encapsulation:2}),n})();var _=a(4722);let C=(()=>{class n{constructor(t){this.route=t,this.questionId=""}ngOnInit(){this.internalInit()}internalInit(){this.subscribeToParams()}subscribeToParams(){this.route.params.subscribe(t=>{this.questionId=t.questionId})}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(u.gz))},n.\u0275cmp=e.Xpm({type:n,selectors:[["answers-container"]],decls:1,vars:0,template:function(t,r){1&t&&e._uU(0,"answers container")},encapsulation:2}),n})();function Q(n,s){1&n&&(e.ynx(0),e.TgZ(1,"div",2)(2,"div",3)(3,"span",4),e._uU(4,"Loading..."),e.qZA()()(),e.BQk())}const J=function(n){return{questionId:n}};function U(n,s){if(1&n&&(e.ynx(0),e.TgZ(1,"div",11),e._uU(2),e.qZA(),e.TgZ(3,"div",11)(4,"a",17),e._uU(5,"Crear respuestas"),e.qZA()(),e.BQk()),2&n){const t=e.oxw(3);e.xp6(2),e.hij(" Pregunta: ",t.answer.question.description," "),e.xp6(2),e.Q6J("routerLink","/answers/answers-create")("queryParams",e.VKq(3,J,t.answer.question._id))}}function k(n,s){if(1&n&&(e.ynx(0),e.TgZ(1,"h2"),e._uU(2,"Pregunta:"),e.qZA(),e.TgZ(3,"ol")(4,"li")(5,"p"),e._uU(6),e.qZA(),e.TgZ(7,"a",18),e._uU(8,"Ver m\xe1s"),e.qZA()()(),e.BQk()),2&n){const t=e.oxw(3);e.xp6(6),e.Oqu(t.answer.question.description),e.xp6(1),e.Q6J("routerLink","/questions/question-show/"+t.answer.question._id)}}function S(n,s){if(1&n){const t=e.EpF();e.ynx(0),e.TgZ(1,"div",6)(2,"div",7)(3,"div",8)(4,"div",9),e._UZ(5,"p",10),e.TgZ(6,"div",11)(7,"button",12),e.NdJ("click",function(){e.CHM(t);const i=e.oxw(2);return e.KtG(i.detete())}),e._uU(8,"Eliminar"),e.qZA()(),e.TgZ(9,"div",11)(10,"button",13),e.NdJ("click",function(){e.CHM(t);const i=e.oxw(2);return e.KtG(i.edit())}),e._uU(11,"Actualizar"),e.qZA()(),e.YNc(12,U,6,5,"ng-container",5),e.qZA(),e.TgZ(13,"div",14)(14,"small",15),e._uU(15),e.ALo(16,"date"),e.qZA(),e.TgZ(17,"small",15),e._uU(18),e.ALo(19,"date"),e.qZA()()()(),e.TgZ(20,"div",16),e.YNc(21,k,9,2,"ng-container",5),e.qZA()(),e.BQk()}if(2&n){const t=e.oxw(2);e.xp6(5),e.Q6J("innerHtml",t.answer.description,e.oJD),e.xp6(7),e.Q6J("ngIf",t.answer.question),e.xp6(3),e.hij("Creado el: ",e.xi3(16,5,t.answer.createdAt,"dd/MM/yyyy")," y "),e.xp6(3),e.hij("actualizado el: ",e.xi3(19,8,t.answer.updatedAt,"dd/MM/yyyy"),""),e.xp6(3),e.Q6J("ngIf",t.answer.question)}}function E(n,s){if(1&n&&e.YNc(0,S,22,11,"ng-container",5),2&n){const t=e.oxw();e.Q6J("ngIf",t.answer)}}let A=(()=>{class n{constructor(t,r,i){this.answerHttpService=t,this.router=r,this.route=i,this.answerId="",this.answer=void 0,this.isLoading=!0}ngOnInit(){this.internalInit()}detete(){window.confirm("\xbfEst\xe1s seguro de que la desea eliminar?")&&this.answerHttpService.deleteAnswer(this.answerId).subscribe({next:t=>{alert(t.data.description+" eliminado correctamente"),this.router.navigate(["/answers"])},error:t=>console.error(t)})}edit(){this.router.navigate(["/answers/answer-edit/"+this.answerId])}internalInit(){this.subscribeToParams()}subscribeToParams(){this.route.params.subscribe(t=>{this.answerId=t.id,this.getQuestionById()})}getQuestionById(){this.answerHttpService.getAnswerById(this.answerId).subscribe({next:t=>{this.answer=t.data,this.isLoading=!1},error:t=>{console.log(t),this.isLoading=!1}})}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(m),e.Y36(u.F0),e.Y36(u.gz))},n.\u0275cmp=e.Xpm({type:n,selectors:[["answer-show-container"]],decls:3,vars:2,consts:[[4,"ngIf","ngIfElse"],["content",""],[1,"d-flex","justify-content-center","mt-5"],["role","status",1,"spinner-border"],[1,"visually-hidden"],[4,"ngIf"],[1,"row"],[1,"col-12","col-sm-8"],[1,"card"],[1,"card-body"],[1,"card-text",3,"innerHtml"],[1,"mb-3"],[1,"btn","btn-danger",3,"click"],[1,"btn","btn-warning",3,"click"],[1,"card-footer"],[1,"text-body-secondary"],[1,"col-12","col-sm-4"],[1,"btn","btn-primary",3,"routerLink","queryParams"],[3,"routerLink"]],template:function(t,r){if(1&t&&(e.YNc(0,Q,5,0,"ng-container",0),e.YNc(1,E,1,1,"ng-template",null,1,e.W1O)),2&t){const i=e.MAs(2);e.Q6J("ngIf",r.isLoading)("ngIfElse",i)}},dependencies:[c.O5,u.rH,c.uU],encapsulation:2}),n})();var x=a(9949);function Y(n,s){1&n&&(e.ynx(0),e.TgZ(1,"div",2)(2,"div",3)(3,"span",4),e._uU(4,"Loading..."),e.qZA()()(),e.BQk())}function M(n,s){1&n&&(e.TgZ(0,"p",24),e._uU(1," Ingresa la descripci\xf3n"),e.qZA())}function O(n,s){if(1&n&&(e.ynx(0),e.TgZ(1,"option",25),e._uU(2),e.qZA(),e.BQk()),2&n){const t=s.$implicit;e.xp6(1),e.Q6J("value",t),e.xp6(1),e.Oqu(t)}}function B(n,s){1&n&&(e.TgZ(0,"p",24),e._uU(1,"Selecciona el estado"),e.qZA())}function H(n,s){if(1&n&&(e.ynx(0),e.TgZ(1,"option",25),e._uU(2),e.qZA(),e.BQk()),2&n){const t=s.$implicit;e.xp6(1),e.Q6J("value",t._id),e.xp6(1),e.Oqu(t.description)}}function R(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"form",6)(1,"div",7)(2,"label",8),e._uU(3,"Descripci\xf3n"),e.qZA(),e.TgZ(4,"textarea",9),e._uU(5,"            "),e.qZA(),e.YNc(6,M,2,0,"p",10),e.qZA(),e.TgZ(7,"div",7)(8,"label",11),e._uU(9,"Estado"),e.qZA(),e.TgZ(10,"select",12)(11,"option",13),e._uU(12,"Selectione el status porfavor"),e.qZA(),e.YNc(13,O,3,2,"ng-container",14),e.qZA(),e.YNc(14,B,2,0,"p",10),e.qZA(),e.TgZ(15,"div",7)(16,"div",15),e._UZ(17,"input",16),e.TgZ(18,"label",17),e._uU(19,"Marcar como correcta"),e.qZA()()(),e.TgZ(20,"div",18)(21,"label",19),e._uU(22,"Pregunta"),e.qZA(),e.TgZ(23,"select",20)(24,"option",13),e._uU(25,"Seleccionar pregunta"),e.qZA(),e.YNc(26,H,3,2,"ng-container",14),e.qZA()(),e.TgZ(27,"div",21)(28,"button",22),e.NdJ("click",function(){e.CHM(t);const i=e.oxw(2);return e.KtG(i.validate())}),e.TgZ(29,"span",23),e._uU(30," Actualizar "),e.qZA()()()()}if(2&n){const t=e.oxw(2);let r,i;e.Q6J("formGroup",t.form),e.xp6(6),e.Q6J("ngIf",(null==(r=t.form.get("description"))?null:r.invalid)&&((null==(r=t.form.get("description"))?null:r.dirty)||(null==(r=t.form.get("description"))?null:r.touched))),e.xp6(7),e.Q6J("ngForOf",t.statusList),e.xp6(1),e.Q6J("ngIf",(null==(i=t.form.get("status"))?null:i.invalid)&&((null==(i=t.form.get("status"))?null:i.dirty)||(null==(i=t.form.get("status"))?null:i.touched))),e.xp6(3),e.Q6J("id","isCorrect"),e.xp6(1),e.Q6J("for","isCorrect"),e.xp6(8),e.Q6J("ngForOf",t.questions),e.xp6(2),e.Q6J("disabled",t.isLoading?"disabled":null)}}function j(n,s){if(1&n&&e.YNc(0,R,31,8,"form",5),2&n){const t=e.oxw();e.Q6J("ngIf",null==t.form?null:t.form.get("description"))}}let v=(()=>{class n{constructor(t,r,i,f){this.questionHttpService=t,this.answerHttpService=r,this.route=i,this.location=f,this.form=new o.cw({}),this.statusList=[],this.answerId="",this.answer=void 0,this.questions=[],this.isLoading=!0}ngOnInit(){this.internalInit()}validate(){this.form.valid?this.register():alert("Formulario invalido o debe seleccionar un tema o un subtema")}internalInit(){this.setAnswerId()}setAnswerId(){this.route.params.subscribe(t=>{this.answerId=t.id,this.getAnswerById()})}getAnswerById(){this.answerHttpService.getAnswerById(this.answerId).subscribe({next:t=>{this.answer=t.data,this.buildForm(),this.setStatusList(),this.isLoading=!1,this.retrieveQuestions()},error:t=>{console.log(t),this.isLoading=!1}})}setStatusList(){this.statusList=[],Object.values(l).forEach(t=>{this.statusList.push(t)})}buildForm(){const t=this.answer.question;this.form=new o.cw({description:new o.NI(this.answer.description,[o.kI.required]),isCorrect:new o.NI(this.answer.isCorrect,[o.kI.required]),status:new o.NI(this.answer.status,[o.kI.required]),question:new o.NI(t?._id,[o.kI.required])})}retrieveQuestions(){this.isLoading=!0,this.questionHttpService.retrieveQuestions().subscribe({next:t=>{this.questions=t.data,this.isLoading=!1},error:t=>{console.error(t),this.isLoading=!1}})}buildRequest(){return{_id:this.answerId,...this.form.value}}register(){this.isLoading=!0;const t=this.buildRequest();this.answerHttpService.updateAnswer(t).subscribe({next:r=>{this.handleRegisterSuccess(r)},error:r=>{console.error("err",r),this.isLoading=!1}})}handleRegisterSuccess(t){this.location.back()}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(x.Q),e.Y36(m),e.Y36(u.gz),e.Y36(c.Ye))},n.\u0275cmp=e.Xpm({type:n,selectors:[["answer-edit-container"]],decls:5,vars:2,consts:[[4,"ngIf","ngIfElse"],["content",""],[1,"d-flex","justify-content-center","mt-5"],["role","status",1,"spinner-border"],[1,"visually-hidden"],["class","row",3,"formGroup",4,"ngIf"],[1,"row",3,"formGroup"],[1,"col-12","mb-3"],["for","description",1,"form-label"],["id","description","autocomplete","description","formControlName","description","placeholder","Descripci\xf3n","rows","3",1,"form-control"],["class","text-danger",4,"ngIf"],["for","status",1,"form-label"],["id","status","autocomplete","status","formControlName","status","placeholder","Estado",1,"form-control"],["value",""],[4,"ngFor","ngForOf"],[1,"form-check"],["type","checkbox","formControlName","isCorrect",1,"form-check-input",3,"id"],[1,"form-check-label",3,"for"],[1,"col-12","col-sm-6","mb-3"],["for","question",1,"form-label"],["id","question","autocomplete","question","formControlName","question","placeholder","Pregunta",1,"form-control"],[1,"col-12","text-center"],[1,"btn","btn-success",3,"disabled","click"],[1,"button_label"],[1,"text-danger"],[3,"value"]],template:function(t,r){if(1&t&&(e.TgZ(0,"h1"),e._uU(1,"Editar respuesta"),e.qZA(),e.YNc(2,Y,5,0,"ng-container",0),e.YNc(3,j,1,1,"ng-template",null,1,e.W1O)),2&t){const i=e.MAs(4);e.xp6(2),e.Q6J("ngIf",r.isLoading)("ngIfElse",i)}},dependencies:[c.sg,c.O5,o._Y,o.YN,o.Kr,o.Fj,o.Wl,o.EJ,o.JJ,o.JL,o.sg,o.u],encapsulation:2}),n})();const G=[{path:"",component:C,data:{roles:[p.F.ADMIN]},canActivate:[_.a]},{path:"answers-create",component:h,data:{roles:[p.F.ADMIN]},canActivate:[_.a]},{path:"answer-show/:id",component:A,data:{roles:[p.F.ADMIN]},canActivate:[_.a]},{path:"answer-edit/:id",component:v,data:{roles:[p.F.ADMIN]},canActivate:[_.a]}];let P=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[u.Bz.forChild(G),u.Bz]}),n})(),z=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({providers:[{provide:"components",useValue:[C,h,w,A,v],multi:!0},m,x.Q],imports:[c.ez,o.UX,P]}),n})()}}]);