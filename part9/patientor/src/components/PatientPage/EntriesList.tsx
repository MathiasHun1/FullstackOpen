import { BaseEntry, Diagnosis } from '../../types';
import DiagnosisElement from './DiagnosisElement';

interface Props {
  entries: BaseEntry[];
  diagnoses: Diagnosis[];
}

const EntriesList = ({ entries, diagnoses }: Props) => {
  return (
    <>
      <h3>Entries</h3>
      {entries.map((entry) => (
        <div key={entry.id}>
          <p style={{ display: 'inline', marginRight: '12px' }}>{entry.date}</p>
          <p style={{ display: 'inline' }}>{entry.description}</p>

          <ul>
            {entry.diagnosisCodes &&
              entry.diagnosisCodes.map((code) => (
                <DiagnosisElement
                  key={code}
                  code={code}
                  diagnoses={diagnoses}
                />
              ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default EntriesList;
