import { NewPatientEntry, Gender } from "./types";

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseStringProperty(object.name, "name"),
      dateOfBirth: parseStringProperty(object.dateOfBirth, "date of birth"),
      ssn: parseStringProperty(object.ssn, "ssn"),
      gender: parseGender(object.gender),
      occupation: parseStringProperty(object.occupation, "occupation"),
    };

    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

const parseStringProperty = (text: unknown, filedName: string) => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing ${filedName}`);
  }

  return text;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseGender = (text: unknown) => {
  if (!text || !isString(text) || !isGender(text)) {
    throw new Error("Incorrect or missing gender");
  }

  return text;
};

const isGender = (text: string): text is Gender => {
  return Object.values(Gender)
    .map((v) => {
      return v.toString();
    })
    .includes(text);
};
