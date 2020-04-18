import React from 'react'
import { Icon } from 'semantic-ui-react'
import { Entry, HealthCheckRating } from "../types"
import { useStateValue } from '../state'

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

export const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
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

export const OccupationalHealthcareEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
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

export const HealthCheckEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
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