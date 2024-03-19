import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateteamComponent } from './createteam.component';

describe('CreateteamComponent', () => {
  let component: CreateteamComponent;
  let fixture: ComponentFixture<CreateteamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateteamComponent]
    });
    fixture = TestBed.createComponent(CreateteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
