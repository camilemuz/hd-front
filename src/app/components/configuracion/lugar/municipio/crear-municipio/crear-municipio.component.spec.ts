import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearMunicipioComponent } from './crear-municipio.component';

describe('CrearMunicipioComponent', () => {
  let component: CrearMunicipioComponent;
  let fixture: ComponentFixture<CrearMunicipioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearMunicipioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearMunicipioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
