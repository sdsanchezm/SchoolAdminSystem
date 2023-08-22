import { useEffect, useState, useRef } from 'react';
import { Card, ListGroup, Badge, ListGroupItem, Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import ValuesGrade from './ValuesGrade';
import { Link } from 'react-router-dom';

const base_url = `http://127.0.0.1:8000/`;
const grade_url = `api/grade/`;

function StudentGradesModal({ setDataGrade, dataGrade, studentId, subjectId, show, setShow }) {

    const [x, setX] = useState();

    // const [dataGrade, setDataGrade] = useState(null);
    const [gradeFormData, setGradeFormData] = useState(null);
    const grade1ref = useRef();
    const grade2ref = useRef();
    const grade3ref = useRef();
    const gradefref = useRef();

    const handleClose = () => setShow(false);



    // handling save
    function handleSave() {

        const obj1 = {
            grade_e1: gradeFormData ? gradeFormData.grade_e1 : dataGrade[0].grade_e1,
            grade_e2: gradeFormData ? gradeFormData.grade_e2 : dataGrade[0].grade_e2,
            grade_e3: gradeFormData ? gradeFormData.grade_e3 : dataGrade[0].grade_e3,
            grade_ef: gradeFormData ? gradeFormData.grade_ef : dataGrade[0].grade_ef
        }

        console.log("obj1");
        console.log(obj1);


        const grade1 = grade1ref.current.value;
        const grade2 = grade2ref.current.value;
        const grade3 = grade3ref.current.value;
        const gradef = gradefref.current.value;

        const obj2 = {
            'grade_e1': grade1 ? grade1 : 0,
            "grade_e2": grade2 ? grade2 : 0,
            "grade_e3": grade3 ? grade3 : 0,
            "grade_ef": gradef ? gradef : 0,
        }

        console.log("obj2");
        console.log(obj2);


    }

    // handle change function, everytime a change in an input is made ==================
    const handleChange = (e) => {
        const { name, value } = e.target;
        setGradeFormData({ ...gradeFormData, [name]: value });
    }

    // initial load of the component
    useEffect(() => {
        // if (show) {
        //     loadDataHelper();
        // }
        // loadDataGradeHelper();
    }, [show]);

    // initial load of the component
    useEffect(() => {
        // if (show) {
        //     loadDataHelper();
        // }
        // setX(subjectId);
        // loadDataGradeHelper();
    }, []);

    return (

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='fs-6'> <i className="bi bi-person-add text-primary"></i> <span className='text-primary'>Student Grades</span></Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <ListGroup as="ol">

                    <ListGroup.Item as="li" className="align-items-start" >
                        <Row className=''>
                            <Col className=''><span> </span></Col>
                            <Col className=''> Grades </Col>
                            <Col className='col-8'>
                                <Row className='text-center'>1st Exam (20%):
                                    <Col className='col-sm-6 m-1'><ValuesGrade handleonchange={handleChange} inputRef={grade1ref} default1={dataGrade ? dataGrade[0].grade_e1 : 0 } listname='grade_e1' /></Col>
                                </Row>
                                <Row className='text-end'>2nd Exam (20%):
                                    <Col className='col-sm-6 m-1'><ValuesGrade handleonchange={handleChange} inputRef={grade2ref} default1={dataGrade ? dataGrade[0].grade_e2 : 0} listname='grade_e2' /></Col>
                                </Row>
                                <Row className='text-end'>3rd Exam (20%):
                                    <Col className='col-sm-6 m-1'><ValuesGrade handleonchange={handleChange} inputRef={grade3ref} default1={dataGrade ? dataGrade[0].grade_e3 : 0} listname='grade_e3' /></Col>
                                </Row>
                                <Row className='text-end'>Fin Exam (40%):
                                    <Col className='col-sm-6 m-1'><ValuesGrade handleonchange={handleChange} inputRef={gradefref} default1={dataGrade ? dataGrade[0].grade_ef : 0} listname='grade_ef' /></Col>
                                </Row>
                                <Row>

                                </Row>
                                <div className="col-6 mx-auto">
                                    {/* <Button key={id} onClick={(e) => { handleSaveGrade(e) }} name="itemid" value={id} size="sm" variant="success">Save</Button> */}
                                </div>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button className="m-1" size="sm" variant="primary" onClick={handleSave} >Save</Button>
                <Button size="sm" variant="secondary" onClick={handleClose}> Close </Button>
            </Modal.Footer>
        </Modal>



    )
}

export default StudentGradesModal;
