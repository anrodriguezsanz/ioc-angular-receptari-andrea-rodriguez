import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-filtres',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filtres.component.html',
  styleUrl: './filtres.component.scss'
})
export class FiltresComponent {
  textCerca: string = '';
  categoriaSeleccionada: string = '';

  @Output() canviFiltres = new EventEmitter<{ text: string, categoria: string }>();

  aplicarFiltres() {
    this.canviFiltres.emit({
      text: this.textCerca,
      categoria: this.categoriaSeleccionada
    });
  }

  netejarFiltres(form: NgForm) {
    form.resetForm({
      textCerca: '',
      categoriaSeleccionada: ''
    });
    this.textCerca = '';
    this.categoriaSeleccionada = '';
    this.aplicarFiltres();
  }
}