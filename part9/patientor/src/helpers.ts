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

export const isObjectEmpty = (object: object | undefined): boolean => {
  if (!object) return true;

  const values = Object.values(object).map((v) => v.toString());
  return values.every((v) => v === '');
};

export const sortByDate = (entryArray: Entry[]): Entry[] => {
  const sorted = [...entryArray].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    return dateB - dateA;
  });

  return sorted;
};
