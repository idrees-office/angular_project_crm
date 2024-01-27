import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReAssignComponent } from './re-assign.component';

describe('ReAssignComponent', () => {
  let component: ReAssignComponent;
  let fixture: ComponentFixture<ReAssignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReAssignComponent]
    });
    fixture = TestBed.createComponent(ReAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
