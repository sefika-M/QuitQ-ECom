import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCheckout } from './customer-checkout';

describe('CustomerCheckout', () => {
  let component: CustomerCheckout;
  let fixture: ComponentFixture<CustomerCheckout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerCheckout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerCheckout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
