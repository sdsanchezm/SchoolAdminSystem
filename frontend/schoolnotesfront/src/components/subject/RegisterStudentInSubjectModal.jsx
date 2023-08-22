import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import GetData1 from '../../helpers/GetData1';
import PutData1 from '../../helpers/PutData1';

const base_url = `http://localhost:8000/`;
const path_url = `api/studentbyprogram/`;
const studentupdate_url = `api/studentupdate/`;

function RegisterStudentInSubjectModal({ loading, show, setShow, subjectId, programId }) {

    // const [show, setShow] = useState(false);
    const [data, setData] = useState(null);
    // const [program1, setProgram1] = useState(null);
    const inputRef = useRef();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function GetData2(base_url, routeUrl, itemId, query_param) {
        return await fetch(`${base_url}${routeUrl}${itemId}?s=${query_param}`)
            .then((response) => response.json())
            .catch(e => console.error(`e: ${e}`))
    }

    // load data function
    async function loadDataHelper(urlpath, programid, subjectid) {
        let itemData = await GetData2(base_url, urlpath, programid, subjectid);
        setData(itemData);
    }

    // handle click of the save button
    async function handleSave(){
        loading(true);
        console.log("handlesave");
        const student_id = inputRef.current.value;
        console.log(student_id);

        const obj1 = {
            'student_id': student_id? student_id : '',
            "subject_id": subjectId? subjectId : '',
            "program_id": programId
        }

        if (obj1.student_id === '' || obj1.program_id === '' || obj1.subject_id === ''){
            console.error("Field cannot be empty, please select a value");
            return
        }

        const objData = {
            "student_subject": [obj1.subject_id]
        }

        // calling the put helper function
        await PutData1(studentupdate_url, student_id, objData);

        console.log(obj1);
        // loadDataHelper(path_url, programId, subjectId);
        loading(false);
        handleClose();
    }

    // handle the onChange of the select list in the form
    function handleOnChange(){
        console.log('handleOnChange here');
    }


    useEffect(() => {
        console.log(programId);
        console.log(subjectId);
        loadDataHelper(path_url, programId, subjectId);
    }, [show]);

    // useEffect(() => {
    //     loadDataHelper(path_url, programId, subjectId);
    // }, []);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='fs-6'> <i className="bi bi-person-add text-primary"></i> <span className='text-primary'>Register Student </span></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Text className='m-1 p-1'>Students Available:</Form.Text>
                <Form.Select name='student_to_register' className="p-1 m-1" size="sm" aria-label="select Student to register" ref={inputRef}>
                    <option value='' >Select a student if available</option>
                    {!data? '' :
                        data.map( ({ id, student_firstname, student_lastname }) => (
                            <option key={id} value={id}>{student_firstname} {student_lastname}</option>
                        ))
                    }
                </Form.Select>
                <Button className="m-1" size="sm" variant="primary" onClick={handleSave} >Save</Button>
            </Modal.Body>
            <Modal.Footer>
                <Button size="sm" variant="secondary" onClick={handleClose}> Close </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default RegisterStudentInSubjectModal;
