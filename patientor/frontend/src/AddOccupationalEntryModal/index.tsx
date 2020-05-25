import React from 'react'
import { Modal, Segment } from 'semantic-ui-react'
import AddOccupationalEntryForm, { OccupationalEntryFormValues } from './AddOccupationalEntryForm'

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: OccupationalEntryFormValues) => void;
  error?: string;
  patientName: string;
}

const AddOccupationalEntryModal = ({ modalOpen, onClose, onSubmit, error, patientName }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add Occupational Healthcare entry for patient: {patientName}</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddOccupationalEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
)

export default AddOccupationalEntryModal