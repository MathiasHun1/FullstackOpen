import { useState, useEffect } from 'react';
import { Diagnosis } from '../../types';
import {
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
} from '@mui/material';

interface Props {
  diagnoses: Diagnosis[];
  diagnosisCodes: string[];
  setDiagnosisCodes: React.Dispatch<React.SetStateAction<string[]>>;
}

const InputDiagnoisCodes = ({
  diagnoses,
  diagnosisCodes,
  setDiagnosisCodes,
}: Props) => {
  const [possibleCodes, setPossibleCodes] = useState<string[]>([]);

  useEffect(() => {
    if (diagnoses) {
      setPossibleCodes(diagnoses.map((d) => d.code));
    }
  }, [diagnoses]);

  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <>
      {possibleCodes && (
        <Select
          multiple
          value={diagnosisCodes}
          input={<OutlinedInput label="Name" />}
          renderValue={(selected) => selected.join(', ')}
          onChange={handleChange}
        >
          {possibleCodes.map((code) => (
            <MenuItem key={code} value={code}>
              <Checkbox checked={diagnosisCodes.includes(code)} />
              <ListItemText primary={code} />
            </MenuItem>
          ))}
        </Select>
      )}
    </>
  );
};

export default InputDiagnoisCodes;
