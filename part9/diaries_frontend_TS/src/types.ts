export interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
}

export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';

export type DiaryNoId = Omit<Diary, 'id'>;
