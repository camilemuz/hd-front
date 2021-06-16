import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiporequerimientoComponent } from './tiporequerimiento.component';

describe('TiporequerimientoComponent', () => {
  let component: TiporequerimientoComponent;
  let fixture: ComponentFixture<TiporequerimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiporequerimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiporequerimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
