import React from 'react'
import { Grid, Button } from "semantic-ui-react"
import { Field, Formik, Form } from "formik"
import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField'
import { useStateValue } from "../state"
import { HospitalEntry } from '../types'

export type HospitalEntryFormValues = Omit<HospitalEntry, 'id'>

interface Props {
  onSubmit: (values: HospitalEntryFormValues) => void
  onCancel: () => void
}

export const AddHospitalEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue()
  return (
    <Formik
      initialValues={{
        type: 'Hospital',
        discharge: {
          date: '',
          criteria: ''
        },
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: []
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = 'Field is required'
        const errors: { [field: string]: string } = {}
        if (!values.date) errors.date = requiredError
        if (!values.specialist) errors.specialist = requiredError
        if (!values.description) errors.description = requiredError
        /* TODO: figure out how to enable error messages for these fields
        if (!values.discharge.date) errors.discharge.date = requiredError
        if (!values.discharge.criteria) errors.discharge.criteria = requiredError
        */
        return errors
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className='form ui'>
            <Field
              label='Date'
              placeholder='YYYY-MM-DD'
              name='date'
              component={TextField}
            />
            <Field
              label='Specialist'
              placeholder='Specialist'
              name='specialist'
              component={TextField}
            />
            <Field
              label='Description'
              placeholder='Description'
              name='description'
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label='Discharge date'
              placeholder='YYYY-MM-DD'
              name='discharge.date'
              component={TextField}
            />
            <Field
              label='Discharge criteria'
              placeholder='Discharge criteria'
              name='discharge.criteria'
              component={TextField}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        )
      }} 
    </Formik>
  )
}

export default AddHospitalEntryForm