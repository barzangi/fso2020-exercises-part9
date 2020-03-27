import patients from '../../data/patients'
import { PatientEntry, NonSsnPatientEntry, NewPatientEntry } from '../types'
import { v1 as uuidv1 } from 'uuid'

const getPatients = (): PatientEntry[] => {
  return patients
}

const getNonSsnPatients = (): NonSsnPatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }))
}

const addPatientEntry = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuidv1(),
    ...entry
  }
  patients.push(newPatientEntry)
  return newPatientEntry
}

export default {
  getPatients,
  getNonSsnPatients,
  addPatientEntry
}