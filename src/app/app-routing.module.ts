import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './core/auth.guard';




const routes: Routes = [
  { path:'authentication', loadChildren: () => import('./pages/authentication/authentication.module').then(m => m.AuthenticationModule) },
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'starter', loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule) },
      { path: 'leads', loadChildren: () => import('./pages/leads/leads.module').then((m) => m.LeadsModule) },
      { path: 'excel', loadChildren: () => import('./pages/excel/excel.module').then((m) => m.ExcelModule) },
      { path: 'sale', loadChildren: () => import('./pages/sale/sale.module').then((m) => m.SaleModule) },
      { path: 'users', loadChildren: () => import('./pages/users/users.module').then((m) => m.UsersModule) },
      { path: 'ui-components', loadChildren: () => import('./pages/ui-components/ui-components.module').then((m) => m.UicomponentsModule) },
      { path: 'forms', loadChildren: () => import('./pages/forms/forms.module').then((m) => m.FormModule) },
      { path: 'charts', loadChildren: () => import('./pages/charts/charts.module').then((m) => m.ChartsModule) },
      { path: 'apps', loadChildren: () => import('./pages/apps/apps.module').then((m) => m.AppsModule) },
      { path: 'widgets', loadChildren: () => import('./pages/widgets/widgets.module').then((m) => m.WidgetsModule) },
      { path: 'tables', loadChildren: () => import('./pages/tables/tables.module').then((m) => m.TablesModule) },
      { path: 'theme-pages', loadChildren: () => import('./pages/theme-pages/theme-pages.module').then((m) => m.ThemePagesModule) },

      { path: '', redirectTo: 'dashboards/dashboard1', pathMatch: 'full' }, 
      // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'authentication/error', pathMatch: 'full' }
];




// const routes: Routes = [
//   {
//     path: '',
//     component: FullComponent,
//     canActivate: [AuthGuard],
//     children: [
//       { path: 'starter', loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule) },
//       { path: 'dashboards', loadChildren: () => import('./pages/dashboards/dashboards.module').then((m) => m.DashboardsModule) },
//       { path: 'leads', loadChildren: () => import('./pages/leads/leads.module').then((m) => m.LeadsModule) },
//       { path: 'excel', loadChildren: () => import('./pages/excel/excel.module').then((m) => m.ExcelModule) },
//       { path: 'sale', loadChildren: () => import('./pages/sale/sale.module').then((m) => m.SaleModule) },
//       { path: 'users', loadChildren: () => import('./pages/users/users.module').then((m) => m.UsersModule) },
//       { path: 'ui-components', loadChildren: () => import('./pages/ui-components/ui-components.module').then((m) => m.UicomponentsModule) },
//       { path: 'forms', loadChildren: () => import('./pages/forms/forms.module').then((m) => m.FormModule) },
//       { path: 'charts', loadChildren: () => import('./pages/charts/charts.module').then((m) => m.ChartsModule) },
//       { path: 'apps', loadChildren: () => import('./pages/apps/apps.module').then((m) => m.AppsModule) },
//       { path: 'widgets', loadChildren: () => import('./pages/widgets/widgets.module').then((m) => m.WidgetsModule) },
//       { path: 'tables', loadChildren: () => import('./pages/tables/tables.module').then((m) => m.TablesModule) },
//       { path: 'theme-pages', loadChildren: () => import('./pages/theme-pages/theme-pages.module').then((m) => m.ThemePagesModule) }
//     ]
//   },
//   {
//     path: '',
//     component: BlankComponent,
//     children: [
//       { path: 'authentication', loadChildren: () => import('./pages/authentication/authentication.module').then((m) => m.AuthenticationModule) },
//       { path: 'landingpage', loadChildren: () => import('./pages/theme-pages/landingpage/landingpage.module').then((m) => m.LandingPageModule) }
//     ]
//   },
//   { path: '', redirectTo: '/dashboards/dashboard1', pathMatch: 'full' },
//   { path: '**', redirectTo: 'authentication/error' }
// ];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
