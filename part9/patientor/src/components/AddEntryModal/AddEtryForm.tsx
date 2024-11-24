import { SyntheticEvent, useState } from 'react';

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Grid,
  Button,
} from '@mui/material';

import { EntryWithoutId, HealthCheckRating } from '../../types';

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
}

interface HealthCheckRatingOption {
  value: HealthCheckRating;
  label: string;
}

const healthCheckoptions: HealthCheckRatingOption[] = Object.values(
  HealthCheckRating
).map((h) => {
  const obj: HealthCheckRatingOption = {
    value: h,
    label: h.toString(),
  };

  return obj;
});

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpectialist] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );

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
    onSubmit({
      description,
      date,
      specialist,
      healthCheckRating,
      type: 'HealthCheck',
    });
  };

  return (
    <div>
      <form onSubmit={addEntry}>
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

        <InputLabel>Health-rating</InputLabel>
        <Select
          label="Health-rating"
          fullWidth
          value={healthCheckRating}
          onChange={onHealthCheckRatingChange}
        >
          {healthCheckoptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </Select>

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: 'left' }}
              type="button"
              onClick={onCancel}
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
