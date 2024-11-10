import { PatientSensitive } from "../types";
import patients from "../../data/patients";

const getNonSensitivePatientsData = (): PatientSensitive[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    gender,
    dateOfBirth,
    occupation,
  }));
};

export default { getNonSensitivePatientsData };
