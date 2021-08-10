import express, { Express, NextFunction, Request, Response } from 'express';
import { picksController } from './controllers/picks';
import { isHttpError } from 'http-errors';

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app: Express = express();

// Routes
app.get('/picks', picksController().get);
app.get('/', function (_req: Request, res: Response) {
  res.send('Hello !');
});
// Mocks
app.get('/items', function (_req: Request, res: Response) {
  res.send([
    {
      'id': 123,
      'name': 'Tacos buffulo croustillant',
      'displayName': '2P-C-123',
      'volume': 1000,
      'deliveryWeek': '2021-08-09',
      'station': 'A1',
      'category': 'RECETTE'
    },
    {
      'id': 124,
      'name': 'Aiglefin aux épices jerk',
      'displayName': '2P-F-124',
      'volume': 999,
      'deliveryWeek': '2021-08-09',
      'station': 'A2',
      'category': 'RECETTE'
    },
    {
      'id': 125,
      'name': 'Bol de quinoa et pois chiches au za\'atar',
      'displayName': '2P--123',
      'volume': 0,
      'deliveryWeek': '2021-08-09',
      'station': 'A3',
      'category': 'RECETTE'
    },
    {
      'id': 126,
      'name': 'Guédilles aux crevettes nordiques',
      'displayName': '2P-S-123',
      'volume': 1000,
      'deliveryWeek': '2021-08-09',
      'station': 'A4',
      'category': 'RECETTE'
    },
    {
      'id': 127,
      'name': 'Boulettes de boeuf au za\'atar et cumin',
      'displayName': '2P-M-123',
      'volume': 4,
      'deliveryWeek': '2021-08-09',
      'station': 'B1',
      'category': 'RECETTE'
    },
    {
      'id': 128,
      'name': 'Burger de poulet croustillant',
      'displayName': '2P-C-123',
      'volume': 0,
      'deliveryWeek': '2021-08-09',
      'station': 'B2',
      'category': 'RECETTE'
    },
    {
      'id': 129,
      'name': 'Salade Grecque à l\'aubergine croustillante',
      'displayName': '2P--129',
      'volume': 10,
      'deliveryWeek': '2021-08-09',
      'station': 'B3',
      'category': 'RECETTE'
    },
    {
      'id': 130,
      'name': 'chocolat noir',
      'displayName': 'chocolat-noir-130',
      'volume': 10,
      'deliveryWeek': '2021-08-09',
      'station': 'B3',
      'category': 'MISC'
    }
  ]);
});
app.get('/proteins', function (_req: Request, res: Response) {
  res.send([
    {
      'name': 'boeuf',
      'code': 'M',
      'station': 'C1'
    },
    {
      'name': 'poulet',
      'code': 'C',
      'station': 'C2'
    },
    {
      'name': 'poisson',
      'code': 'F',
      'station': 'C3'
    },
    {
      'name': 'fruits de mer',
      'code': 'S',
      'station': 'C4'
    }
  ]);
});

// Error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(function(err: Error, _req: Request, res: Response, _next: NextFunction) {
  console.error(err.stack);
  let status = 500;
  if (isHttpError(err)) {
    status = err.statusCode;
  }

  res.status(status).send({
    error: {
      message: err.message || 'Server fault'
    }
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
