import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import { Patient, Gender, Entry, HealthCheckRating } from "../types"
import { apiBaseUrl } from "../constants"
import { useStateValue, setSinglePatient } from '../state'

const ListDiagnoses: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue()
  return (
    <>
      {!entry.diagnosisCodes
      ? null
      :
      <ul>
        {entry.diagnosisCodes?.map(dg =>
          <li key={dg}>
            {dg} - {Object.values(diagnoses).filter(d => d.code === dg)[0].name}
          </li>  
        )}
      </ul>
      }
    </>
  )
}

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const thisDischarge = 'discharge' in entry ? entry.discharge : null
  return (
    <>
      <h3>{entry.date} <Icon name='hospital' /></h3>
      <div>Specialist: {entry.specialist}</div>
      <h4>{entry.description}</h4>
      <ListDiagnoses entry={entry} />
      {!thisDischarge
      ? null
      :
      <>
        <div><strong>Discharge</strong></div>
        <div>Date: {thisDischarge.date}</div>
        <div>Criteria: {thisDischarge.criteria}</div>
      </>
      }
    </>
  )
}

const OccupationalhealthcareEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const thisEmployerName = 'employerName' in entry ? entry.employerName : null
  const thisSickLeave = 'sickLeave' in entry ? entry.sickLeave : null
  return (
    <>
      <h3>{entry.date} <Icon name='stethoscope' /> {thisEmployerName}</h3>
      <div>Specialist: {entry.specialist}</div>
      <h4>{entry.description}</h4>
      <ListDiagnoses entry={entry} />
      {!thisSickLeave
      ? null
      :
      <>
        <div><strong>Sick Leave</strong></div>
        <div>Start Date: {thisSickLeave.startDate}</div>
        <div>End Date: {thisSickLeave.endDate}</div>
      </>
      }
    </>
  )
}

const HealthCheckEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const thisHealthCheckRating = 'healthCheckRating' in entry ? entry.healthCheckRating : null
  
  const healthCheckRatingIcon = (healthCheckRating: HealthCheckRating) => {
    switch (healthCheckRating) {
      case 0:
        return <p><Icon name='heart' color='green' /></p>
      case 1:
        return <p><Icon name='heart' color='yellow' /></p>
      case 2:
       return <p><Icon name='heart' color='orange' /></p>
      case 3:
        return <p><Icon name='heart' color='red' /></p>
      default:
        return null
    }
  }
  return (
    <>
      <h3>{entry.date} <Icon name='user md' /></h3>
      <div>Specialist: {entry.specialist}</div>
      <h4>{entry.description}</h4>
      <ListDiagnoses entry={entry} />
      {thisHealthCheckRating === null
      ? null
      : healthCheckRatingIcon(thisHealthCheckRating)
      }
    </>
  )
}

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
      return <OccupationalhealthcareEntry entry={entry} />
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
          <div className='entryStyle'>
            <EntryDetails key={entry.id} entry={entry} />
          </div>
        )}
      </>
      }
    </div>
  )
}

export default SinglePatientPage