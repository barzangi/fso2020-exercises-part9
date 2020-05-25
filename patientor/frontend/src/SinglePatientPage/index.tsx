import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Icon, Grid, Button } from 'semantic-ui-react'
import { Patient, Gender, Entry } from "../types"
import { apiBaseUrl } from "../constants"
import { useStateValue, setSinglePatient } from '../state'
import { HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from './HealthcareEntries'

import AddHospitalEntryModal from '../AddHospitalEntryModal'
import { HospitalEntryFormValues } from '../AddHospitalEntryModal/AddHospitalEntryForm'

import AddOccupationalEntryModal from '../AddOccupationalEntryModal'
import { OccupationalEntryFormValues } from '../AddOccupationalEntryModal/AddOccupationalEntryForm'

import AddHealthCheckEntryModal from '../AddHealthCheckEntryModal'
import { HealthCheckEntryFormValues } from '../AddHealthCheckEntryModal/AddHealthCheckEntryForm'

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value )}`
    )
  }
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} />
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry entry={entry} />
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} />
    default:
      return assertNever(entry)
  }
}

const SinglePatientPage: React.FC = () => {
  const [{ singlePatient }, dispatch] = useStateValue()

  const [hospitalModalOpen, setHospitalModalOpen] = React.useState<boolean>(false)
  const [occupationalModalOpen, setOccupationalModalOpen] = React.useState<boolean>(false)
  const [healthcheckModalOpen, setHealthcheckModalOpen] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | undefined>()

  const openModal = (type: string): void => {
    switch (type) {
      case 'Hospital':
        setHospitalModalOpen(true)
        return
      case 'Occupational':
        setOccupationalModalOpen(true)
        return
      case 'Healthcheck':
        setHealthcheckModalOpen(true)
        return
      default:
        return
    }
  }

  const closeModal = (type: string): void => {
    setError(undefined)
    switch (type) {
      case 'Hospital':
        setHospitalModalOpen(false)
        return
      case 'Occupational':
        setOccupationalModalOpen(false)
        return
      case 'Healthcheck':
        setHealthcheckModalOpen(false)
        return
      default:
        return
    }
  }

  const { id } = useParams<{ id: string }>()

  const getSinglePatient = async (id: string) => {
    try {
      const { data: singlePatientFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      )
      dispatch(setSinglePatient(singlePatientFromApi))
    } catch (e) {
      console.error(e)
    }
  }
  // if patient already in state, don't re-fetch from backend
  if (!singlePatient || id !== singlePatient.id) getSinglePatient(id)

  if (!singlePatient) return null

  // TODO: Pending finding a solution to above
  const submitHospitalEntry = () => {}

  // TODO: Pending finding a solution to above
  const submitOccupationalEntry = () => {}

  // Placeholder emply function so that code can compile
  const submitHealthCheckEntry = () => {}

  // NOT WORKING! Issues:
  // 1. updatedPatient not picking up <Patient> return type
  // 2. values parameter error: has no properties in common
  //    with type 'AxiosRequestConfig'. ts(2559)
  /*
  const submitHealthCheckEntry = async (values: HealthCheckEntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        id,
        values
      )
      dispatch(setSinglePatient(updatedPatient))
      closeModal('Healthcheck')
    } catch (e) {
      console.error(e.response.data)
      setError(e.response.data.error)
    }
  }
  */

  const genderIcon = (gender: Gender) => {
    switch (gender) {
      case 'male':
        return <Icon name='mars' />
      case 'female':
        return <Icon name='venus' />
      case 'other':
        return <Icon name='genderless' />
      default:
        return null
    }
  }
  return (
    <div className='App'>
      <Grid>
        <Grid.Column floated="left" width={5}>
          <h2>{singlePatient.name} {genderIcon(singlePatient.gender)}</h2>
        </Grid.Column>
        <Grid.Column floated="right" width={8}>
          Add Healthcare Entry:{' '}
          <Button onClick={() => openModal('Hospital')}>Hospital</Button>
          <Button onClick={() => openModal('Occupational')}>Occupational</Button>
          <Button onClick={() => openModal('Healthcheck')}>Health Check</Button>
        </Grid.Column>
      </Grid>
      <div>Date of Birth: {singlePatient.dateOfBirth}</div>
      <div>SSN: {singlePatient.ssn}</div>
      <div>Occupation: {singlePatient.occupation}</div>
      {!singlePatient.entries || singlePatient.entries.length === 0
      ? <h2>No entries</h2>
      :
      <>
        <h2>Entries</h2>
        {singlePatient.entries.map(entry =>
          <div className='entryStyle' key={entry.id}>
            <EntryDetails entry={entry} />
          </div>
        )}
      </>
      }
      <AddHospitalEntryModal
        modalOpen={hospitalModalOpen}
        onSubmit={submitHospitalEntry}
        onClose={() => closeModal('Hospital')}
        error={error}
        patientName={singlePatient.name}
      />
      <AddOccupationalEntryModal
        modalOpen={occupationalModalOpen}
        onSubmit={submitOccupationalEntry}
        onClose={() => closeModal('Occupational')}
        error={error}
        patientName={singlePatient.name}
      />
      <AddHealthCheckEntryModal
        modalOpen={healthcheckModalOpen}
        onSubmit={submitHealthCheckEntry}
        onClose={() => closeModal('Healthcheck')}
        error={error}
        patientName={singlePatient.name}
      />
    </div>
  )
}

export default SinglePatientPage