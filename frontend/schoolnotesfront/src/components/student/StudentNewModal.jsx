import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ToastNotification from '../ToastNotification';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetData1 from '../../helpers/GetData1';

function StudentNewModal({ getData }) {

    // all the states
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errorInForm, setErrorInForm] = useState(false);
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({ student_firstname: "", student_lastname: "", student_number: 0 });
    const [institutionOptions, setInstitutionOptions] = useState(null);
    const [programOptions, setProgramOptions] = useState(null);

    const clearFormData = () => {
        setFormData({
            student_firstname: "",
            student_lastname: "",
            student_number: 0
        });
    }

    useEffect(() => {
        loadDropDowns();
        setLoading(false);
    }, []);

    // Helper to bring data from the api =====================
    async function loadDropDowns() {
        let institution = await GetData1('api/institution/', '');
        setInstitutionOptions(institution);
        let programs = await GetData1('api/academicprogram/', '');
        setProgramOptions(programs);
    }

    // functions to open and close the modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // handle change function, everytime a change in an input is made
    const handleChange = (e) => {
        // e.preventDefault();
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    // test function
    function test1() {
        console.log("test ok");
    }

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



    // Saving from the New Student Modal
    const handleStudentSave = async () => {

        const newRecord = {
            "student_firstname": formData.student_firstname,
            "student_lastname": formData.student_lastname,
            "student_number": formData.student_number,
            "student_institution": formData.student_institution,
            "student_academicprogram": formData.student_academicprogram
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
            <Button variant="primary" onClick={handleShow}>
                Add New Student
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form validated={validated} >
                        <Form.Group className="mb-3" controlId="validationCustom01">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="student_firstname"
                                placeholder="first name"
                                value={formData.student_firstname}
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className='mb-3' controlId="validationCustom03">
                            <Form.Label>Institution</Form.Label>
                            <Form.Select name="student_institution" aria-label="select institution" onChange={handleChange}>
                                <option value="">select</option>
                                {institutionOptions && institutionOptions.map(({ id, institution_name }) => (<option key={id.toString()} value={id}> {institution_name}</option>))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId="validationCustom03">
                            <Form.Label>Program</Form.Label>
                            <Form.Select name="student_academicprogram" aria-label="select academic program" onChange={handleChange}>
                            <option value="">select</option>
                                {programOptions && programOptions.map(({ id, academicprogram_name }) => (<option key={id.toString()} value={id}> {academicprogram_name} </option>))}
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" size='sm' onClick={() => { handleStudentSave() }}> Save </Button>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size='sm' onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default StudentNewModal;
