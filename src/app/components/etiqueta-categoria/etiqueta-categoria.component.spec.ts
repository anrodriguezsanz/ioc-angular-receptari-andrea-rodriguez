import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EtiquetaCategoriaComponent } from './etiqueta-categoria.component';

describe('EtiquetaCategoria', () => {
  let component: EtiquetaCategoriaComponent;
  let fixture: ComponentFixture<EtiquetaCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtiquetaCategoriaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EtiquetaCategoriaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
