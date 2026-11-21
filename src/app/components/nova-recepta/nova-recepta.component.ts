import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReceptesApiService } from '../../services/receptes-api.service';
import { Recepta } from '../../models/recepta.model';

@Component({
  selector: 'app-nova-recepta',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './nova-recepta.component.html',
  styleUrl: './nova-recepta.component.scss'
})
export class NovaReceptaComponent {
  private readonly fb = inject(FormBuilder);
  private readonly receptesService = inject(ReceptesApiService);

  @Output() receptaCreada = new EventEmitter<Recepta>();
  @Output() cancellar = new EventEmitter<void>();

  readonly formulariAlta = this.fb.nonNullable.group({
    titol: ['', [Validators.required, Validators.minLength(3)]],
    descripcio: ['', [Validators.required, Validators.minLength(5)]],
    categoria: ['Dinar' as 'Esmorzar' | 'Dinar' | 'Sopar' | 'Postres', Validators.required],
    tempsPreparacio: [30, [Validators.required, Validators.min(1)]],
    destacada: [false],
    ingredientsText: ['', Validators.required],
    passesText: ['', Validators.required]
  });

  enviar(): void {
    if (this.formulariAlta.invalid) {
      this.formulariAlta.markAllAsTouched();
      return;
    }

    const valors = this.formulariAlta.getRawValue();
    const ingredients = valors.ingredientsText
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
    const passes = valors.passesText
      .split('\n')
      .map((pas) => pas.trim())
      .filter((pas) => pas.length > 0);

    this.receptesService
      .crearRecepta({
        titol: valors.titol,
        descripcio: valors.descripcio,
        categoria: valors.categoria,
        tempsPreparacio: valors.tempsPreparacio,
        destacada: valors.destacada,
        ingredients,
        passes
      })
      .subscribe({
        next: (creada) => {
          this.formulariAlta.reset({
            titol: '',
            descripcio: '',
            categoria: 'Dinar',
            tempsPreparacio: 30,
            destacada: false,
            ingredientsText: '',
            passesText: ''
          });
          this.receptaCreada.emit(creada);
        }
      });
  }
}