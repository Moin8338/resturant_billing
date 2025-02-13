import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageItemComponent } from './manage-item.component';

describe('ManageItemComponent', () => {
  let component: ManageItemComponent;
  let fixture: ComponentFixture<ManageItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageItemComponent]
    });
    fixture = TestBed.createComponent(ManageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
