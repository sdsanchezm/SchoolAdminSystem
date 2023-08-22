import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ToastNotification from '../ToastNotification';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetData1 from '../../helpers/GetData1';

const base_url = `http://127.0.0.1:8000/`;
const path_url = `api/teacher/new/`;

function TeacherNewModal({ getData }) {

    // all the states
    const [show, setShow] = useState(false);
    const [errorInForm, setErrorInForm] = useState(false);
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({ teacher_firstname: "", teacher_lastname: "", teacher_number: 0, teacher_institution: 1 });
    const [institutionList, setInstitutionList] = useState([]);

    // clear the form date
    const clearFormData = () => {
        setFormData({
            teacher_firstname: "",
            teacher_lastname: "",
            teacher_number: 0
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
            // event.preventDefault();
            // event.stopPropagation();
            return false;
        }

        setValidated(true);
        return true;
    }


    // Helper to bring data from the api =====================
    async function getData1Helper(urlpath, itemid) {
        let itemData = await GetData1(urlpath, itemid);
        setInstitutionList(itemData);
    }

    // Saving from the New Modal ==================
    const handleSave = async () => {

        const newRecord = {
            "teacher_firstname": formData.teacher_firstname,
            "teacher_lastname": formData.teacher_lastname,
            "teacher_number": formData.teacher_number,
            "teacher_institution": formData.teacher_institution
        }

        console.log(newRecord);

        const base_url2 = `${base_url}${path_url}`;

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

    useEffect( () => {
        getData1Helper('api/institution','');
        clearFormData();
    }, [show]);


    return (
        <>
            <Button variant="primary" onClick={handleShow}>New Teacher</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Teacher</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form validated={validated} >
                        <Form.Group className="mb-3" controlId="validationCustom01">
                            <Form.Label>Teacher Firstname</Form.Label>
                            <Form.Control
                                type="text"
                                name="teacher_firstname"
                                placeholder="Teacher firstname"
                                value={formData.teacher_firstname}
                                onChange={handleChange}
                                autoFocus
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="validationCustom02">
                            <Form.Label>Teacher Lastname</Form.Label>
                            <Form.Control
                                type="text"
                                name="teacher_lastname"
                                placeholder="Teacher name"
                                value={formData.teacher_lastname}
                                onChange={handleChange}
                                autoFocus
                                required
                            />
                        </Form.Group>

                        <Form.Group className='mb-3' controlId="validationCustom04">
                            <Form.Label>Institution</Form.Label>
                            <Form.Select name="teacher_institution" aria-label="select institution" onChange={handleChange}>
                                {institutionList && institutionList.map( ({id, institution_name }) => (<option key={id.toString()} value={id}>{institution_name}</option>) )}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="validationCustom04">
                            <Form.Label>Teacher Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="teacher_number"
                                placeholder="Institution number"
                                value={formData.teacher_number}
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

export default TeacherNewModal;
