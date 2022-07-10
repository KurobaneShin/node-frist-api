import { Request, Response } from 'express';
import { Phrase } from '@models/Phrase';
import { Sequelize } from 'sequelize';

export const ping = (req: Request, res: Response) => {
  res.json({ pong: true });
};

export const createPhrase = async (req: Request, res: Response) => {
  let { author, txt } = req.body;

  const phrase = await Phrase.create({
    author,
    txt,
  });

  res.status(201);
  res.json({ id: phrase.id, author, txt });
};

export const getPhrases = async (req: Request, res: Response) => {
  const phrases = await Phrase.findAll();

  res.status(201);
  res.json(phrases);
};

export const getPhrase = async (req: Request, res: Response) => {
  const { id } = req.params;
  const phrase = await Phrase.findByPk(id);
  if (phrase) {
    res.status(200);
    res.json(phrase);
  } else {
    res.status(404);
    res.json({ error: 'not found' });
  }
};

export const updatePhrase = async (req: Request, res: Response) => {
  const { id } = req.params;

  const phrase = await Phrase.findByPk(id);
  const { author, txt } = req.body;

  if (phrase) {
    phrase.author = author;
    phrase.txt = txt;
    await phrase.save();
    res.status(200);
    res.json(phrase);
  } else {
    res.status(404);
    res.json({ error: 'not found' });
  }
};

export const deletePhrase = async (req: Request, res: Response) => {
  const { id } = req.params;

  await Phrase.destroy({
    where: { id },
  });

  res.json({});
};

export const randomPhrase = async (req: Request, res: Response) => {
  const phrase = await Phrase.findOne({
    order: [Sequelize.fn('RANDOM')],
  });

  if (phrase) {
    res.json({ phrase });
  } else {
    res.status(404);
    res.json({ error: 'not found' });
  }
};
