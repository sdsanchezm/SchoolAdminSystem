import React, { useEffect, useState,  } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import data4 from './gradesOptions.json';

function StudentGradesModal2(props) {
    const { gradeId, createGrade, show, data, selectedOption1, selectedOption2, selectedOption3, selectedOptionf, onSelectOption3, onSelectOptionf,
        onSelectOption1, onSelectOption2, onSave, onClose } = props;

    const [idx, setIdx] = useState('');


    useEffect(() => {
        if(data.length > 0){
            setIdx(data[0].id)
        }
    }, []);

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal Title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group>
                    <Form.Label>Grade e1:</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedOption1}
                        onChange={onSelectOption1}
                    >
                        <option value="">Select an option</option>
                        {data4 &&
                            data4.map((item) => (
                                <option key={item.id} value={item.number}>
                                    {item.number}
                                </option>
                            ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Grade e2:</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedOption2}
                        onChange={onSelectOption2}
                    >
                        <option value="">Select an option</option>
                        {data4 &&
                            data4.map((item) => (
                                <option key={item.id} value={item.number}>
                                    {item.number}
                                </option>
                            ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Grade e3:</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedOption3}
                        onChange={onSelectOption3}
                    >
                        <option value="">Select an option</option>
                        {data4 &&
                            data4.map((item) => (
                                <option key={item.id} value={item.number}>
                                    {item.number}
                                </option>
                            ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Grade ef:</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedOptionf}
                        onChange={onSelectOptionf}
                    >
                        <option value="">Select an option</option>
                        {data4 &&
                            data4.map((item) => (
                                <option key={item.id} value={item.number}>
                                    {item.number}
                                </option>
                            ))}
                    </Form.Control>
                </Form.Group>
            </Modal.Body>

            <Modal.Footer>
                {data.length > 0 ?
                    <>
                        <Button variant="secondary" onClick={onClose}> Close </Button>
                        <Button value={data[0].id} variant="primary" onClick={onSave}> Save </Button>
                    </>
                    :
                    <>
                        <span className='text-danger'>Grade has not created yet, click to create it now</span>
                        <Button variant="secondary" onClick={createGrade}> Create Grade </Button>
                    </>
                }
            </Modal.Footer>

            {gradeId}
        </Modal>
    );
}

export default StudentGradesModal2;

