import express from "express";
import Patient from "../models/Patient";

const router = express.Router();

router.get("/me", async (req, res) => {
  try {
    // Assuming userId from some auth, but for now, placeholder
    const userId = req.query.userId; // or from auth
    const patient = await Patient.findOne({ _id: userId });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
