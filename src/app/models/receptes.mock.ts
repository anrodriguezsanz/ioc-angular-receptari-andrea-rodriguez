import { Recepta } from './recepta.model';

export const RECEPTES_MOCK: Recepta[] = [
  {
    id: 1,
    titol: 'Truita de patates',
    descripcio: 'Truita amb ceba i patates confitades.',
    categoria: 'Dinar',
    dataCreacio: new Date('2026-10-01T10:00:00'),
    tempsPreparacio: 45,
    destacada: true
  },
  {
    id: 2,
    titol: 'Torrada d\'alvocat',
    descripcio: 'Pa rústic, alvocat aixafat i un toc de llimona.',
    categoria: 'Esmorzar',
    dataCreacio: new Date('2026-10-02T08:30:00'),
    tempsPreparacio: 10,
    destacada: false
  },
  {
    id: 3,
    titol: 'Radiatori a la bolonyesa',
    descripcio: 'Pasta amb tomàquet, carn picada, sofregit de verdura i formatge ratllat.',
    categoria: 'Dinar',
    dataCreacio: new Date('2026-10-03T13:15:00'),
    tempsPreparacio: 40,
    destacada: true
  },
  {
    id: 4,
    titol: 'Amanida d\'alfàbrega i cireres',
    descripcio: 'Amanida d\'alfàbrega, cireres, formatge fresc i pistatxo',
    categoria: 'Sopar',
    dataCreacio: new Date('2026-10-04T19:45:00'),
    tempsPreparacio: 20
  },
  {
    id: 5,
    titol: 'Cheesecake al forn',
    descripcio: 'Pastís de formatge amb base de galeta.',
    categoria: 'Postres',
    dataCreacio: new Date('2026-10-05T16:00:00'),
    tempsPreparacio: 90,
    destacada: true
  },
  {
    id: 6,
    titol: 'Salmó a la planxa',
    descripcio: 'Llom de salmó daurat amb espàrrecs.',
    categoria: 'Sopar',
    dataCreacio: new Date('2026-10-06T20:00:00'),
    tempsPreparacio: 20
  },
  {
    id: 7,
    titol: 'Pancakes de civada',
    descripcio: 'Pancakes amb xocolata desfeta.',
    categoria: 'Esmorzar',
    dataCreacio: new Date('2026-10-07T09:00:00'),
    tempsPreparacio: 20,
    destacada: false
  },
  {
    id: 8,
    titol: 'Crema de carbassa',
    descripcio: 'Crema de carabassa i ceba al forn, amb mango i formatge de cabra.',
    categoria: 'Sopar',
    dataCreacio: new Date('2026-10-08T19:30:00'),
    tempsPreparacio: 45
  },
  {
    id: 9,
    titol: 'Brownie de xocolata',
    descripcio: 'Brownie de xocolata negra amb trossets d\'anacards.',
    categoria: 'Postres',
    dataCreacio: new Date('2026-10-09T17:20:00'),
    tempsPreparacio: 50,
    destacada: true
  },
  {
    id: 10,
    titol: 'Arròs negre',
    descripcio: 'Arròs de gambes amb tinta de calamar i allioli.',
    categoria: 'Dinar',
    dataCreacio: new Date('2026-10-10T14:00:00'),
    tempsPreparacio: 60
  }
];