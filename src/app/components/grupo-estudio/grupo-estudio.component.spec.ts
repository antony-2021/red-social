import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoEstudioComponent } from './grupo-estudio.component';

describe('GrupoEstudioComponent', () => {
  let component: GrupoEstudioComponent;
  let fixture: ComponentFixture<GrupoEstudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoEstudioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupoEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
