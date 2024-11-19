import { useEffect, useState } from 'react';
import './App.css';
import { Diary } from './types';
import diaryServices from './services/diary';
import DiaryList from './components/DiaryList';
import FormElement from './components/FormElement';

function ErrorMessage({ errorMessage }: { errorMessage: string }) {
  return <h3 className="errorMessage">Error: {errorMessage}</h3>;
}

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
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

  return (
    <div>
      <h2>Add new diary</h2>

      {errorMessage &&
        errorMessage.map((message) => (
          <ErrorMessage key={message} errorMessage={message} />
        ))}

      <FormElement
        diaries={diaries}
        setDiaries={setDiaries}
        setErrorMessage={setErrorMessage}
      />

      <DiaryList diaries={diaries} />
    </div>
  );
}

export default App;
