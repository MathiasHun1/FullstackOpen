export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}

export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type PatientNonSensitive = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatientEntry = Omit<Patient, 'id'>;
export type NewPatientSensitive = Omit<NewPatientEntry, 'ssn'>;
