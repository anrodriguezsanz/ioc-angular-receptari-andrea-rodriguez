import { Recepta } from './recepta.model';

export const RECEPTES_MOCK: Recepta[] = [
  {
    id: 1,
    titol: 'Truita de patates',
    descripcio: 'Truita amb ceba i patates confitades.',
    categoria: 'Dinar',
    dataCreacio: new Date('2026-10-01T10:00:00'),
    tempsPreparacio: 45,
    destacada: true,
    ingredients: ['Patates', 'Ous', 'Ceba', 'Oli d\'oliva', 'Sal'],
    passes: ['Tallar i confitar les patates i la ceba.', 'Batre els ous i barrejar-ho tot.', 'Quallar la truita per tots dos costats.']
  },
  {
    id: 2,
    titol: 'Torrada d\'alvocat',
    descripcio: 'Pa rústic, alvocat aixafat i un toc de llimona.',
    categoria: 'Esmorzar',
    dataCreacio: new Date('2026-10-02T08:30:00'),
    tempsPreparacio: 10,
    destacada: false,
    ingredients: ['Pa rústic', 'Alvocat', 'Llimona', 'Oli d\'oliva', 'Sal i pebre'],
    passes: ['Torrar el pa.', 'Aixafar l\'alvocat amb llimona, sal i pebre.', 'Estendre sobre la torrada i afegir oli.']
  },
  {
    id: 3,
    titol: 'Radiatori a la bolonyesa',
    descripcio: 'Pasta amb tomàquet, carn picada, sofregit de verdura i formatge ratllat.',
    categoria: 'Dinar',
    dataCreacio: new Date('2026-10-03T13:15:00'),
    tempsPreparacio: 40,
    destacada: true,
    ingredients: ['Pasta radiatori', 'Carn picada', 'Tomàquet triturat', 'Ceba i pastanaga', 'Formatge ratllat'],
    passes: ['Bullir la pasta.', 'Fer el sofregit de verdures i afegir la carn.', 'Barrejar amb el tomàquet, ajuntar amb la pasta i gratinar.']
  },
  {
    id: 4,
    titol: 'Amanida d\'alfàbrega i cireres',
    descripcio: 'Amanida d\'alfàbrega, cireres, formatge fresc i pistatxo',
    categoria: 'Sopar',
    dataCreacio: new Date('2026-10-04T19:45:00'),
    tempsPreparacio: 20,
    ingredients: ['Fulles d\'alfàbrega', 'Cireres', 'Formatge fresc', 'Pistatxos', 'Oli i vinagre'],
    passes: ['Netejar l\'alfàbrega i picar les cireres (sense pinyol).', 'Disposar-ho al plat amb el formatge fresc.', 'Amanir amb pistatxos picats, oli i vinagre.']
  },
  {
    id: 5,
    titol: 'Cheesecake al forn',
    descripcio: 'Pastís de formatge amb base de galeta.',
    categoria: 'Postres',
    dataCreacio: new Date('2026-10-05T16:00:00'),
    tempsPreparacio: 90,
    destacada: true,
    ingredients: ['Galetes digestives', 'Mantega', 'Formatge crema', 'Sucre', 'Ous'],
    passes: ['Triturar galetes i barrejar amb mantega per fer la base.', 'Batre el formatge, sucre i ous.', 'Abocar al motlle i coure al forn.']
  },
  {
    id: 6,
    titol: 'Salmó a la planxa',
    descripcio: 'Llom de salmó daurat amb espàrrecs.',
    categoria: 'Sopar',
    dataCreacio: new Date('2026-10-06T20:00:00'),
    tempsPreparacio: 20,
    ingredients: ['Llom de salmó', 'Espàrrecs verds', 'Oli d\'oliva', 'Sal i herbes'],
    passes: ['Escalfar la planxa amb una mica d\'oli.', 'Coure el salmó i els espàrrecs fins que estiguin daurats.', 'Servir calent.']
  },
  {
    id: 7,
    titol: 'Pancakes de civada',
    descripcio: 'Pancakes amb xocolata desfeta.',
    categoria: 'Esmorzar',
    dataCreacio: new Date('2026-10-07T09:00:00'),
    tempsPreparacio: 20,
    destacada: false,
    ingredients: ['Farina de civada', 'Ou', 'Llet', 'Xocolata per fondre'],
    passes: ['Barrejar la civada, l\'ou i la llet.', 'Coure porcions en una paella antiadherent.', 'Fondre la xocolata i abocar per damunt.']
  },
  {
    id: 8,
    titol: 'Crema de carbassa',
    descripcio: 'Crema de carabassa i ceba al forn, amb mango i formatge de cabra.',
    categoria: 'Sopar',
    dataCreacio: new Date('2026-10-08T19:30:00'),
    tempsPreparacio: 45,
    ingredients: ['Carbassa', 'Ceba', 'Mango', 'Formatge de cabra', 'Cald de verdures'],
    passes: ['Coure la carbassa i la ceba.', 'Triturar amb el brou i una mica de mango.', 'Servir amb bocins de formatge de cabra per damunt.']
  },
  {
    id: 9,
    titol: 'Brownie de xocolata',
    descripcio: 'Brownie de xocolata negra amb trossets d\'anacards.',
    categoria: 'Postres',
    dataCreacio: new Date('2026-10-09T17:20:00'),
    tempsPreparacio: 50,
    destacada: true,
    ingredients: ['Xocolata negra', 'Mantega', 'Sucre', 'Ous', 'Farina', 'Anacards'],
    passes: ['Fondre la xocolata amb la mantega.', 'Afegir sucre, ous i farina, remenant bé.', 'Afegir anacards i coure al forn.']
  },
  {
    id: 10,
    titol: 'Arròs negre',
    descripcio: 'Arròs de gambes amb tinta de calamar i allioli.',
    categoria: 'Dinar',
    dataCreacio: new Date('2026-10-10T14:00:00'),
    tempsPreparacio: 60,
    ingredients: ['Arròs', 'Gambes', 'Tinta de calamar', 'Fumet de peix', 'Allioli'],
    passes: ['Sofregir les gambes i retirar.', 'Afegir l\'arròs, el fumet i la tinta de calamar.', 'Coure fins que l\'arròs estigui a punt i acompanyar amb allioli.']
  }
];