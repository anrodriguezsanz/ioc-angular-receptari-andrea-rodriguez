import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-etiqueta-categoria',
  templateUrl: './etiqueta-categoria.component.html',
  styleUrl: './etiqueta-categoria.component.scss'
})
export class EtiquetaCategoriaComponent {
  @Input({ required: true }) categoria!: string;
}
