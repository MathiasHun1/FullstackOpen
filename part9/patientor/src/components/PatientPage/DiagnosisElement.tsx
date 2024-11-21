import { Diagnosis } from '../../types';

interface Props {
  code: string;
  diagnoses: Diagnosis[];
}

const DiagnosisElement = ({ code, diagnoses }: Props) => {
  const diagnosis = diagnoses.find((d) => d.code === code);

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
