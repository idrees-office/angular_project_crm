import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments.dev';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  registerurl = environment.baseUrl+'/auth/regitser';
  loginUrl    = environment.baseUrl+'/auth/login';
  // emailurl = environment.baseUrl+'/auth/check_email';
  logouturl = environment.baseUrl+'/auth/logout';

  forgetpasswordUrl = environment.baseUrl+'/auth/forget_password';

  constructor(private http:HttpClient) { }
  register(postData:any){
    return this.http.post(this.registerurl,postData);
  }
  
  login(postData:any){
    return this.http.post(this.loginUrl,postData);
  }
  
  getLoggedInUsername() {
    return localStorage.getItem('user_email');
  }

  forgetPassword(postData:any){
    return this.http.post(this.forgetpasswordUrl,postData);
  }
  
  logoutFunction(postData:any){
    return this.http.post(this.logouturl,postData);
  }

  
}
