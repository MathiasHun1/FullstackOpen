export enum Gender {
  Female = "female",
  Male = "male",
  Other = "other",
}

// export type Gender = "female" | "male" | "other";

export type DiagnosisEntry = {
  code: string;
  name: string;
  latin?: string;
};

export type PatientEntry = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
};

export type PatientSensitive = Omit<PatientEntry, "ssn">;

export type NewPatientEntry = Omit<PatientEntry, "id">;
