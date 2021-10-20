import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewIssueComponent } from './user-view-issue.component';

describe('UserViewIssueComponent', () => {
  let component: UserViewIssueComponent;
  let fixture: ComponentFixture<UserViewIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserViewIssueComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
