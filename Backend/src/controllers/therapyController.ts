import { Request, Response } from 'express';
import Therapy from '../models/Therapy';

export const getAllTherapies = async (req: Request, res: Response) => {
  try {
    const therapies = await Therapy.find();
    res.json(therapies);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
