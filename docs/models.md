# Models i adaptador de dades (`docs/models.md`)

## Fitxers implicats
* **Model API:** `src/app/models/recepta-api.model.ts`
* **Model intern:** `src/app/models/recepta.model.ts`
* **Adaptador:** `src/app/adapters/recepta.adapter.ts`

## Taula de mapatge API -> Model intern

| Camp API (`ReceptaApi`) | Camp model intern (`Recepta`) | Transformació / Normalització aplicada |
| :--- | :--- | :--- |
| `id` (`number \| string`) | `id` (`number`) | Conversió numèrica segura (`Number(...)`) amb comprovació `Number.isFinite`. |
| `titol` (`string`) | `titol` (`string`) | Neteja d'espais amb `.trim()` i valor per defecte si queda buit. |
| `descripcio` (`string`) | `descripcio` (`string`) | Neteja d'espais amb `.trim()` i text per defecte si falta o està buit. |
| `categoria` (`string`) | `categoria` (`CategoriaRecepta`) | `.trim()` i normalització cap a una categoria vàlida (`Esmorzar`, `Dinar`, `Sopar`, `Postres`). |
| `dataCreacio` (`string`) | `dataCreacio` (`Date`) | Conversió de cadena ISO a instància `Date` vàlida (amb fallback a data actual si no és vàlida). |
| `tempsPreparacio` (`number \| string`) | `tempsPreparacio` (`number`) | Conversió numèrica segura (`Number(...)`) amb arrodoniment i valor mínim per defecte (`15`). |
| `destacada` (`boolean?`) | `destacada` (`boolean`) | Valor booleà per defecte (`false`) mitjançant `Boolean(api.destacada ?? false)`. |
| `ingredients` (`string[]?`) | `ingredients` (`string[]`) | Neteja de cada element amb `.trim()` i filtratge d'elements buits. |
| `passes` (`string[]?`) | `passes` (`string[]`) | Neteja de cada pas amb `.trim()` i filtratge de passos buits. |