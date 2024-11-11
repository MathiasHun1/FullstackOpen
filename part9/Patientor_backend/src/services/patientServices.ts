import { PatientSensitive, NewPatientEntry, PatientEntry } from "../types";
import patients from "../../data/patients";
import { v4 as uuidv4 } from "uuid";

const getNonSensitivePatientsData = (): PatientSensitive[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    gender,
    dateOfBirth,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatient: PatientEntry = {
    id: uuidv4(),
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

export default { getNonSensitivePatientsData, addPatient };
