import { useEffect, useState } from 'react';
import { Diagnosis } from '../../types';
import diagnosesService from '../../services/diagnoses';

const DiagnosisElement = ({ code }: { code: string }) => {
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);

  useEffect(() => {
    diagnosesService.getByCode(code).then((result) => setDiagnosis(result));
  }, []);

  if (diagnosis) {
    return (
      <p>
        <b>{diagnosis.code}</b> - {diagnosis.name}
      </p>
    );
  }

  return null;
};

export default DiagnosisElement;
