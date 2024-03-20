import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';

export interface RoleData {
  id: any;
  name: any;
  counter: number;
}

@Component({
  selector: 'app-createrole',
  templateUrl: './createrole.component.html',
  styleUrls: ['./createrole.component.scss'],
})
export class CreateroleComponent implements OnInit {
  roleFrom: FormGroup;
  isNextDisabled: any;
  RoleObj: any;
  editroleid: number;

  displayedColumns = ['id', 'name', 'actions'];
  dataSource: MatTableDataSource<RoleData>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
    Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);

  constructor(
    private fb: FormBuilder,
    private _UserService: UserService,
    private _ActivatedRoute: ActivatedRoute,
    private _Router:Router
  ) {
    const paramMap = this._ActivatedRoute.snapshot.paramMap;
    this.editroleid = Number(paramMap.get('id'));
    if (this.editroleid) {
      this._UserService.EditRoleService(this.editroleid).subscribe(
        (res: any) => {
          this.RoleObj = res;
        },
        (error: any) => {
          Swal.fire('SomeThing Is Wrong', 'error');
        }
      );
    }
  }

  ngOnInit(): void {
    this.RoleObj = {};
    this.roleFrom = this.fb.group({
      name: new FormControl('', [Validators.required]),
    });
    this.roleFrom.valueChanges.subscribe((e) => {
      this.isNextDisabled = !this.roleFrom.valid;
    });
    this.fetchRoles();
  }


  
  fetchRoles() {
    this._UserService.GetUserRoles().subscribe(
      (res: any) => {
        res.forEach((role: RoleData, index: number) => {
          role.counter = index + 1;
        });
        this.dataSource = new MatTableDataSource<RoleData>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        Swal.fire('Something Went Wrong');
      }
    );
  }

  

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  

  CreateRole(event: any) {
    if (!this.roleFrom.valid) {
      Swal.fire('Something Went Wrong. Please Check All the Fields', 'error');
      return;
    }
    const formData = new FormData();
    const filed = this.roleFrom.value;
    formData.append('name', filed.name);
    let request;
    if (this.editroleid == 0 || this.editroleid === 0) {
      request = this._UserService.CreateRoleServices(formData);
    } else {
      formData.append('id', String(this.editroleid));
      request = this._UserService.UpdateRoleService(formData); 
    }
    request.subscribe(
      (res: any) => {
        if (res.status === 'success') {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            title: `Create Role Successfully`,
            icon: 'success',
          });
          this.roleFrom.reset();
          this.fetchRoles();
        }
        if (res.status === 'update') {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            title: `Update Role Successfully`,
            icon: 'success',
          });
          this.roleFrom.reset();
          this.fetchRoles();
          this._Router.navigate(['users/create-role']);
        }
      },
      (error: any) => {
        Swal.fire('Something Is Wrong', 'error');
      }
    );
  }

  Delete(e: Event, role_id: any) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this._UserService.DeleteRole(role_id).subscribe(
          (res: any) => {
            if (res.status === 'delete') {
              Swal.fire({
                title: 'Success',
                html: 'Lead Delete Successfully',
                timer: 2000,
                showConfirmButton: false,
              });
              this.fetchRoles();
            }
          },
          (error: any) => {
            console.log(error);
          }
        );
      } else {
        // this.modalService.dismissAll();
        // this.selectedAgent = null;
      }
    });
  }

  get f() {
    return this.roleFrom.controls;
  }
}
