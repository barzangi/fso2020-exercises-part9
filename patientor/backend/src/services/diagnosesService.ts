import diagnoses from '../../data/diagnoses'
import { DiagnosesEntry } from '../types'

const getDiagnoses = (): DiagnosesEntry[] => {
  return diagnoses
}

export default {
  getDiagnoses
}