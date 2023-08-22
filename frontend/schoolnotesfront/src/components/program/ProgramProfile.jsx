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

const base_url = `http://127.0.0.1:8000/`;
// const temp_url = `api/academicprogram/`;
const academicprogram_url = `api/academicprogram/`;
const programprofile_url = `api/programprofile/`;

function SubjectProfile() {

    const { programId } = useParams();

    console.log(programId);

    const [data, setData] = useState(null);
    const [dataSubjects, setDataSubjects] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // get data helper
    async function getAcademicProgram(urlpath, itemid) {
        let itemData = await GetData1(urlpath, itemid);
        setData(itemData);
    }

    // get subjects
    async function getAcademicProgramProfile(urlpath, itemid) {
        let itemData = await GetData1(urlpath, itemid);
        setDataSubjects(itemData);
    }

    // Load the information at the start
    useEffect(() => {
        // getData();
        getAcademicProgram(`${academicprogram_url}`, programId);
        getAcademicProgramProfile(`${programprofile_url}`, programId);
        console.log(data);
        setLoading(false);
    }, []);

    return (
        <div className='container'>

            <Card className='mt-4 shadow-lg'>
                <Card.Header className='text-success'><i className="bi bi-book"></i> Program information</Card.Header>
                <Card.Body>
                    <Card.Text className='fs-6'>
                        <span className='fw-bold fs-6'>Program Name: </span><span className='fs-6'>{!data ? 'Loading...' : data.academicprogram_name}</span><br />
                        <span className='fw-bold fs-6'>Program Number: </span><span className='fs-6'>{!data ? 'Loading...' : data.academicprogram_number}</span><br />
                        <span className='fw-bold fs-6'>Institution: </span><span className='fs-6'>{!data ? 'Loading...' : data.academicprogram_institution.institution_name}</span>
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card className='mt-4 shadow-lg'>
                <Card.Header className='text-primary'><i className="bi bi-box-seam"></i> List of Subjects</Card.Header>
                <Card.Body>
                    {/* <Card.Title>Special title treatment</Card.Title> */}
                        {!dataSubjects? 'Loading...' : dataSubjects.map( ({id, subject_name}) => (
                            <Card.Text className='fs-6'>
                                <span className='fs-6'> <Link to={`/subject/view/${id}`}>{subject_name}</Link> </span> <br />
                            </Card.Text>
                        ) )}
                        {/* <span className='fw-bold fs-6'>Name: </span><span className='fs-6'>asd</span><br /> */}
                        {/* <span className='fw-bold fs-6'>Number: </span><span className='fs-6'>asd</span> */}
                </Card.Body>
            </Card>

            {/* <Button value="7" className="m-4" variant='dark' size='sm' onClick={(e) => handlePutTest(e)}>make put req</Button> */}

        </div>
    );
}

export default SubjectProfile;
