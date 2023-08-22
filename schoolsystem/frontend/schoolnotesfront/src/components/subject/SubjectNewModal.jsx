import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ToastNotification from '../ToastNotification';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetData1 from '../../helpers/GetData1';

const base_url = `http://127.0.0.1:8000/`;
const path_url = `api/subject/new/`;

function SubjectNewModal({ getData }) {

    // all the states
    const [show, setShow] = useState(false);
    const [errorInForm, setErrorInForm] = useState(false);
    const [validated, setValidated] = useState(false);
    // const [formData, setFormData] = useState({ subject_name: "", subject_number: 0, subject_teacher: 0, subject_academicprogram: 0 });
    const [formData, setFormData] = useState([]);
    const [teacherOptions, setTeacherOptions] = useState([]);
    const [academicProgramList, setAcademicProgramList] = useState([]);

    // clear the form date
    const clearFormData = () => {
        setFormData({
            subject_name: "",
            subject_number: 0,
            subject_teacher: 0,
            subject_academicprogram: 0
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
    async function getData2Helper() {
        let teachers = await GetData1('api/teacher/', '');
        console.log('teacher');
        console.log(teachers);
        setFormData({...formData, "subject_teacher": teachers[0].id})
        setTeacherOptions(teachers);
        let programs = await GetData1('api/academicprogram/', '');
        setAcademicProgramList(programs);
        console.log('programs');
        console.log(programs);
    }

    // Saving from the New Modal ==================
    const handleSave = async () => {

        const newRecord = {
            "subject_name": formData.subject_name,
            "subject_number": formData.subject_number,
            "subject_teacher": formData.subject_teacher,
            "subject_academicprogram": formData.subject_academicprogram
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

        handleClose();
        toast.success("saved!...");
        await getData();
        clearFormData();

    }

    function handleSave_test() {
        console.log("handleSave_test");
        console.log(formData);
    }

    // get all initial data
    useEffect(() => {
        getData2Helper();

    }, []);


    return (
        <>
            <Button variant="primary" onClick={handleShow}>New Subject</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Subject</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form validated={validated} >
                        <Form.Group className="mb-3" controlId="validationCustom01">
                            <Form.Label>Subject Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="subject_name"
                                placeholder="Subject Name"
                                value={formData.subject_name}
                                onChange={handleChange}
                                autoFocus
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="validationCustom02">
                            <Form.Label>Subject Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="subject_number"
                                placeholder="Subject number"
                                value={formData.subject_number}
                                onChange={handleChange}
                                autoFocus
                                required
                            />
                        </Form.Group>

                        <Form.Group className='mb-3' controlId="validationCustom03">
                            <Form.Label>Teacher</Form.Label>
                            <Form.Select name="subject_teacher" aria-label="select teacher" onChange={handleChange} value={formData.subject_teacher}>
                                {teacherOptions && teacherOptions.map(({ id, teacher_firstname, teacher_lastname, teacher_number }) => (<option key={id.toString()} value={id}> {teacher_firstname} {teacher_lastname} - {teacher_number}</option>))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId="validationCustom04">
                            <Form.Label>Academic Program</Form.Label>
                            <Form.Select name="subject_academicprogram" aria-label="select academic program" onChange={handleChange} value={formData.subject_academicprogram}>
                                {academicProgramList && academicProgramList.map(({ id, academicprogram_name }) => (<option key={id.toString()} value={id}>{academicprogram_name}</option>))}
                            </Form.Select>
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

export default SubjectNewModal;
