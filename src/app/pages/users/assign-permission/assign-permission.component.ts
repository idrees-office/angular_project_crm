import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { LeadsService } from 'src/app/services/leads.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';

export interface PermissionData {
  id: any;
  name: any;
  counter: number;
}

@Component({
  selector: 'app-assign-permission',
  templateUrl: './assign-permission.component.html',
  styleUrls: ['./assign-permission.component.scss'],
})
export class AssignPermissionComponent implements OnInit {
  AssignPermissionFrom: FormGroup;
  isNextDisabled: any;
  AllRole: any;
  allAgents: any;
  AllPermission: any;
  checkedItems: number[] = [];

  displayedColumns = ['id', 'name'];
  dataSource: MatTableDataSource<PermissionData>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
    Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);

  constructor(
    private _fb: FormBuilder,
    private _UserService: UserService,
    private _LeadsService: LeadsService
  ) {}

  ngOnInit(): void {
    this.AssignPermissionFrom = this._fb.group({
      roles: new FormControl(''),
      clients: new FormControl(''),
      // checkedItems: this._fb.array([]),
      checkedItems: new FormControl('', [Validators.required]),
    });

    this.getrole();
    this.agents();
    this.getPermission();
  }

  displayLeadLabel(role: any): string {
    return role ? role.name : '';
  }

  displayLeadLabel2(role: any): string {
    return role ? role.client_user_name : '';
  }

  getrole() {
    this._UserService.GetUserRoles().subscribe((res: any) => {
      this.AllRole = res;
    });
  }

  agents() {
    this._LeadsService.getAgentInfo().subscribe(
      (res: any) => {
        this.allAgents = res;
        // console.log(this.allAgents)
        
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  isChecked(item: any): boolean {
    return this.checkedItems.includes(item.id);
  }

  selectCheckboxesBasedOnResponseIds(responseIds: any[]) {
    this.checkedItems = responseIds;

    console.log(this.checkedItems);

  }

  toggleCheckbox(item: any) {
    if (this.isChecked(item)) {
      this.checkedItems = this.checkedItems.filter((id) => id !== item.id);
    } else {
      this.checkedItems.push(item.id);
    }
  }

  // toggleCheckbox(event: any, rowId: any) {
  //   const checkedItemsArray = this.AssignPermissionFrom.get('checkedItems') as FormArray;
  //   if (event.checked) {
  //     checkedItemsArray.push(new FormControl(rowId));
  //   } else {
  //     const index = checkedItemsArray.controls.findIndex(
  //       (x) => x.value === rowId
  //     );
  //     checkedItemsArray.removeAt(index);
  //   }
  // }
  getPermission() {
    this._UserService.PermissionService().subscribe(
      (res: any) => {
        res.forEach((role: PermissionData, index: number) => {
          role.counter = index + 1;
        });
        this.dataSource = new MatTableDataSource<PermissionData>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        Swal.fire('Something Went Wrong');
      }
    );
  }

  // getPermission() {
  //   this._UserService.PermissionService().subscribe(
  //     (res: any) => {
  //       this.AllPermission = res;
  //       console.log(this.AllPermission);
  //     },
  //     (error: any) => {
  //       console.log(error);
  //     }
  //   );
  // }

  userRole(var_this:any) {
    const clientsControl = this.AssignPermissionFrom.get('clients');
    if (clientsControl !== null) {
      clientsControl.reset();
    }
    const roleId = var_this.id;
    this._UserService.GetRolePermissionService(roleId).subscribe((res:any) =>{
          this.selectCheckboxesBasedOnResponseIds(res);

    });

  }

  users(client_user_id: any) {
    const rolesControl = this.AssignPermissionFrom.get('roles');
    if (rolesControl !== null) {
      rolesControl.reset();
    }

    // Get Permission
    const userid = client_user_id;
    this._UserService.GetUserPermissionService(userid).subscribe((res: any) => {
      this.selectCheckboxesBasedOnResponseIds(res);
    }, (error:any) =>{
        console.log(error);
    });

    // alert(client_user_id);
  }

  Delete(e: any, permission_id: any) {}

  AssignPermission(event: any) {
    if (!this.AssignPermissionFrom.valid) {
      Swal.fire('Something Went Wrong. Please Check All the Fields', 'error');
      return;
    }
    const formData = new FormData();
    const filed = this.AssignPermissionFrom.value;
    if (filed.clients !== null || filed.clients != null) {
      formData.append('client_user_id', filed.clients.client_user_id);
    }
    if (filed.roles !== null || filed.roles != null) {
      formData.append('role_id', filed.roles.id);
    }
    formData.append('permission', this.checkedItems.join(','));
    this._UserService.AssignPermissionService(formData).subscribe(
      (res: any) => {
        if (res.status === 'success') {
          Swal.fire({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            title: 'Permission Assign Successfully',
            icon: 'success',
          });
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  get f() {
    return this.AssignPermissionFrom.controls;
  }
}
