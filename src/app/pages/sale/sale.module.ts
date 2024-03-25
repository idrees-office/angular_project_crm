import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SaleOfferComponent } from './sale-offer/sale-offer.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormModule } from '../forms/forms.module';
import { MatInputModule } from '@angular/material/input';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { ListSaleOfferComponent } from './list-sale-offer/list-sale-offer.component';

const router : Routes = [
  {
    path : '',
    children : [
      {
        path: 'sale-offer',
        component: SaleOfferComponent,
        data: {
          title: 'Sale Offer',
          urls: [
            { title: 'Dashboard', url: '/sale/sale-offer' },
            { title: 'Sale Offer' },
          ],
        },
      },
      {
        path: 'list-sale-offer',
        component: ListSaleOfferComponent,
        data: {
          title: 'List Sale Offer',
          urls: [
            { title: 'Dashboard', url: '/sale/list-sale-offer' },
            { title: 'List Sale Offer' },
          ],
        },
      },

    ]
  }
]

@NgModule({
  declarations: [
    SaleOfferComponent,
    ListSaleOfferComponent
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
export class SaleModule { }

