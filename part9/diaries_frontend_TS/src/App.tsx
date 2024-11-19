import { SyntheticEvent, useEffect, useState } from 'react';
import './App.css';
import { Diary, DiaryNoId } from './types';
import diaryServices from './services/diary';
import { AxiosError } from 'axios';

function ErrorMessage({ errorMessage }: { errorMessage: string }) {
  return <h3 className="errorMessage">Error: {errorMessage}</h3>;
}

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState<string[] | null>(null);

  useEffect(() => {
    diaryServices.getAll().then((result) => setDiaries(result));
  }, []);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const submitDiary = async (e: SyntheticEvent) => {
    e.preventDefault();

    const newDiary: DiaryNoId = {
      date,
      visibility,
      weather,
      comment,
    };

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
    <div>
      <h2>Add new diary</h2>

      {errorMessage &&
        errorMessage.map((message) => (
          <ErrorMessage key={message} errorMessage={message} />
        ))}

      <form onSubmit={submitDiary}>
        <div>
          date:
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          visibility:
          <input
            type="text"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          />
        </div>
        <div>
          weather:
          <input
            type="text"
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
          />
        </div>
        <div>
          comment:
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>

      <h2>Diaries</h2>
      {diaries.map((diary) => (
        <div className="diaryElement" key={diary.id}>
          <p>
            <b>{diary.date}</b>
          </p>
          <p>{diary.visibility}</p>
          <p>{diary.weather}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
