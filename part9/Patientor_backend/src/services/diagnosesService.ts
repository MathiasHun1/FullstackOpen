import { Diagnosis } from '../types';
import diagnosesData from '../../data/diagnoses';

const getDiagnosesEntries = (): Diagnosis[] => {
  return diagnosesData;
};

export default { getDiagnosesEntries };
