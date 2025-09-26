import { Request, Response } from 'express';
import Patient from '../models/Patient';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await Patient.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
