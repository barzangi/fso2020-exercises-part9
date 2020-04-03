/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewPatientEntry, Gender } from './types'

const toNewPatientEntry = (object: any): NewPatientEntry => {

  const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String
  }

  // name field parser
  const parseName = (name: any): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name: ' + name)
    }
    return name
  }

  // date field parser
  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date))
  }

  const parseDateOfBirth = (dateOfBirth: any): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
      throw new Error('Incorrect or missing date: ' + dateOfBirth)
    }
    return dateOfBirth
  }

  // ssn field parser
  const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing ssn: ' + ssn)
    }
    return ssn
  }

  // gender field parser
  const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param)
  }

  const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender)
    }
    return gender
  }

  // occupation field parser
  const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing occupation: ' + occupation)
    }
    return occupation
  }

  return {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: object.entries
  }
}

export default toNewPatientEntry