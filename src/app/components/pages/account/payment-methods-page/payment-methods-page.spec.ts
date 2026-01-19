import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodsPage } from './payment-methods-page';

describe('PaymentMethodsPage', () => {
  let component: PaymentMethodsPage;
  let fixture: ComponentFixture<PaymentMethodsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentMethodsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentMethodsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
