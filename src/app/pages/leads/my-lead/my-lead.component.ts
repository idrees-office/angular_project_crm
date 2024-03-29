import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { LeadsService } from 'src/app/services/leads.service';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf, throwError } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environments.dev';
import { Router } from '@angular/router';

export interface Lead {
  lead_id: any;
  agent_name: any;
  client_user_designation: any;
  client_user_email: any;
  imagePath: string;
  lead_title:any;
  
}

@Component({
  selector: 'app-my-lead',
  templateUrl: './my-lead.component.html',
  styleUrls: ['./my-lead.component.scss'],
})
export class MyLeadComponent implements OnInit {
  displayedColumns: string[] = [
    'lead_id',
    'lead_title',
    'customer_name',
    'customer_email',
    'customer_phone',
    // 'customer_phone2',
    'date',
  ];
  exampleDatabase: ExampleHttpDatabase | null = null;
  leadsData: Lead[] = [];
  counter: number = 1;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  reassignLeadSelectedAgent: any;
  allAgents: any;
  userData: any;
  user: any;
  loginuserId: any;
  role: any;
  startDate: any;
  endDate: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private _httpClient: HttpClient,
    private _LeadsService: LeadsService,
    private _http: HttpClient,
    private _router: Router
  ) 
  {}
  ngAfterViewInit(): void {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient, this._router);
    if (this.sort && this.paginator) {
      this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoadingResults = true;
            return this.exampleDatabase!.getLeads(
              this.loginuserId,
              this.sort.active,
              this.sort.direction,
              this.paginator.pageIndex,
              this.startDate,
              this.endDate
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
    this.agents();
  }

  reloadData(startDate?: any, endDate?: any) {
    if (this.sort && this.paginator) {
      this.isLoadingResults = true;
      this.exampleDatabase!.getLeads(
        this.loginuserId,
        this.sort.active,
        this.sort.direction,
        this.paginator.pageIndex,
        startDate,
        endDate
      )
        .pipe(
          catchError(() => {
            this.isLoadingResults = false;
            this.isRateLimitReached = true;
            return observableOf([]);
          })
        )
        .subscribe((data: any) => {
          if ('data' in data) {
            this.isLoadingResults = false;
            this.isRateLimitReached = false;
            this.resultsLength = data.total_count;
            this.leadsData = data.data;

            console.log('ddddd');
            console.log(this.leadsData);
          }
        });
    }
  }

  exportToCSV(startDate?: any, endDate?: any) {
    if (this.leadsData && this.leadsData.length > 0) {
      const fd = new FormData();
      if (startDate !== '') {
        fd.append('startDate', startDate);
      }
      if (endDate !== '') {
        fd.append('endDate', endDate);
      }
      if (this.loginuserId !== '') {
        fd.append('login_user_id', this.loginuserId);
      }
      this._LeadsService.FilterCsv(fd).subscribe((res: any) => {
        window.open(res.data);
        // const url = ' http://127.0.0.1:8000/crmproject/public/csv';
      }, (error:any) => {
          if (error.status == 403 || error.status === 403) {
            this._router.navigate(['error']);
          }
      });
    }
  }

  agents() {
    this._LeadsService.getAgentInfo().subscribe(
      (res: any) => {
        this.allAgents = res;
      },
      (error: any) => {
         if (error.status == 403 || error.status === 403) {
           this._router.navigate(['error']);
         }
      }
    );
  }

  displayLeadLabel(agent: any): string {
    return agent ? agent.client_user_name : '';
  }
  filter(startDate: string, endDate: string) {
    this.reloadData(startDate, endDate);
  }
  reload() {
    window.location.reload();
  }
}

export interface LeadsApi {
  data: Lead[];
  total_count: number;
}

export class ExampleHttpDatabase {

  constructor(private _httpClient: HttpClient, private _router: Router) {}
  getLeads(
    loginuserId: any,
    sort: string,
    order: string,
    page: number,
    startDate: any,
    endDate: any
  ): Observable<LeadsApi> {
    const baseUrl = environment.baseUrl;
    let leadsUrl = `${baseUrl}/leads/get-my-lead`;

    // if (role == 2 || role === 2) {
    //   leadsUrl += `/${loginuserId}`;
    // }
    let params = new HttpParams()
      .set('sort', sort)
      .set('order', order)
      .set('page', (page + 1).toString());
    // Add filter parameters if provided
    if (startDate && endDate) {
      params = params.set('startDate', startDate).set('endDate', endDate);
    }
    const requestUrl = `${leadsUrl}`;

    return this._httpClient.get<LeadsApi>(requestUrl, { params }).pipe(
      map((data) => ({
        ...data,
        data: data.data.map((lead, index) => ({
          ...lead,
          counter: index + 1 + page * 10,
        })),
      })),
      catchError(
        (error) => { this._router.navigate(['/error']); return throwError(error);}
      )
    );
  }
}





