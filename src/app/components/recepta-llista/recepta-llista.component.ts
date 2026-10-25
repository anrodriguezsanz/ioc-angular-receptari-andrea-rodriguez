import { Component } from '@angular/core';
import { Recepta } from '../../models/recepta.model';
import { RECEPTES_MOCK } from '../../models/receptes.mock';
import { ReceptaTargetaComponent } from '../recepta-targeta/recepta-targeta.component';
import { FiltresComponent } from '../filtres/filtres.component';

@Component({
  selector: 'app-recepta-llista',
  standalone: true,
  imports: [ReceptaTargetaComponent, FiltresComponent],
  templateUrl: './recepta-llista.component.html',
  styleUrl: './recepta-llista.component.scss'
})
export class ReceptaLlistaComponent {
  receptes: Recepta[] = RECEPTES_MOCK;
  
  receptesFiltrades: Recepta[] = RECEPTES_MOCK;

  aplicarFiltres(filtres: { text: string, categoria: string }) {
    const textLower = filtres.text.toLowerCase().trim();

    this.receptesFiltrades = this.receptes.filter(recepta => {
      const coincideixText = textLower === '' || 
        recepta.titol.toLowerCase().includes(textLower) || 
        recepta.descripcio.toLowerCase().includes(textLower);
      
      const coincideixCategoria = filtres.categoria === '' || 
        recepta.categoria === filtres.categoria;

      return coincideixText && coincideixCategoria;
    });
  }

  onSeleccionarRecepta(recepta: Recepta) {
    console.log('Recepta seleccionada:', recepta.titol);
  }
}