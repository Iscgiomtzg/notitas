import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RFormsComponent } from './rforms.component';

describe('RFormsComponent', () => {
  let component: RFormsComponent;
  let fixture: ComponentFixture<RFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
