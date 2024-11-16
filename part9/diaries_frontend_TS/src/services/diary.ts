import axios from 'axios';
import { Diary, DiaryNoId } from '../types';

const baseURL = 'http://localhost:3003/api/diaries';

const getAll = async () => {
  const response = await axios.get<Diary[]>(baseURL);
  return response.data;
};

const addNew = async (diary: DiaryNoId) => {
  const response = await axios.post<Diary>(baseURL, diary);
  return response.data;
};

export default {
  getAll,
  addNew,
};
