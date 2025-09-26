import express from "express";
import Therapist from "../models/Therapist";

const router = express.Router();

router.get("/me", async (req, res) => {
  try {
    // Assuming userId from some auth, but for now, placeholder
    const userId = req.query.userId; // or from auth
    const therapist = await Therapist.findOne({ _id: userId });
    res.json(therapist);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
