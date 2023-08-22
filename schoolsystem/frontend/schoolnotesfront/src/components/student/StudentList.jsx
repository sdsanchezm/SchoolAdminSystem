import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Table';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import StudentNewModal from './StudentNewModal';
import StudentEditModal from './StudentEditModal';
import StudentViewModal from './StudentViewModal';
import DeleteValidationModal from '../DeleteValidationModal';
import Spinner from 'react-bootstrap/Spinner';
import ToastNotification from '../ToastNotification';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetData1 from '../../helpers/GetData1';

const base_url = `http://127.0.0.1:8000/`;
const path_url = `api/student/`;

function StudentList() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [displayEditModal, setDisplayEditModal] = useState(false);
  const [formData, setFormData] = useState({student_firstname: "", student_lastname:"", student_number:0});
  const [studentIdEditModal, setStudentIdEditModal] = useState(0);

  // delete modal states
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [messageDelete, setMessageDelete] = useState(null);
  const [id1, setId1] = useState(1);

  const [displayViewModal, setDisplayViewModal] = useState(false);



  async function getData1Helper(urlpath, itemid){
    let itemData = await GetData1(urlpath, itemid);
    setData(itemData);
  }

  const clearFormData = () => {
    setFormData({
      student_firstname: "",
      student_lastname:"",
      student_number:0
    });
  }

  const getData = async () => {
    try {
      const response = await fetch(`${base_url}${path_url}`);
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      let actualData = await response.json();
      setData(actualData);
      setError(null);
    } catch(err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  // Load the information at the start
  useEffect(() => {

    // getData()
    getData1Helper('api/student/', '');
    setLoading(false);
  }, []);

  const showDeleteModal = (id) => {
    setId1(id);
    console.log(`show Delete Modal here ${id}`);
    setMessageDelete(`Please confirm you would like to delete '${data.find( (x) => x.id === id ).student_firstname}' ?`);
    setDisplayConfirmationModal(true);
  }

  const hideDeleteModal = () => {
    // setDisplayConfirmationModal(false);
    console.log(`hide Delete Modal here`);
    setDisplayConfirmationModal(false);
  };

  const confirmationDeleteModal = (id) => {
    // setDisplayConfirmationModal(false);
    console.log(`confirmation Delete Modal here ${id}`);

      const base_url = `http://127.0.0.1:8000`;
      fetch(`${base_url}/api/student/${id}`, {method: 'DELETE'})
      .then( (res) => {
        console.log(res.data);
        hideDeleteModal();
        toast.success("deleted!...");
        getData();
      })
      .catch( (err) => {
        console.log(err);
        toast.danger("an error ocurred");
      })
        setLoading(false);
        // toast.success("deleted!...");
      };

      // handling the opening of the edit modal ======================================
      const handleShowEditModal = async (id) => {
        console.log(id);
        setDisplayEditModal(true);

        const url = `${base_url}/api/student/${id}`;
        await fetch(url)
        .then( (res) => {
          console.log(res);
          // console.log(`res.data: ${res.data}`);
          const data = res.json();
          return data;
        })
        .then( (data) => {
          // console.log(data);
          setFormData({...data});
          setStudentIdEditModal(id);
        })
        .then(() => {
          console.log(`studentIdEditModal: ${studentIdEditModal}`);
        })
        .catch( (error) => {
            console.error(error);
        })

        setStudentIdEditModal(id);
        console.log(`id1: ${id}`);

      };



      const handleCloseEditModal = () => {
        setDisplayEditModal(false)
      };

      const handleChangeEdit = (e) => {
        // e.preventDefault();
        const { name, value } = e.target;
        setFormData({...formData, [name]:value});
      };


      // handlers Edit Modal
      const handleCloseViewModal = () => {
        setDisplayViewModal(false);
      }

      const handleShowViewModal = (id) => {
        console.log(id);
        setDisplayViewModal(true);
        setId1(id);
      }

  return (
    <div className='container'>
      <h3 className='my-4'>Student List</h3>
      {loading && <Spinner animation="border" variant="primary" ></Spinner>}
      {error && ( <p>{`There is a problem fetching the post data - ${error}`}</p> )}
      <p></p>
      <Table striped bordered hover responsive className='table table-sm align-middle fs-6'>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            {/* <th>Last Name</th> */}
            <th>student Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&

          data.map(({ id, student_firstname, student_lastname, student_number }) => (
            <tr key={id.toString()} >
                <td>{id}</td>
                <td><Link to={`/students/view/${id}`}> {student_firstname} {student_lastname} </Link></td>
                {/* <td>{student_lastname}</td> */}
                <td>{student_number}</td>
                <td align='center' >
                  <a href="#" onClick={() => {handleShowViewModal(id)}} className="view" title="View" data-toggle="tooltip"><i className="material-icons">&#xE416;</i></a>
                  &nbsp;
                  <a href="#" onClick={() => {handleShowEditModal(id)}} className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons">&#x2710;</i></a>
                  &nbsp;
                  <a href="#" onClick={() => showDeleteModal(id)} className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#x2716;</i></a>
                </td>
              </tr>
            ))}
        </tbody>

      </Table>
      <StudentNewModal getData={getData}></StudentNewModal>
      <StudentViewModal studentId={id1} showViewModal={displayViewModal} closeViewModal={handleCloseViewModal} ></StudentViewModal>
      <DeleteValidationModal showDeleteModal={displayConfirmationModal} hideDeleteModal={hideDeleteModal} confirmDeleteModal={confirmationDeleteModal} id={id1} message={messageDelete} ></DeleteValidationModal>
      <StudentEditModal showEditModal={displayEditModal} closeEditModal={handleCloseEditModal} formData={formData} handleChangeEdit={handleChangeEdit} studentIdEditModalx={studentIdEditModal} clearFormData={clearFormData} getData={getData} ></StudentEditModal>
      <ToastNotification/>

    </div>
  );
}

export default StudentList;
