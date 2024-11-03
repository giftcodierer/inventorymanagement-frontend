import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryManagementLoginComponent } from './inventory-management-login.component';

describe('InventoryManagementLoginComponent', () => {
  let component: InventoryManagementLoginComponent;
  let fixture: ComponentFixture<InventoryManagementLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryManagementLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryManagementLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
