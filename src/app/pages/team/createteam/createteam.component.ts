import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


export interface TeamData {
  id: any;
  name: any;
  counter: number;
}


@Component({
  selector: 'app-createteam',
  templateUrl: './createteam.component.html',
  styleUrls: ['./createteam.component.scss'],
})
export class CreateteamComponent implements OnInit {
  teamFrom: FormGroup;
  isNextDisabled: any;
  TeamObj: any;
  editroleid: number;

  displayedColumns = ['id', 'name', 'actions'];
  dataSource: MatTableDataSource<TeamData>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
    Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);

  constructor(
    private fb: FormBuilder,
    private _UserService: UserService,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router
  ) {
    const paramMap = this._ActivatedRoute.snapshot.paramMap;
    this.editroleid = Number(paramMap.get('id'));
    if (this.editroleid) {
      this._UserService.EditRoleService(this.editroleid).subscribe(
        (res: any) => {
          this.TeamObj = res;
        },
        (error: any) => {
          Swal.fire('SomeThing Is Wrong', 'error');
        }
      );
    }
  }

  ngOnInit(): void {
    this.TeamObj = {};
    this.teamFrom = this.fb.group({
      name: new FormControl('', [Validators.required]),
    });
    this.teamFrom.valueChanges.subscribe((e) => {
      this.isNextDisabled = !this.teamFrom.valid;
    });
    this.fetchRoles();
  }

  fetchRoles() {
    this._UserService.GetUserRoles().subscribe(
      (res: any) => {
        res.forEach((role: TeamData, index: number) => {
          role.counter = index + 1;
        });
        this.dataSource = new MatTableDataSource<TeamData>(res);
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

  CreateTeam(event: any) {
    if (!this.teamFrom.valid) {
      Swal.fire('Something Went Wrong. Please Check All the Fields', 'error');
      return;
    }
    const formData = new FormData();
    const filed = this.teamFrom.value;
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
          this.teamFrom.reset();
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
          this.teamFrom.reset();
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
    return this.teamFrom.controls;
  }
}
