import { Request, Response, NextFunction } from 'express';
import { proteinsRepository } from '../repositories/proteins';
import { itemsRepository } from '../repositories/items';
import { PicksRepository, picksRepository } from '../repositories/picks';

export interface PickController {
  get: (req: Request, res: Response, next: NextFunction) => Promise<void>
}

export const picksController = (): PickController => {
  // LOCAL
  let picksRepositoryInstance: PicksRepository;
  const getPicksRepositoryInstance = (): PicksRepository => {
    if (!picksRepositoryInstance) {
      picksRepositoryInstance = picksRepository({
        itemsRepository: itemsRepository({
          proteinsRepository: proteinsRepository()
        })
      });
    }

    return picksRepositoryInstance;
  };

  // PUBLIC
  const get = async (req: Request, res: Response, next: NextFunction) => {
    const items = req.query && req.query.items && typeof req.query.items === 'string'
      ? req.query.items.split(',')
      : [];

    try {
      const picks = await getPicksRepositoryInstance().getPicks(items);
      res.send(picks);
    } catch (err) {
      next(err);
    }
  };

  return {
    get
  };
};
