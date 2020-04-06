import express from 'express'
import patientService from '../services/patientService'
import toNewPatientEntry from '../utils'

const router = express.Router()

// get all patients (hide ssn)
router.get('/', (_req, res) => {
  res.send(patientService.getPublicPatients())
})

// add new patient entry
router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body)
    const addedEntry = patientService.addPatientEntry(newPatientEntry)
    res.json(addedEntry)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

// get single patient data by id
router.get('/:id', (req, res) => {
  try {
    const patient = patientService.getPatient(req.params.id)
    res.json(patient)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

export default router