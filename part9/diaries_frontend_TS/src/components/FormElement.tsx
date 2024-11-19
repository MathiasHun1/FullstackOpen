import { Weather, Visibility, DiaryNoId, Diary } from '../types';
import { SyntheticEvent, useEffect, useState } from 'react';
import diaryServices from '../services/diary';
import utils from '../utils';
import { AxiosError } from 'axios';

interface FormProps {
  diaries: Diary[];
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string[] | null>>;
}

const FormElement = ({ diaries, setDiaries, setErrorMessage }: FormProps) => {
  const [visibility, setVisibility] = useState<Visibility | null>(null);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather | null>(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    console.log('visibility: ', visibility);
    console.log('weather: ', weather);
  }, [visibility, weather]);

  const onVisibilityChange = (e: SyntheticEvent<HTMLInputElement>) => {
    if (utils.isVisibility(e.currentTarget.value)) {
      setVisibility(e.currentTarget.value);
    }
  };

  const onWeatherChange = (e: SyntheticEvent<HTMLInputElement>) => {
    if (utils.isWeather(e.currentTarget.value)) {
      setWeather(e.currentTarget.value);
    }
  };

  const submitDiary = async (e: SyntheticEvent) => {
    e.preventDefault();

    // assertion is ok here, since the backend validates the request porperly
    const newDiary: DiaryNoId = {
      date,
      visibility,
      weather,
      comment,
    } as DiaryNoId;

    try {
      const createdDiary = await diaryServices.addNew(newDiary);
      setDiaries(diaries.concat(createdDiary));
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.log(error.response.data);
          setErrorMessage([...error.response.data]);
          return;
        }

        setErrorMessage([error.message]);
        return;
      } else if (error instanceof Error) {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={submitDiary}>
      <div>
        date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        Visibility:
        <label htmlFor="great">great</label>
        <input
          type="radio"
          name="visibility"
          value="great"
          id="great"
          onChange={onVisibilityChange}
        />
        <label htmlFor="good">good</label>
        <input
          type="radio"
          name="visibility"
          value="good"
          id="good"
          onChange={onVisibilityChange}
        />
        <label htmlFor="ok">ok</label>
        <input
          type="radio"
          name="visibility"
          value="ok"
          id="ok"
          onChange={onVisibilityChange}
        />
        <label htmlFor="poor">poor</label>
        <input
          type="radio"
          name="visibility"
          value="poor"
          id="poor"
          onChange={onVisibilityChange}
        />
      </div>
      <div>
        Weather:
        <label htmlFor="sunny">sunny</label>
        <input
          type="radio"
          name="weather"
          id="sunny"
          value="sunny"
          onChange={onWeatherChange}
        />
        <label htmlFor="rainy">rainy</label>
        <input
          type="radio"
          name="weather"
          id="rainy"
          value="rainy"
          onChange={onWeatherChange}
        />
        <label htmlFor="cloudy">cloudy</label>
        <input
          type="radio"
          name="weather"
          id="cloudy"
          value="cloudy"
          onChange={onWeatherChange}
        />
        <label htmlFor="stormy">stormy</label>
        <input
          type="radio"
          name="weather"
          id="stormy"
          value="stormy"
          onChange={onWeatherChange}
        />
        <label htmlFor="windy">windy</label>
        <input
          type="radio"
          name="weather"
          id="windy"
          value="windy"
          onChange={onWeatherChange}
        />
      </div>
      Comment:
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default FormElement;
