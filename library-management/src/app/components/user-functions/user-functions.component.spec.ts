import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFunctionsComponent } from './user-functions.component';

describe('UserFunctionsComponent', () => {
  let component: UserFunctionsComponent;
  let fixture: ComponentFixture<UserFunctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFunctionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
