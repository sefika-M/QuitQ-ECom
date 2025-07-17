import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerWallet } from './customer-wallet';

describe('CustomerWallet', () => {
  let component: CustomerWallet;
  let fixture: ComponentFixture<CustomerWallet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerWallet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerWallet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
