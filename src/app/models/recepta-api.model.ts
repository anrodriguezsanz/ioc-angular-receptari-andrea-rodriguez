export type CategoriaApi = 'Esmorzar' | 'Dinar' | 'Sopar' | 'Postres' | string;

export interface ReceptaApi {
  id: number | string;
  titol: string;
  descripcio: string;
  categoria: CategoriaApi;
  dataCreacio: string;
  tempsPreparacio: number | string;
  destacada?: boolean;
  ingredients?: string[];
  passes?: string[];
}