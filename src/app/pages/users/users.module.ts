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
import { CreateuserComponent } from './createuser/createuser.component';

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
      // {
      //   path: 'assign-lead',
      //   component: AssignLeadComponent,
      //   data: {
      //     title: 'Assign Leads',
      //     urls: [
      //       { title: 'Dashboard', url: '/leads/assign-lead' },
      //       { title: 'Assign Leads' },
      //     ],
      //   },
      // },
      // {
      //   path: 're-assign',
      //   component: ReAssignComponent,
      //   data: {
      //     title: 'Re-Assign Leads',
      //     urls: [
      //       { title: 'Dashboard', url: '/leads/re-assign' },
      //       { title: 'Re-Assign Leads' },
      //     ],
      //   },
      // },

      // {
      //   path: 'my-lead',
      //   component: MyLeadComponent,
      //   data: {
      //     title: 'My Leads',
      //     urls: [
      //       { title: 'Dashboard', url: '/leads/my-lead' },
      //       { title: 'My Leads' },
      //     ],
      //   },
      // },
    ],
  },
];


@NgModule({
  declarations: [
    CreateuserComponent
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
    
  ]
})
export class UsersModule { }
