import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LeadsService } from 'src/app/services/leads.service';
import Swal from 'sweetalert2';


export interface UserData {
  client_user_id: any;
  client_user_name: any;
  client_user_email: any;
  client_user_designation: any;
  counter: number;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  allAgents: any[] = [];

  displayedColumns = ['id', 'name', 'email', 'designation'];
  dataSource: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
    Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);

  constructor(private _LeadsService: LeadsService, private _Router: Router) {}

  ngOnInit(): void {
    this.agents();
  }

  agents() {
    this._LeadsService.getAgentInfo().subscribe(
      (res: any) => {
        res.forEach((role: UserData, index: number) => {
          role.counter = index + 1;
        });
        this.dataSource = new MatTableDataSource<UserData>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        Swal.fire('Something Went Wrong');
      }
    );
  }

  // agents() {
  //   this._LeadsService.getAgentInfo().subscribe(
  //     (res: any) => {
  //       this.allAgents = res;

  //       console.log(this.allAgents);
  //     },
  //     (error: any) => {
  //       if (error.status == 430 || error.status === 430) {
  //         this._Router.navigate(['error']);
  //       }
  //     }
  //   );
  // }

  Delete(e: Event, user_id: any) {
    console.log(e);
  }
}
