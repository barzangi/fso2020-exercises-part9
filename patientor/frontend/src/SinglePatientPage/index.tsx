import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import { Patient, Diagnosis } from "../types"
import { apiBaseUrl } from "../constants"
import { useStateValue, setSinglePatient } from '../state'

const SinglePatientPage: React.FC = () => {
  const [{ singlePatient, diagnoses }, dispatch] = useStateValue()

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
  return (
    <div className='App'>
      <h2>{singlePatient.name} {singlePatient.gender === 'male' ? <Icon name='mars' /> : <Icon name='venus' />}</h2>
      <div>Date of Birth: {singlePatient.dateOfBirth}</div>
      <div>SSN: {singlePatient.ssn}</div>
      <div>Occupation: {singlePatient.occupation}</div>
      {singlePatient.entries.length === 0
      ? <h2>No entries</h2>
      :
      <>
        <h2>Entries</h2>
        {singlePatient.entries.map(entry =>
          <>
            <div>{entry.date} : {entry.description}</div>
            {!entry.diagnosisCodes
            ? null
            :
            <ul>
              {entry.diagnosisCodes?.map(dg =>
                <li>
                  {dg} - {Object.values(diagnoses).filter(d => d.code === dg)[0].name}
                </li>  
              )}
            </ul>
            }
          </>
        )}
      </>
      }
    </div>
  )
}

export default SinglePatientPage