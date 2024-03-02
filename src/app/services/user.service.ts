import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments.dev';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  createUrl = environment.baseUrl + '/users/create_user';
  deleteUrl = environment.baseUrl + '/users/delete_user';
  getUrl = environment.baseUrl + '/users/edit_user';
  updateUrl = environment.baseUrl + '/users/update_user';
  updatesortOrderUrl = environment.baseUrl + '/users/update_sort_order';
  private user: any = null;
  private storageKey = 'userData';
  // private storageKey = 'userData';

  private tokenuser: any = null;
  private token = 'token';

  constructor(private http: HttpClient) {}

  create(postData: any) {
    return this.http.post(this.createUrl, postData);
  }

  delete(id: any) {
    return this.http.delete(this.deleteUrl + '/' + id);
  }

  update(postData: any) {
    return this.http.post(this.updateUrl, postData);
  }

  updatesortOrder(postData: any) {
    return this.http.post(this.updatesortOrderUrl, postData);
  }

  edit(id: any) {
    return this.http.get(this.getUrl + '/' + id);
  }

  setUser(user: any) {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  setToken(tokenuser: any) {
    localStorage.setItem(this.token, JSON.stringify(tokenuser));
  }

  clearUser() {
    this.user = null;
    localStorage.removeItem(this.storageKey);
  }
}

