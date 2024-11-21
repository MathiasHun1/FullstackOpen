import express from 'express';
import diagnosesService from '../services/diagnosesService';
const router = express.Router();

router.get('/', (_req, res) => {
  const allDiagnoses = diagnosesService.getDiagnosesEntries();
  res.send(allDiagnoses);
});

router.get('/:code', (req, res) => {
  const specificDiagnose = diagnosesService.findByCode(req.params.code);
  res.send(specificDiagnose);
});

export default router;
