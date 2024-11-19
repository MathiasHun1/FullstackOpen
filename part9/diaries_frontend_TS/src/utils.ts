import { Visibility, Weather } from './types';

const isWeather = (weather: string): weather is Weather => {
  return ['sunny', 'rainy', 'cloudy', 'windy', 'stormy'].includes(weather);
};

const isVisibility = (value: string): value is Visibility => {
  return ['great', 'good', 'ok', 'poor'].includes(value);
};

export default {
  isWeather,
  isVisibility,
};
