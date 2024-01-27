import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environments.dev";
import { catchError, map } from 'rxjs/operators';
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LeadsService {
  getagenturl         = environment.baseUrl + "/leads/get_agents";
  createleadurl       = environment.baseUrl + "/leads/create_lead";
  getleadsurl         = environment.baseUrl + "/leads/all_leads";
  updateleadsstatus   = environment.baseUrl + "/leads/update_leads";
  getallleads         = environment.baseUrl + "/leads/get_all_leads";
  leadinfourl         = environment.baseUrl + "/leads/lead_info";
  updatesinglelead    = environment.baseUrl + "/leads/update_single_lead";
  getagentnamebyid    = environment.baseUrl + "/leads/get_agent_name";
  moveleadurl         = environment.baseUrl + "/leads/move_lead";
  reassignleadurl     = environment.baseUrl + "/leads/reassign_lead";
  moveleadsurl        = environment.baseUrl + "/leads/move_lead_status";
  bulkleadtoassignurl = environment.baseUrl + "/leads/bulklead_to_assignlead";
  deleteleadsurl      = environment.baseUrl + "/leads/delete_leads";
  getUrl              = environment.baseUrl+'/leads/lead-list';
  constructor(private http: HttpClient) {}

  getAgentInfo() {
    return this.http.get(this.getagenturl);
  }
  createLead(postData: any) {
    return this.http.post(this.createleadurl, postData);
  }
  getleads(status: any) {
    const url = this.getleadsurl + "/" + status;
    return this.http.get(url);
  }

  fetchLeadsData(){
    return this.http.get(this.getUrl);
  }

  // GetAgentAndAdminWiseLeads(id:any, role:any) {
  //   return this.http.get(this.getallleads+'/'+id+'/'+role);
  // } id:any, role:any

  GetAgentAndAdminWiseLeads() {
    return this.http.get(this.getallleads);
  }


  moveLead(source: any[], destination: any[], index: number) {
    destination.push(...source.splice(index, 1));
  }
  updateleadstatus(postData: any) {
    return this.http.post(this.updateleadsstatus, postData);
  }
  GetInfo(id: any) {
    return this.http.get(this.leadinfourl + "/" + id);
  }
  UpdateSingLead(postData: any) {
    return this.http.post(this.updatesinglelead, postData);
  }
  AgentNameById(id: any) {
    return this.http.get(this.getagentnamebyid + "/" + id);
  }
  MoveLeads(postData: any) {
    return this.http.post(this.moveleadurl, postData);
  }
  ReAssignLeads(postData: any) {
    return this.http.post(this.reassignleadurl, postData);
  }
  move(id: any) {
    return this.http.get(this.moveleadsurl + "/" + id);
  }
  BulkLeadtoAssign(postData: any) {
    return this.http.post(this.bulkleadtoassignurl, postData);
  }
  getresponsibleUser (id:any){
    return this.http.get(this.getagentnamebyid + "/" + id);
  }

  DeleteLead(id:any){
    return this.http.get(this.deleteleadsurl+"/"+id);
  } 



  
}
