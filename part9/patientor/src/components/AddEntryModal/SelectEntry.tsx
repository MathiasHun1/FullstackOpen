import { Select, MenuItem, InputLabel } from '@mui/material';
import { EntryType } from '../../types';

interface Props {
  setEntryType: React.Dispatch<React.SetStateAction<EntryType | ''>>;
  entryType: string;
}

const SelectEntry = ({ entryType, setEntryType }: Props) => {
  return (
    <div>
      <InputLabel sx={{ marginBottom: '8px' }}>Select entry-type:</InputLabel>
      <Select
        // label="Entry-type"
        fullWidth
        value={entryType}
        onChange={({ target }) => setEntryType(target.value as EntryType)}
      >
        <MenuItem value={'HealthCheck'}>HealthCheck</MenuItem>
        <MenuItem value={'OccupationalHealthcare'}>
          OccupationalHealthcare
        </MenuItem>
        <MenuItem value={'Hospital'}>Hospital</MenuItem>
      </Select>
    </div>
  );
};

export default SelectEntry;
