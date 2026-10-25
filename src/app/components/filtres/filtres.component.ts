import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filtres',
  templateUrl: './filtres.component.html',
  styleUrl: './filtres.component.scss'
})
export class FiltresComponent {
  @Output() aplicarFiltres = new EventEmitter<any>();
}
