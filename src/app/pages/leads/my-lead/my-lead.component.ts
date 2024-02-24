import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { LeadsService } from 'src/app/services/leads.service';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

export interface Lead {
  lead_id: any;
  agent_name: any;
  client_user_designation: any;
  client_user_email: any;
  imagePath: string;
  lead_title:any;
  // Add any other properties you need for leads
}


@Component({
  selector: 'app-my-lead',
  templateUrl: './my-lead.component.html',
  styleUrls: ['./my-lead.component.scss']
})
export class MyLeadComponent implements OnInit  {

  displayedColumns   : string[] = ['lead_id', 'lead_title', 'customer_name', 'customer_email' , 'customer_phone','customer_phone2', 'actions'];
  exampleDatabase    : ExampleHttpDatabase | null = null;
  leadsData          : Lead[] = [];
  counter: number    = 1;
  resultsLength      = 0;
  isLoadingResults   = true;
  isRateLimitReached = false;
  reassignLeadSelectedAgent: any;
  allAgents   : any;
  userData    : any;
  user        : any;
  loginuserId : any;
  role        : any;
  startDate   : any;
  endDate     : any;

  @ViewChild(MatPaginator) paginator: MatPaginator ;
  @ViewChild(MatSort) sort: MatSort ;
  constructor(private _httpClient: HttpClient, private _LeadsService:LeadsService) {}
  ngAfterViewInit(): void {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);
    if (this.sort && this.paginator) {
      this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
      merge(this.sort.sortChange, this.paginator.page)
        .pipe(startWith({}),switchMap(() => {
            this.isLoadingResults = true;
            return this.exampleDatabase!.getLeads(this.role,this.loginuserId,this.sort.active,this.sort.direction,this.paginator.pageIndex, this.startDate, this.endDate);
          }),
          map((data) => { this.isLoadingResults = false; this.isRateLimitReached = false; this.resultsLength = data.total_count;
            return data.data;
          }),
          catchError(() => { this.isLoadingResults = false; this.isRateLimitReached = true; return observableOf([]);
          })
        )
        .subscribe((data) => (this.leadsData = data));
    }
  }

  ngOnInit(): void {
    this.userData = localStorage.getItem('userData');
    this.user = JSON.parse(this.userData);
    this.loginuserId = this.user.client_user_id;
    this.role = this.user.client_user_role;
    this.agents();
  }

  Delete(e:Event, lead_id:any, startDate?: any, endDate?: any){
    Swal.fire({
      title: 'Are you sure want to remove?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if(result.isConfirmed){
        this._LeadsService.DeleteLead(lead_id).subscribe((res:any) =>{
          if(res.status === "delete"){
            Swal.fire({ title: 'Success', html: 'Lead Delete Successfully', timer: 2000, showConfirmButton: false, });
            this.reloadData(startDate, endDate);
          }
        },(error:any) => {
            console.log(error);
        });
      }else{
        // this.modalService.dismissAll();
        // this.selectedAgent = null;
      }
    });
  }

  reloadData(startDate?: any, endDate?: any) {
    if (this.sort && this.paginator) {
      this.isLoadingResults = true;
      this.exampleDatabase!.getLeads(this.role,this.loginuserId,this.sort.active, this.sort.direction, this.paginator.pageIndex, startDate, endDate)
      .pipe( catchError(() => { this.isLoadingResults = false; this.isRateLimitReached = true; return observableOf([]); }))
        .subscribe((data:any) => {
          if ('data' in data) {
            this.isLoadingResults = false;
            this.isRateLimitReached = false;
            this.resultsLength = data.total_count;
            this.leadsData = data.data;
          }
        });
    }
  }

  agents(){
    this._LeadsService.getAgentInfo().subscribe((res:any)=>{ this.allAgents = res; },(error:any) => {
      console.log(error);
    })
  }

  // onOptionSelected(e: MatAutocompleteSelectedEvent, leads:any){
  //   Swal.fire({
  //     html: `Are you sure want to Assign?`,
  //     showCloseButton: true,
  //     showCancelButton: true,
  //     confirmButtonText: `Yes`,
  //     cancelButtonText: `No`,
  //   }).then((result) => {
  //     if(result.isConfirmed){
  //       this.reassignLeadSelectedAgent = e.option.value;
  //       const leadid = leads.lead_id;
  //       if(this.reassignLeadSelectedAgent != '' && leadid != ''){
  //         var fd = new FormData();
  //         fd.append('agent_id',this.reassignLeadSelectedAgent.client_user_id);
  //         fd.append('lead_id',leadid);
  //         if(this.loginuserId){
  //           fd.append('login_user_id',this.loginuserId);
  //         }
  //         this._LeadsService.AssignLeads(fd).subscribe((res:any) =>{
  //           if(res.status === "success"){
  //             Swal.fire({ title: 'Success', html: 'Lead Re-assigned Successfully', timer: 2000, showConfirmButton: false, });
  //             this.reloadData();
  //           }
  //         },(error:any) => {
  //             console.log(error);
  //         });
  //       }else{
  //         alert('SomeThing Wrong')
  //       }
  //     }
  //   });
  // }

displayLeadLabel(agent: any): string {
    return agent ? agent.client_user_name : '';
  }

  filter(startDate: string, endDate: string) {
    this.reloadData(startDate, endDate);
  }

  reload(){
    window.location.reload();
  }
}

export interface LeadsApi {
  data: Lead[];
  total_count: number;
}

export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}
  getLeads(role:any,loginuserId: any, sort: string, order: string, page: number,startDate:any, endDate:any): Observable<LeadsApi> {
    // const baseUrl = 'http://10.99.1.77:8000/api';
    const baseUrl = 'https://offplanbackend.evernestre.ae/api';
    let leadsUrl = `${baseUrl}/leads/get-my-lead`;
    if (role == 2 || role === 2) {
      leadsUrl += `/${loginuserId}`;
    }
    
    let params = new HttpParams()
      .set('sort', sort)
      .set('order', order)
      .set('page', (page + 1).toString());
    // Add filter parameters if provided
    if (startDate && endDate) {
      params = params.set('startDate', startDate).set('endDate', endDate);
    }

    const requestUrl = `${leadsUrl}`;
    // Adjust query parameters based on your backend API
    // const requestUrl = `${leadsUrl}?sort=${sort}&order=${order}&page=${page + 1}`;
    return this._httpClient.get<LeadsApi>(requestUrl, { params }).pipe(map(data => ({...data,data: data.data.map((lead, index) => ({...lead,counter: index + 1 + page * 10 })) })));
    // return this._httpClient.get<LeadsApi>(requestUrl).pipe( map(data => ({...data,data: data.data.map((lead, index) => ({...lead,counter: index + 1 + page * 10 })) })));
    // return this._httpClient.get<LeadsApi>(requestUrl).pipe( map(data => ({...data,data: data.data.map((lead, index) => ({...lead,counter: index + 1 + page * 10 })) })));
  }
}





