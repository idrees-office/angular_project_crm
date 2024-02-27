import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { SellofferService } from 'src/app/services/selloffer.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


export interface SaleOffer {
  lead_id: any;
  agent_name: any;
  client_user_designation: any;
  client_user_email: any;
  imagePath: string;
  lead_title:any;
  // Add any other properties you need for leads
}


@Component({
  selector: 'app-list-sale-offer',
  templateUrl: './list-sale-offer.component.html',
  styleUrls: ['./list-sale-offer.component.scss']
})


export class ListSaleOfferComponent implements OnInit  {

  displayedColumns: string[] = ['saleoffer_id', 'project_name', 'selling_price', 'total_area', 'built_up_area', 'actions'];
  exampleDatabase: ExampleHttpDatabase | null = null;
  saleofferData: SaleOffer[] = [];
  counter: number = 1;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  @ViewChild(MatPaginator) paginator: MatPaginator ;
  @ViewChild(MatSort) sort: MatSort ;
  
  constructor(private _httpClient: HttpClient, private _SellofferService:SellofferService){}
  ngAfterViewInit(): void {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient,);
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
        ).subscribe((data) => (this.saleofferData = data));
    }
  }
  ngOnInit(): void { 
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
            this.saleofferData = data.data;
          }
        });
    }
  }

  // downloadPdf(e: Event, saleId: any) {
  //   if (saleId) {
  //     const fd = new FormData();
  //     fd.append('sale_id', saleId);
  //     this._SellofferService.GenratePdf(fd).subscribe((res: Blob) => {
  //       const file = new Blob([res], { type: 'application/pdf' });
  //       const fileURL = URL.createObjectURL(file);
  //       // Create a link element
  //       const link = document.createElement('a');
  //       link.href = fileURL;
  //       link.download = 'filename.pdf'; // Set desired filename for the downloaded file
  //       // Trigger a click event on the link element
  //       document.body.appendChild(link);
  //       link.click();
  //       // Cleanup: remove the link element and revoke the object URL
  //       document.body.removeChild(link);
  //       URL.revokeObjectURL(fileURL);
  //     });
  //   }
  // }
  
  

  downloadPdf(e:Event,saleId: any) {
    if (saleId) {
      const fd = new FormData();
      fd.append('sale_id', saleId);
      this._SellofferService.GenratePdf(fd).subscribe((res: Blob) => {
        const file = new Blob([res], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL); // Open the PDF in a new tab for download
      });
    }
  }
  


  // down(e:Event, sale_id:any){
  //   if(sale_id){
  //     var fd = new FormData();
  //     fd.append('sale_id',sale_id)
  //     this._SellofferService.GenratePdf(fd).subscribe((res:any) => {
  //       console.log(res);
  //     });
  //   }
  // }



}

export interface SaleofferApi {
  data: SaleOffer[];
  total_count: number;
}

export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}
  getLeads(sort: string, order: string, page: number): Observable<SaleofferApi> {
    // const baseUrl = 'http://127.0.0.1:8000/api'; 
    const baseUrl = 'https://newcrmbackend.evernestre.ae/api'; 
    // const baseUrl = 'http://10.99.1.77:8000/api'; 
    const leadsUrl = `${baseUrl}/sale/saleoffer-list`;
    // Adjust query parameters based on your backend API
    const requestUrl = `${leadsUrl}?sort=${sort}&order=${order}&page=${page + 1}`;
    return this._httpClient.get<SaleofferApi>(requestUrl).pipe(
      map(data => ({...data, data: data.data.map((lead, index) => ({...lead,counter: index + 1 + page * 10 // Assuming pageSize is 10, adjust accordingly if different
        }))
      }))
    );
  }
}
