import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetData1 from '../../helpers/GetData1';

const base_url = `http://127.0.0.1:8000/`;
const path_url = `api/subject/`;

function SubjectEditModal({ itemId, showEditModal, closeEditModal }) {

    // List of States ============================
    const [object1, setObject1] = useState([]);
    const [formData, setFormData] = useState({subject_name: "", subject_number:0 });

    // Handle save function ============================
    function handleSave() {


        const newRecord = {
            ...formData
        }

        const url = `${base_url}${path_url}${itemId}`;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRecord)
        })
            .then((res) => {
                console.log(res.data);
                clearFormData();
                closeEditModal();
                toast.success("saved!...");
                // getData();
            })
            .catch((err) => {
                console.error("error: ", err);
            })

        // getData();
    };

    // Clear form
    const clearFormData = () => {
      setFormData({
        subject_name: "",
        subject_number:0
      });
    }

    // Helper function ============================
    async function getData1Helper(url, itemId) {
        console.log(`itemId: ${itemId}`);
        let itemData = await GetData1(url, itemId.toString());
        console.log(`itemData: ${itemData}`);
        console.log(itemData);
        clearFormData();
        setFormData(itemData);
    }

    // handler on change Function ============================
    function handleChangeEdit(event){
        console.log("handle change edit");
    }

    // handler on change 2 ============================
    const handleChangeEdit2 = (e) => {
        // e.preventDefault();
        const { name, value } = e.target;
        setFormData({...formData, [name]:value});
      };

    // Initial call ============================
    useEffect( () => {
        const url = `${path_url}`;
        getData1Helper(path_url, itemId);
    },[showEditModal]);



    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
        Edit a Student Record
      </Button> */}

            <Modal show={showEditModal} onHide={closeEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Subject</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form >
                        <Form.Group className="mb-3" controlId="validationCustom01">
                            <Form.Label>Subject Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="subject_name"
                                placeholder="Subject Name"
                                value={formData.subject_name}
                                onChange={handleChangeEdit2}
                                autoFocus
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="validationCustom02">
                            <Form.Label>Subject Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="subject_number"
                                placeholder="Subject Number"
                                value={formData.subject_number}
                                onChange={handleChangeEdit2}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary"
                            onClick={() => handleSave()}
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

export default SubjectEditModal;
