import { InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { HealthCheckRating } from '../../types';

interface HealthCheckRatingOption {
  value: HealthCheckRating;
  label: string;
}

interface Props {
  healthCheckRating: HealthCheckRating;
  onHealthCheckRatingChange: (event: SelectChangeEvent<string>) => void;
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

const HealthCheckForm = ({
  healthCheckRating,
  onHealthCheckRatingChange,
}: Props) => {
  return (
    <>
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
    </>
  );
};

export default HealthCheckForm;
