import {
  NewPatientEntry,
  Gender,
  Entry,
  EntryWithoutId,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  BaseEntry,
  Diagnosis,
  OccupationalHealthcareEntry,
} from './types';
import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object &&
    'entries' in object
  ) {
    const newEntry: NewPatientEntry = {
      name: z.string().parse(object.name),
      dateOfBirth: parseStringProperty(object.dateOfBirth, 'date of birth'),
      ssn: parseStringProperty(object.ssn, 'ssn'),
      gender: parseGender(object.gender),
      occupation: parseStringProperty(object.occupation, 'occupation'),
      //PROVISIONALLY assert the type
      entries: object.entries as Entry[],
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Invalid or missong entry object');
  }

  if (!isObjectWithCorrectType(object)) {
    throw new Error('Invalid or missing entry-type');
  }

  const base = parseBaseEntry(object);

  if (object.type === 'HealthCheck') {
    if (!('healthCheckRating' in object)) {
      throw new Error('missing healthCheckRating field');
    }
    const entry: Omit<HealthCheckEntry, 'id'> = {
      type: object.type,
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      ...base,
    };

    if ('diagnosisCodes' in object) {
      entry.diagnosisCodes = object.diagnosisCodes as string[];
    }
    return entry;
  } else if (object.type === 'Hospital') {
    if (!('discharge' in object)) {
      throw new Error('missing discharge field');
    }
    const entry: Omit<HospitalEntry, 'id'> = {
      type: object.type,
      discharge: parseDiascharge(object.discharge),
      ...base,
    };

    if ('diagnosisCodes' in object) {
      entry.diagnosisCodes = object.diagnosisCodes as string[];
    }
    return entry;
  } else if (object.type === 'OccupationalHealthcare') {
    if (!('employerName' in object)) {
      throw new Error('missing employerName field');
    }

    const entry: Omit<OccupationalHealthcareEntry, 'id'> = {
      type: object.type,
      employerName: parseStringProperty(object.employerName, 'employerName'),
      ...base,
    };

    if ('diagnosisCodes' in object) {
      entry.diagnosisCodes = object.diagnosisCodes as string[];
    }
    if (!('sickLeave' in object)) {
      return entry;
    } else {
      entry.sickLeave = parseSickLeave(object.sickLeave);
      return entry;
    }
  }

  throw new Error('Unknown error');
};

const parseStringProperty = (text: unknown, fieldName: string) => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing ${fieldName} field!`);
  }

  return text;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseGender = (text: unknown) => {
  if (!text || !isString(text) || !isGender(text)) {
    throw new Error('Incorrect or missing gender');
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

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

export const bodyParserForPatient = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).json({ issues: error.issues });
  } else {
    next(error);
  }
};

const parseBaseEntry = (object: object): Omit<BaseEntry, 'id'> => {
  if (!('description' in object)) {
    throw new Error('Missing description');
  }

  if (!('date' in object)) {
    throw new Error('Missing date');
  }

  if (!('specialist' in object)) {
    throw new Error('Missing specialist');
  }

  const base: Omit<BaseEntry, 'id'> = {
    description: parseStringProperty(object.description, 'description'),
    date: parseDate(object.date),
    specialist: parseStringProperty(object.specialist, 'specialist'),
  };

  if ('diagnosisCodes' in object) {
    base.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
  }

  return base;
};

const isObjectWithCorrectType = (
  object: object
): object is {
  type: 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital';
} => {
  return (
    'type' in object &&
    isString(object.type) &&
    ['HealthCheck', 'OccupationalHealthcare', 'Hospital'].includes(object.type)
  );
};

const parseDiascharge = (
  object: unknown
): { date: string; criteria: string } => {
  if (!object || typeof object !== 'object') {
    throw new Error('dishacrge is not object');
  }

  if (!('date' in object && 'criteria' in object)) {
    throw new Error('Missing properties in hospitalEntry/discharge');
  }

  const parsedObject = {
    date: parseDate(object.date),
    criteria: parseStringProperty(object.criteria, 'discharge/criteria'),
  };
  return parsedObject;
};

const parseSickLeave = (
  object: unknown
): { startDate: string; endDate: string } => {
  if (!object || typeof object !== 'object') {
    throw new Error('sickLeave is not object');
  }

  if (!('startDate' in object && 'endDate' in object)) {
    throw new Error('Missing property in occupation entry/sickLeave');
  }

  const parsedObject = {
    startDate: parseDate(object.startDate),
    endDate: parseDate(object.endDate),
  };

  return parsedObject;
};

const isHealthCheckRating = (param: string): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => v.toString())
    .includes(param);
};

const parseHealthCheckRating = (value: unknown): HealthCheckRating => {
  if (!value || !isString(value) || !isHealthCheckRating(value)) {
    throw new Error(`Incorrect Healtcheck-rating: ${value}`);
  }

  return value;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isCorrectDateFormat = (value: string): boolean => {
  // const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/;

  if (!regex.test(value)) {
    return false;
  }

  const date = new Date(value);
  const [year, month, day] = value.split('-').map((v) => Number(v));

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

const parseDate = (value: unknown) => {
  if (!value || !isString(value) || !isCorrectDateFormat(value)) {
    throw new Error('Missing date or Incorrect date-format');
  }

  return value;
};
