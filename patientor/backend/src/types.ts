export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  entries: Entry[];
  occupation: string;
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>

export type NewPatientEntry = Omit<Patient, 'id'>