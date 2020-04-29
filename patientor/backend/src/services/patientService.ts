import patients from '../../data/patients'
import { Patient, PublicPatient, NewPatientEntry, Entry } from '../types'
import { v1 as uuidv1 } from 'uuid'

// get all patients (all fields)
const getPatients = (): Patient[] => {
  return patients
}

// get all patients (hide ssn)
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

// add new patient entry
const addPatientEntry = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuidv1(),
    ...entry
  }
  patients.push(newPatientEntry)
  return newPatientEntry
}

// get single patient data by id
const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id)
  return patient
}

// add healthcare entry to patient
const addHealthcareEntry = (id: string, healthcareEntry: Entry): Patient | string | undefined => {
  const patient = patients.find(p => p.id === id)
  if (!patient) throw new Error('error: malformed patient id')
  if (!healthcareEntry.date || !healthcareEntry.description || !healthcareEntry.specialist) throw new Error('error: required data missing')

  const updatedPatient = (): Patient => {
    healthcareEntry = {
      id: uuidv1(),
      ...healthcareEntry
    }
    patient.entries.push(healthcareEntry)
    return patient
  }

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }

  switch (healthcareEntry.type) {
    case 'Hospital':
      const thisDischarge = 'discharge' in healthcareEntry ? healthcareEntry.discharge : null
      if (!thisDischarge) throw new Error('error: discharge data missing')
      return updatedPatient()
    case 'OccupationalHealthcare':
      const thisEmployerName = 'employerName' in healthcareEntry ? healthcareEntry.employerName : null
      if (!thisEmployerName) throw new Error('error: employer name missing')
      return updatedPatient()
    case 'HealthCheck':
      const thisHealthCheckRating = 'healthCheckRating' in healthcareEntry ? healthcareEntry.healthCheckRating : null
      if (!thisHealthCheckRating) throw new Error('error: healthcheck rating missing')
      return updatedPatient()
    default:
      return assertNever(healthcareEntry)
  }
}

export default {
  getPatients,
  getPublicPatients,
  addPatientEntry,
  getPatient,
  addHealthcareEntry
}