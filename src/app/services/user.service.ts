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
  GetUserRole = environment.baseUrl + '/users/get_user_role';
  CreateRoleServiceUrl = environment.baseUrl + '/users/create_role';
  DeleteRoleUrl = environment.baseUrl + '/users/delete_role';
  EditRoleUrl = environment.baseUrl + '/users/edit_role';
  UpdateRoleServiceUrl = environment.baseUrl + '/users/update_role';
  getpermissionUrl = environment.baseUrl + '/users/get_permissions';
  AssignPermissionUrl = environment.baseUrl + '/users/assign_permission';
  GetUserPermissionServiceurl =
    environment.baseUrl + '/users/get_permissions_ids';

  GetRolePermissionServiceUrl =
    environment.baseUrl + '/users/get_role_permissions_ids';

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
  DeleteRole(id: any) {
    return this.http.delete(this.DeleteRoleUrl + '/' + id);
  }
  GetUserRoles() {
    return this.http.get(this.GetUserRole);
  }
  CreateRoleServices(postData: any) {
    return this.http.post(this.CreateRoleServiceUrl, postData);
  }

  EditRoleService(role_id: any) {
    return this.http.get(this.EditRoleUrl + '/' + role_id);
  }

  UpdateRoleService(postData: any) {
    return this.http.post(this.UpdateRoleServiceUrl, postData);
  }

  PermissionService() {
    return this.http.get(this.getpermissionUrl);
  }

  AssignPermissionService(postData: any) {
    return this.http.post(this.AssignPermissionUrl, postData);
  }

  GetUserPermissionService(userid: any) {
    return this.http.get(this.GetUserPermissionServiceurl + '/' + userid);
  }

  GetRolePermissionService(roleid: any) {
     return this.http.get(this.GetRolePermissionServiceUrl + '/' + roleid);
  }
}
