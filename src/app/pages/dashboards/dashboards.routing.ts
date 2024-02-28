import { Routes } from '@angular/router';
// dashboards
import { AppDashboard1Component } from './dashboard1/dashboard1.component';
import { AppDashboard2Component } from './dashboard2/dashboard2.component';


export const DashboardsRoutes: Routes = [
  {
    path: 'dashboards', // Add a parent path for all dashboard routes
    children: [
      {
        path: '', // Empty path for default dashboard
        redirectTo: 'dashboard1',
        pathMatch: 'full',
      },
      {
        path: 'dashboard1',
        component: AppDashboard1Component,
        data: {
          title: 'Analytical',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Analytical' },
          ],
        },
      },
      {
        path: 'dashboard2',
        component: AppDashboard2Component,
        data: {
          title: 'eCommerce',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'eCommerce' },
          ],
        },
      },
      {
        path: 'dashboard1/:type',
        component: AppDashboard1Component,
        data: {
          title: 'Email',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Email' },
          ],
        },
      },
    ],
  },
];


// export const DashboardsRoutes: Routes = [
//   {
//     path: '',
//     children: [
//       {
//         path: 'dashboard1',
//         component: AppDashboard1Component,
//         data: {
//           title: 'Analytical',
//           urls: [
//             { title: 'Dashboard', url: '/dashboards/dashboard1' },
//             { title: 'Analytical' },
//           ],
//         },
//       },
//       {
//         path: 'dashboard2',
//         component: AppDashboard2Component,
//         data: {
//           title: 'eCommerce',
//           urls: [
//             { title: 'Dashboard', url: '/dashboards/dashboard1' },
//             { title: 'eCommerce' },
//           ],
//         },
//       },
//       {
//         path: 'dashboard1/:type',
//         component: AppDashboard1Component,
//         data: {
//           title: 'Email',
//           urls: [
//             { title: 'Dashboard', url: '/dashboards/dashboard1' },
//             { title: 'Email' },
//           ],
//         },
//       },
//     ],
//   },
// ];


// export const DashboardsRoutes: Routes = [
//   {
//     path: '',
//     children: [
//       {
//         path: 'dashboard1',
//         component: AppDashboard1Component,
//         data: {
//           title: 'Analytical',
//           urls: [
//             { title: 'Dashboard', url: '/dashboards/dashboard1' },
//             { title: 'Analytical' },
//           ],
//         },
//       },
//       {
//         path: 'dashboard2',
//         component: AppDashboard2Component,
//         data: {
//           title: 'eCommerce',
//           urls: [
//             { title: 'Dashboard', url: '/dashboards/dashboard1' },
//             { title: 'eCommerce' },
//           ],
//         },
//       },
//       // { path: 'email', redirectTo: 'email/inbox', pathMatch: 'full' },

//       { path: 'dashboards', redirectTo: 'dashboards/dashboard1', pathMatch: 'full' },
//       {
//         path: 'dashboard1/:type',
//         component: AppDashboard1Component,
//         data: {
//           title: 'Email',
//           urls: [
//             { title: 'Dashboard', url: '/dashboards/dashboard1' },
//             { title: 'Email' },
//           ],
//         },

//         // children: [
//         //   {
//         //     path: ':id',
//         //     component: DetailComponent,
//         //     data: {
//         //       title: 'Email Detail',
//         //       urls: [
//         //         { title: 'Dashboard', url: '/dashboards/dashboard1' },
//         //         { title: 'Email Detail' },
//         //       ],
//         //     },
//         //   },
//         // ],

//       },

//     ],
//   },
// ];
