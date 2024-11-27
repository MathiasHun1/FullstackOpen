import { TextField, InputLabel } from '@mui/material';
import { OccupationalHealthcareEntry } from '../../types';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';

interface Props {
  employerName: string;
  sickLeave: OccupationalHealthcareEntry['sickLeave'];
  sickLeaveStart: Dayjs | null;
  sickLeaveEnd: Dayjs | null;
  setSickLeaveStart: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
  setSickLeaveEnd: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  setSickLeave: React.Dispatch<
    React.SetStateAction<
      | {
          startDate: string;
          endDate: string;
        }
      | undefined
    >
  >;
}

const OccupationalForm = ({
  employerName,
  sickLeaveStart,
  sickLeaveEnd,
  setSickLeaveStart,
  setSickLeaveEnd,
  setEmployerName,
}: Props) => {
  return (
    <>
      <TextField
        label="Employer name"
        fullWidth
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
      />

      <InputLabel sx={{ marginTop: '8px', marginBottom: '8px' }}>
        Sick-allownace ?
      </InputLabel>

      <div className="sick-leave-cont">
        <DatePicker
          label="Start-date"
          format="YYYY.MM.DD"
          value={sickLeaveStart}
          onChange={(newValue) => setSickLeaveStart(newValue)}
        />

        <DatePicker
          label="End-date"
          format="YYYY.MM.DD"
          value={sickLeaveEnd}
          onChange={(newValue) => setSickLeaveEnd(newValue)}
        />
      </div>
    </>
  );
};

export default OccupationalForm;
