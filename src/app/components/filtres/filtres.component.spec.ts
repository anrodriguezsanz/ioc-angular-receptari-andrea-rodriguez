import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FiltresComponent } from './filtres.component';

describe('FiltresComponent', () => {
  let component: FiltresComponent;
  let fixture: ComponentFixture<FiltresComponent>;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [FiltresComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(FiltresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ha de crear el component amb el formulari reactiu inicialitzat', () => {
    expect(component).toBeTruthy();
    expect(component.filtresForm.controls.textCerca.value).toBe('');
    expect(component.filtresForm.controls.categoriaSeleccionada.value).toBe('');
  });

  it('ha de validar síncronament espais, longitud mínima i caràcters no permesos', () => {
    const control = component.textInput;

    control.setValue('   ');
    expect(control.hasError('nomesEspais')).toBe(true);

    control.setValue('pa');
    expect(control.hasError('massaCurt')).toBe(true);

    control.setValue('truita<script>');
    expect(control.hasError('caractersNoPermesos')).toBe(true);

    control.setValue('');
    expect(control.valid).toBe(true);
  });

  it('ha de restablir el formulari i emetre filtres buits en prémer Restablir', () => {
    let darrerEvent: { text: string; categoria: string } | null = null;
    component.canviFiltres.subscribe((val) => (darrerEvent = val));

    component.filtresForm.patchValue({
      textCerca: 'gaspatxo',
      categoriaSeleccionada: 'Dinar'
    });

    component.netejarFiltres();

    expect(component.filtresForm.controls.textCerca.value).toBe('');
    expect(component.filtresForm.controls.categoriaSeleccionada.value).toBe('');
    expect(darrerEvent).toEqual({ text: '', categoria: '' });
  });
});