import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HopsitalFormComponent } from './hopsital-form.component';

describe('HopsitalFormComponent', () => {
  let component: HopsitalFormComponent;
  let fixture: ComponentFixture<HopsitalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HopsitalFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HopsitalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
