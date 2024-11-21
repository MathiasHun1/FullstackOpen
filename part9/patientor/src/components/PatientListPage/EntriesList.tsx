import { BaseEntry } from '../../types';
import DiagnosisElement from './DiagnosisElement';

// const CodesList = ({ codes }: { diagnosisCode }) => {};

const EntriesList = ({ entries }: { entries: BaseEntry[] }) => {
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
                <DiagnosisElement code={code} />
              ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default EntriesList;
