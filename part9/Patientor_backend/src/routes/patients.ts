import express, { Response, Request } from 'express';
import patientService from '../services/patientServices';
import { bodyParser, errorHandler } from '../utils';
import { PatientNonSensitive, NewPatientEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientsData());
});

router.get('/:id', (req, res) => {
  res.send(patientService.getPatientById(req.params.id));
});

router.post(
  '/',
  bodyParser,
  (
    req: Request<unknown, unknown, NewPatientEntry>,
    res: Response<PatientNonSensitive>
  ) => {
    const addedEntry: PatientNonSensitive = patientService.addPatient(req.body);

    res.status(200).json(addedEntry);
  }
);

router.use(errorHandler);

export default router;
