import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLeadComponent } from './my-lead.component';

describe('MyLeadComponent', () => {
  let component: MyLeadComponent;
  let fixture: ComponentFixture<MyLeadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyLeadComponent]
    });
    fixture = TestBed.createComponent(MyLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
