import { Routes } from '@angular/router';
import { CreateLeadComponent } from './create-lead/create-lead.component';
import { ReAssignComponent } from './re-assign/re-assign.component';
import { AssignLeadComponent } from './assign-lead/assign-lead.component';
import { MyLeadComponent } from './my-lead/my-lead.component';

export const LeadsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create-lead',
        component: CreateLeadComponent,
        data: {
          title: 'Add New Lead',
          urls: [
            { title: 'Dashboard', url: '/leads/create-lead' },
            { title: 'Add New Lead' },
          ],
        },
      },
      {
        path: 'assign-lead',
        component: AssignLeadComponent,
        data: {
          title: 'Here are the latest leads',
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
          title: 'My All Leads',
          urls: [
            { title: 'Dashboard', url: '/leads/my-lead' },
            { title: 'My All Leads' },
          ],
        },
      },
    ],
  },
];
