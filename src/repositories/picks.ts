import { ItemsRepository } from './items';
import { Pick } from '../models/pick';
import { Item } from '../models/item';

// LOCAL
interface PicksRepositoryOptions {
  itemsRepository: ItemsRepository;
}

// PUBLIC
export interface PicksRepository {
  getPicks: (items: string[]) => Promise<Pick>;
}

export const picksRepository: (options: PicksRepositoryOptions) => PicksRepository =
(options: PicksRepositoryOptions) => {
  const { itemsRepository } = options;
  const getPicks: (items: string[]) => Promise<Pick> = async (items: string[]) => {
    const fetchedItems: Item[] = await itemsRepository.getAllItemsAndProteins();
    const picks: Set<string> = new Set();
    const outOfStock: Set<string> = new Set();
    for (const item of fetchedItems) {
      if (items.indexOf(String(item.id)) <= -1) {
        continue;
      }

      const portions = item.displayName && item.displayName[0] ? item.displayName[0] : 1;
      if (item.station && item.volume >= portions) {
        picks.add(item.station);
      }

      if (item.station && item.volume <= 0) {
        outOfStock.add(item.station);
      }

      if (item.protein && item.protein.station) {
        picks.add(item.protein.station);
      }
    }

    return {
      picks: Array.from(picks),
      'out-of-stock': Array.from(outOfStock)
    };
  };

  return {
    getPicks
  };
};
