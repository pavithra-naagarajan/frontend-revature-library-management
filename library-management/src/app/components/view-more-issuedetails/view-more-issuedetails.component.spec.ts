import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMoreIssuedetailsComponent } from './view-more-issuedetails.component';

describe('ViewMoreIssuedetailsComponent', () => {
  let component: ViewMoreIssuedetailsComponent;
  let fixture: ComponentFixture<ViewMoreIssuedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewMoreIssuedetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMoreIssuedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
