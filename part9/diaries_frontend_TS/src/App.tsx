import { useEffect, useState } from 'react';
import './App.css';
import { Diary, DiaryNoId } from './types';
import diaryServices from './services/diary';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    diaryServices.getAll().then((result) => setDiaries(result));
  }, []);

  const submitDiary = async () => {
    const newDiary: DiaryNoId = {
      date,
      visibility,
      weather,
      comment,
    };
    const createdDiary = await diaryServices.addNew(newDiary);
    diaries.concat(createdDiary);
  };

  return (
    <div>
      <h2>Add new diary</h2>
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
