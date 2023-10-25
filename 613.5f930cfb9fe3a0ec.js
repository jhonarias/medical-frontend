"use strict";(self.webpackChunkfrontend_practice=self.webpackChunkfrontend_practice||[]).push([[613],{7613:(x,g,s)=>{s.r(g),s.d(g,{AuthenticationContainerModule:()=>k});var c=s(6814),d=s(228),u=(()=>((u=u||{}).LOGIN="login",u.REGISTER="register",u))(),e=s(4946),r=s(95),Z=s(9126),h=s(1594),A=s(9862);let v=(()=>{class t extends Z.Y{constructor(n){super(n),this.httpClient=n}register(n){return this.post(h.N.apiURLAuthentication,"register",n)}login(n){return this.post(h.N.apiURLAuthentication,"login",n)}}return t.\u0275fac=function(n){return new(n||t)(e.LFG(A.eN))},t.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac}),t})(),f=(()=>{class t{constructor(n){this.httpService=n}register(n){return this.httpService.register(n)}login(n){return this.httpService.login(n)}}return t.\u0275fac=function(n){return new(n||t)(e.LFG(v))},t.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac}),t})();var _=s(2373),b=s(5409);function T(t,i){1&t&&(e.ynx(0),e.TgZ(1,"div",12)(2,"div",13)(3,"span",14),e._uU(4,"Loading..."),e.qZA()()(),e.BQk())}function F(t,i){1&t&&(e.TgZ(0,"p",15),e._uU(1,"Ingresa el correo"),e.qZA())}function I(t,i){1&t&&(e.TgZ(0,"p",15),e._uU(1,"Ingresa la contrase\xf1a"),e.qZA())}let y=(()=>{class t{constructor(n,o,a,l){this.authenticationService=n,this.authenticationStorageService=o,this.authenticatedService=a,this.router=l,this.form=new r.cw({}),this.isLoading=!1,this.setupEvents()}ngOnInit(){this.internalInit()}setupEvents(){this.authenticatedService.isAuthenticated$.subscribe(n=>{n&&this.router.navigate(["/home"])})}internalInit(){this.buildForm()}buildForm(){this.form=new r.cw({email:new r.NI("",[r.kI.required]),password:new r.NI("",[r.kI.required])})}validate(){this.form.valid?this.login():alert("Ingresa los datos")}buildRequest(){return{...this.form.value}}handleLoginSuccess(n){this.form.reset(),this.authenticationStorageService.setAuthenticationTokenData({...n}),this.authenticatedService.isAuthenticated.next(!0),this.isLoading=!1}login(){const n=this.buildRequest();this.isLoading=!0,this.authenticationService.login(n).subscribe({next:o=>{this.handleLoginSuccess(o)},error:o=>{alert("Datos incorrectos"),console.log("err",o),this.isLoading=!1}})}}return t.\u0275fac=function(n){return new(n||t)(e.Y36(f),e.Y36(_.y),e.Y36(b.c),e.Y36(d.F0))},t.\u0275cmp=e.Xpm({type:t,selectors:[["login-form"]],decls:19,vars:5,consts:[[1,"login-form_container"],[4,"ngIf"],[1,"row",3,"formGroup"],[1,"col-12","col-sm-6","mb-3"],["for","email",1,"form-label"],["type","email","id","email","autocomplete","email","formControlName","email","placeholder","nombre@ejemplo.com",1,"form-control"],["class","text-danger",4,"ngIf"],["for","password",1,"form-label"],["type","password","id","password","autocomplete","current-password","formControlName","password","placeholder","******",1,"form-control"],[1,"col-12","text-center"],[1,"btn","btn-success",3,"disabled","click"],[1,"button_label"],[1,"d-flex","justify-content-center","mb-5"],["role","status",1,"spinner-border"],[1,"visually-hidden"],[1,"text-danger"]],template:function(n,o){if(1&n&&(e.TgZ(0,"h1"),e._uU(1,"Login"),e.qZA(),e.TgZ(2,"div",0),e.YNc(3,T,5,0,"ng-container",1),e.TgZ(4,"form",2)(5,"div",3)(6,"label",4),e._uU(7,"Correo"),e.qZA(),e._UZ(8,"input",5),e.YNc(9,F,2,0,"p",6),e.qZA(),e.TgZ(10,"div",3)(11,"label",7),e._uU(12,"Contrase\xf1a"),e.qZA(),e._UZ(13,"input",8),e.YNc(14,I,2,0,"p",6),e.qZA(),e.TgZ(15,"div",9)(16,"button",10),e.NdJ("click",function(){return o.validate()}),e.TgZ(17,"span",11),e._uU(18," Login "),e.qZA()()()()()),2&n){let a,l;e.xp6(3),e.Q6J("ngIf",o.isLoading),e.xp6(1),e.Q6J("formGroup",o.form),e.xp6(5),e.Q6J("ngIf",(null==(a=o.form.get("email"))?null:a.invalid)&&((null==(a=o.form.get("email"))?null:a.dirty)||(null==(a=o.form.get("email"))?null:a.touched))),e.xp6(5),e.Q6J("ngIf",(null==(l=o.form.get("password"))?null:l.invalid)&&((null==(l=o.form.get("password"))?null:l.dirty)||(null==(l=o.form.get("password"))?null:l.touched))),e.xp6(2),e.Q6J("disabled",o.isLoading?"disabled":null)}},dependencies:[c.O5,r._Y,r.Fj,r.JJ,r.JL,r.sg,r.u],encapsulation:2}),t})();var w=s(7944);function S(t,i){1&t&&(e.TgZ(0,"p",14),e._uU(1,"Ingresa el nombre"),e.qZA())}function N(t,i){1&t&&(e.TgZ(0,"p",14),e._uU(1,"Ingresa el nombre de usuario"),e.qZA())}function U(t,i){1&t&&(e.TgZ(0,"p",14),e._uU(1,"Ingresa el correo"),e.qZA())}function L(t,i){1&t&&(e.TgZ(0,"p",14),e._uU(1,"Ingresa la contrase\xf1a"),e.qZA())}let R=(()=>{class t{constructor(n,o){this.authenticationService=n,this.router=o,this.form=new r.cw({})}ngOnInit(){this.internalInit()}validate(){this.form.valid?this.register():alert("Llena los datos")}internalInit(){this.buildForm()}buildForm(){this.form=new r.cw({name:new r.NI("",[r.kI.required]),username:new r.NI("",[r.kI.required]),email:new r.NI("",[r.kI.required]),password:new r.NI("",[r.kI.required])})}buildRequest(){return{...this.form.value,role:w.F.USER}}handleRegisterSuccess(n){this.form.reset(),this.router.navigate(["/login"]),console.log("response",n)}register(){const n=this.buildRequest();this.authenticationService.register(n).subscribe({next:o=>{this.handleRegisterSuccess(o)},error:o=>{console.log("err",o)}})}}return t.\u0275fac=function(n){return new(n||t)(e.Y36(f),e.Y36(d.F0))},t.\u0275cmp=e.Xpm({type:t,selectors:[["register-form"]],decls:27,vars:5,consts:[[1,"row",3,"formGroup"],[1,"col-12","col-sm-6","mb-3"],["for","name",1,"form-label"],["type","name","id","name","formControlName","name","placeholder","Nombre",1,"form-control"],["class","text-danger",4,"ngIf"],["for","username",1,"form-label"],["type","username","id","username","autocomplete","username","formControlName","username","placeholder","JohnArias",1,"form-control"],["for","email",1,"form-label"],["type","email","id","email","autocomplete","email","formControlName","email","placeholder","nombre@ejemplo.com",1,"form-control"],["for","password",1,"form-label"],["type","password","id","password","autocomplete","current-password","formControlName","password","placeholder","******",1,"form-control"],[1,"col-12","text-center"],[1,"btn","btn-success",3,"click"],[1,"button_label"],[1,"text-danger"]],template:function(n,o){if(1&n&&(e.TgZ(0,"h1"),e._uU(1,"Registrar"),e.qZA(),e.TgZ(2,"form",0)(3,"div",1)(4,"label",2),e._uU(5,"Nombre"),e.qZA(),e._UZ(6,"input",3),e.YNc(7,S,2,0,"p",4),e.qZA(),e.TgZ(8,"div",1)(9,"label",5),e._uU(10,"Nombre usuario"),e.qZA(),e._UZ(11,"input",6),e.YNc(12,N,2,0,"p",4),e.qZA(),e.TgZ(13,"div",1)(14,"label",7),e._uU(15,"Correo"),e.qZA(),e._UZ(16,"input",8),e.YNc(17,U,2,0,"p",4),e.qZA(),e.TgZ(18,"div",1)(19,"label",9),e._uU(20,"Contrase\xf1a"),e.qZA(),e._UZ(21,"input",10),e.YNc(22,L,2,0,"p",4),e.qZA(),e.TgZ(23,"div",11)(24,"button",12),e.NdJ("click",function(){return o.validate()}),e.TgZ(25,"span",13),e._uU(26," Registrar "),e.qZA()()()()),2&n){let a,l,m,p;e.xp6(2),e.Q6J("formGroup",o.form),e.xp6(5),e.Q6J("ngIf",(null==(a=o.form.get("name"))?null:a.invalid)&&((null==(a=o.form.get("name"))?null:a.dirty)||(null==(a=o.form.get("name"))?null:a.touched))),e.xp6(5),e.Q6J("ngIf",(null==(l=o.form.get("username"))?null:l.invalid)&&((null==(l=o.form.get("username"))?null:l.dirty)||(null==(l=o.form.get("username"))?null:l.touched))),e.xp6(5),e.Q6J("ngIf",(null==(m=o.form.get("email"))?null:m.invalid)&&((null==(m=o.form.get("email"))?null:m.dirty)||(null==(m=o.form.get("email"))?null:m.touched))),e.xp6(5),e.Q6J("ngIf",(null==(p=o.form.get("password"))?null:p.invalid)&&((null==(p=o.form.get("password"))?null:p.dirty)||(null==(p=o.form.get("password"))?null:p.touched)))}},dependencies:[c.O5,r._Y,r.Fj,r.JJ,r.JL,r.sg,r.u],encapsulation:2}),t})();function q(t,i){1&t&&(e.ynx(0),e._UZ(1,"login-form"),e.BQk())}function J(t,i){1&t&&(e.ynx(0),e._UZ(1,"register-form"),e.BQk())}let C=(()=>{class t{constructor(n){this.router=n,this.formTypeEnum=u,this.formType=u.REGISTER}ngOnInit(){this.internalInit()}internalInit(){this.formType=this.router.url.split("/").pop()}}return t.\u0275fac=function(n){return new(n||t)(e.Y36(d.F0))},t.\u0275cmp=e.Xpm({type:t,selectors:[["authentication-container"]],decls:3,vars:2,consts:[[3,"ngSwitch"],[4,"ngSwitchCase"],[4,"ngSwitchDefault"]],template:function(n,o){1&n&&(e.ynx(0,0),e.YNc(1,q,2,0,"ng-container",1),e.YNc(2,J,2,0,"ng-container",2),e.BQk()),2&n&&(e.Q6J("ngSwitch",o.formType),e.xp6(1),e.Q6J("ngSwitchCase",o.formTypeEnum.LOGIN))},dependencies:[c.RF,c.n9,c.ED,y,R],encapsulation:2}),t})();const Y=[{path:"",component:C}];let Q=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[d.Bz.forChild(Y),d.Bz]}),t})(),k=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({providers:[{provide:"components",useValue:[C],multi:!0},f,v],imports:[c.ez,r.UX,Q]}),t})()}}]);