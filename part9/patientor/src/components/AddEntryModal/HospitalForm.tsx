import { HospitalEntry } from '../../types';
import { TextField, InputLabel } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

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
  const changeDischargeDate = (value: Dayjs) => {
    setDischarge({ ...discharge, date: dayjs(value).format('YYYY-MM-DD') });
  };

  return (
    <>
      <InputLabel sx={{ marginTop: '16px', marginBottom: '8px' }}>
        Patient discharged:
      </InputLabel>

      <DatePicker
        label="Date of discharge"
        value={dayjs(discharge.date)}
        format="YYYY.MM.DD"
        onChange={(value) => changeDischargeDate(value!)}
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
