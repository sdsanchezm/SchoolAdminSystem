import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ToastNotification from '../ToastNotification';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function InstitutionNewModal({ getData }) {

    // all the states
    const [show, setShow] = useState(false);
    const [errorInForm, setErrorInForm] = useState(false);
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({ institution_name: "", institution_number: 0 });

    // clear the form date
    const clearFormData = () => {
        setFormData({
            institution_name: "",
            institution_number: 0
        });
    }

    // functions to open and close the modal ==================
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // handle change function, everytime a change in an input is made ==================
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    // validation form ==================
    function validationForm1(event) {
        const form = event.currentTarget;
        console.log(form);
        if (form.checkValidity() === false) {
            return false;
        }

        setValidated(true);
        return true;
    }

    // Handle submit function ==================
    const handleSubmit = async (event) => {

        let validated1 = validationForm1(event);
        console.log(validated1);
        console.log(validated);


        if (!errorInForm && validated1) {

            const newRecord1 = {
                "firstname": "obama",
                "lastname": "sank",
                "studentnumber": 8877
            }

            const newRecord = {
                "student_firstname": formData.student_firstname,
                "student_lastname": formData.student_lastname,
                "student_number": formData.student_number
            }

            console.log(newRecord);

            const base_url2 = `http://127.0.0.1:8000/api/student/`;
            const res = await fetch(base_url2, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRecord)
            })

            if (res.status !== 200 || res.status !== 201) {
                console.log("error: ", res.status, " code: ", res.code);
            }

            const data = await res.json()
            console.log("data:", data);

            console.log("end of request");

        }
        event.preventDefault();
        event.stopPropagation();

        setErrorInForm(false);

    };

    // handle post function ==================
    const handlePost = async (event) => {

        event.preventDefault();

        const newRecord = {
            "firstname": "jara",
            "lastname": "sank",
            "studentnumber": 423
        }

        const base_url2 = `http://127.0.0.1:8000/ api/student/`;
        const res = await fetch(base_url2, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRecord)
        })

        if (res.status !== 200) {
            // spanError.innerHTML = "An Error has ocurred " + res.status + " " + res.code;
            console.log("error: ", res.status, " code: ", res.code);
        }

        const data = await res.json()
        console.log("data:", data);
    }

    // Saving from the New Modal ==================
    const handleSave = async () => {

        const newRecord = {
            "institution_name": formData.institution_name,
            "institution_number": formData.institution_number
        }

        console.log(newRecord);

        const base_url2 = `http://127.0.0.1:8000/api/institution/`;

        const res = await fetch(base_url2, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRecord)
        })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.error("error: ", err);
            })

        clearFormData();
        handleClose();
        toast.success("saved!...");
        getData();

    }


    return (
        <>
            <Button variant="primary" onClick={handleShow}>New Institution</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Institution</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form validated={validated} >
                        <Form.Group className="mb-3" controlId="validationCustom01">
                            <Form.Label>Institution Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="institution_name"
                                placeholder="Institution name"
                                value={formData.institution_name}
                                onChange={handleChange}
                                autoFocus
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="validationCustom02">
                            <Form.Label>Institution Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="institution_number"
                                placeholder="Institution number"
                                value={formData.institution_number}
                                onChange={handleChange}
                                autoFocus
                                required
                            />
                        </Form.Group>

                        <Button variant="primary"
                            onClick={() => { handleSave() }}
                        >
                            Save
                        </Button>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default InstitutionNewModal;
