import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Diagnosis, Patient, EntryWithoutId } from '../../types';
import patientService from '../../services/patients';
import EntriesList from './EntriesList';
import AddEntryModal from '../AddEntryModal/index.tsx';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Button } from '@mui/material';
import axios from 'axios';

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
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

  const closeModal = () => {
    if (error) {
      setError('');
    }
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      if (patient) {
        const entry = await patientService.createEntry(patient.id, values);
        const updatedPatient = {
          ...patient,
          entries: patient.entries.concat(entry),
        };

        closeModal();
        setPatient(updatedPatient);
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.log('Error from axios');
        console.log(e);

        if (e.response?.data && typeof e.response?.data?.error === 'string') {
          const errorMessage = e.response.data.error;
          setError(errorMessage);
        } else {
          setError('Unrecognized axios error');
          console.log('Error: ', e);
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  return patient ? (
    <div>
      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewEntry}
        error={error}
      />
      <div className="patientName">
        <h2 style={{ display: 'inline' }}>{patient.name}</h2>
        {returnGenderIcon()}
      </div>
      <p>ssh: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>

      <EntriesList entries={patient.entries} diagnoses={diagnoses} />
      <Button variant="contained" onClick={() => openModal()}>
        Add New entry
      </Button>
    </div>
  ) : (
    <div>
      <h2>Loading...</h2>
    </div>
  );
};

export default PatientPage;
