import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // CRÍTIC per evitar pantalla en blanc pel pipe de data
import { Recepta } from '../../models/recepta.model';
import { ReceptesApiService } from '../../services/receptes-api.service';
import { ReceptaTargetaComponent } from '../recepta-targeta/recepta-targeta.component';
import { FiltresComponent } from '../filtres/filtres.component';
import { NovaReceptaComponent } from '../nova-recepta/nova-recepta.component';

@Component({
  selector: 'app-recepta-llista',
  standalone: true,
  imports: [CommonModule, ReceptaTargetaComponent, FiltresComponent, NovaReceptaComponent],
  templateUrl: './recepta-llista.component.html',
  styleUrl: './recepta-llista.component.scss'
})
export class ReceptaLlistaComponent implements OnInit {
  readonly receptesService = inject(ReceptesApiService);

  receptaSeleccionada: Recepta | null = null;
  readonly mostrarFormulariAlta = signal<boolean>(false);
  readonly missatgeExit = signal<string | null>(null);

  ngOnInit(): void {
    this.receptesService.cercarReceptes();
  }

  aplicarFiltres(filtres: { text: string; categoria: string }): void {
    this.receptesService.cercarReceptes(filtres);
  }

  onSeleccionarRecepta(recepta: Recepta): void {
    this.receptaSeleccionada = recepta;
  }

  tancarDetall(): void {
    this.receptaSeleccionada = null;
  }

  onReceptaCreada(recepta: Recepta): void {
    this.mostrarFormulariAlta.set(false);
    this.receptaSeleccionada = recepta;
    this.missatgeExit.set(`Recepta "${recepta.titol}" creada correctament!`);
    setTimeout(() => this.missatgeExit.set(null), 4000);
  }
}