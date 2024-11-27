import axios from 'axios';
import { Patient, PatientFormValues, EntryWithoutId, Entry } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getById = async (userId: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${userId}`);
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const createEntry = async (paientId: string, values: EntryWithoutId) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${paientId}/entries`,
    values
  );

  return data;
};

export default {
  getAll,
  create,
  getById,
  createEntry,
};
