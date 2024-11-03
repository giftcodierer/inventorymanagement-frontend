import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryManagementListComponent } from './inventory-management-list.component';

describe('InventoryManagementListComponent', () => {
  let component: InventoryManagementListComponent;
  let fixture: ComponentFixture<InventoryManagementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryManagementListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
