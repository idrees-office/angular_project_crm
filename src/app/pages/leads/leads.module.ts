import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CreateLeadComponent } from './create-lead/create-lead.component';
import { RouterModule } from '@angular/router';
import { LeadsRoutes } from './leads.routing';
import { MaterialModule } from 'src/app/material.module';
import { FormModule } from '../forms/forms.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { MatInputModule } from '@angular/material/input';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReAssignComponent } from './re-assign/re-assign.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AssignLeadComponent } from './assign-lead/assign-lead.component';
import { MyLeadComponent } from './my-lead/my-lead.component';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [
    CreateLeadComponent,
    ReAssignComponent,
    AssignLeadComponent,
    MyLeadComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(LeadsRoutes),
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
export class LeadsModule { }
