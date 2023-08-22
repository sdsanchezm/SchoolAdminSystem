// import { useState } from 'react';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import GetData1 from '../../helpers/GetData1';
import 'react-toastify/dist/ReactToastify.css';

const base_url = `http://127.0.0.1:8000/`;

function InstitutionViewModal({ itemId, showViewModal, closeViewModal}) {

  const [ object1, setObject1 ] = useState({});

    const temp1 = () => {
        console.log("asd");
    }

    async function getData1Helper(urlpath, itemid){
      let itemData = await GetData1(urlpath, itemid);
      console.log(`itemData: ${itemData}`);
      console.log(itemData);
      setObject1(itemData);
      // setData(itemData);
    }

    useEffect( () => {
      getData1Helper("api/institution/", itemId);
    }, [itemId]);

  return (
    <>

      <Modal show={showViewModal} onHide={closeViewModal}>
        <Modal.Header closeButton>
          <Modal.Title><i className="material-icons align-middle">&#xE416;</i> View Institution</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Card style={{  }}>
            <Card.Body>
                <Card.Text>
                    <span className="ms-2 ms-auto"><span></span><span className="fs-6 fw-bold">Institution name: </span><span className="fs-6">{object1.institution_name}</span></span><br/>
                    <span className="ms-2 ms-auto"><span className="fs-6 fw-bold">Institution number: </span><span className="fs-6">{object1.institution_number}</span></span><br/>
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

export default InstitutionViewModal;
