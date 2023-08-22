import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Table';
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
import { useParams } from "react-router-dom";


const base_url = `http://127.0.0.1:8000/`;
const path_url = `api/studentprofile/`;

function StudentList() {

    const { studentId } = useParams();

    // const [data, setData] = useState([{student_institution: 1, student_academicprogram: 1}]);

    const initialData = [
        {
            student_institution: 1,
            student_academicprogram: 1
        }
    ]

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [institutionData, setInstitutionData] = useState(null);
    const [teacherData, setTeacherData] = useState(null);
    const [programData, setProgramData] = useState(null);
    const x1 = useRef();
    const x2 = useRef();
    // const [formData, setFormData] = useState({ student_firstname: "", student_lastname: "", student_number: 0 });

    async function fetchData1(){
        // debugger
        await getData1Helper(path_url, studentId);
        console.log(`data ${data}`);
    }

    async function fetchData2(){
        // debugger
        await getProgram(data[0].student_academicprogram);
        await getInstitution(data[0].student_institution);
    }

    async function getData1Helper(urlpath, itemid) {
        let itemData = await GetData1(urlpath, itemid);
        if (itemData.detail){
            return
        }else{
            setData(itemData);
        }
        x1.current = itemData.student_institution;
        x2.current = itemData.student_academicprogram;
        // console.log(data);
        getInstitution(x1.current);
        getProgram(x2.current);
        // getInstitution(data[0].student_)
        console.log(`itemData: ${itemData}`);
        console.log(itemData);
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

    async function getTeacher(itemid) {
        const urlpath = 'api/teacher/';
        let teacher = await GetData1(urlpath, itemid);
        setTeacherData(teacher);
        // console.log(data);
    }

    function testdataObject(){
        console.log(data);
        console.log(institutionData);
        console.log(programData);
    }

    // Load the information at the start
    useEffect(() => {
        // getData()

        fetchData1();
        // getInstitution();
        setLoading(false);
        // console.log(data);
    }, []);

    // useEffect(() => {
    //     if (!loading){
    //         fetchData2();
    //     }
    // }, [loading]);

    return (
        <div className='container'>
            <Card className='mt-4 shadow-lg'>
                <Card.Header className='text-primary'><i className="bi bi-box-seam"></i> Student Information</Card.Header>
                <Card.Body>
                    {/* <Card.Title>Special title treatment</Card.Title> */}
                    {data &&
                        <Card.Text className='fs-6'>
                                {/* <span className='fw-bold fs-6'>Name: </span><span className='fs-6'>{!data? 'Loading...': data[0].student_firstname } {!data? 'Loading...': data[0].student_lastname } </span><br/> */}
                                <span className='fw-bold fs-6'>Name: </span><span className='fs-6'>{data[0].student_firstname } {data[0].student_lastname } </span><br/>
                                <span className='fw-bold fs-6'>Number: </span><span className='fs-6'>{!data? 'Loading...': data[0].student_number}</span>
                        </Card.Text>
                    }
                </Card.Body>
            </Card>

            <Card className='mt-4 shadow-lg'>
                <Card.Header className='text-danger'><i className="bi bi-bullseye"></i> Courses - Available</Card.Header>
                <Card.Body>
                    {/* <Card.Title>Special title treatment</Card.Title> */}
                    <Card.Text className='fs-6'>
                        <span className='fs-6'>Student is taking the following subjects: </span><span className='fs-6'></span>
                    </Card.Text>




                </Card.Body>
            </Card>
                    {/* <button onClick={() => testdataObject() }>check</button> */}
        </div>
    );
}

export default StudentList;
