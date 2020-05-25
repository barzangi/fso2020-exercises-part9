import React from 'react'
import { Modal, Segment } from 'semantic-ui-react'
import AddHealthCheckEntryForm, { HealthCheckEntryFormValues } from './AddHealthCheckEntryForm'

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: HealthCheckEntryFormValues) => void;
  error?: string;
  patientName: string;
}

const AddHealthCheckEntryModal = ({ modalOpen, onClose, onSubmit, error, patientName }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add Health Check entry for patient: {patientName}</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
)

export default AddHealthCheckEntryModal