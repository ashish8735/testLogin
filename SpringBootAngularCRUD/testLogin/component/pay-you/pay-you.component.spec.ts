import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayYouComponent } from './pay-you.component';

describe('PayYouComponent', () => {
  let component: PayYouComponent;
  let fixture: ComponentFixture<PayYouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayYouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
