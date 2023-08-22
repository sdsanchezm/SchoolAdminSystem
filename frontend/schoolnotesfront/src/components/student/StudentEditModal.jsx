// import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const base_url = `http://127.0.0.1:8000`;

function StudentEditModal({showEditModal, closeEditModal, formData, handleChangeEdit, studentIdEditModalx, clearFormData, getData}) {



    function handleStudentSaveEditModalx() {
        // console.log(`saving edit modal... id: ${e.target.value}`);
        const id = studentIdEditModalx;
        console.log(`id in modal: ${studentIdEditModalx}`);
        console.log(studentIdEditModalx);
        console.log(`k1 in modal: ${id}`);

        const newRecord = {
          ...formData
        }

        const url = `${base_url}/api/student/${id}`;

        fetch( url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRecord)
        })
        .then( (res) => {
          console.log(res.data);
          clearFormData();
          closeEditModal();
          toast.success("saved!...");
          getData();
        })
        .catch( (err) => {
          console.error("error: ", err);
        })

        // getData();

      };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Edit a Student Record
      </Button> */}

      <Modal show={showEditModal} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form >
          <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="student_firstname"
                placeholder="first name"
                value={formData.student_firstname}
                onChange={ handleChangeEdit }
                autoFocus
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationCustom02">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="student_lastname"
                placeholder="last name"
                value={formData.student_lastname}
                onChange={ handleChangeEdit }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationCustom03">
              <Form.Label>Student Number</Form.Label>
              <Form.Control
                type="number"
                name="student_number"
                placeholder="student number"
                value={formData.student_number}
                onChange={ handleChangeEdit }
                required
              />
            </Form.Group>
            <Button variant="primary"
              onClick={ () => handleStudentSaveEditModalx() }
            >
              Save
            </Button>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default StudentEditModal;
