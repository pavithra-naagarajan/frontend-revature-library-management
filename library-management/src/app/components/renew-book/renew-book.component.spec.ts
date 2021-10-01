import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewBookComponent } from './renew-book.component';

describe('RenewBookComponent', () => {
  let component: RenewBookComponent;
  let fixture: ComponentFixture<RenewBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenewBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
