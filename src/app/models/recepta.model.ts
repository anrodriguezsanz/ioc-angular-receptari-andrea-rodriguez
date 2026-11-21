export type CategoriaRecepta = 'Esmorzar' | 'Dinar' | 'Sopar' | 'Postres';

export interface Recepta {
  id: number;
  titol: string;
  descripcio: string;
  categoria: CategoriaRecepta;
  dataCreacio: Date;
  tempsPreparacio: number;
  destacada: boolean;
  ingredients: string[];
  passes: string[];
}