import { Routes } from '@angular/router';
import { CreateLeadComponent } from './create-lead/create-lead.component';
import { ReAssignComponent } from './re-assign/re-assign.component';

export const LeadsRoutes: Routes = [
  {
    path: '',
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

    ],
  },
];
