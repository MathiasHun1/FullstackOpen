import {
  NewPatientEntry,
  Patient,
  PatientNonSensitive,
  EntryWithoutId,
  Entry,
} from '../types';
import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';

import { toNewEntry } from '../utils';

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
    entries: [],
  };

  patients.push(patient);

  const patientNonSensitive: PatientNonSensitive = {
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  };

  return patientNonSensitive;
};

const addEntry = (patient: Patient, entry: unknown): Entry => {
  const parsedObject: EntryWithoutId = toNewEntry(entry);

  const newEntry: Entry = {
    ...parsedObject,
    id: uuidv4(),
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getNonSensitivePatientsData,
  addPatient,
  getPatientById,
  addEntry,
};
