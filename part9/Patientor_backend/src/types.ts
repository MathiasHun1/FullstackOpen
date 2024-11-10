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
  gender: string;
  occupation: string;
};

export type PatientSensitive = Omit<PatientEntry, "ssn">;
