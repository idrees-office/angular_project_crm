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
import { environment } from 'src/environments/environments.dev';
import { Router } from '@angular/router';
import { FilterPipe } from 'src/app/pipe/filter.pipe';
import { FormControl } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

export interface Lead {
  lead_id: any;
  agent_name: any;
  client_user_designation: any; 
  client_user_email: any;
  imagePath: string;
  lead_title:any;
}

@Component({
  selector: 'app-assign-lead',
  templateUrl: './assign-lead.component.html',
  styleUrls: ['./assign-lead.component.scss'],
})
export class AssignLeadComponent implements OnInit {
  displayedColumns: string[] = [
    'lead_id',
    'lead_title',
    'customer_name',
    'customer_phone',
    'lead_source',
    'assign',
    'date',
  ];
  exampleDatabase: ExampleHttpDatabase | null = null;
  leadsData: Lead[] = [];
  counter: number = 1;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  reassignLeadSelectedAgent: any;
  allAgents: any[] = [];
  filteredOptions: Observable<any[]>;
  filteredOptions2: Observable<any[]>;
  userData: any;
  user: any;
  loginuserId: any;
  role: any;
  searchText: string;
  filteredAgents: any[];
  firstControl = new FormControl('');
  firstControl2 = new FormControl('');
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  assigemultipleleadtoagent = false;
  selectedLeads: any[] = [];
  constructor(
    private _httpClient: HttpClient,
    private _LeadsService: LeadsService,
    private _Router: Router,
    private _ChangeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);
    if (this.sort && this.paginator) {
      this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoadingResults = true;
            return this.exampleDatabase!.getLeads(
              this.sort.active,
              this.sort.direction,
              this.paginator.pageIndex
            );
          }),
          map((data) => {
            this.isLoadingResults = false;
            this.isRateLimitReached = false;
            this.resultsLength = data.total_count;
            return data.data;
          }),
          catchError(() => {
            this.isLoadingResults = false;
            this.isRateLimitReached = true;
            return observableOf([]);
          })
        )
        .subscribe((data) => (this.leadsData = data));
    }
  }

  ngOnInit(): void {
    this.userData = localStorage.getItem('userData');
    this.user = JSON.parse(this.userData);
    this.loginuserId = this.user.client_user_id;
    this.role = this.user.role_id;
    this.agents();

    this.filteredOptions = this.firstControl.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value))
    );

    this.filteredOptions2 = this.firstControl2.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value))
    );
  }

  private _filter(value: any): any[] {
    return this.allAgents
      .filter((agent) => agent.client_user_name.includes(value))
      .map((agent) => ({
        name: agent.client_user_name,
        id: agent.client_user_id,
      }));
  }

  displaySelectedAgent(agent: any): string {
    return agent ? agent.name : '';
  }

  agents() {
    this._LeadsService.getAgentInfo().subscribe(
      (res: any) => {
        this.allAgents = res;
      },
      (error: any) => {
        if (error.status == 430 || error.status === 430) {
          this._Router.navigate(['error']);
        }
      }
    );
  }

  Delete(e: Event, lead_id: any) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this._LeadsService.DeleteLead(lead_id).subscribe(
          (res: any) => {
            if (res.status === 'delete') {
              Swal.fire({
                title: 'Success',
                html: 'Lead Delete Successfully',
                timer: 2000,
                showConfirmButton: false,
              });
              this.reloadData();
            }
          },
          (error: any) => {
            if (error.status == 430 || error.status === 430) {
              this._Router.navigate(['error']);
            }
          }
        );
      } else {
        // this.modalService.dismissAll();
        // this.selectedAgent = null;
      }
    });
  }

  reloadData() {
    if (this.sort && this.paginator) {
      this.isLoadingResults = true;
      this.exampleDatabase!.getLeads(
        this.sort.active,
        this.sort.direction,
        this.paginator.pageIndex
      )
        .pipe(
          catchError(() => {
            this.isLoadingResults = false;
            this.isRateLimitReached = true;
            return observableOf([]);
          })
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

  onOptionSelected(e: MatAutocompleteSelectedEvent, leads: any) {
    const selectedAgent = e.option.value;
    this.firstControl.setValue(selectedAgent.name);
    this._ChangeDetectorRef.detectChanges();
    Swal.fire({
      html: `Are you sure want to Assign?`,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: `Yes`,
      cancelButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.reassignLeadSelectedAgent = e.option.value;
        const leadid = leads.lead_id;
        if (this.reassignLeadSelectedAgent != '' && leadid != '') {
          var fd = new FormData();
          fd.append('agent_id', this.reassignLeadSelectedAgent.id);
          fd.append('lead_id', leadid);
          if (this.loginuserId) {
            fd.append('login_user_id', this.loginuserId);
          }
          this._LeadsService.AssignLeads(fd).subscribe(
            (res: any) => {
              if (res.status === 'success') {
                Swal.fire({
                  title: 'Success',
                  html: 'Lead Re-assigned Successfully',
                  timer: 2000,
                  showConfirmButton: false,
                });
                this.reloadData();
              }
            },
            (error: any) => {
              if (error.status == 430 || error.status === 430) {
                this._Router.navigate(['error']);
              }
            }
          );
        } else {
          alert('SomeThing Wrong');
        }
      }
    });
  }

  displayLeadLabel(agent: any): string {
    return agent ? agent.client_user_name : '';
  }

  onLeadSelectionChange(lead: any) {
    const index = this.selectedLeads.findIndex(
      (selectedLead) => selectedLead.lead_id === lead.lead_id
    );
    if (index === -1) {
      this.selectedLeads.push(lead);
    } else {
      this.selectedLeads.splice(index, 1);
    }

    this.assigemultipleleadtoagent = this.selectedLeads.length > 0;
  }

  isSelected(lead: any): boolean {
    return this.selectedLeads.some(
      (selectedLead) => selectedLead.lead_id === lead.lead_id
    );
  }

  AssigMultipleLeadstoAgent(event: any) {
    const fd = new FormData();
    const _selectedAgent = event.option.value;
    fd.append('agent_id', _selectedAgent.id);
    this.selectedLeads.forEach((lead) => {
      fd.append('lead_id[]', lead.lead_id);
    });
    this._LeadsService.AssignMultipleLead(fd).subscribe((res: any) => {
      console.log(res);
    });
  }
}

export interface LeadsApi {
  data: Lead[];
  total_count: number;
}
export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}
  getLeads(sort: string, order: string, page: number): Observable<LeadsApi> {
    const baseUrlofleads = environment.baseUrl;
    let leadsUrl = `${baseUrlofleads}/leads/new-unassigned-lead`;
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
