import express from "express";
import Patient from "../models/Patient.js";
import { verifyToken, permit } from "../middleware/auth.js";

const router = express.Router();

router.get("/me", verifyToken, permit("patient"), async (req, res) => {
  try {
    const userId = req.user.id;
    const patient = await Patient.findOne({ userId }).populate("userId", "name email role");
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
