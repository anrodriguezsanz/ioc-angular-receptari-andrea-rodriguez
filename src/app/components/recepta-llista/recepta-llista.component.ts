import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // CRÍTIC per evitar pantalla en blanc pel pipe de data
import { Recepta } from '../../models/recepta.model';
import { RECEPTES_MOCK } from '../../models/receptes.mock';
import { ReceptaTargetaComponent } from '../recepta-targeta/recepta-targeta.component';
import { FiltresComponent } from '../filtres/filtres.component';

@Component({
  selector: 'app-recepta-llista',
  standalone: true,
  imports: [CommonModule, ReceptaTargetaComponent, FiltresComponent],
  templateUrl: './recepta-llista.component.html',
  styleUrl: './recepta-llista.component.scss'
})
export class ReceptaLlistaComponent {
  receptes: Recepta[] = RECEPTES_MOCK;
  
  receptesFiltrades: Recepta[] = RECEPTES_MOCK;
  receptaSeleccionada: Recepta | null = null;

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
    this.receptaSeleccionada = recepta;
  }

  tancarDetall() {
    this.receptaSeleccionada = null;
  }
}