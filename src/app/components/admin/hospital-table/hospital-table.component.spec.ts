import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalTableComponent } from './hospital-table.component';

describe('HospitalTableComponent', () => {
  let component: HospitalTableComponent;
  let fixture: ComponentFixture<HospitalTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
