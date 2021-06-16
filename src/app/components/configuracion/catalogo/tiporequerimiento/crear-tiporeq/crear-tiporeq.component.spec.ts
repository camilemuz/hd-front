import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTiporeqComponent } from './crear-tiporeq.component';

describe('CrearTiporeqComponent', () => {
  let component: CrearTiporeqComponent;
  let fixture: ComponentFixture<CrearTiporeqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearTiporeqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearTiporeqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
