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

const parseStringProperty = (text: unknown, fieldName: string) => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing ${fieldName}`);
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
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

// TASK Work

/* function for parsing a new entry to one of the possible types*/
export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!isObjectWithCorrectType(object) || !isBaseEntry(object)) {
    console.log('Booooooo');
    throw new Error('Ivalid/missing base entry porperties or invalid type');
  }

  const base: Omit<BaseEntry, 'id'> = {
    description: z.string().parse(object.description),
    date: z.string().parse(object.date),
    specialist: z.string().parse(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
  };

  if (object.type === 'HealthCheck' && 'healthCheckRating' in object) {
    const entry: Omit<HealthCheckEntry, 'id'> = {
      type: object.type,
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      ...base,
    };
    return entry;
  } else if (object.type === 'Hospital' && 'discharge' in object) {
    const entry: Omit<HospitalEntry, 'id'> = {
      type: object.type,
      discharge: parseDiascharge(object.discharge),
      ...base,
    };
    return entry;
  } else if (
    object.type === 'OccupationalHealthcare' &&
    'employerName' in object
  ) {
    const entry: Omit<OccupationalHealthcareEntry, 'id'> = {
      type: object.type,
      employerName: z.string().parse(object.employerName),
      ...base,
    };
    if (!('sickLeave' in object)) {
      return entry;
    } else {
      entry.sickLeave = parseSickLeave(object.sickLeave);
      return entry;
    }
  }

  throw new Error('Missing or invalid data');
};

const isObjectWithCorrectType = (
  object: unknown
): object is {
  type: 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital';
} => {
  return (
    object !== null &&
    typeof object === 'object' &&
    'type' in object &&
    isString(object.type) &&
    ['HealthCheck', 'OccupationalHealthcare', 'Hospital'].includes(object.type)
  );
};

const isBaseEntry = (object: unknown): object is Omit<BaseEntry, 'id'> => {
  if (!object || typeof object !== 'object') {
    throw new Error('Invalid or missing entry object');
  }

  return (
    ('description' in object &&
      'date' in object &&
      'specialist' in object &&
      !('diagnosisCodes' in object)) ||
    ('description' in object &&
      'date' in object &&
      'specialist' in object &&
      'diagnosisCodes' in object)
  );
};

const parseDiascharge = (
  object: unknown
): { date: string; criteria: string } => {
  if (!object || typeof object !== 'object') {
    throw new Error('dishacrge is not object');
  }

  if (!('date' in object && 'criteria' in object)) {
    throw new Error('Invalid or missing properties in hospitalEntry/discharge');
  }

  const parsedObject = {
    date: z.string().parse(object.date),
    criteria: z.string().parse(object.criteria),
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
    throw new Error(
      'Invalid or missing sickLeave property in occupation entry'
    );
  }

  const parsedObject = {
    startDate: z.string().parse(object.startDate),
    endDate: z.string().parse(object.endDate),
  };

  return parsedObject;
};

const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' || value instanceof Number;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => Number(v))
    .includes(param);
};

const parseHealthCheckRating = (value: unknown): HealthCheckRating => {
  if (!value || !isNumber(value) || !isHealthCheckRating(value)) {
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
