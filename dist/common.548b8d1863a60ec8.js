"use strict";(self.webpackChunkModernize=self.webpackChunkModernize||[]).push([[592],{2132:(d,n,s)=>{s.d(n,{k2:()=>i,rl:()=>r,vE:()=>o});let o=(()=>{class a{}return a.optionvalue=[{value:0,name:"InActive"},{value:1,name:"Active"}],a})(),r=(()=>{class a{}return a.leads=[{lead_status:"1",label:"A New Leads created by",notes:"From New Lead"},{lead_status:"2",label:"Assigned Leads to",notes:"From Assigned"},{lead_status:"3",label:"Moved to: Connected",notes:"From Connected"},{lead_status:"4",label:"Moved to: Cold",notes:"From Cold"},{lead_status:"5",label:"Moved to: Warm",notes:"From Warm"},{lead_status:"6",label:"Moved to: Hot Leads",notes:"From Hot"},{lead_status:"7",label:"Moved to: Meeting Schdulede",notes:"From Meeting Schdulede"},{lead_status:"8",label:"Moved to: Meeting Complate",notes:"From Meeting Complate"},{lead_status:"9",label:"Moved to: No Answer",notes:"From No Answer"},{lead_status:"10",label:"Moved to: Low Buget",notes:"From Low Buget"},{lead_status:"11",label:"Moved to: Not Responding AnyMore",notes:"From Not Responding AnyMore"},{lead_status:"12",label:"Moved to: Incorrect Detail",notes:"From Incorrect Detail"},{lead_status:"13",label:"Moved to: Agent",notes:"From Agent "},{lead_status:"14",label:"Moved to: Junk",notes:"From Junk"}],a})(),i=(()=>{class a{}return a.leadsoption=[{lead_status:"3",label:"Connected Lead"},{lead_status:"4",label:"Cold Leads"},{lead_status:"5",label:"Warm Leads"},{lead_status:"6",label:"Hot Leads"},{lead_status:"7",label:"Meeting Schdulede"},{lead_status:"8",label:"Meeting Complate"},{lead_status:"9",label:"No Answer"},{lead_status:"10",label:"Low Buget"},{lead_status:"11",label:"Not Responding AnyMore"},{lead_status:"12",label:"Incorrect Detail"},{lead_status:"13",label:"Agent"},{lead_status:"14",label:"Junk"}],a})()},6801:(d,n,s)=>{s.d(n,{F:()=>a});var o=s(2076);const r=[{id:101,project_name:"Pineapple Inc.",selling_price:"34y38434",bedrooms:"43",total_area:"32sqft",built_up_area:"16sqft",payable_now:"237232",orders:[{itemName:"Courge",unitPrice:10}],orderDate:new Date,totalCost:90,vat:9,grandTotal:99,status:"Shipped",completed:!1,isSelected:!1},{id:102,project_name:"Pineapple.",selling_price:"34y38434",bedrooms:"4",total_area:"32sqft",built_up_area:"16sqft",payable_now:"237232",orders:[{itemName:"Courge",unitPrice:10}],orderDate:new Date,totalCost:90,vat:9,grandTotal:99,status:"Delivered",completed:!1,isSelected:!1},{id:103,project_name:"Incorporation.",selling_price:"34y38434",bedrooms:"4",total_area:"32sqft",built_up_area:"16sqft",payable_now:"237232",orders:[{itemName:"Courge",unitPrice:10}],orderDate:new Date,totalCost:90,vat:9,grandTotal:99,status:"Pending",completed:!1,isSelected:!1},{id:104,project_name:"PineappleTimes  .",selling_price:"34y38434",bedrooms:"4",total_area:"32sqft",built_up_area:"16sqft",payable_now:"237232",orders:[{itemName:"Courge",unitPrice:10}],orderDate:new Date,totalCost:90,vat:9,grandTotal:99,status:"Shipped",completed:!1,isSelected:!1}];var i=s(2223);let a=(()=>{class t{getInvoice(){return(0,o.D)(r)}constructor(){this.invoiceList=[],this.getInvoice().subscribe(e=>this.invoiceList.push(e))}getInvoiceList(){return this.invoiceList}deleteInvoice(e){this.invoiceList=this.invoiceList.filter(u=>u.id!==e)}addInvoice(e){this.invoiceList.splice(0,0,e)}updateInvoice(e,u){const c=this.invoiceList.filter(p=>p.id===e),_=this.invoiceList.indexOf(c[0]);this.invoiceList[_]=u}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=i.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},7940:(d,n,s)=>{function o(r,i){return a=>{const l=a.controls[i];l.errors&&!l.errors.confirmedValidator||l.setErrors(a.controls[r].value!==l.value?{confirmedValidator:!0}:null)}}s.d(n,{R:()=>o})},9181:(d,n,s)=>{s.d(n,{H:()=>a});var o=s(9234),r=s(2223),i=s(3144);let a=(()=>{class t{constructor(e){this.http=e,this.updateprofile=o.N.baseUrl+"/users/update_user_profile",this.updatepassword=o.N.baseUrl+"/users/update_password"}UpdateProfile(e){return this.http.post(this.updateprofile,e)}UpdatePassword(e){return this.http.post(this.updatepassword,e)}}return t.\u0275fac=function(e){return new(e||t)(r.LFG(i.eN))},t.\u0275prov=r.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},3071:(d,n,s)=>{s.d(n,{K:()=>a});var o=s(9234),r=s(2223),i=s(3144);let a=(()=>{class t{constructor(e){this.http=e,this.createUrl=o.N.baseUrl+"/users/create_user",this.deleteUrl=o.N.baseUrl+"/users/delete_user",this.getUrl=o.N.baseUrl+"/users/edit_user",this.updateUrl=o.N.baseUrl+"/users/update_user",this.updatesortOrderUrl=o.N.baseUrl+"/users/update_sort_order",this.user=null,this.storageKey="userData"}create(e){return this.http.post(this.createUrl,e)}delete(e){return this.http.delete(this.deleteUrl+"/"+e)}update(e){return this.http.post(this.updateUrl,e)}updatesortOrder(e){return this.http.post(this.updatesortOrderUrl,e)}edit(e){return this.http.get(this.getUrl+"/"+e)}setUser(e){localStorage.setItem(this.storageKey,JSON.stringify(e))}clearUser(){this.user=null,localStorage.removeItem(this.storageKey)}}return t.\u0275fac=function(e){return new(e||t)(r.LFG(i.eN))},t.\u0275prov=r.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}]);