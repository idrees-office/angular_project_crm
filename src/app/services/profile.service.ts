import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments.dev';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  updateprofile = environment.baseUrl + '/users/update_user_profile';
  updatepassword = environment.baseUrl + '/users/update_password';

  constructor(private http: HttpClient) {}

  UpdateProfile(FormData: any) {
    return this.http.post(this.updateprofile, FormData);
  }

  UpdatePassword(postData: any) {
    return this.http.post(this.updatepassword, postData);
  }
}
