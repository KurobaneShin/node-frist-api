import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutes from '@routes/api';

dotenv.config();

const server = express();

server.use(
  cors({
    origin: '*',
  })
);

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({ extended: true }));

server.use(apiRoutes);

server.use((_req: Request, res: Response) => {
  res.status(404);
  res.json({ error: 'Not Found' });
});

server.listen(process.env.PORT);
