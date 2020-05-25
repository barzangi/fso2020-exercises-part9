import React from 'react'
import { Modal, Segment } from 'semantic-ui-react'
import AddHospitalEntryForm, { HospitalEntryFormValues } from './AddHospitalEntryForm'

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: HospitalEntryFormValues) => void;
  error?: string;
  patientName: string;
}

const AddHospitalEntryModal = ({ modalOpen, onClose, onSubmit, error, patientName }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add Hospital entry for patient: {patientName}</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
)

export default AddHospitalEntryModal