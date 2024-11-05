import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamillasComponent } from './camillas.component';

describe('CamillasComponent', () => {
  let component: CamillasComponent;
  let fixture: ComponentFixture<CamillasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CamillasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CamillasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
