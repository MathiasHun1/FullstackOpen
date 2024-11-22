import { HealthCheckEntry, Diagnosis } from '../../types';
import DiagnosisElement from './DiagnosisElement';

import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import HeartIcon from '@mui/icons-material/Favorite';

interface Props {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const HealtCheckEntry = ({ entry, diagnoses }: Props) => {
  const setIconColor = () => {
    switch (entry.healthCheckRating) {
      case 0:
        return 'green';
      case 1:
        return 'yellow';
      case 2:
        return 'orange';
      case 3:
        return 'red';
      default:
        break;
    }
  };

  return (
    <div style={{ border: 'solid', marginBottom: '1rem', padding: '4px' }}>
      <p>
        {entry.date}
        <MonitorHeartIcon />
      </p>
      <p>{entry.description}</p>
      <HeartIcon sx={{ color: setIconColor() }} />

      {entry.diagnosisCodes &&
        entry.diagnosisCodes.map((code) => (
          <DiagnosisElement key={code} code={code} diagnoses={diagnoses} />
        ))}

      <p>Diagnosed by: {entry.specialist}</p>
    </div>
  );
};

export default HealtCheckEntry;
