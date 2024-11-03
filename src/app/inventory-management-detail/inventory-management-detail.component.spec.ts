import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryManagementDetailComponent } from './inventory-management-detail.component';

describe('InventoryManagementDetailComponent', () => {
  let component: InventoryManagementDetailComponent;
  let fixture: ComponentFixture<InventoryManagementDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryManagementDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryManagementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
