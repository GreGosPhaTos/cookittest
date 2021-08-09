import { Item } from '../models/item';
import axios from 'axios';
import { ProteinsRepository } from './proteins';

// LOCAL
interface ItemsRepositoryOptions {
  proteinsRepository: ProteinsRepository;
}

// PUBLIC
export interface ItemsRepository {
  getAllItemsAndProteins: () => Promise<Item[]>;
}

export const itemsRepository: (options: ItemsRepositoryOptions) => ItemsRepository =
(options: ItemsRepositoryOptions): ItemsRepository => {

  // LOCAL
  let items: Item[];
  const extractProteinCode = (displayName: string) => {
    const displayNameParts = displayName.split('-');
    if(displayNameParts.length && displayNameParts[1]) {
      return displayNameParts[1];
    }
  };
  const config = {
    // url: 'https://chefcookit.free.beeceptor.com/items',
    url: 'http://127.0.0.1:8080/items',
  };

  // PUBLIC
  const getAllItems: (options: { fromCache: boolean }) => Promise<Item[]> = async (options: { fromCache: boolean }) => {
    const { fromCache } = options;
    if (fromCache && items) {
      return items;
    }

    const res = await axios.get<Item[]>(config.url);
    items = res.data;
    return items;
  };


  const getAllItemsAndProteins = async () => {
    const { proteinsRepository } = options;
    const items: Item[] = await getAllItems({fromCache: true});
    const itemsWithProtein: Item[] = await Promise.all(items.map(async (item: Item) => {
      const newItem = { ...item };
      const proteinCode = newItem.displayName ? extractProteinCode(newItem.displayName) : undefined;
      if (proteinCode) {
        try {
          newItem.protein = (await proteinsRepository.getProtein(proteinCode));
        } catch (err) {
          if (err.statusCode !== 404) {
            throw err;
          }
        }

      }

      return newItem;
    }));

    return itemsWithProtein;
  };

  return {
    getAllItemsAndProteins
  };
};
