import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ReceptesApiService } from './receptes-api.service';
import { API_CONFIG } from '../config/api.config';
import { ReceptaApi } from '../models/recepta-api.model';

describe('ReceptesApiService', () => {
  let service: ReceptesApiService;
  let httpMock: HttpTestingController;
  const endpointUrl = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.receptes}`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(ReceptesApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('ha d\'obtenir i adaptar receptes via GET i actualitzar els signals d\'estat', () => {
    const mockResposta: ReceptaApi[] = [
      {
        id: 1,
        titol: '  Truita de patates  ',
        descripcio: 'Clàssica amb ceba',
        categoria: 'Sopar',
        dataCreacio: '2026-11-10T09:00:00.000Z',
        tempsPreparacio: 30,
        destacada: true
      }
    ];

    service.cercarReceptes({ text: '', categoria: 'Sopar' });
    expect(service.carregant()).toBe(true);

    const req = httpMock.expectOne(`${endpointUrl}?categoria=Sopar`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResposta);

    expect(service.carregant()).toBe(false);
    expect(service.error()).toBeNull();
    expect(service.receptes().length).toBe(1);
    expect(service.receptes()[0].titol).toBe('Truita de patates');
  });

  it('ha de gestionar errors HTTP i permetre reintentar l\'última consulta', () => {
    service.cercarReceptes({ text: 'arròs', categoria: 'Dinar' });

    const reqFallida = httpMock.expectOne(`${endpointUrl}?categoria=Dinar`);
    reqFallida.flush('Error intern', { status: 500, statusText: 'Server Error' });

    expect(service.carregant()).toBe(false);
    expect(service.error()).toBeTruthy();

    service.reintentar();
    expect(service.carregant()).toBe(true);
    expect(service.error()).toBeNull();

    const reqReintent = httpMock.expectOne(`${endpointUrl}?categoria=Dinar`);
    expect(reqReintent.request.method).toBe('GET');
    reqReintent.flush([]);

    expect(service.carregant()).toBe(false);
    expect(service.error()).toBeNull();
  });

  it('ha de crear una nova recepta via POST i afegir-la a l\'estat reactiu', () => {
    let titolCreat = '';

    service
      .crearRecepta({
        titol: 'Crema catalana',
        descripcio: 'Postres tradicionals',
        categoria: 'Postres',
        tempsPreparacio: 40,
        destacada: true,
        ingredients: ['Llet', 'Ous', 'Sucre'],
        passes: ['Bullir la llet', 'Cremar el sucre']
      })
      .subscribe((recepta) => {
        titolCreat = recepta.titol;
      });

    const req = httpMock.expectOne(endpointUrl);
    expect(req.request.method).toBe('POST');
    req.flush({
      ...req.request.body,
      id: 11
    });

    expect(titolCreat).toBe('Crema catalana');
    expect(service.receptes().length).toBe(1);
    expect(service.receptes()[0].id).toBe(11);
  });
});