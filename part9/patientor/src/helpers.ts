import { format } from 'date-fns';
import { Entry } from './types';

export const assertNever = (value: never): never => {
  throw new Error(
    `unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const getTodaysDateString = (): string => {
  const today = new Date();
  return format(today, 'yyyy-MM-dd');
};

export const sickLeaveNotFilled = (object: object | undefined): boolean => {
  if (!object) return true;

  const values = Object.values(object).map((v) => v.toString());
  if (values.find((v) => v === 'Invalid Date')) {
    return true;
  }
  return false;
};

export const sortByDate = (entryArray: Entry[]): Entry[] => {
  const sorted = [...entryArray].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    return dateB - dateA;
  });

  return sorted;
};
