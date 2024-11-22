import { HospitalEntry, Diagnosis } from '../../types';
import DiagnosisElement from './DiagnosisElement';

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface Props {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalEntryElement = ({ entry, diagnoses }: Props) => {
  return (
    <div style={{ border: 'solid', marginBottom: '1rem', padding: '4px' }}>
      <p>
        {entry.date}
        <LocalHospitalIcon />
      </p>
      <p>{entry.description}</p>

      {entry.diagnosisCodes &&
        entry.diagnosisCodes.map((code) => (
          <DiagnosisElement key={code} code={code} diagnoses={diagnoses} />
        ))}

      <p>
        Discharged: {entry.discharge.date}, {entry.discharge.criteria}
      </p>

      <p>Diagnosed by: {entry.specialist}</p>
    </div>
  );
};

export default HospitalEntryElement;
