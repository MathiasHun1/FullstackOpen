import express, { Response, Request } from 'express';
import patientService from '../services/patientServices';
import { bodyParserForPatient /*errorHandler*/ } from '../utils';
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
  bodyParserForPatient,
  (
    req: Request<unknown, unknown, NewPatientEntry>,
    res: Response<PatientNonSensitive>
  ) => {
    const addedEntry: PatientNonSensitive = patientService.addPatient(req.body);

    res.status(200).json(addedEntry);
  }
);

router.post('/:id/entries', (req: Request, res: Response) => {
  try {
    const patient = patientService.getPatientById(req.params.id);
    const addedEntry = patientService.adddEntry(patient, req.body);
    res.status(201).send(addedEntry);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
});

// router.use(errorHandler);

export default router;
