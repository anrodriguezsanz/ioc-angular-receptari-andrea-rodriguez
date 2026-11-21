import { adaptarReceptaApiAModel, adaptarReceptesApiAModel } from './receptes.adapter';
import { ReceptaApi } from '../models/recepta-api.model';

describe('ReceptaAdapter', () => {
  it('ha de netejar espais, convertir tipus i normalitzar una recepta de l\'API', () => {
    const apiMock: ReceptaApi = {
      id: '7',
      titol: '   Paella valenciana   ',
      descripcio: '  Arròs tradicional amb pollastre i conill  ',
      categoria: '  dinar ',
      dataCreacio: '2026-10-15T10:30:00.000Z',
      tempsPreparacio: '55',
      ingredients: ['  Arròs  ', '', '  Safrà '],
      passes: ['  Sofregir la carn  ', '   ']
    };

    const resultat = adaptarReceptaApiAModel(apiMock);

    expect(resultat.id).toBe(7);
    expect(resultat.titol).toBe('Paella valenciana');
    expect(resultat.descripcio).toBe('Arròs tradicional amb pollastre i conill');
    expect(resultat.categoria).toBe('Dinar');
    expect(resultat.tempsPreparacio).toBe(55);
    expect(resultat.dataCreacio).toBeInstanceOf(Date);
    expect(resultat.dataCreacio.toISOString()).toBe('2026-10-15T10:30:00.000Z');
    expect(resultat.destacada).toBe(false);
    expect(resultat.ingredients).toEqual(['Arròs', 'Safrà']);
    expect(resultat.passes).toEqual(['Sofregir la carn']);
  });

  it('ha d\'aplicar valors per defecte segurs quan arriben dades invàlides o buides', () => {
    const apiInvalida: ReceptaApi = {
      id: 'no-num',
      titol: '   ',
      descripcio: '',
      categoria: 'Desconeguda',
      dataCreacio: 'data-erronia',
      tempsPreparacio: -10
    };

    const resultat = adaptarReceptaApiAModel(apiInvalida);

    expect(resultat.id).toBe(0);
    expect(resultat.titol).toBe('Recepta sense títol');
    expect(resultat.descripcio).toBe('Sense descripció disponible.');
    expect(resultat.categoria).toBe('Dinar');
    expect(resultat.tempsPreparacio).toBe(15);
    expect(resultat.dataCreacio).toBeInstanceOf(Date);
    expect(Number.isNaN(resultat.dataCreacio.getTime())).toBe(false);
    expect(resultat.destacada).toBe(false);
  });

  it('ha d\'adaptar una llista de receptes correctament', () => {
    const llista = adaptarReceptesApiAModel([
      {
        id: 1,
        titol: 'Gaspatxo',
        descripcio: 'Sopa freda',
        categoria: 'Sopar',
        dataCreacio: '2026-11-01T12:00:00.000Z',
        tempsPreparacio: 15,
        destacada: true
      }
    ]);

    expect(llista.length).toBe(1);
    expect(llista[0].titol).toBe('Gaspatxo');
    expect(llista[0].destacada).toBe(true);
  });
});