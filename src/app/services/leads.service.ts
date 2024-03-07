import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environments.dev";
import { catchError, map } from 'rxjs/operators';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class LeadsService {
  getagenturl = environment.baseUrl + '/leads/get_agents';
  createleadurl = environment.baseUrl + '/leads/create_lead';
  getleadsurl = environment.baseUrl + '/leads/all_leads';
  updateleadsstatus = environment.baseUrl + '/leads/update_leads';
  getallleads = environment.baseUrl + '/leads/get_all_leads';
  leadinfourl = environment.baseUrl + '/leads/lead_info';
  updatesinglelead = environment.baseUrl + '/leads/update_single_lead';
  getagentnamebyid = environment.baseUrl + '/leads/get_agent_name';
  moveleadurl = environment.baseUrl + '/leads/move_lead';
  reassignleadurl = environment.baseUrl + '/leads/reassign_lead';
  moveleadsurl = environment.baseUrl + '/leads/move_lead_status';
  deleteleadsurl = environment.baseUrl + '/leads/delete_leads';
  getUrl = environment.baseUrl + '/leads/lead-list';
  assignlead = environment.baseUrl + '/leads/assign-lead';
  leadnotification = environment.baseUrl + '/leads/lead-notifcation';
  exportcsvurl = environment.baseUrl + '/leads/export-csv';

  constructor(private http: HttpClient) {}
  getAgentInfo() {
    return this.http.get(this.getagenturl);
  }
  createLead(postData: any) {
    return this.http.post(this.createleadurl, postData);
  }
  getleads(status: any) {
    const url = this.getleadsurl + '/' + status;
    return this.http.get(url);
  }

  fetchLeadsData() {
    return this.http.get(this.getUrl);
  }

  GetAgentAndAdminWiseLeads(PostData:any) {
    // const token = localStorage.getItem('token');
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // return this.http.get(this.getallleads);
     return this.http.post(this.getallleads, PostData);


  }

  moveLead(source: any[], destination: any[], index: number) {
    destination.push(...source.splice(index, 1));
  }
  updateleadstatus(postData: any) {
    return this.http.post(this.updateleadsstatus, postData);
  }
  GetInfo(id: any) {
    return this.http.get(this.leadinfourl + '/' + id);
  }
  UpdateSingLead(postData: any) {
    return this.http.post(this.updatesinglelead, postData);
  }
  AgentNameById(id: any) {
    return this.http.get(this.getagentnamebyid + '/' + id);
  }
  MoveLeads(postData: any) {
    return this.http.post(this.moveleadurl, postData);
  }
  ReAssignLeads(postData: any) {
    return this.http.post(this.reassignleadurl, postData);
  }
  move(id: any) {
    return this.http.get(this.moveleadsurl + '/' + id);
  }

  getresponsibleUser(id: any) {
    return this.http.get(this.getagentnamebyid + '/' + id);
  }

  DeleteLead(id: any) {
    return this.http.get(this.deleteleadsurl + '/' + id);
  }

  AssignLeads(postData: any) {
    return this.http.post(this.assignlead, postData);
  }

  LeadNotoficationAgentWise(id: any) {
    return this.http.get(this.leadnotification + '/' + id);
  }

  FilterCsv(postData: any) {
    return this.http.post(this.exportcsvurl, postData);
  }
}
