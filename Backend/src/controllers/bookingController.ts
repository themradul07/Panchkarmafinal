
import { Request, Response } from 'express';

import Booking from '../models/Booking';
const { createGmailTransport } = require('../utils/mailer');
export const createBooking = async (req: Request, res: Response) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    // Try to send confirmation email using Gmail
    let emailError = null;
    try {
      const transporter = createGmailTransport();
      const mailOptions = {
        from: 'Panchkarma Booking <no-reply@panchkarma.com>',
        to: booking.patientEmail,
        subject: 'Your Panchkarma Booking Confirmation',
        text: `Dear ${booking.patientName},\n\nYour booking is confirmed!\n\nDetails:\nTherapist: ${booking.therapistId}\nTherapy: ${booking.therapyType}\nDate: ${booking.therapyDate}\nTime: ${booking.therapyTime}\nFee: ₹${booking.consultationFee}\n\nThank you for choosing us!`,
        html: `<h2>Booking Confirmed!</h2><p>Dear ${booking.patientName},</p><p>Your booking is confirmed.</p><ul><li><b>Therapist:</b> ${booking.therapistId}</li><li><b>Therapy:</b> ${booking.therapyType}</li><li><b>Date:</b> ${booking.therapyDate}</li><li><b>Time:</b> ${booking.therapyTime}</li><li><b>Fee:</b> ₹${booking.consultationFee}</li></ul><p>Thank you for choosing us!</p>`
      };
      await transporter.sendMail(mailOptions);
    } catch (emailErr) {
      emailError = emailErr;
    }

    res.status(201).json({ booking, emailSent: !emailError, emailError });
  } catch (err) {
    res.status(400).json({ error: 'Failed to create booking', details: err });
  }
};

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
