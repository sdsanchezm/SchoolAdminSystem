import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function AlertDismissible({ showModal, hideModal, message }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Alert show={showModal} variant="success">
        <Alert.Heading>My Alert</Alert.Heading>
        <p>
          {message}
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close me
          </Button>
        </div>
      </Alert>

      {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
    </>
  );
}

export default AlertDismissible;
