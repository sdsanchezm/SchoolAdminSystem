import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
// import { Button } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import GetData1 from '../helpers/GetData1';
import { Card } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const base_url = `http://127.0.0.1:8000/`;
const path_url = `api/dashboard/`;

function Dashboard1() {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    // Helper to bring data from the api =====================
    async function getDataHelper(urlpath, itemid) {
        let itemData = await GetData1(urlpath, itemid);
        setData(itemData);
    }

    useEffect(() => {
        getDataHelper(path_url, '');
    }, []);

    return (
        <div className='container'>
            <h3 className="my-4">Dashboard</h3>
            <Row className="align-items-center text-end mx-auto bg-light py-4 my-2">

                <Col className="" >
                    <Card className="m-4 bg-warning rounded-0" style={{ width: '18rem', height: '12rem' }} >
                        <Card.Body className="pb-2 mb-4 text-danger">
                            <Row className="h4 align-items-center text-light">
                                <Col><i className="bi bi-book-half"></i>Institutions</Col>
                                <Col className="h1 text-center">{data.institution_count}</Col>
                            </Row>
                        </Card.Body>
                        {/* <Card.Footer className="align-items-start"><i className="bi bi-archive-fill text-light"></i></Card.Footer> */}
                        <Card.Footer className="align-items-start">
                            <div className="d-flex align-items-start flex-column" >
                                <div className="mb-auto p-2"> <i className="bi bi-archive-fill text-light"></i></div>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>

                <Col>
                    <Card className="m-4 bg-danger rounded-0" style={{ width: '18rem', height: '12rem' }}  >
                        <Card.Body className="pb-2 mb-4">
                            <Row className="h4 align-items-center text-light">
                                <Col><i className="bi bi-journal"></i>Academic Programs</Col>
                                <Col className="h1 text-center">{data.academicprogram_count}</Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer className="align-items-start">
                            <div className="d-flex align-items-start flex-column" >
                                <div className="mb-auto p-2"> <i className="bi bi-archive-fill text-light"></i></div>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>

                <Col>
                    <Card className="m-4 bg-primary rounded-0" style={{ width: '18rem', height: '12rem' }}  >
                        <Card.Body className="pb-2 mb-4 text-danger">
                            <Row className="h4 align-items-center text-light">
                                <Col><i className="bi bi-bank2"></i>  Subjects</Col>
                                <Col className="h1 text-center">{data.subject_count}</Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer className="align-items-start">
                            <div className="d-flex align-items-start flex-column" >
                                <div className="mb-auto p-2"> <i className="bi bi-archive-fill text-light"></i></div>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>

                <Col>
                    <Card className="m-4 bg-success rounded-0" style={{ width: '18rem', height: '12rem' }}  >
                        <Card.Body className="pb-2 mb-4 text-danger">
                            <Row className="h4 align-items-center text-light">
                                <Col><i className="bi bi-border-width"></i>  Teachers</Col>
                                <Col className="h1 text-center">{data.teacher_count}</Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer className="align-items-start">
                            <div className="d-flex align-items-start flex-column" >
                                <div className="mb-auto p-2"> <i className="bi bi-archive-fill text-light"></i></div>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>

                <Col>
                    <Card className="m-4 bg-info rounded-0" style={{ width: '18rem', height: '12rem' }}  >
                        <Card.Body className="pb-2 mb-4 text-danger">
                            <Row className="h4 align-items-center text-light">
                                <Col><i className="bi bi-bricks"></i>  Students</Col>
                                <Col className="h1 text-center">{data.student_count}</Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer className="align-items-start">
                            <div className="d-flex align-items-start flex-column" >
                                <div className="mb-auto p-2"> <i className="bi bi-archive-fill text-light"></i></div>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>

            </Row>

        </div>
    );
}

export default Dashboard1;
