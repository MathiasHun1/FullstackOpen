import { NewPatientEntry, Patient, PatientNonSensitive } from '../types';
import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';

const getNonSensitivePatientsData = (): PatientNonSensitive[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    gender,
    dateOfBirth,
    occupation,
  }));
};

const getPatientById = (id: string): Patient => {
  const patient = patients.find((p) => p.id === id);

  if (patient) {
    return patient;
  } else {
    throw new Error('No patient found with the given id');
  }
};

const addPatient = (entry: NewPatientEntry): PatientNonSensitive => {
  const patient: Patient = {
    id: uuidv4(),
    ...entry,
  };

  patients.push(patient);

  const patientSensitive: PatientNonSensitive = {
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  };

  return patientSensitive;
};

export default { getNonSensitivePatientsData, addPatient, getPatientById };
