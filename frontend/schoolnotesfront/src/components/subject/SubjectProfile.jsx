import Table from 'react-bootstrap/Table';
// import Button from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { Card, ListGroup, Badge, ListGroupItem } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { useState, useEffect } from "react";
import DeleteValidationModal from '../DeleteValidationModal';
import Spinner from 'react-bootstrap/Spinner';
import ToastNotification from '../ToastNotification';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetData1 from '../../helpers/GetData1';
import PutData1 from '../../helpers/PutData1';
import { useParams } from "react-router-dom";
import ValuesGrade from '../student/ValuesGrade';
import RegisterStudentInSubjectModal from './RegisterStudentInSubjectModal';


const base_url = `http://127.0.0.1:8000/`;
const temp_url = `api/studentbysubject/`;
const path_grade = `api/grade/`;

function SubjectProfile() {

    const { subjectId } = useParams();

    console.log(`subjectId: ${subjectId}`);

    const initialObject = {
        subject_name: "",
        subject_number: 0,
        students: [{
            id: 1,
            student_firstname: "",
            student_lastname: ""
        }]
    }

    const initialGradeData = {
        id: 1,
        grade_e1: 0,
        grade_e2: 0,
        grade_e3: 0,
        grade_ef: 0
    }

    const [data, setData] = useState({ ...initialObject });
    const [gradeData, setGradeData] = useState({ ...initialGradeData });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({ subject_name: "", subject_number: 0 });
    const [id1, setId1] = useState(1);
    const [newStudentModalShow, setNewStudentModalShow] = useState(false);
    const [programId, SetProgramId] = useState(1);

    console.log(`programId: ${programId}`);

    // helper function to load initial data
    async function getData1Helper(urlpath, itemid) {
        let itemData = await GetData1(urlpath, itemid);
        setData(itemData);
        SetProgramId(itemData.subject_academicprogram);
    }

    const getData = async () => {
        try {
            const response = await fetch(`${base_url}${temp_url}`);
            if (!response.ok) {
                throw new Error(
                    `This is an HTTP error: The status is ${response.status}`
                );
            }
            let actualData = await response.json();
            setData(actualData);
            setError(null);
        } catch (err) {
            setError(err.message);
            setData(null);
        } finally {
            setLoading(false);
        }
    }

    function clearData() {
        setGradeData(initialGradeData)
    }

    // handling grade save
    async function handleSaveGrade(e) {
        console.log(e.target);
        console.log(e.target.value);
        const id = e.target.value;
        const formData = {
            grade_student_id: e.target.value,
            grade_subject: subjectId,
            grade_e1: gradeData.grade_e1,
            grade_e2: gradeData.grade_e2,
            grade_e3: gradeData.grade_e3,
            grade_ef: gradeData.grade_ef
        }

        const obj1 = {
            student_id: e.target.value,
            subject_id: subjectId,
            grades: {
                grade_e1: gradeData.grade_e1,
                grade_e2: gradeData.grade_e2,
                grade_e3: gradeData.grade_e3,
                grade_ef: gradeData.grade_ef
            }
        }


        await PutData1(path_grade, id, obj1);
        clearData()

        console.log(obj1);
    }

    // handle change function, everytime a change in an input is made ==================
    const handleChange = (e) => {
        const { name, value } = e.target;
        setGradeData({ ...gradeData, [name]: value });
    }

    // function for Testing the put request
    async function handlePutTest(e) {
        const value1 = e.target.value
        const id = e.target.value
        const obj1 = {
            student_id: 2,
            subject_id: 1,
            grades: {
                grade_e1: 1.1,
                grade_e2: 1.1,
                grade_e3: 1.1,
                grade_ef: 1.1
            }
        }
        console.log("value1: ", value1);
        console.log("obj1: ", obj1);

        await PutData1(path_grade, id, obj1);
        console.log("put done");
    }

    // open and handle info for the modal
    function handleStudentsListModal(e) {
        const obj1 = {
            "subject": data ? data.id : 0,
            "program": data ? data.subject_academicprogram : 0
        }

        console.log(obj1);
        setNewStudentModalShow(true)
    }

    // Load the information at the start
    useEffect(() => {
        getData1Helper(`${temp_url}`, subjectId);
        console.log(data);
        setLoading(false);
    }, []);

    useEffect( () => {
        getData1Helper(`${temp_url}`, subjectId);
    }, [newStudentModalShow]);


    return (
        <div className='container'>
            <Card className='mt-4 shadow-lg'>
                <Card.Header className='text-success'><i className="bi bi-book"></i> Subject information</Card.Header>
                <Card.Body>
                    {/* <Card.Title>Special title treatment</Card.Title> */}
                    <Card.Text className='fs-6'>
                        <span className='fw-bold fs-6'>Name: </span><span className='fs-6'>{data.subject_name}</span><br />
                        <span className='fw-bold fs-6'>Number: </span><span className='fs-6'>{data.subject_number}</span><br />
                        <span className='fw-bold fs-6'>Program: </span><span className='fs-6'>{data.subject_academicprogram}</span>
                        {/* <span className='fw-bold fs-6'>Teacher: </span><span className='fs-6'>{data.subject_teacher}</span> */}
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card className='mt-4 shadow-lg'>
                <Card.Header className='text-primary'><i className="bi bi-person-check-fill"></i> List of Registered Students
                    <Button className="mx-5" variant='primary' size='sm' onClick={(e) => handleStudentsListModal(e)}>Register Student</Button>
                </Card.Header>
                <Card.Body>
                    {/* <Card.Title>Special title treatment</Card.Title> */}
                    <Card.Text className='fs-6'>
                        {/* <span className='fw-bold fs-6'>Institution: </span><span className='fs-6'>Asd</span><br /> */}
                        {/* <span className='fw-bold fs-6'>Program: </span><span className='fs-6'>Asd</span><br /> */}
                        {/* <span className='fw-bold fs-6'>Courses: </span><span className='fs-6'></span> */}
                    </Card.Text>

                    <ListGroup as="ol">
                        {data && data.students.map(({ id, student_firstname, student_lastname, student_number }) => (
                            <ListGroup.Item key={id} as="li" className="align-items-start" onChange={handleChange}>
                                <Row className=''>
                                    <Col className=''><span> <Link to={`/students/view/${id}`}> {student_firstname} {student_lastname}</Link> </span></Col>
                                    <Col className=''>{student_number}</Col>
                                </Row>
                            </ListGroup.Item>

                        ))}
                    </ListGroup>

                </Card.Body>
            </Card>

            <RegisterStudentInSubjectModal loading={setLoading} data={data} subjectId={subjectId} programId={programId} show={newStudentModalShow} setShow={setNewStudentModalShow} />

            {/* <Button value="7" className="my-4" variant='primary' size='sm' onClick={() => setNewStudentModalShow(true)}>Register Student</Button> */}

        </div>
    );
}

export default SubjectProfile;
