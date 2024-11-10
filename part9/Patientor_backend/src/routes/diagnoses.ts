import express from "express";
import diagnosesService from "../services/diagnosesService";
const router = express.Router();

router.get("/", (_req, res) => {
  const allDiagnoses = diagnosesService.getDiagnosesEntries();
  res.send(allDiagnoses);
});

export default router;
