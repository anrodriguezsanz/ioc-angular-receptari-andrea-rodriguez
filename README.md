# The Recipe Archive — EAC3 (Serveis, API REST i Formularis Reactius)

Aplicació web desenvolupada amb **Angular 22** per gestionar, cercar i crear receptes connectades a una API REST local simulada amb `json-server`.

## Requisits previs

- **Node.js** (v20 o superior) i **npm**
- **Angular CLI** (`@angular/cli`)

## Instal·lació i execució

1. **Instal·lar les dependències del projecte:**

```bash
npm install
```

2. **Arrencar l'API REST simulada (`json-server` al port 3000):**

```bash
npm run api
```

Aquest script executa `json-server --watch db/receptes.json --port 3000` i exposa el recurs `http://localhost:3000/receptes`.

3. **Arrencar el servidor de desenvolupament d'Angular:**

```bash
ng serve
```

Obre el navegador a `http://localhost:4200`.

## Arquitectura i funcionalitats (Branca `ra3-serveis`)

- **Configuració i API (`db/receptes.json`, `src/app/config/api.config.ts`):** Fitxer JSON amb 10 receptes inicials i configuració centralitzada de la URL base i els endpoints.
- **Models i Adaptador (`src/app/models/`, `src/app/adapters/`, `docs/models.md`):** Separació entre el contracte extern (`ReceptaApi`) i el model intern (`Recepta`), amb normalització de cadenes (`.trim()`), conversions numèriques segures, dates (`Date`), categories tipades i valors per defecte.
- **Servei HTTP (`src/app/services/receptes-api.service.ts`):** Encapsulació de `HttpClient` amb peticions `GET` i `POST`, gestió reactiva d'estats (`carregant`, `error` i `receptes` mitjançant `signals`), reintent de l'última consulta (`reintentar()`) i cancel·lació de peticions anteriors amb `switchMap`.
- **Formulari reactiu i historial (`src/app/components/filtres/`, `src/app/validators/cerca.validators.ts`):** Cerca reactiva amb `ReactiveFormsModule` i `FormBuilder`, validador síncron (`termeCercaValidValidator`), validador asíncron contra l'API (`termeExistentApiValidator`), `debounceTime(400)` sobre `valueChanges` i historial persistent a `localStorage` sota la clau `recipe_archive_historial_cerques`.
- **Creació de receptes (`src/app/components/nova-recepta/`):** Formulari reactiu per desar noves receptes a l'API mitjançant `POST`.

## Execució de les proves unitàries

Per executar la bateria de tests unitaris (adaptador, servei HTTP i components):

```bash
npm test
```

## Documentació addicional

- `docs/models.md`: Especificació detallada del contracte de l'API (`ReceptaApi`), el model intern (`Recepta`) i les regles de transformació de l'adaptador.

## Enllaç del repositori
https://github.com/anrodriguezsanz/ioc-angular-receptari-andrea-rodriguez