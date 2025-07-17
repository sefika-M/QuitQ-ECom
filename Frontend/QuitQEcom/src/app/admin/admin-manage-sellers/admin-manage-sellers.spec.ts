import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageSellers } from './admin-manage-sellers';

describe('AdminManageSellers', () => {
  let component: AdminManageSellers;
  let fixture: ComponentFixture<AdminManageSellers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminManageSellers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminManageSellers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
