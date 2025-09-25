import { Request, Response } from 'express';
import Patient from '../models/Patient';
import Therapist from '../models/Therapist';
import Admin from '../models/Admin';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;
    const existingUser = await Patient.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Patient({ name, email, password: hashedPassword, phone, role: 'patient' });
    await user.save();
    // Return user info for frontend compatibility
    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
    console.log(`Login attempt for email: ${email}, role: ${role}`);
    let Model;
    if (role === 'patient') {
      Model = Patient;
    } else if (role === 'therapist') {
      Model = Therapist;
    } else if (role === 'admin') {
      Model = Admin;
    } else {
      console.log('Invalid role provided:', role);
      return res.status(400).json({ error: 'Invalid role' });
    }
    const user = await (Model as any).findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
    if (!user) {
      console.log('User not found for email:', email);
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    console.log('User found:', user.email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch for user:', email);
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
