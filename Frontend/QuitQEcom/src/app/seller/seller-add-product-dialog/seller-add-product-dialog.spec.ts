import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAddProductDialog } from './seller-add-product-dialog';

describe('SellerAddProductDialog', () => {
  let component: SellerAddProductDialog;
  let fixture: ComponentFixture<SellerAddProductDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerAddProductDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerAddProductDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
