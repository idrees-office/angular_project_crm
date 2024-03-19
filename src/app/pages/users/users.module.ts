import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';

import { MaterialModule } from 'src/app/material.module';
import { FormModule } from '../forms/forms.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { MatInputModule } from '@angular/material/input';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { CreateuserComponent } from './createuser/createuser.component';
import { CreateroleComponent } from './createrole/createrole.component';
import { AssignPermissionComponent } from './assign-permission/assign-permission.component';
import { ListRoleComponent } from './list-role/list-role.component';

const router: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create-user',
        component: CreateuserComponent,
        data: {
          title: 'User Managements',
          urls: [
            { title: 'Dashboard', url: 'users/create-user' },
            { title: 'User Managements' },
          ],
        },
      },
      {
        path: 'create-role',
        component: CreateroleComponent,
        data: {
          title: 'Create Role',
          urls: [
            { title: 'Dashboard', url: 'users/create-role' },
            { title: 'Create Role' },
          ],
        },
      },
      {
        path: 'edit-role/:id',
        component: CreateroleComponent,
        data: {
          title: 'Create Role',
          urls: [
            { title: 'Dashboard', url: 'users/create-role' },
            { title: 'Create Role' },
          ],
        },
      },

      {
        path: 'assign-permission',
        component: AssignPermissionComponent,
        data: {
          title: 'Assign Permission',
          urls: [
            { title: 'Dashboard', url: 'users/assign-permission' },
            { title: 'Assign Permission' },
          ],
        },
      },
    ],
  },
];


@NgModule({
  declarations: [
    CreateuserComponent,
    CreateroleComponent,
    AssignPermissionComponent,
    ListRoleComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    MaterialModule,
    FormsModule,
    FormModule,
    ReactiveFormsModule,
    TablerIconsModule,
    TablerIconsModule.pick(TablerIcons),
    MatInputModule,
    NgSelectModule,
    NgxPaginationModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
  ],
})
export class UsersModule {}
