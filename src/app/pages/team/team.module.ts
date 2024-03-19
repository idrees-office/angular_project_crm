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
import { CreateteamComponent } from './createteam/createteam.component';

const router: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create-team',
        component: CreateteamComponent,
        data: {
          title: 'Team Managements',
          urls: [
            { title: 'Dashboard', url: 'team/create-team' },
            { title: 'Team Managements' },
          ],
        },
      },
    ],
  },
];

@NgModule({
  declarations: [CreateteamComponent],
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
export class TeamModule {}
