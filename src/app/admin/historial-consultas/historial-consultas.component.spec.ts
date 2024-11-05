import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialConsultasComponent } from './historial-consultas.component';

describe('HistorialConsultasComponent', () => {
  let component: HistorialConsultasComponent;
  let fixture: ComponentFixture<HistorialConsultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistorialConsultasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistorialConsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
