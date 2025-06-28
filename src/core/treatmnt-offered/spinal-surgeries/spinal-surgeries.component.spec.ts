import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinalSurgeriesComponent } from './spinal-surgeries.component';

describe('SpinalSurgeriesComponent', () => {
  let component: SpinalSurgeriesComponent;
  let fixture: ComponentFixture<SpinalSurgeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinalSurgeriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinalSurgeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
