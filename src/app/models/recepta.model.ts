export interface Recepta {
  id: number;
  titol: string;
  descripcio: string;
  categoria: 'Esmorzar' | 'Dinar' | 'Sopar' | 'Postres';
  dataCreacio: Date;
  tempsPreparacio: number;
  destacada?: boolean;
  ingredients: string[];
  passes: string[];
}