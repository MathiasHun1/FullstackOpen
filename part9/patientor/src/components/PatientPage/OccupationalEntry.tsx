import { OccupationalHealthcareEntry, Diagnosis } from '../../types';
import DiagnosisElement from './DiagnosisElement';
import dayjs from 'dayjs';

import WorkIcon from '@mui/icons-material/Work';

interface Props {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalEntry = ({ entry, diagnoses }: Props) => {
  return (
    <div style={{ border: 'solid', marginBottom: '1rem', padding: '4px' }}>
      <p>
        {entry.date}
        <WorkIcon />
      </p>
      <p>{entry.description}</p>

      {entry.diagnosisCodes &&
        entry.diagnosisCodes.map((code) => (
          <DiagnosisElement key={code} code={code} diagnoses={diagnoses} />
        ))}

      <p>Employer: {entry.employerName}</p>
      {entry.sickLeave && (
        <div>
          <p>
            {`sick-allowance: ${dayjs(entry.sickLeave.startDate).format(
              'YYYY.MM.DD'
            )} -
            ${dayjs(entry.sickLeave.endDate).format('YYYY.MM.DD')}`}
          </p>
        </div>
      )}

      <p>Diagnosed by: {entry.specialist}</p>
    </div>
  );
};

export default OccupationalEntry;
