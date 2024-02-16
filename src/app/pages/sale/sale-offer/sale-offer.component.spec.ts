import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleOfferComponent } from './sale-offer.component';

describe('SaleOfferComponent', () => {
  let component: SaleOfferComponent;
  let fixture: ComponentFixture<SaleOfferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaleOfferComponent]
    });
    fixture = TestBed.createComponent(SaleOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
