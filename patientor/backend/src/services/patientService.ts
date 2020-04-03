import patients from '../../data/patients'
import { Patient, PublicPatient, NewPatientEntry } from '../types'
import { v1 as uuidv1 } from 'uuid'

const getPatients = (): Patient[] => {
  return patients
}

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }))
}

const addPatientEntry = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuidv1(),
    ...entry
  }
  patients.push(newPatientEntry)
  return newPatientEntry
}

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id)
  return patient
}

export default {
  getPatients,
  getPublicPatients,
  addPatientEntry,
  getPatient
}