import { NewPatientEntry, Gender, Entry } from './types';
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

const parseStringProperty = (text: unknown, filedName: string) => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing ${filedName}`);
  }

  return text;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// const _isNumber = (value: unknown): value is number => {
//   return typeof value === 'number' || value instanceof Number;
// };

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

// const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
//   return Object.values(HealthCheckRating)
//     .map((value) => {
//       return Number(value);
//     })
//     .includes(rating);
// };

// const parseHealthCheckRating = (rating: unknown) => {
//   if (!rating || !isNumber(rating) || !isHealthCheckRating(rating)) {
//     throw new Error('Incorrect or missing healtCheck-rating');
//   }
//   return rating;
// };

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

export const bodyParser = (
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
