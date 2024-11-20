import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicamentoGeneralComponent } from './add-medicamento-general.component';

describe('AddMedicamentoGeneralComponent', () => {
  let component: AddMedicamentoGeneralComponent;
  let fixture: ComponentFixture<AddMedicamentoGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMedicamentoGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMedicamentoGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
