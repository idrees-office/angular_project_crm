"use strict";(self.webpackChunkModernize=self.webpackChunkModernize||[]).push([[998],{2998:(se,_,s)=>{s.r(_),s.d(_,{ThemePagesModule:()=>re});var v=s(6873),h=s(4755),c=s(9401),w=s(9549),b=s(1217),A=s(792),x=s(5664),C=s(7940),y=s(5226),S=s.n(y),e=s(2223),P=s(9181),N=s(7556),u=s(9114),T=s(8097),d=s(6012),g=s(1728);function U(i,o){1&i&&(e.TgZ(0,"div",31),e._uU(1," Password is required. "),e.qZA())}function q(i,o){1&i&&(e.TgZ(0,"div",31),e._uU(1," Password should be 8 characters. "),e.qZA())}function k(i,o){if(1&i&&(e.TgZ(0,"mat-hint",29),e.YNc(1,U,2,0,"div",30),e.YNc(2,q,2,0,"div",30),e.qZA()),2&i){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.f.newPassword.errors&&t.f.newPassword.errors.required),e.xp6(1),e.Q6J("ngIf",t.f.newPassword.errors&&t.f.newPassword.errors.minlength)}}function I(i,o){1&i&&(e.TgZ(0,"div",31),e._uU(1," Please ensure that the new password and confirm password match. "),e.qZA())}function F(i,o){if(1&i&&(e.TgZ(0,"mat-hint"),e.YNc(1,I,2,0,"div",30),e.qZA()),2&i){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.profileForm.value.newPassword!==t.profileForm.value.confirmpassword)}}let M=(()=>{class i{constructor(t,n,r,a){this.fb=t,this._ProfileService=n,this._Router=r,this._AuthService=a,this.userData=localStorage.getItem("userData"),this.user=JSON.parse(this.userData),this.loginUserId=this.user?.client_user_id}ngOnInit(){this.profileForm=this.fb.group({client_user_phone:new c.NI("",[c.kI.required]),newPassword:new c.NI("",[c.kI.required,c.kI.minLength(8)]),confirmPassword:new c.NI("",[c.kI.required])},{validator:(0,C.R)("newPassword","confirmPassword")})}UpdateProfileForm(t){if(!this.profileForm.invalid&&this.profileForm.valid){const r=this.profileForm.value;var n=new FormData;n.append("password",r.newPassword),n.append("confirm_password",r.confirmPassword),n.append("client_user_phone",r.client_user_phone),n.append("client_user_id",this.loginUserId),this._ProfileService.UpdateProfile(n).subscribe(a=>{"success"===a.status&&this.logout()},a=>{console.log(`Something rong.... ${a}`)})}}logout(){if(this.loginUserId){var t=new FormData;t.append("login_user_id",this.loginUserId),this._AuthService.logoutFunction(t).subscribe(n=>{console.log(n)}),localStorage.removeItem("isLoggedin"),localStorage.removeItem("userData"),localStorage.getItem("isLoggedin")||(this._Router.navigate(["/authentication/side-login"]),S().fire({toast:!0,position:"top-end",showConfirmButton:!1,timer:3e3,timerProgressBar:!0,title:"Your Password was chnage Please login Again",icon:"success"}))}}get f(){return this.profileForm.controls}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(c.qu),e.Y36(P.H),e.Y36(v.F0),e.Y36(N.e))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-account-setting"]],decls:60,vars:7,consts:[[1,"p-y-24","b-t-1"],["id","updateprofileform",1,"m-t-24",3,"formGroup","ngSubmit"],[1,"row"],[1,"col-sm-6"],[1,"cardWithShadow"],[1,"p-y-24"],[1,"mat-body-1"],[1,"text-center","m-t-24"],["src","/assets/images/profile/user-1.jpg","width","120",1,"rounded-circle"],[1,"m-t-24"],["mat-flat-button","","color","primary",1,"m-r-8",2,"border-radius","0px"],["mat-stroked-button","","color","warn",2,"border-radius","0px"],[1,"f-s-14","m-t-24","d-block"],[1,"mat-subtitle-2","f-w-600","m-b-8","d-block"],["appearance","outline","color","primary",1,"w-100"],["matInput","","type","password","value","password","readonly","",2,"background-color","#edeff6",3,"value"],["matInput","","type","password","formControlName","newPassword"],["class","m-b-16 error-msg",4,"ngIf"],["appearance","outline","color","primary",1,"w-100","hide-hint"],["matInput","","type","password","formControlName","confirmPassword"],[4,"ngIf"],[1,"col-12"],[1,"row","m-t-24"],["matInput","","type","text","readonly","",2,"background-color","#edeff6",3,"value"],["matInput","","type","email","readonly","",2,"background-color","#edeff6",3,"value"],["matInput","","type","text","formControlName","client_user_phone",2,"background-color","#ffffff",3,"value"],[1,"text-right","p-24","p-t-0"],["mat-flat-button","","color","primary","type","submit",2,"border-radius","0px"],[1,"mdc-button__label"],[1,"m-b-16","error-msg"],["class","text-error",4,"ngIf"],[1,"text-error"]],template:function(t,n){1&t&&(e.TgZ(0,"mat-card-content",0)(1,"form",1),e.NdJ("ngSubmit",function(a){return n.UpdateProfileForm(a)}),e.TgZ(2,"div",2)(3,"div",3)(4,"mat-card",4)(5,"mat-card-content",5)(6,"mat-card-title"),e._uU(7,"Change Profile"),e.qZA(),e.TgZ(8,"mat-card-subtitle",6),e._uU(9,"Change your profile picture from here"),e.qZA(),e.TgZ(10,"div",7),e._UZ(11,"img",8),e.TgZ(12,"div",9)(13,"button",10),e._uU(14,"Upload"),e.qZA(),e.TgZ(15,"button",11),e._uU(16,"Reset"),e.qZA()(),e.TgZ(17,"span",12),e._uU(18,"Allowed JPG, GIF or PNG. Max size of 800K"),e.qZA()()()()(),e.TgZ(19,"div",3)(20,"mat-card",4)(21,"mat-card-content",5)(22,"mat-label",13),e._uU(23,"Current Password"),e.qZA(),e.TgZ(24,"mat-form-field",14),e._UZ(25,"input",15),e.qZA(),e.TgZ(26,"mat-label",13),e._uU(27,"New Password"),e.qZA(),e.TgZ(28,"mat-form-field",14),e._UZ(29,"input",16),e.YNc(30,k,3,2,"mat-hint",17),e.qZA(),e.TgZ(31,"mat-label",13),e._uU(32,"Confirm Password"),e.qZA(),e.TgZ(33,"mat-form-field",18),e._UZ(34,"input",19),e.qZA(),e.YNc(35,F,2,1,"mat-hint",20),e.qZA()()(),e.TgZ(36,"div",21)(37,"mat-card",4)(38,"mat-card-content")(39,"mat-card-title"),e._uU(40,"Personal Details "),e.qZA(),e.TgZ(41,"div",22)(42,"div",3)(43,"mat-label",13),e._uU(44,"Your Name"),e.qZA(),e.TgZ(45,"mat-form-field",14),e._UZ(46,"input",23),e.qZA(),e.TgZ(47,"mat-label",13),e._uU(48,"Email"),e.qZA(),e.TgZ(49,"mat-form-field",14),e._UZ(50,"input",24),e.qZA()(),e.TgZ(51,"div",3)(52,"mat-label",13),e._uU(53,"Phone"),e.qZA(),e.TgZ(54,"mat-form-field",14),e._UZ(55,"input",25),e.qZA()()(),e.TgZ(56,"div",26)(57,"button",27)(58,"span",28),e._uU(59,"Save"),e.qZA()()()()()()()()()),2&t&&(e.xp6(1),e.Q6J("formGroup",n.profileForm),e.xp6(24),e.Q6J("value",null==n.user?null:n.user.password),e.xp6(5),e.Q6J("ngIf",n.f.newPassword.touched&&n.f.newPassword.invalid),e.xp6(5),e.Q6J("ngIf",n.f.newPassword.touched&&n.f.confirmPassword.invalid),e.xp6(11),e.Q6J("value",null==n.user?null:n.user.client_user_name),e.xp6(4),e.Q6J("value",null==n.user?null:n.user.client_user_email),e.xp6(5),e.Q6J("value",null==n.user?null:n.user.client_user_phone))},dependencies:[h.O5,u.KE,u.hX,u.bx,T.Nt,d.a8,d.dn,d.$j,d.n5,g.lW,c._Y,c.Fj,c.JJ,c.JL,c.sg,c.u],encapsulation:2}),i})();var f=s(7870);let J=(()=>{class i{constructor(){this.panelOpenState=!1}}return i.\u0275fac=function(t){return new(t||i)},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-faq"]],decls:44,vars:0,consts:[[1,"row","justify-content-center"],[1,"col-lg-8","text-center"],[1,"d-block","f-s-24","m-b-8"],[1,"mat-body-1","m-b-30","p-b-12","d-block","f-s-16"],[1,"cardWithShadow"],[1,"f-w-600","mat-body-1"],[1,"mat-body-1","text-left"],[1,"col-lg-10","m-t-30","p-t-30"],[1,"bg-light-primary","cardWithShadow"],[1,"p-y-24","text-center"],[1,"avatar-group"],["src","/assets/images/profile/user-1.jpg","alt","user1","width","40",1,"rounded-circle"],["src","/assets/images/profile/user-2.jpg","alt","user2","width","40",1,"rounded-circle"],["src","/assets/images/profile/user-3.jpg","alt","user3","width","40",1,"rounded-circle"],[1,"f-s-20","f-w-600","m-y-12"],[1,"d-block","m-b-16"],["mat-flat-button","","color","primary"]],template:function(t,n){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"mat-card-title",2),e._uU(3,"Frequently asked questions"),e.qZA(),e.TgZ(4,"mat-card-subtitle",3),e._uU(5,"Get to know more about ready-to-use admin dashboard templates"),e.qZA(),e.TgZ(6,"mat-accordion")(7,"mat-expansion-panel",4)(8,"mat-expansion-panel-header")(9,"mat-panel-title",5),e._uU(10," What is an Admin Dashboard? "),e.qZA()(),e.TgZ(11,"p",6),e._uU(12," Admin Dashboard is the backend interface of a website or an application that helps to manage the website's overall content and settings. It is widely used by the site owners to keep track of their website, make changes to their content, and more. "),e.qZA()(),e.TgZ(13,"mat-expansion-panel",4)(14,"mat-expansion-panel-header")(15,"mat-panel-title",5),e._uU(16," What should an admin dashboard template include? "),e.qZA()(),e.TgZ(17,"p",6),e._uU(18," Admin dashboard template should include user & SEO friendly design with a variety of components and application designs to help create your own web application with ease. This could include customization options, technical support and about 6 months of future updates. "),e.qZA()(),e.TgZ(19,"mat-expansion-panel",4)(20,"mat-expansion-panel-header")(21,"mat-panel-title",5),e._uU(22," Why should I buy admin templates from AdminMart? "),e.qZA()(),e.TgZ(23,"p",6),e._uU(24," Adminmart offers high-quality templates that are easy to use and fully customizable. With over 101,801 happy customers & trusted by 10,000+ Companies. AdminMart is recognized as the leading online source for buying admin templates. "),e.qZA()(),e.TgZ(25,"mat-expansion-panel",4)(26,"mat-expansion-panel-header")(27,"mat-panel-title",5),e._uU(28," Do Adminmart offers a money back guarantee? "),e.qZA()(),e.TgZ(29,"p",6),e._uU(30," There is no money back guarantee in most companies, but if you are unhappy with our product, Adminmart gives you a 100% money back guarantee. "),e.qZA()()()(),e.TgZ(31,"div",7)(32,"mat-card",8)(33,"mat-card-content",9)(34,"div",10),e._UZ(35,"img",11)(36,"img",12)(37,"img",13),e.qZA(),e.TgZ(38,"h4",14),e._uU(39,"Still have questions"),e.qZA(),e.TgZ(40,"span",15),e._uU(41,"Can't find the answer your're looking for ? Please chat to our friendly team."),e.qZA(),e.TgZ(42,"button",16),e._uU(43,"Chat with us"),e.qZA()()()()())},dependencies:[d.a8,d.dn,d.$j,d.n5,f.pp,f.ib,f.yz,f.yK,g.lW],encapsulation:2}),i})();var D=s(877);function Y(i,o){1&i&&(e.TgZ(0,"span",18),e._uU(1,"Popular"),e.qZA())}function O(i,o){1&i&&(e.TgZ(0,"div")(1,"h2",19),e._uU(2,"Free"),e.qZA()())}function Q(i,o){if(1&i&&(e.TgZ(0,"div")(1,"div",21)(2,"span",22),e._uU(3,"$"),e.qZA(),e.TgZ(4,"h2",19),e._uU(5),e.qZA(),e.TgZ(6,"span",23),e._uU(7,"/mo"),e.qZA()()()),2&i){const t=e.oxw(2).$implicit,n=e.oxw();e.xp6(5),e.hij(" ",n.yearlyPrice(t.planPrice)," ")}}function E(i,o){if(1&i&&(e.TgZ(0,"div",21)(1,"span",22),e._uU(2,"$"),e.qZA(),e.TgZ(3,"h2",19),e._uU(4),e.qZA(),e.TgZ(5,"span",23),e._uU(6,"/mo"),e.qZA()()),2&i){const t=e.oxw(2).$implicit;e.xp6(4),e.hij(" ",t.planPrice," ")}}function W(i,o){if(1&i&&(e.YNc(0,Q,8,1,"div",14),e.YNc(1,E,7,1,"ng-template",null,20,e.W1O)),2&i){const t=e.MAs(2),n=e.oxw(2);e.Q6J("ngIf",n.show)("ngIfElse",t)}}function j(i,o){if(1&i&&(e.TgZ(0,"div",27),e._UZ(1,"i-tabler",28),e.TgZ(2,"span",29),e._uU(3),e.qZA()()),2&i){const t=e.oxw().$implicit;e.xp6(3),e.Oqu(t.title)}}function B(i,o){if(1&i&&(e._UZ(0,"i-tabler",30),e.TgZ(1,"span",31),e._uU(2),e.qZA()),2&i){const t=e.oxw().$implicit;e.xp6(2),e.Oqu(t.title)}}function G(i,o){if(1&i&&(e.TgZ(0,"div",24),e.YNc(1,j,4,1,"div",25),e.YNc(2,B,3,1,"ng-template",null,26,e.W1O),e.qZA()),2&i){const t=o.$implicit,n=e.MAs(3);e.xp6(1),e.Q6J("ngIf",t.limit)("ngIfElse",n)}}function $(i,o){if(1&i&&(e.TgZ(0,"div",8)(1,"mat-card",9)(2,"mat-card-content",10),e.YNc(3,Y,2,0,"span",11),e.TgZ(4,"span",12),e._uU(5),e.qZA(),e._UZ(6,"img",13),e.YNc(7,O,3,0,"div",14),e.YNc(8,W,3,2,"ng-template",null,15,e.W1O),e.YNc(10,G,4,2,"div",16),e.TgZ(11,"button",17),e._uU(12),e.qZA()()()()),2&i){const t=o.$implicit,n=e.MAs(9);e.xp6(3),e.Q6J("ngIf",t.popular),e.xp6(2),e.Oqu(t.plan),e.xp6(1),e.s9C("src",t.imgSrc,e.LSH),e.xp6(1),e.Q6J("ngIf",t.free)("ngIfElse",n),e.xp6(3),e.Q6J("ngForOf",t.rules),e.xp6(2),e.hij(" ",t.btnText," ")}}let z=(()=>{class i{yearlyPrice(t){return 12*t}constructor(){this.show=!1,this.pricecards=[{id:1,plan:"Silver",imgSrc:"/assets/images/backgrounds/silver.png",btnText:"Choose Silver",free:!0,rules:[{title:"3 Members",limit:!0},{title:"Single Device",limit:!0},{title:"50GB Storage",limit:!1},{title:"Monthly Backups",limit:!1},{title:"Permissions & workflows",limit:!1}]},{id:2,plan:"Bronze",imgSrc:"/assets/images/backgrounds/bronze.png",btnText:"Choose Bronze",free:!1,popular:!0,planPrice:10.99,rules:[{title:"5 Members",limit:!0},{title:"Multiple Device",limit:!0},{title:"80GB Storage",limit:!1},{title:"Monthly Backups",limit:!1},{title:"Permissions & workflows",limit:!1}]},{id:3,plan:"Gold",imgSrc:"/assets/images/backgrounds/gold.png",btnText:"Choose Gold ",free:!1,planPrice:22.99,rules:[{title:"Unlimited Members",limit:!0},{title:"Multiple  Device",limit:!0},{title:"150GB  Storage",limit:!0},{title:"Monthly Backups",limit:!0},{title:"Permissions & workflows",limit:!0}]}]}}return i.\u0275fac=function(t){return new(t||i)},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-pricing"]],decls:11,vars:1,consts:[[1,"row","justify-content-center"],[1,"col-lg-8"],[1,"f-s-30","f-w-600","text-center","mat-subtitle-1","lh-lg","m-b-16"],[1,"d-flex","align-items-center","justify-content-center"],[1,"f-s-14","m-r-8"],["color","primary",3,"click"],[1,"row","m-t-32","p-t-32"],["class","col-sm-6 col-lg-4",4,"ngFor","ngForOf"],[1,"col-sm-6","col-lg-4"],[1,"cardWithShadow"],[1,"p-y-24"],["class","popular-badge text-uppercase bg-light-warning text-warning p-x-8 p-y-4 f-s-12 f-w-500 rounded",4,"ngIf"],[1,"d-block","text-uppercase","f-s-12","m-b-16"],["alt","badge","width","90",3,"src"],[4,"ngIf","ngIfElse"],["elseBlock",""],["class","d-flex align-items-center p-y-12",4,"ngFor","ngForOf"],["mat-flat-button","","color","primary",1,"w-100","m-t-24"],[1,"popular-badge","text-uppercase","bg-light-warning","text-warning","p-x-8","p-y-4","f-s-12","f-w-500","rounded"],[1,"mat-headline-6","plan-title","m-b-24"],["hide",""],[1,"d-flex"],[1,"f-s-16","dollar-sign"],[1,"f-s-16","per-month"],[1,"d-flex","align-items-center","p-y-12"],["class","d-flex align-items-center",4,"ngIf","ngIfElse"],["noLimit",""],[1,"d-flex","align-items-center"],["name","check",1,"icon-16","m-r-12","text-primary","d-flex"],[1,"f-s-14","f-w-500"],["name","x",1,"icon-16","m-r-12","op-5","d-flex"],[1,"op-5","f-w-500","f-s-14"]],template:function(t,n){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"h4",2),e._uU(3," Flexible Plans Tailored to Fit Your Community's Unique Needs! "),e.qZA(),e.TgZ(4,"div",3)(5,"span",4),e._uU(6,"Monthly"),e.qZA(),e.TgZ(7,"mat-slide-toggle",5),e.NdJ("click",function(){return n.show=!n.show}),e._uU(8,"Yearly"),e.qZA()()()(),e.TgZ(9,"div",6),e.YNc(10,$,13,7,"div",7),e.qZA()),2&t&&(e.xp6(10),e.Q6J("ngForOf",n.pricecards))},dependencies:[h.sg,h.O5,D.Rr,d.a8,d.dn,g.lW,A.b],styles:[".plan-title[_ngcontent-%COMP%]{font-size:50px;margin-top:40px;line-height:50px;font-weight:600}.dollar-sign[_ngcontent-%COMP%]{margin-top:22px;margin-right:8px}.per-month[_ngcontent-%COMP%]{margin-top:45px;margin-left:12px}.popular-badge[_ngcontent-%COMP%]{position:absolute;right:16px}"]}),i})();var L=s(418),R=s(964),p=s(5258),K=s(1135),X=s(1292),H=s(430);function V(i,o){if(1&i){const t=e.EpF();e.TgZ(0,"mat-tree-node",6),e._UZ(1,"button",7),e.TgZ(2,"mat-checkbox",8),e.NdJ("change",function(){const a=e.CHM(t).$implicit,l=e.oxw();return e.KtG(l.todoLeafItemSelectionToggle(a))}),e._uU(3),e.qZA()()}if(2&i){const t=o.$implicit,n=e.oxw();e.xp6(2),e.Q6J("checked",n.checklistSelection.isSelected(t)),e.xp6(1),e.Oqu(t.item)}}function ee(i,o){if(1&i){const t=e.EpF();e.TgZ(0,"mat-tree-node",9),e._UZ(1,"button",7),e.TgZ(2,"div",10)(3,"mat-form-field",11)(4,"mat-label"),e._uU(5,"New item..."),e.qZA(),e._UZ(6,"input",12,13),e.qZA(),e.TgZ(8,"button",14),e.NdJ("click",function(){const a=e.CHM(t).$implicit,l=e.MAs(7),m=e.oxw();return e.KtG(m.saveNode(a,l.value))}),e._uU(9," Save "),e.qZA()()()}}function te(i,o){if(1&i){const t=e.EpF();e.TgZ(0,"mat-tree-node",9)(1,"button",15)(2,"mat-icon",16),e._uU(3),e.qZA()(),e.TgZ(4,"mat-checkbox",17),e.NdJ("change",function(){const a=e.CHM(t).$implicit,l=e.oxw();return e.KtG(l.todoItemSelectionToggle(a))}),e._uU(5),e.qZA(),e.TgZ(6,"button",18),e.NdJ("click",function(){const a=e.CHM(t).$implicit,l=e.oxw();return e.KtG(l.addNewItem(a))}),e.TgZ(7,"mat-icon"),e._uU(8,"add"),e.qZA()()()}if(2&i){const t=o.$implicit,n=e.oxw();e.xp6(1),e.uIk("aria-label","Toggle "+t.item),e.xp6(2),e.hij(" ",n.treeControl.isExpanded(t)?"expand_more":"chevron_right"," "),e.xp6(1),e.Q6J("checked",n.descendantsAllSelected(t))("indeterminate",n.descendantsPartiallySelected(t)),e.xp6(1),e.Oqu(t.item)}}class ne{}class ie{}const oe={Groceries:{"Almond Meal flour":null,"Organic eggs":null,"Protein Powder":null,Fruits:{Apple:null,Berries:["Blueberry","Raspberry"],Orange:null}},Reminders:["Cook dinner","Read the Material Design spec","Upgrade Application to Angular"]};let Z=(()=>{class i{get data(){return this.dataChange.value}constructor(){this.dataChange=new K.X([]),this.initialize()}initialize(){const t=this.buildFileTree(oe,0);this.dataChange.next(t)}buildFileTree(t,n){return Object.keys(t).reduce((r,a)=>{const l=t[a],m=new ne;return m.item=a,null!=l&&("object"==typeof l?m.children=this.buildFileTree(l,n+1):m.item=l),r.concat(m)},[])}insertItem(t,n){t.children&&(t.children.push({item:n}),this.dataChange.next(this.data))}updateItem(t,n){t.item=n,this.dataChange.next(this.data)}}return i.\u0275fac=function(t){return new(t||i)},i.\u0275prov=e.Yz7({token:i,factory:i.\u0275fac}),i})();const ae=[{path:"",children:[{path:"account-setting",component:M,data:{title:"Account Setting",urls:[{title:"Dashboard",url:"/dashboards/dashboard1"},{title:"Account Setting"}]}},{path:"faq",component:J,data:{title:"FAQ",urls:[{title:"Dashboard",url:"/dashboards/dashboard1"},{title:"FAQ"}]}},{path:"pricing",component:z,data:{title:"Pricing",urls:[{title:"Dashboard",url:"/dashboards/dashboard1"},{title:"Pricing"}]}},{path:"treeview",component:(()=>{class i{constructor(t){this._database=t,this.flatNodeMap=new Map,this.nestedNodeMap=new Map,this.selectedParent=null,this.newItemName="",this.checklistSelection=new L.Ov(!0),this.getLevel=n=>n.level,this.isExpandable=n=>n.expandable,this.getChildren=n=>n.children,this.hasChild=(n,r)=>r.expandable,this.hasNoContent=(n,r)=>""===r.item,this.transformer=(n,r)=>{const a=this.nestedNodeMap.get(n),l=a&&a.item===n.item?a:new ie;return l.item=n.item,l.level=r,l.expandable=!!n.children?.length,this.flatNodeMap.set(l,n),this.nestedNodeMap.set(n,l),l},this.treeFlattener=new p.JZ(this.transformer,this.getLevel,this.isExpandable,this.getChildren),this.treeControl=new R.C2(this.getLevel,this.isExpandable),this.dataSource=new p.kc(this.treeControl,this.treeFlattener),t.dataChange.subscribe(n=>{this.dataSource.data=n})}descendantsAllSelected(t){const n=this.treeControl.getDescendants(t);return n.length>0&&n.every(a=>this.checklistSelection.isSelected(a))}descendantsPartiallySelected(t){return this.treeControl.getDescendants(t).some(a=>this.checklistSelection.isSelected(a))&&!this.descendantsAllSelected(t)}todoItemSelectionToggle(t){this.checklistSelection.toggle(t);const n=this.treeControl.getDescendants(t);this.checklistSelection.isSelected(t)?this.checklistSelection.select(...n):this.checklistSelection.deselect(...n),n.forEach(r=>this.checklistSelection.isSelected(r)),this.checkAllParentsSelection(t)}todoLeafItemSelectionToggle(t){this.checklistSelection.toggle(t),this.checkAllParentsSelection(t)}checkAllParentsSelection(t){let n=this.getParentNode(t);for(;n;)this.checkRootNodeSelection(n),n=this.getParentNode(n)}checkRootNodeSelection(t){const n=this.checklistSelection.isSelected(t),r=this.treeControl.getDescendants(t),a=r.length>0&&r.every(l=>this.checklistSelection.isSelected(l));n&&!a?this.checklistSelection.deselect(t):!n&&a&&this.checklistSelection.select(t)}getParentNode(t){const n=this.getLevel(t);if(n<1)return null;for(let a=this.treeControl.dataNodes.indexOf(t)-1;a>=0;a--){const l=this.treeControl.dataNodes[a];if(this.getLevel(l)<n)return l}return null}addNewItem(t){const n=this.flatNodeMap.get(t);this._database.insertItem(n,""),this.treeControl.expand(t)}saveNode(t,n){const r=this.flatNodeMap.get(t);this._database.updateItem(r,n)}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(Z))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-treeview"]],features:[e._Bn([Z])],decls:9,vars:4,consts:[[1,"cardWithShadow","theme-card"],[1,"m-b-0"],[1,"b-t-1","p-y-24"],[3,"dataSource","treeControl"],["matTreeNodeToggle","","matTreeNodePadding","",4,"matTreeNodeDef"],["matTreeNodePadding","",4,"matTreeNodeDef","matTreeNodeDefWhen"],["matTreeNodeToggle","","matTreeNodePadding",""],["mat-icon-button","","disabled",""],["color","primary",1,"checklist-leaf-node",3,"checked","change"],["matTreeNodePadding",""],[1,"d-flex","align-items-center","m-b-8"],["appearance","outline",1,"m-r-12","hide-hint"],["matInput","","placeholder","Ex. Lettuce"],["itemValue",""],["mat-flat-button","","color","primary",3,"click"],["mat-icon-button","","matTreeNodeToggle",""],[1,"mat-icon-rtl-mirror"],["color","primary",3,"checked","indeterminate","change"],["mat-icon-button","",3,"click"]],template:function(t,n){1&t&&(e.TgZ(0,"mat-card",0)(1,"mat-card-header")(2,"mat-card-title",1),e._uU(3,"Treeview"),e.qZA()(),e.TgZ(4,"mat-card-content",2)(5,"mat-tree",3),e.YNc(6,V,4,2,"mat-tree-node",4),e.YNc(7,ee,10,0,"mat-tree-node",5),e.YNc(8,te,9,5,"mat-tree-node",5),e.qZA()()()),2&t&&(e.xp6(5),e.Q6J("dataSource",n.dataSource)("treeControl",n.treeControl),e.xp6(2),e.Q6J("matTreeNodeDefWhen",n.hasNoContent),e.xp6(1),e.Q6J("matTreeNodeDefWhen",n.hasChild))},dependencies:[X.oG,u.KE,u.hX,T.Nt,d.a8,d.dn,d.dk,d.n5,p.fQ,p.ah,p.eu,p.gi,p.uo,g.lW,g.RK,H.Hw],encapsulation:2}),i})(),data:{title:"Treeview",urls:[{title:"Dashboard",url:"/dashboards/dashboard1"},{title:"Treeview"}]}}]}];let re=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[h.ez,v.Bz.forChild(ae),w.q,c.u5,c.UX,A.e.pick(x),b.XK]}),i})()}}]);