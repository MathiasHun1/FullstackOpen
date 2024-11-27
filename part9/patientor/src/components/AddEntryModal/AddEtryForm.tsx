import { SyntheticEvent, useEffect, useState } from 'react';

import { SelectChangeEvent, Grid, Button, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';

import {
  EntryWithoutId,
  HealthCheckRating,
  EntryType,
  HospitalEntry,
  OccupationalHealthcareEntry,
  Diagnosis,
} from '../../types';
import SelectEntry from './SelectEntry';
import HealthCheckForm from './HealthCheckForm';
import OccupationalForm from './OccupationalForm';
import HospitalForm from './HospitalForm';
import InputDiagnoisCodes from './InputDiagnoisCodes';
import * as helpers from '../../helpers';

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onClose: () => void;
  diagnoses: Diagnosis[];
}

const AddEntryForm = ({ onClose, onSubmit, diagnoses }: Props) => {
  const [entryType, setEntryType] = useState<EntryType | ''>('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Dayjs>(dayjs(helpers.getTodaysDateString()));
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

  const [sickLeaveStart, setSickLeaveStart] = useState<Dayjs | null>(null);
  const [sickLeaveEnd, setSickLeaveEnd] = useState<Dayjs | null>(null);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  useEffect(() => {
    setSickLeave({
      startDate: dayjs(sickLeaveStart).format('YYYY-MM-DD'),
      endDate: dayjs(sickLeaveEnd).format('YYYY-MM-DD'),
    });
  }, [sickLeaveStart, sickLeaveEnd]);

  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    if (typeof event.target.value == 'string') {
      const value = event.target.value;

      const healtCheckValue = Object.values(HealthCheckRating).find(
        (h) => h.toString() === value
      );
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
          date: dayjs(date).format('YYYY-MM-DD'),
          specialist,
          healthCheckRating,
          diagnosisCodes,
          type: entryType,
        });
        break;
      case 'OccupationalHealthcare': {
        onSubmit({
          description,
          date: dayjs(date).format('YYYY-MM-DD'),
          specialist,
          employerName,
          diagnosisCodes,
          sickLeave: helpers.sickLeaveNotFilled(sickLeave)
            ? undefined
            : sickLeave,
          type: entryType,
        });
        break;
      }
      case 'Hospital': {
        onSubmit({
          description,
          date: dayjs(date).format('YYYY-MM-DD'),
          specialist,
          type: entryType,
          discharge,
          diagnosisCodes,
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
            sickLeaveStart={sickLeaveStart}
            setSickLeaveStart={setSickLeaveStart}
            sickLeaveEnd={sickLeaveEnd}
            setSickLeaveEnd={setSickLeaveEnd}
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <DatePicker
            label="Date of entry"
            format="YYYY.MM.DD"
            autoFocus={true}
            value={date}
            onChange={(newValue) => setDate(newValue!)}
            sx={{ width: '200px' }}
          />

          <SelectEntry entryType={entryType} setEntryType={setEntryType} />

          {entryType && (
            <>
              <InputDiagnoisCodes
                diagnoses={diagnoses}
                diagnosisCodes={diagnosisCodes}
                setDiagnosisCodes={setDiagnosisCodes}
              />
              <TextField
                label="Description"
                fullWidth
                value={description}
                onChange={({ target }) => setDescription(target.value)}
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
            {entryType && (
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
            )}
          </Grid>
        </div>
      </form>
    </div>
  );
};

export default AddEntryForm;
