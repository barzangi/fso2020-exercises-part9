import patients from '../../data/patients'
import { PatientEntry, NonSsnPatientEntry } from '../types'

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

export default {
  getPatients,
  getNonSsnPatients
}