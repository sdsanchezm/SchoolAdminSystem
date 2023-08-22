import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ToastNotification from '../ToastNotification';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetData1 from '../../helpers/GetData1';

const base_url = `http://127.0.0.1:8000/`;
const path_url = `api/academicprogram/new/`;

function ProgramNewModal({ getData }) {

    // all the states
    const [show, setShow] = useState(false);
    const [errorInForm, setErrorInForm] = useState(false);
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({ subject_name: "", subject_number: 0, subject_teacher: 0, subject_academicprogram: 0 });
    const [institutionOptions, setInstitutionOptions] = useState([]);

    // clear the form date
    const clearFormData = () => {
        setFormData({
            academicprogram_name: "",
            academicprogram_number: 0,
            academicprogram_institution: 1,
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
        let institutions = await GetData1('api/institution/', '');
        setInstitutionOptions(institutions);
    }

    // Saving from the New Modal ==================
    const handleSave = async () => {

        const newRecord = {
            "academicprogram_name": formData.academicprogram_name,
            "academicprogram_number": formData.academicprogram_number,
            "academicprogram_institution": formData.academicprogram_institution
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

    function handleSave_test(){
        console.log("handleSave_test");
        console.log(formData);
    }

    // get all initial data
    useEffect( () => {
        getData2Helper();
        // console.log("this is useEffect");
        // console.log(teacherListFetch);
        // setTeacherOptions(teacherListFetch);
        // let programListFetch = getData1Helper('api/academicprogram/','');
        // setAcademicProgramList(programListFetch);
        clearFormData();
    }, []);


    return (
        <>
            <Button variant="primary" onClick={handleShow}>New Program</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Program</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form validated={validated} >
                        <Form.Group className="mb-3" controlId="validationCustom01">
                            <Form.Label>Program Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="academicprogram_name"
                                placeholder="Program Name"
                                value={formData.academicprogram_name}
                                onChange={handleChange}
                                autoFocus
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="validationCustom02">
                            <Form.Label>Program Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="academicprogram_number"
                                placeholder="Program Number"
                                value={formData.academicprogram_number}
                                onChange={handleChange}
                                autoFocus
                                required
                            />
                        </Form.Group>

                        <Form.Group className='mb-3' controlId="validationCustom03">
                            <Form.Label>Institution</Form.Label>
                            <Form.Select name="academicprogram_institution" aria-label="select teacher" onChange={handleChange}>
                                {institutionOptions && institutionOptions.map(({ id, institution_name }) => ( <option key={id} value={id.toString()}> {institution_name} </option>))}
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

export default ProgramNewModal;
