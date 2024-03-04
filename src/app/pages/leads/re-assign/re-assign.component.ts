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
  selector: 'app-re-assign',
  templateUrl: './re-assign.component.html',
  styleUrls: ['./re-assign.component.scss']
})

export class ReAssignComponent implements OnInit {
  // reassign
  // 'client_user_email', 'client_user_designation', 'imagePath'  
  displayedColumns: string[] = ['lead_id', 'lead_title', 'agent_name', 'customer_name', 'customer_phone', 'reassign', 'actions'];
  exampleDatabase: ExampleHttpDatabase | null = null;
  leadsData: Lead[] = [];
  counter: number = 1;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  reassignLeadSelectedAgent: any;
  allAgents:any;
  userData:any;
  user:any; 
  loginuserId:any;
  role:any;
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
      html: `Are you sure want to Re-assign?`,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: `Yes`,
      cancelButtonText: `No`,
    }).then((result) => {
      if(result.isConfirmed){
        this.reassignLeadSelectedAgent = e.option.value;
        const leadid = leads.lead_id
        if(this.reassignLeadSelectedAgent != '' && leadid != ''){
          var fd = new FormData();
          if(this.loginuserId){
            fd.append('login_user_id',this.loginuserId);
          }
          fd.append('agent_id',this.reassignLeadSelectedAgent.client_user_id);
          fd.append('lead_id',leadid);
          this._LeadsService.ReAssignLeads(fd).subscribe((res:any) =>{
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


  Reassign(e:Event, lead_id:any){
    if(lead_id != ''){
      Swal.fire({
        html: `Are you sure want to Re-assign?`,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: `Yes`,
        cancelButtonText: `No`,
      }).then((result) => {
        if(result.isConfirmed){
          alert('Open Modal');
        }
      });

      // Swal.fire({
      //   title: "Do you want to save the changes?",
      //   showDenyButton: true,
      //   showCancelButton: true,
      //   confirmButtonText: "Save",
      //   denyButtonText: `Don't save`
      // }).then((result) => {
      //   /* Read more about isConfirmed, isDenied below */
      //   if (result.isConfirmed) {
      //     Swal.fire("Saved!", "", "success");
      //   } else if (result.isDenied) {
      //     Swal.fire("Changes are not saved", "", "info");
      //   }
      // });
      // Swal.fire({
      //   title: 'Are you sure want to Re-assign?',
      //   showCancelButton: true,
      //   confirmButtonText: 'Yes',
      //   cancelButtonText: 'No',
      // }).then((result) => {
      //   if(result.isConfirmed){
      //     alert('Open Modal');
        //   var fd = new FormData();
        //   fd.append('agent_id',this.reassigAgentId);
        //   fd.append('lead_id',this.reassignleadid);
        //   // fd.append('agent_name',this.reassigAgentName);
        //   this.leadsService.ReAssignLeads(fd).subscribe((res:any) =>{
        //     if(res.status === "success"){
        //       Swal.fire({ title: 'Success', html: 'Lead Re-assigned Successfully', timer: 2000, showConfirmButton: false, });
        //       this.fetch((data: any) => {
        //         this.rows = data;
        //         this.filteredRows = [...this.rows];
        //       });
        //       this.modalService.dismissAll();
        //     }
        //   },(error:any) => {
        //       console.log(error);
        //   });
        // }else{
        //   this.modalService.dismissAll();
        //   this.selectedAgent = null;
        // }
      // });
    }
  }
}

export interface LeadsApi {
  data: Lead[];
  total_count: number;
}

// newcrm@newcrmbackend.evernestre.ae    
// password : .Y,;oNjwRdV9


export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}
  getLeads(sort: string, order: string, page: number): Observable<LeadsApi> {
    const baseUrl = 'http://127.0.0.1:8000/api'; 
    // const baseUrl = 'http://10.99.1.77:8000/api'; 
    // const baseUrl = 'https://newcrmbackend.evernestre.ae/api';
    const leadsUrl = `${baseUrl}/leads/lead-list`;
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






