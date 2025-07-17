import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerSalesReport } from './seller-sales-report';

describe('SellerSalesReport', () => {
  let component: SellerSalesReport;
  let fixture: ComponentFixture<SellerSalesReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerSalesReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerSalesReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
