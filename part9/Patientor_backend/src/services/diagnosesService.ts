import { Diagnosis } from '../types';
import diagnosesData from '../../data/diagnoses';

const getDiagnosesEntries = (): Diagnosis[] => {
  return diagnosesData;
};

const findByCode = (code: string): Diagnosis => {
  const result = diagnosesData.find((d) => d.code === code);
  if (!result) {
    throw new Error('no diagnosis found with the given code');
  }
  return result;
};

export default { getDiagnosesEntries, findByCode };
