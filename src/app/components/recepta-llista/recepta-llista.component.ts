import { Component } from '@angular/core';
import { Recepta } from '../../models/recepta.model';
import { RECEPTES_MOCK } from '../../models/receptes.mock';
import { ReceptaTargetaComponent } from '../recepta-targeta/recepta-targeta.component';
import { FiltresComponent } from '../filtres/filtres.component';

@Component({
  selector: 'app-recepta-llista',
  imports: [ReceptaTargetaComponent, FiltresComponent],
  templateUrl: './recepta-llista.component.html',
  styleUrl: './recepta-llista.component.scss'
})
export class ReceptaLlistaComponent {
  llistaReceptes: Recepta[] = RECEPTES_MOCK;
  receptaSeleccionada: Recepta | null = null;

  onReceptaSeleccionada(recepta: Recepta) {
    this.receptaSeleccionada = recepta;
  }
}