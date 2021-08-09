import { Protein } from '../models/protein';
import axios from 'axios';
import createHttpError from 'http-errors';

export interface ProteinsRepository {
  getAllProteins: (options: { fromCache: boolean }) => Promise<Protein[]>;
  getProtein: (code: string) => Promise<Protein>;
}

export const proteinsRepository: () => ProteinsRepository = () => {

  // LOCAL
  // cache
  let proteins: Protein[];
  const indexedProteins: { [key:string]: Protein } = {};
  const config = {
    // url: 'https://chefcookit.free.beeceptor.com/proteins',
    url: 'http://127.0.0.1:8080/proteins',
  };

  // PUBLIC
  const getAllProteins = async (options: { fromCache: boolean }) => {
    const { fromCache } = options;
    if (fromCache && proteins) {
      return proteins;
    }

    // Ideally doing some validation
    const res = await axios.get<Protein[]>(config.url);
    proteins = res.data;
    return proteins;
  };

  const getProtein = async (code: string) => {
    if (indexedProteins[code]) {
      return indexedProteins[code];
    }

    for (const protein of await getAllProteins({fromCache: true})) {
      if (protein.code === code) {
        indexedProteins[code] = protein;
        return indexedProteins[code];
      }
    }

    throw createHttpError(404, 'Protein not found');
  };

  return {
    getAllProteins,
    getProtein
  };
};
