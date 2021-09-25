import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiHistorialComponent } from './mi-historial.component';

describe('MiHistorialComponent', () => {
  let component: MiHistorialComponent;
  let fixture: ComponentFixture<MiHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiHistorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
