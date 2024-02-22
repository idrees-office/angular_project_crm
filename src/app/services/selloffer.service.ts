import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environments.dev";

@Injectable({
  providedIn: 'root'
})
export class SellofferService {
  createsaleoffer = environment.baseUrl + "/sale/create_sale_offer";
  genratepdf = environment.baseUrl + "/sale/genrate_pdf";
  
  constructor(private http:HttpClient) { }
  
    CreateSaleOffer(postData:any){
      return this.http.post(this.createsaleoffer, postData);
    }

    GenratePdf(postdata: any) {
      return this.http.post(this.genratepdf, postdata, {
        responseType: 'blob' // Set response type to blob
      });
    }
}
