import {
  NewPatientSensitive,
  NewPatientEntry,
  PatientEntry,
  PatientEntrySensitive,
} from '../types';
import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';

const getNonSensitivePatientsData = (): NewPatientSensitive[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    gender,
    dateOfBirth,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntrySensitive => {
  const patient: PatientEntry = {
    id: uuidv4(),
    ...entry,
  };

  patients.push(patient);

  const patientSensitive: PatientEntrySensitive = {
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  };

  return patientSensitive;
};

export default { getNonSensitivePatientsData, addPatient };
