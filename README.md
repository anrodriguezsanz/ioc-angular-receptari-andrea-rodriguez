# The Recipe Archive

## Autora
Andrea Rodríguez Sanz

## Descripció
Aplicació per registrar i consultar receptes de cuina.

## Versions utilitzades
- Node.js 24.21.0
- Angular CLI 22.2.1
- npm 11.19.0

## Branca actual
Aquesta EAC s'ha desenvolupat a la branca `ra2-components`.

## Components
- `ReceptaLlistaComponent` (Component pare): Gestiona l'estat global de la llista, el filtratge reactiu, el comptador de resultats i el panell lateral de detall.
- `ReceptaTargetaComponent` (Component fill): Mostra la informació resumida de cada recepta i gestiona la interacció de selecció (amb suport de teclat i focus visible).
- `FiltresComponent`: Formulari basat en plantilla (ngForm) amb validacions i associació de camps.
- `EtiquetaCategoriaComponent`: Component auxiliar encarregat de categoritzar visualment cada recepta.


## Com executar el projecte
Per executar-lo, cal situar-se al directori arrel del projecte i introduïr la següent comanda a la terminal:
 `ng serve`

## Enllaç del repositori
https://github.com/anrodriguezsanz/ioc-angular-receptari-andrea-rodriguez