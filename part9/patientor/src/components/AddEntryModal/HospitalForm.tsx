import { HospitalEntry } from '../../types';
import { TextField, InputLabel } from '@mui/material';

interface Props {
  discharge: HospitalEntry['discharge'];
  setDischarge: React.Dispatch<
    React.SetStateAction<{
      date: string;
      criteria: string;
    }>
  >;
}

const HospitalForm = ({ discharge, setDischarge }: Props) => {
  return (
    <>
      <InputLabel sx={{ marginTop: '16px', marginBottom: '8px' }}>
        Patient discharged:
      </InputLabel>

      <TextField
        label="Date of discharge"
        fullWidth
        value={discharge.date}
        onChange={({ target }) =>
          setDischarge({ ...discharge, date: target.value })
        }
      />

      <TextField
        label="Criteria"
        fullWidth
        value={discharge.criteria}
        onChange={({ target }) =>
          setDischarge({ ...discharge, criteria: target.value })
        }
      />
    </>
  );
};

export default HospitalForm;
