import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import GetData1 from '../../helpers/GetData1';
import 'react-toastify/dist/ReactToastify.css';

const base_url = `http://127.0.0.1:8000/`;
const path_url = `api/academicprogram/`;

function ProgramViewModal({ itemId, showViewModal, closeViewModal }) {

    const initialObject1 = {
        academicprogram_name: "qwe",
        academicprogram_number: 0,
        academicprogram_institution: {
            institution_name: "zxc",
            institution_number: 1
        }
    }

    const [object1, setObject1] = useState(null);

    async function getData1Helper(urlpath, itemid) {
        let itemData = await GetData1(urlpath, itemid);
        console.log(`itemData: ${itemData}`);
        console.log(itemData);
        setObject1(itemData);
        // setData(itemData);
    }

    useEffect(() => {
        getData1Helper(path_url, itemId);
    }, [showViewModal]);

    useEffect(() => {
        getData1Helper(path_url, itemId);
    }, []);

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
        Edit a Student Record
      </Button> */}

            <Modal show={showViewModal} onHide={closeViewModal}>
                <Modal.Header closeButton>
                    <Modal.Title><i className="material-icons align-middle">&#xE416;</i> View Program</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Card style={{}}>
                        <Card.Body>
                            <Card.Text>
                                {object1 && 
                                    <>
                                        <span className="ms-2 ms-auto"><span></span><span className="fs-6 fw-bold">Program  name: </span><span className="fs-6">{object1.academicprogram_name}</span></span><br />
                                        <span className="ms-2 ms-auto"><span className="fs-6 fw-bold">Program number: </span><span className="fs-6">{object1.academicprogram_number}</span></span><br />
                                        <span className="ms-2 ms-auto"><span className="fs-6 fw-bold">Institution: </span><span className="fs-6">{object1.academicprogram_institution.institution_name}</span></span><br />
                                    </>
                                }
                                {/* <span className="ms-2 ms-auto"><span className="fs-6 fw-bold">Institution Name: </span><span className="fs-6">{object1.subject_teacher.teacher_institution.institution_name}</span></span><br /> */}
                            </Card.Text>
                        </Card.Body>
                    </Card>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeViewModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ProgramViewModal;
