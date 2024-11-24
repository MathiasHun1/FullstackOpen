import { TextField, InputLabel } from '@mui/material';
import { OccupationalHealthcareEntry } from '../../types';
import { useEffect } from 'react';

interface Props {
  employerName: string;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  sickLeave: OccupationalHealthcareEntry['sickLeave'];
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
  sickLeave,
  employerName,
  setEmployerName,
  setSickLeave,
}: Props) => {
  useEffect(() => {
    initSickLeave();
  }, []);

  const initSickLeave = () => {
    setSickLeave({
      startDate: '',
      endDate: '',
    });
  };

  const startDateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!sickLeave) {
      initSickLeave();
    }

    setSickLeave({
      startDate: e.target.value,
      endDate: sickLeave!.endDate,
    });
  };

  const endDateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!sickLeave) {
      initSickLeave();
    }

    setSickLeave({
      startDate: sickLeave!.startDate,
      endDate: e.target.value,
    });
  };

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
      <TextField
        label="Start date"
        fullWidth
        value={sickLeave?.startDate}
        onChange={startDateChange}
      />

      <TextField
        label="End date"
        fullWidth
        value={sickLeave?.endDate}
        onChange={endDateChange}
      />
    </>
  );
};

export default OccupationalForm;
