import { Diary } from '../types';

const DiaryList = ({ diaries }: { diaries: Diary[] }) => {
  return (
    <div>
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
};

export default DiaryList;
