import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments.dev';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  registerurl = environment.baseUrl + '/auth/regitser';
  loginUrl = environment.baseUrl + '/auth/login';
  // emailurl = environment.baseUrl+'/auth/check_email';
  logouturl = environment.baseUrl + '/auth/logout';
  forgetpasswordUrl = environment.baseUrl + '/auth/forget_password';
  get = environment.baseUrl + '/auth/send-reset-link-email';

  checkUserExistOrNot = environment.baseUrl + '/auth/check-user-exist-or-not';

  constructor(private http: HttpClient) {}
  register(postData: any) {
    return this.http.post(this.registerurl, postData);
  }

  login(postData: any) {
    return this.http.post(this.loginUrl, postData);
  }

  getLoggedInUsername() {
    return localStorage.getItem('user_email');
  }

  forgetPassword(postData: any) {
    return this.http.post(this.forgetpasswordUrl, postData);
  }

  logoutFunction(postData: any) {
    return this.http.post(this.logouturl, postData);
  }

  sendResetLink(postData: any) {
    return this.http.get(this.get, postData);
  }

  // checkUserExistOrNotFun(id: any) {
  //   return this.http.get(this.checkUserExistOrNot + '/' + id);
  // }

  checkUserDataExists(id: any) {
    return this.http.get(this.checkUserExistOrNot + '/' + id);
  }

  hasPermission(permission: string): boolean {
    // Example logic: assuming all users have permission for demonstration
    return true;
  }
}
