import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject, catchError, finalize, map, of, switchMap, tap, throwError } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { ReceptaApi } from '../models/recepta-api.model';
import { Recepta } from '../models/recepta.model';
import { adaptarReceptaApiAModel, adaptarReceptesApiAModel } from '../adapters/receptes.adapter';


export interface CriterisCerca {
  text: string;
  categoria: string;
}

export type NovaReceptaPayload = Omit<ReceptaApi, 'id' | 'dataCreacio'>;

@Injectable({
  providedIn: 'root'
})
export class ReceptesApiService {
  private readonly http = inject(HttpClient);
  private readonly endpointUrl = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.receptes}`;

  readonly receptes = signal<Recepta[]>([]);
  readonly carregant = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  private darrersCriteris: CriterisCerca = { text: '', categoria: '' };
  private readonly cercaTrigger$ = new Subject<CriterisCerca>();

  constructor() {
    this.cercaTrigger$
      .pipe(
        tap((criteris) => {
          this.darrersCriteris = { ...criteris };
          this.carregant.set(true);
          this.error.set(null);
        }),
        switchMap((criteris) =>
          this.obtenirReceptesHttp(criteris).pipe(
            catchError(() => {
              this.error.set('Error en connectar amb l\'API. Comprova que json-server estigui en marxa.');
              return of(null);
            }),
            finalize(() => this.carregant.set(false))
          )
        ),
        takeUntilDestroyed()
      )
      .subscribe((resultat) => {
        if (resultat !== null) {
          this.receptes.set(resultat);
        }
      });
  }

  obtenirReceptesHttp(criteris: CriterisCerca = { text: '', categoria: '' }): Observable<Recepta[]> {
    let params = new HttpParams();
    if (criteris.categoria.trim() !== '') {
      params = params.set('categoria', criteris.categoria.trim());
    }

    return this.http.get<ReceptaApi[]>(this.endpointUrl, { params }).pipe(
      map((dadesApi) => adaptarReceptesApiAModel(dadesApi)),
      map((receptesAdaptades) => {
        const textLower = criteris.text.toLowerCase().trim();
        if (!textLower) {
          return receptesAdaptades;
        }
        return receptesAdaptades.filter(
          (r) =>
            r.titol.toLowerCase().includes(textLower) ||
            r.descripcio.toLowerCase().includes(textLower)
        );
      })
    );
  }

  cercarReceptes(criteris: CriterisCerca = { text: '', categoria: '' }): void {
    this.cercaTrigger$.next(criteris);
  }

  reintentar(): void {
    this.cercaTrigger$.next({ ...this.darrersCriteris });
  }

  crearRecepta(novaRecepta: NovaReceptaPayload): Observable<Recepta> {
    this.carregant.set(true);
    this.error.set(null);

    const seguentId = this.receptes().reduce((max, r) => Math.max(max, r.id), 0) + 1;
    const cosPeticio: ReceptaApi = {
      ...novaRecepta,
      id: seguentId,
      dataCreacio: new Date().toISOString()
    };

    return this.http.post<ReceptaApi>(this.endpointUrl, cosPeticio).pipe(
      map((respostaApi) => adaptarReceptaApiAModel(respostaApi)),
      tap((receptaCreada) => {
        this.receptes.update((actuals) => [...actuals, receptaCreada]);
      }),
      catchError((err) => {
        this.error.set('No s\'ha pogut desar la nova recepta a l\'API.');
        return throwError(() => err);
      }),
      finalize(() => this.carregant.set(false))
    );
  }

  comprovarTermeTeResultats(terme: string): Observable<boolean> {
    return this.obtenirReceptesHttp({ text: terme, categoria: '' }).pipe(
      map((llista) => llista.length > 0),
      catchError(() => of(true))
    );
  }
}