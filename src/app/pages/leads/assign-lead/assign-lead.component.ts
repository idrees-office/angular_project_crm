import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { LeadsService } from 'src/app/services/leads.service';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
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
  selector: 'app-assign-lead',
  templateUrl: './assign-lead.component.html',
  styleUrls: ['./assign-lead.component.scss']
})
export class AssignLeadComponent implements OnInit {
  
  displayedColumns   : string[] = ['lead_id', 'lead_title', 'customer_name', 'customer_phone', 'reassign', 'actions'];
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
            return this.exampleDatabase!.getLeads(this.sort.active,this.sort.direction,this.paginator.pageIndex);
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
  Delete(e:Event, lead_id:any){
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
            this.reloadData();
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

  reloadData() {
    if (this.sort && this.paginator) {
      this.isLoadingResults = true;
      this.exampleDatabase!.getLeads(this.sort.active, this.sort.direction, this.paginator.pageIndex)
      .pipe( catchError(() => { this.isLoadingResults = false; this.isRateLimitReached = true; return observableOf([]); })
        )
        .subscribe((data) => {
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
    this._LeadsService.getAgentInfo().subscribe((res:any)=>{
        this.allAgents = res;
    },(error:any) => {
      console.log(error);
    })
  }
  
  onOptionSelected(e: MatAutocompleteSelectedEvent, leads:any){
    Swal.fire({
      html: `Are you sure want to Assign?`,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: `Yes`,
      cancelButtonText: `No`,
    }).then((result) => {
      if(result.isConfirmed){
        this.reassignLeadSelectedAgent = e.option.value;
        const leadid = leads.lead_id;
        if(this.reassignLeadSelectedAgent != '' && leadid != ''){
          var fd = new FormData();
          fd.append('agent_id',this.reassignLeadSelectedAgent.client_user_id);
          fd.append('lead_id',leadid);
          if(this.loginuserId){
            fd.append('login_user_id',this.loginuserId);
          }
          this._LeadsService.AssignLeads(fd).subscribe((res:any) =>{
            if(res.status === "success"){
              Swal.fire({ title: 'Success', html: 'Lead Re-assigned Successfully', timer: 2000, showConfirmButton: false, });
              this.reloadData();
            }
          },(error:any) => {
              console.log(error);
          });
        }else{
          alert('SomeThing Wrong')
        }
      }
    });
  }


  displayLeadLabel(agent: any): string {
    return agent ? agent.client_user_name : '';
  }
}

export interface LeadsApi {
  data: Lead[];
  total_count: number;
}
export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}
  getLeads(sort: string, order: string, page: number): Observable<LeadsApi> {
    // const baseUrl = 'http://10.99.1.77:8000/api'; 
    // const baseUrl = 'https://newcrmbackend.evernestre.ae/api'; 
    const baseUrl = 'http://127.0.0.1:8000/api'; 
    const leadsUrl = `${baseUrl}/leads/get-new-lead`;
    // Adjust query parameters based on your backend API
    const requestUrl = `${leadsUrl}?sort=${sort}&order=${order}&page=${page + 1}`;
    return this._httpClient.get<LeadsApi>(requestUrl).pipe(
      map(data => ({
        ...data,
        data: data.data.map((lead, index) => ({...lead,counter: index + 1 + page * 10 // Assuming pageSize is 10, adjust accordingly if different
        }))
      }))
    );
  }
}
