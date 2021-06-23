import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudAgenteComponent } from './solicitud-agente.component';

describe('SolicitudAgenteComponent', () => {
  let component: SolicitudAgenteComponent;
  let fixture: ComponentFixture<SolicitudAgenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudAgenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudAgenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
