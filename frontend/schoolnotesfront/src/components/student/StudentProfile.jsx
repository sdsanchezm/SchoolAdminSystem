import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Card, ListGroup, Badge, ListGroupItem } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { useState, useEffect, useRef } from "react";
import StudentNewModal from './StudentNewModal';
import StudentEditModal from './StudentEditModal';
import StudentViewModal from './StudentViewModal';
import DeleteValidationModal from '../DeleteValidationModal';
import Spinner from 'react-bootstrap/Spinner';
import ToastNotification from '../ToastNotification';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetData1 from '../../helpers/GetData1';
import { Link, useParams } from "react-router-dom";
import StudentGraph from './StudentGraph';
import Nav from 'react-bootstrap/Nav';
import StudentGradesModal from './StudentGradesModal';
import StudentGradesModal2 from './StudentGradesModal2';
import PutData1 from '../../helpers/PutData1';


const base_url = `http://127.0.0.1:8000/`;
const path_url = `api/studentprofile/`;
const grade_url = `api/grade/`;

function StudentList() {

    const { studentId } = useParams();

    // const [data, setData] = useState([{student_institution: 1, student_academicprogram: 1}]);

    const initialData = [
        {
            student_institution: 1,
            student_academicprogram: 1
        }
    ]

    const initialDataGrade = [
        {
            "grade_e1": 0,
            "grade_e2": 0,
            "grade_e3": 0,
            "grade_ef": 0
        }
    ]

    const initialDataGraphics = [
        {
            "grade_e1": 0,
            "grade_e2": 0,
            "grade_e3": 0,
            "grade_ef": 0
        }
    ]

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [institutionData, setInstitutionData] = useState(null);
    const [programData, setProgramData] = useState(null);
    const [teacherData, setTeacherData] = useState(null);
    const institutionRef = useRef();
    const programRef = useRef();
    const [showGradeModal, setShowGradeModal] = useState(false);
    const [subjectId, setSubjectId] = useState('');
    const [dataGrade, setDataGrade] = useState(initialDataGraphics);
    // const [formData, setFormData] = useState({ student_firstname: "", student_lastname: "", student_number: 0 });

    const [selectedOption1, setSelectedOption1] = useState('');
    const [selectedOption2, setSelectedOption2] = useState('');
    const [selectedOption3, setSelectedOption3] = useState('');
    const [selectedOptionf, setSelectedOptionf] = useState('');
    const [idx, setIdx] = useState(0);
    const [gradeId, setGradeId] = useState(0);
    const [dataGraphics, setDataGraphics] = useState([]);

    // handle options ===========================
    const handleSelectOption1 = (event) => {
        setSelectedOption1(event.target.value);
      };

      const handleSelectOption2 = (event) => {
        setSelectedOption2(event.target.value);
    };

    const handleSelectOption3 = (event) => {
        setSelectedOption3(event.target.value);
    };

    const handleSelectOptionf = (event) => {
        setSelectedOptionf(event.target.value);
    };

    // Get initial Data =================================
    async function fetchData1() {
        // debugger
        await getData1Helper(path_url, studentId);
        console.log(`data ${data}`);
    }

    // exrtact grades
    function extractGrades(array1){
        if (array1.length === 0){
            setDataGraphics([]);
            return
        }
        else if (array1[0].student_subjects.length === 0){
            setDataGraphics([]);
            return
        }
        else if (array1[0].student_subjects[0].subject_grades.length === 0) {
            setDataGraphics([]);
            return
        } else {
            setDataGraphics(array1[0].student_subjects[0].subject_grades)
            return
        }
    }

    // async function fetchData2(){
    //     // debugger
    //     await getProgram(data[0].student_academicprogram);
    //     await getInstitution(data[0].student_institution);
    // }

    async function getData1Helper(urlpath, itemid) {
        let itemData = await GetData1(urlpath, itemid);
        setData(itemData);
        console.log("dataGraph ====");
        extractGrades(itemData);
        // console.log(itemData[0].student_subjects[0].subject_grades);
        console.log(itemData);
        institutionRef.current = itemData[0].student_institution;
        programRef.current = itemData[0].student_academicprogram;
        // console.log(`d: ${institutionRef.current}`);
        // console.log(`c: ${programRef.current}`);
        getInstitution(institutionRef.current);
        getProgram(programRef.current);
        // getInstitution(data[0].student_)
    }

    async function getInstitution(itemid) {
        const urlpath = 'api/institution/';
        let institution = await GetData1(urlpath, itemid);
        setInstitutionData(institution);
        // console.log(data);
    }

    async function getProgram(itemid) {
        const urlpath = 'api/academicprogram/';
        let program = await GetData1(urlpath, itemid);
        setProgramData(program);
        // console.log(data);
    }

    // Create Grade ==
    async function createGrade(student_id, subject_id) {
        // let validate = await fetch(`http://localhost:8000/api/grade/?st=33&sb=5`)

        let itemData = await GetDataFromGrades(grade_url, student_id, subject_id);

        console.log(itemData);

        if (itemData.length === 0){
            const newObj1 = {
                "grade_e1": 0,
                "grade_e2": 0,
                "grade_e3": 0,
                "grade_ef": 0,
                "grade_student": student_id,
                "grade_subject": subject_id,
                "grade_teacher": 1
            }

            const base_url2 = `${base_url}${grade_url}`;
            const res = await fetch(base_url2, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newObj1)
            })
        }


        console.log("post completed");
    }

    async function getTeacher(itemid) {
        const urlpath = 'api/teacher/';
        let teacher = await GetData1(urlpath, itemid);
        setTeacherData(teacher);
        // console.log(data);
    }

    function testdataObject() {
        console.log(data);
        console.log(institutionData);
        console.log(programData);
    }

    // try to fix the subject id == null
    function getSubjectId(e) {
        console.log("testing");
        console.log(e.target.value);
        setSubjectId(e.target.value);
        return e.target.value;
        // return
    }

    // create grade ============================
    async function createGrade1(){
        // let subject_id2 = await getSubjectId(e);
        await createGrade(studentId, subjectId);
        handleCloseGradeModal();
        fetchData1();
    }

    // Open Modal =====================================
    async function handleOpenGradeModal(e) {
        const subjectIdx = await e.target.value
        setSubjectId(subjectIdx);
        setGradeId(5);
        let subject_id2 = await getSubjectId(e);
        console.log("asd");
        console.log(`student id: ${data[0].id}`);
        // console.log(`subject id: ${subjectIdx}`);
        console.log(`subjectId: ${subject_id2}`);
        loadDataGradeHelper('api/grade/', studentId, subject_id2);
        setShowGradeModal(true);
    }

    // Close modal
    function handleCloseGradeModal(){
        console.log("this is handleCloseGradeModal");
        clearGradeData();
        setGradeId(0);
        setShowGradeModal(false);
    }

    // handle save
    async function handleSave(e) {
        console.log("this is handle save");
        console.log(selectedOption1);
        console.log(selectedOption2);
        console.log(selectedOption3);
        console.log(selectedOptionf);

        const obj1 = {
            "grade_e1": selectedOption1,
            "grade_e2": selectedOption2,
            "grade_e3": selectedOption3,
            "grade_ef": selectedOptionf
        }

        console.log(obj1);
        console.log(e.target.value);

        const idy = e.target.value;

        console.log('idy');
        console.log(idy);

        await PutData1(grade_url, idy, obj1);
        handleCloseGradeModal();
        fetchData1();
    }

    // Get Data Helper Function ==========================
    async function GetDataFromGrades(routeUrl, studentid, subjectid) {
        console.log("this is GetData1");
        if (studentid === null || studentid === undefined || subjectid === undefined || subjectid === null) {
            return
        }
        return await fetch(`${base_url}${routeUrl}?st=${studentid}&sb=${subjectid}`)
            .then((response) => response.json())
    }

    // function to call the load of initial information
    async function loadDataGradeHelper(grade_urlx, studentIdx, subjectIdx) {
        // let y = await subjectId;
        let itemData = [];
        itemData = await GetDataFromGrades(grade_urlx, studentIdx, subjectIdx);
        // if (itemData.length === 0) {
        //     setDataGrade(null)
        //     return
        // }
        setDataGrade(itemData);

        console.log(`itemData: `);
        console.log(itemData);

        if (itemData.length > 0) {
            setSelectedOption1(itemData[0].grade_e1)
            setSelectedOption2(itemData[0].grade_e2)
            setSelectedOption3(itemData[0].grade_e3)
            setSelectedOptionf(itemData[0].grade_ef)
        }

        console.log(`itemData: `);
        console.log(itemData);
    }


    function clearGradeData(){
        // setDataGrade(...initialDataGrade);
        setSelectedOption1(0)
        setSelectedOption2(0)
        setSelectedOption3(0)
        setSelectedOptionf(0)
    }


    // Load the information at the start
    useEffect(() => {
    // getData()

        fetchData1();
        // getInstitution();
        // loadDataGradeHelper();
        setLoading(false);
        // console.log(data);
    }, []);



    return (
        <div className='container'>
            <Card className='mt-4 shadow-lg'>
                <Card.Header className='text-primary'><i className="bi bi-box-seam"></i> Personal Information</Card.Header>
                <Card.Body>
                    {/* <Card.Title>Special title treatment</Card.Title> */}
                    <Card.Text className='fs-6'>
                        <span className='fw-bold fs-6'>Name: </span><span className='fs-6'>{!data ? 'Loading...' : data[0].student_firstname} {!data ? 'Loading...' : data[0].student_lastname} </span><br />
                        <span className='fw-bold fs-6'>Number: </span><span className='fs-6'>{!data ? 'Loading...' : data[0].student_number}</span>
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card className='mt-4 shadow-lg'>
                <Card.Header className='text-success'><i className="bi bi-rocket-takeoff"></i> Academic Information</Card.Header>
                <Card.Body>
                    {/* <Card.Title>Special title treatment</Card.Title> */}
                    <Card.Text className='fs-6'>
                        <span className='fw-bold fs-6'>Institution: </span><span className='fs-6'>{!institutionData ? 'Loading...' : institutionData.institution_name}</span><br />
                        {/* <span className='fw-bold fs-6'>Program: </span><a href={!programData ? 'Loading...' : programData.id }><span className='fs-6'>{!programData ? 'Loading...' : programData.academicprogram_name }</span></a><br /> */}
                        <span className='fw-bold fs-6'>Program: </span>

                        <Link to={`/programs/view/${!programData ? 'Loading...' : programData.id}`} relative='/'> {!programData ? 'Loading...' : programData.academicprogram_name} </Link >

                        <br />
                        {/* <span className='fw-bold fs-6'>Courses: </span><span className='fs-6'></span> */}
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card className='mt-4 shadow-lg'>
                <Card.Header className='text-danger'><i className="bi bi-bullseye"></i> Courses - Historical Information</Card.Header>
                <Card.Body>
                    {/* <Card.Title>Special title treatment</Card.Title> */}
                    <Card.Text className='fs-6'>
                        <span className='fs-6'>Student is taking the following subjects: </span><span className='fs-6'></span>
                    </Card.Text>

                    <ListGroup as="ol" numbered>

                        {!data ? <Spinner /> : data[0].student_subjects.map(({ id, subject_name, subject_number, subject_grades }) => (
                            <ListGroup.Item key={id} as="li" className="justify-content-between align-items-start" >
                                <span className='fw-bold'>{subject_name} - {subject_number}
                                    - <Button onClick={(e) => handleOpenGradeModal(e)} value={id} className="p-0 fs-6 fw-normal" size='sm' variant='secondary'>update</Button>
                                </span>
                                <Row className=''>
                                    <Col className='text-center'><span>1st Exam (20%)</span></Col>
                                    <Col className='text-center'><span>2nd Exam (20%)</span></Col>
                                    <Col className='text-center'><span>3rd Exam (20%)</span></Col>
                                    <Col className='text-center'><span className='fw-bold'>Final Exam (40%)</span></Col>
                                    <Col className='text-center'><span className='text-danger fw-bold fs-6'>Total Grade (100%)</span></Col>
                                </Row>

                                {!subject_grades ? <Spinner /> : subject_grades.map(({ id, grade_e1, grade_e2, grade_e3, grade_ef }) => (
                                    <Row className='' key={id}>
                                        <Col className='text-center'><Badge bg="primary" pill> {grade_e1} </Badge> </Col>
                                        <Col className='text-center'><Badge bg="primary" pill> {grade_e2} </Badge> </Col>
                                        <Col className='text-center'><Badge bg="primary" pill> {grade_e3} </Badge> </Col>
                                        <Col className='text-center'><Badge bg="warning" pill> {grade_ef} </Badge> </Col>
                                        <Col className='text-center'><span className='text-light text-center fw-bold fs-6 text-bg-danger p-1'>{parseFloat((grade_e1 * 0.2 + grade_e2 * 0.2 + grade_e3 * 0.2 + grade_ef * 0.4)).toPrecision(2)}</span></Col>
                                    </Row>
                                ))}

                            </ListGroup.Item>
                        ))}

                    </ListGroup>

                </Card.Body>
            </Card>

            <Card className='mt-4 shadow-lg col-md-6'>
                <Card.Header className='text-info'><i className="bi bi-bar-chart"></i> Graphic </Card.Header>
                <Card.Body>
                    <Row>
                        <Col className=''>
                            {dataGraphics ?
                                <StudentGraph dataGraphics={dataGraphics}></StudentGraph>
                                :
                                ''
                            }
                        </Col>

                    </Row>
                </Card.Body>
            </Card>

            {/* <StudentGradesModal setDataGrade={setDataGrade} dataGrade={dataGrade} studentId={studentId} subjectId={subjectId} show={showGradeModal} setShow={setShowGradeModal} ></StudentGradesModal> */}

            <StudentGradesModal2
                show={showGradeModal}
                onClose={handleCloseGradeModal}
                data={dataGrade}
                onSave={handleSave}
                selectedOption1={selectedOption1}
                selectedOption2={selectedOption2}
                selectedOption3={selectedOption3}
                selectedOptionf={selectedOptionf}
                onSelectOption1={handleSelectOption1}
                onSelectOption2={handleSelectOption2}
                onSelectOption3={handleSelectOption3}
                onSelectOptionf={handleSelectOptionf}
                idx={idx}
                createGrade={createGrade1}
                gradeId={gradeId}
            />


            {/* <button onClick={() => testdataObject() }>check</button> */ }

        </div >
    );
}

export default StudentList;
