import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Patient } from '../../types';
import patientService from '../../services/patients';
import EntriesList from '../PatientListPage/EntriesList';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      patientService.getById(userId).then((patient) => {
        setPatient(patient);
      });
    }
  }, [userId]);

  const returnGenderIcon = () => {
    if (patient) {
      if (patient.gender === 'male') {
        return <MaleIcon fontSize="medium" />;
      } else if (patient.gender === 'female') {
        return <FemaleIcon />;
      } else {
        return <TransgenderIcon />;
      }
    }
  };

  return patient ? (
    <div>
      <div className="patientName">
        <h2 style={{ display: 'inline' }}>{patient.name}</h2>
        {returnGenderIcon()}
      </div>
      <p>ssh: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>

      <EntriesList entries={patient.entries} />
    </div>
  ) : (
    <div>
      <h2>Loading...</h2>
    </div>
  );
};

export default PatientPage;
