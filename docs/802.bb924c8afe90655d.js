"use strict";(self.webpackChunkw2m_front=self.webpackChunkw2m_front||[]).push([[802],{6802:(N,l,s)=>{s.r(l),s.d(l,{HeroesModule:()=>R});var d=s(1896),e=s(5879),m=s(9862);let h=(()=>{class t{constructor(a){this.http=a}getHeroes(a){let o=(new m.LE).set("pageIndex",a.pageIndex).set("pageSize",a.pageSize);return a.name&&o.set("name",a.name),this.http.get("heroes",{params:o})}addHero(a){return this.http.post("heroes",a)}modifyHero(a){return this.http.put(`heroes/${a.id}`,a)}deleteHero(a){return this.http.delete(`heroes/${a}`)}static#e=this.\u0275fac=function(o){return new(o||t)(e.LFG(m.eN))};static#t=this.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var u=s(5940);let g=(()=>{class t{constructor(){}static#e=this.\u0275fac=function(o){return new(o||t)};static#t=this.\u0275cmp=e.Xpm({type:t,selectors:[["app-loader"]],decls:1,vars:0,consts:[[1,"loader"]],template:function(o,r){1&o&&e._UZ(0,"mat-spinner",0)},dependencies:[u.Ou]})}return t})();var f=s(7700);let H=(()=>{class t{constructor(a){this.dialog=a}showLoading(){this.dialogRef=this.dialog.open(g,{disableClose:!0,panelClass:"loader-dialog"})}closeLoading(){this.dialogRef.close()}static#e=this.\u0275fac=function(o){return new(o||t)(e.LFG(f.uw))};static#t=this.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var c=s(5195),n=s(5313),C=s(4064),v=s(6814);function S(t,i){1&t&&(e.TgZ(0,"th",10),e._uU(1," Id. "),e.qZA())}function Z(t,i){if(1&t&&(e.TgZ(0,"td",11),e._uU(1),e.qZA()),2&t){const a=i.$implicit;e.xp6(1),e.hij(" ",a.id," ")}}function y(t,i){1&t&&(e.TgZ(0,"th",10),e._uU(1," Name "),e.qZA())}function x(t,i){if(1&t&&(e.TgZ(0,"td",11),e._uU(1),e.ALo(2,"titlecase"),e.qZA()),2&t){const a=i.$implicit;e.xp6(1),e.hij(" ",e.lcZ(2,1,a.name)," ")}}function z(t,i){1&t&&e._UZ(0,"tr",12)}function T(t,i){1&t&&e._UZ(0,"tr",13)}const w=function(){return[5,10,20]},A=[{path:"",component:(()=>{class t{constructor(a,o){this.heroesService=a,this.modalService=o,this.displayedColumns=["id","name"],this.pageIndex=0,this.pageSize=10,this.totalHeroes=0,this.heroesResult=[]}ngOnInit(){this.getHeroes(this.pageIndex,this.pageSize)}getHeroes(a,o){this.modalService.showLoading(),this.heroesService.getHeroes({pageIndex:a,pageSize:o}).subscribe({next:({heroes:r,total:p})=>{this.heroesResult=r,this.totalHeroes=p},complete:()=>this.modalService.closeLoading()})}handlePageEvent(a){this.pageIndex=a.pageIndex,this.pageSize=a.pageSize,this.getHeroes(this.pageIndex,this.pageSize)}static#e=this.\u0275fac=function(o){return new(o||t)(e.Y36(h),e.Y36(H))};static#t=this.\u0275cmp=e.Xpm({type:t,selectors:[["app-heroes"]],decls:17,vars:7,consts:[[1,"example-card"],["mat-card-avatar","",1,"example-header-image"],["mat-table","",3,"dataSource"],["matColumnDef","id"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","name"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["aria-label","Select page of heroes",3,"pageSize","length","pageSizeOptions","page"],["mat-header-cell",""],["mat-cell",""],["mat-header-row",""],["mat-row",""]],template:function(o,r){1&o&&(e.TgZ(0,"mat-card",0)(1,"mat-card-header"),e._UZ(2,"div",1),e.TgZ(3,"mat-card-title"),e._uU(4,"Heroes"),e.qZA()(),e.TgZ(5,"mat-card-content")(6,"table",2),e.ynx(7,3),e.YNc(8,S,2,0,"th",4),e.YNc(9,Z,2,1,"td",5),e.BQk(),e.ynx(10,6),e.YNc(11,y,2,0,"th",4),e.YNc(12,x,3,3,"td",5),e.BQk(),e.YNc(13,z,1,0,"tr",7),e.YNc(14,T,1,0,"tr",8),e.qZA(),e.TgZ(15,"mat-paginator",9),e.NdJ("page",function(L){return r.handlePageEvent(L)}),e.qZA()(),e._UZ(16,"mat-card-actions"),e.qZA()),2&o&&(e.xp6(6),e.Q6J("dataSource",r.heroesResult),e.xp6(7),e.Q6J("matHeaderRowDef",r.displayedColumns),e.xp6(1),e.Q6J("matRowDefColumns",r.displayedColumns),e.xp6(1),e.Q6J("pageSize",r.pageSize)("length",r.totalHeroes)("pageSizeOptions",e.DdM(6,w)))},dependencies:[c.a8,c.hq,c.kc,c.dn,c.dk,c.n5,n.BZ,n.fO,n.as,n.w1,n.Dz,n.nj,n.ge,n.ev,n.XQ,n.Gk,C.NW,v.rS]})}return t})()}];let D=(()=>{class t{static#e=this.\u0275fac=function(o){return new(o||t)};static#t=this.\u0275mod=e.oAB({type:t});static#a=this.\u0275inj=e.cJS({imports:[d.Bz.forChild(A),d.Bz]})}return t})();var I=s(7192);let R=(()=>{class t{static#e=this.\u0275fac=function(o){return new(o||t)};static#t=this.\u0275mod=e.oAB({type:t});static#a=this.\u0275inj=e.cJS({imports:[I.m,D]})}return t})()}}]);