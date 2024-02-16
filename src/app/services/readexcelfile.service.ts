import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environments.dev';

@Injectable({
  providedIn: 'root'
})
export class ReadexcelfileService {
  readexcel  = environment.baseUrl + "/excel/read_excel";
  constructor(private _http:HttpClient) { }

  ReadFile(postData:any){
    return this._http.post(this.readexcel, postData);
  }

}
