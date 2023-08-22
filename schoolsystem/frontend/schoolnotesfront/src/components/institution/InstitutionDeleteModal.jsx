import React from 'react'
import { Modal, Button } from "react-bootstrap";
 
const InstitutionDeleteModal = ({ showDeleteModal, hideDeleteModal, confirmDeleteModal, id, message }) => {
  
    return (
        <Modal show={showDeleteModal} onHide={hideDeleteModal}>

        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>

        <Modal.Body><div className="alert alert-danger">{message}</div></Modal.Body>

        <Modal.Footer>

          <Button variant="default" onClick={hideDeleteModal}>
            Cancel
          </Button>

          <Button variant="danger" onClick={() => confirmDeleteModal(id) }>
            Confirm
          </Button>

        </Modal.Footer>

      </Modal>
    )
}

export default InstitutionDeleteModal;