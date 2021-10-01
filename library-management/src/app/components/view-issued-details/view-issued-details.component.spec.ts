import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIssuedDetailsComponent } from './view-issued-details.component';

describe('ViewIssuedDetailsComponent', () => {
  let component: ViewIssuedDetailsComponent;
  let fixture: ComponentFixture<ViewIssuedDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewIssuedDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIssuedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
