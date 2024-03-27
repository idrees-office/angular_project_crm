import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaddetailmodalComponent } from './leaddetailmodal.component';

describe('LeaddetailmodalComponent', () => {
  let component: LeaddetailmodalComponent;
  let fixture: ComponentFixture<LeaddetailmodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaddetailmodalComponent]
    });
    fixture = TestBed.createComponent(LeaddetailmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
