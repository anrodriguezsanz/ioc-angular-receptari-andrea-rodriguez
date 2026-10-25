import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recepta } from '../../models/recepta.model';
import { EtiquetaCategoriaComponent } from '../etiqueta-categoria/etiqueta-categoria.component';

@Component({
  selector: 'app-recepta-targeta',
  imports: [EtiquetaCategoriaComponent],
  templateUrl: './recepta-targeta.component.html',
  styleUrl: './recepta-targeta.component.scss'
})
export class ReceptaTargetaComponent {
  @Input({ required: true }) recepta!: Recepta;
  @Output() seleccionar = new EventEmitter<Recepta>();

  seleccionarTargeta() {
    this.seleccionar.emit(this.recepta);
  }
}
