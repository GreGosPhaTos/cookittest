import { Protein } from './protein';

export interface Item {
  id: number;
  name: string;
  displayName: string;
  volume: number;
  deliveryWeek: string;
  station: string;
  category: 'RECETTE' | 'MISC' | 'DESSERT';
  protein?: Protein
}
