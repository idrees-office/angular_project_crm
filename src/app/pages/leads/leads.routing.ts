import { Routes } from '@angular/router';
import { CreateLeadComponent } from './create-lead/create-lead.component';
import { ReAssignComponent } from './re-assign/re-assign.component';
import { AssignLeadComponent } from './assign-lead/assign-lead.component';
import { MyLeadComponent } from './my-lead/my-lead.component';
import { permissionGuardGuard } from 'src/app/core/permission-guard.guard';



export const LeadsRoutes: Routes = [
  {
    path: '',
    // canActivate: [permissionGuardGuard],
    children: [
      {
        path: 'create-lead',
        component: CreateLeadComponent,
        data: {
          title: 'Lead Managements',
          urls: [
            { title: 'Dashboard', url: '/leads/create-lead' },
            { title: 'Lead Managements' },
          ],
        },
      },
      {
        path: 'assign-lead',
        component: AssignLeadComponent,
        data: {
          title: 'These Are the New Leads',
          urls: [
            { title: 'Dashboard', url: '/leads/assign-lead' },
            { title: 'Assign Leads' },
          ],
        },
      },
      {
        path: 're-assign',
        component: ReAssignComponent,
        data: {
          title: 'Re-Assign Leads',
          urls: [
            { title: 'Dashboard', url: '/leads/re-assign' },
            { title: 'Re-Assign Leads' },
          ],
        },
      },
      {
        path: 'my-lead',
        component: MyLeadComponent,
        data: {
          title: 'My Leads',
          urls: [
            { title: 'Dashboard', url: '/leads/my-lead' },
            { title: 'My Leads' },
          ],
        },
      },
    ],
  },
];
