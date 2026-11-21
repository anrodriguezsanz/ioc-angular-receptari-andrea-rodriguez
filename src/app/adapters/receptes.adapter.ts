import { ReceptaApi } from '../models/recepta-api.model';
import { CategoriaRecepta, Recepta } from '../models/recepta.model';

const CATEGORIES_VALIDES: CategoriaRecepta[] = ['Esmorzar', 'Dinar', 'Sopar', 'Postres'];

function normalitzarCategoria(valor: string | undefined): CategoriaRecepta {
  const net = (valor ?? '').trim();
  const trobada = CATEGORIES_VALIDES.find(
    (cat) => cat.toLowerCase() === net.toLowerCase()
  );
  return trobada ?? 'Dinar';
}

function normalitzarTemps(valor: number | string | undefined): number {
  const num = typeof valor === 'number' ? valor : Number(String(valor ?? '').trim());
  return Number.isFinite(num) && num > 0 ? Math.round(num) : 15;
}

function normalitzarData(valor: string | undefined): Date {
  if (!valor) {
    return new Date();
  }
  const data = new Date(valor);
  return Number.isNaN(data.getTime()) ? new Date() : data;
}

export function adaptarReceptaApiAModel(api: ReceptaApi): Recepta {
  const idNum = typeof api.id === 'number' ? api.id : Number(String(api.id).trim());
  const titolNet = (api.titol ?? '').trim() || 'Recepta sense títol';
  const descripcioNet = (api.descripcio ?? '').trim() || 'Sense descripció disponible.';

  const ingredientsNets = Array.isArray(api.ingredients)
    ? api.ingredients.map((ing) => String(ing).trim()).filter((ing) => ing.length > 0)
    : [];

  const passesNetes = Array.isArray(api.passes)
    ? api.passes.map((pas) => String(pas).trim()).filter((pas) => pas.length > 0)
    : [];

  return {
    id: Number.isFinite(idNum) ? idNum : 0,
    titol: titolNet,
    descripcio: descripcioNet,
    categoria: normalitzarCategoria(api.categoria),
    dataCreacio: normalitzarData(api.dataCreacio),
    tempsPreparacio: normalitzarTemps(api.tempsPreparacio),
    destacada: Boolean(api.destacada ?? false),
    ingredients: ingredientsNets,
    passes: passesNetes
  };
}

export function adaptarReceptesApiAModel(llistaApi: ReceptaApi[]): Recepta[] {
  return Array.isArray(llistaApi) ? llistaApi.map(adaptarReceptaApiAModel) : [];
}