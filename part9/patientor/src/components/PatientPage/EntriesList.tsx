import { assertNever } from '../../helpers';
import { Entry, Diagnosis } from '../../types';

import HealtCheckEntry from './HealtCheckEntry';
import HospitalEntryElement from './HospitalEntry';
import OccupationalEntry from './OccupationalEntry';

interface Props {
  entries: Entry[];
  diagnoses: Diagnosis[];
}

const EntriesList = ({ entries, diagnoses }: Props) => {
  return (
    <>
      <h3>Entries</h3>
      {entries.map((entry) => {
        switch (entry.type) {
          case 'HealthCheck':
            return (
              <HealtCheckEntry
                key={entry.id}
                entry={entry}
                diagnoses={diagnoses}
              />
            );
          case 'Hospital':
            return (
              <HospitalEntryElement
                key={entry.id}
                entry={entry}
                diagnoses={diagnoses}
              />
            );
          case 'OccupationalHealthcare':
            return (
              <OccupationalEntry
                key={entry.id}
                entry={entry}
                diagnoses={diagnoses}
              />
            );
          default:
            return assertNever(entry);
        }
      })}
    </>
  );
};

export default EntriesList;
