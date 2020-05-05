import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import { Patient, Gender, Entry } from "../types"
import { apiBaseUrl } from "../constants"
import { useStateValue, setSinglePatient } from '../state'
import { HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from './HealthcareEntries'

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
      <h2>{singlePatient.name} {genderIcon(singlePatient.gender)}</h2>
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
    </div>
  )
}

export default SinglePatientPage