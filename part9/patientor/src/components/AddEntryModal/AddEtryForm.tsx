import { SyntheticEvent, useState } from 'react';

import { SelectChangeEvent, Grid, Button, TextField } from '@mui/material';

import {
  EntryWithoutId,
  HealthCheckRating,
  EntryType,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from '../../types';
import SelectEntry from './SelectEntry';
import HealthCheckForm from './HealthCheckForm';
import OccupationalForm from './OccupationalForm';
import HospitalForm from './HospitalForm';
import * as helpers from '../../helpers';

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onClose: () => void;
}

const AddEntryForm = ({ onClose, onSubmit }: Props) => {
  const [entryType, setEntryType] = useState<EntryType>('Hospital');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpectialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );
  const [employerName, setEmployerName] = useState('');
  const [discharge, setDischarge] = useState<HospitalEntry['discharge']>({
    date: helpers.getTodaysDateString(),
    criteria: '',
  });
  const [sickLeave, setSickLeave] = useState<
    OccupationalHealthcareEntry['sickLeave']
  >({
    startDate: '',
    endDate: '',
  });

  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    if (typeof event.target.value == 'string') {
      const value = event.target.value;

      const healtCheckValue = Object.values(HealthCheckRating).find(
        (h) => h.toString() === value
      );
      console.log(healtCheckValue);
      if (healtCheckValue) {
        setHealthCheckRating(healtCheckValue);
      }
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    switch (entryType) {
      case 'HealthCheck':
        onSubmit({
          description,
          date,
          specialist,
          healthCheckRating,
          type: entryType,
        });
        break;
      case 'OccupationalHealthcare': {
        onSubmit({
          description,
          date,
          specialist,
          employerName,
          sickLeave: helpers.isObjectEmpty(sickLeave) ? undefined : sickLeave,
          type: entryType,
        });
        break;
      }
      case 'Hospital': {
        onSubmit({
          description,
          date,
          specialist,
          type: entryType,
          discharge,
        });
        break;
      }
      default:
        break;
    }
  };

  const renderSelectedEntryForm = () => {
    switch (entryType) {
      case 'HealthCheck': {
        return (
          <HealthCheckForm
            healthCheckRating={healthCheckRating}
            onHealthCheckRatingChange={onHealthCheckRatingChange}
          />
        );
      }
      case 'OccupationalHealthcare': {
        return (
          <OccupationalForm
            employerName={employerName}
            setEmployerName={setEmployerName}
            sickLeave={sickLeave}
            setSickLeave={setSickLeave}
          />
        );
      }
      case 'Hospital': {
        return (
          <HospitalForm discharge={discharge} setDischarge={setDischarge} />
        );
      }

      default: {
        return null;
      }
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <SelectEntry entryType={entryType} setEntryType={setEntryType} />

        {entryType && (
          <>
            <TextField
              label="Description"
              fullWidth
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />

            <TextField
              label="Date"
              fullWidth
              value={date}
              onChange={({ target }) => setDate(target.value)}
            />

            <TextField
              label="Specialist"
              fullWidth
              value={specialist}
              onChange={({ target }) => setSpectialist(target.value)}
            />
          </>
        )}

        {renderSelectedEntryForm()}

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: 'left' }}
              type="button"
              onClick={onClose}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: 'right',
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
