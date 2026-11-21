import { Component, EventEmitter, OnInit, Output, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs';
import { ReceptesApiService } from '../../services/receptes-api.service';
import { termeCercaValidValidator, termeExistentApiValidator } from '../../validators/cerca.validators';

const STORAGE_KEY_HISTORIAL = 'recipe_archive_historial_cerques';
const MAX_HISTORIAL = 5;

@Component({
  selector: 'app-filtres',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './filtres.component.html',
  styleUrl: './filtres.component.scss'
})
export class FiltresComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly receptesService = inject(ReceptesApiService);

  @Output() canviFiltres = new EventEmitter<{ text: string; categoria: string }>();

  readonly historialCerques = signal<string[]>(this.carregarHistorial());
  private ultimTextAutoDesat = '';

  readonly filtresForm = this.fb.nonNullable.group({
    textCerca: [
      '',
      {
        validators: [termeCercaValidValidator()],
        asyncValidators: [termeExistentApiValidator(this.receptesService)]
      }
    ],
    categoriaSeleccionada: ['']
  });

  constructor() {
    this.filtresForm.valueChanges
      .pipe(
        debounceTime(400),
        map((valors) => ({
          text: (valors.textCerca ?? '').trim(),
          categoria: valors.categoriaSeleccionada ?? ''
        })),
        distinctUntilChanged(
          (anterior, actual) =>
            anterior.text === actual.text && anterior.categoria === actual.categoria
        ),
        filter(() => {
          const control = this.textInput;
          return (
            !control.hasError('nomesEspais') &&
            !control.hasError('massaCurt') &&
            !control.hasError('caractersNoPermesos')
          );
        }),
        takeUntilDestroyed()
      )
      .subscribe((criteris) => {
        if (criteris.text.length === 0) {
          this.ultimTextAutoDesat = '';
        }
        this.canviFiltres.emit(criteris);
      });

    this.textInput.statusChanges
      .pipe(
        debounceTime(800),
        filter((status) => status === 'VALID'),
        map(() => this.textInput.value.trim()),
        filter((net) => net.length >= 3),
        takeUntilDestroyed()
      )
      .subscribe((net) => {
        if (
          this.ultimTextAutoDesat.toLowerCase().startsWith(net.toLowerCase()) &&
          net.length < this.ultimTextAutoDesat.length
        ) {
          this.ultimTextAutoDesat = net;
          return;
        }

        this.ultimTextAutoDesat = net;
        this.desarAlHistorial(net);
      });
  }

  ngOnInit(): void {
    this.historialCerques.set(this.carregarHistorial());
  }

  get textInput() {
    return this.filtresForm.controls.textCerca;
  }

  aplicarFiltres(): void {
    if (this.filtresForm.invalid || this.textInput.pending) {
      this.textInput.markAsTouched();
      return;
    }

    const valors = this.filtresForm.getRawValue();
    const textNet = valors.textCerca.trim();

    if (textNet.length >= 3) {
      this.ultimTextAutoDesat = textNet;
      this.desarAlHistorial(textNet);
    }

    this.canviFiltres.emit({
      text: textNet,
      categoria: valors.categoriaSeleccionada
    });
  }

  netejarFiltres(): void {
    this.ultimTextAutoDesat = '';
    this.filtresForm.reset({
      textCerca: '',
      categoriaSeleccionada: ''
    });
    this.canviFiltres.emit({
      text: '',
      categoria: ''
    });
  }

  aplicarDesdeHistorial(terme: string): void {
    this.ultimTextAutoDesat = terme;
    this.filtresForm.patchValue({ textCerca: terme });
    this.textInput.markAsTouched();
  }

  eliminarDelHistorial(terme: string, event: Event): void {
    event.stopPropagation();
    const actualitzat = this.historialCerques().filter(
      (item) => item.toLowerCase() !== terme.toLowerCase()
    );
    this.historialCerques.set(actualitzat);
    this.guardarHistorialStorage(actualitzat);
  }

  netejarHistorial(): void {
    this.historialCerques.set([]);
    try {
      localStorage.removeItem(STORAGE_KEY_HISTORIAL);
    } catch (error) {
      console.error('Error en esborrar l\'historial de localStorage:', error);
    }
  }

  private desarAlHistorial(terme: string): void {
    const net = terme.trim();
    if (net.length < 3) {
      return;
    }

    const senseDuplicats = this.historialCerques().filter(
      (item) => item.toLowerCase() !== net.toLowerCase()
    );
    const nouHistorial = [net, ...senseDuplicats].slice(0, MAX_HISTORIAL);

    this.historialCerques.set(nouHistorial);
    this.guardarHistorialStorage(nouHistorial);
  }

  private carregarHistorial(): string[] {
    try {
      const dades = localStorage.getItem(STORAGE_KEY_HISTORIAL);
      if (!dades) {
        return [];
      }
      const parsed = JSON.parse(dades);
      return Array.isArray(parsed)
        ? parsed.filter((item): item is string => typeof item === 'string')
        : [];
    } catch (error) {
      console.error('Error en carregar l\'historial des de localStorage:', error);
      return [];
    }
  }

  private guardarHistorialStorage(llista: string[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_HISTORIAL, JSON.stringify(llista));
    } catch (error) {
      console.error('Error en desar l\'historial a localStorage:', error);
    }
  }
}