import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
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
import { ImportExcelComponent } from './import-excel/import-excel.component';

const router : Routes = [
    {
      path: '',
      children: [
        {
          path: 'import-excel',
          component: ImportExcelComponent,
          data: {
            title: 'Read Excel File',
            urls: [
              { title: 'Dashboard', url: '/excel/import-excel' },
              { title: 'Read Excel File' },
            ],
          },
        },
      ]
    },
  ];

@NgModule({
  declarations: [
    ImportExcelComponent
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
   ],
   providers: [DatePipe],
  
})
export class ExcelModule { }
