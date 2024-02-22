import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSaleOfferComponent } from './list-sale-offer.component';

describe('ListSaleOfferComponent', () => {
  let component: ListSaleOfferComponent;
  let fixture: ComponentFixture<ListSaleOfferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSaleOfferComponent]
    });
    fixture = TestBed.createComponent(ListSaleOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
