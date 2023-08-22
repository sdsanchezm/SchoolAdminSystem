import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function NotFound1({ showModal, hideModal, message }) {
  const [show, setShow] = useState(false);

  return (
    <div className='container'>
      <Alert className='m-4' show={showModal} variant="danger">
        <Alert.Heading>Alert</Alert.Heading>
        <p>
          {message}
        </p>
        <hr />
        <div className="d-flex justify-content-center">
          <p>404 - This Page was not found</p>
          {/* <Button onClick={() => setShow(false)} variant="outline-success">
            Close me
          </Button> */}
        </div>
      </Alert>

      {/* {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>} */}
    </div>
  );
}

export default NotFound1;