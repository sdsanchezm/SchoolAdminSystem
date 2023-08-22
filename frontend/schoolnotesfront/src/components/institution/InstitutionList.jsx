import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
// import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Table';
import InstitutionViewModal from './InstitutionViewModal'
import InstitutionEditModal from './InstitutionEditModal';
import InstitutionNewModal from './InstitutionNewModal';
import InstitutionDeleteModal from "./InstitutionDeleteModal";
import Spinner from 'react-bootstrap/Spinner';
import ToastNotification from '../ToastNotification';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetData1 from '../../helpers/GetData1';

const base_url = `http://127.0.0.1:8000/`;
const path_url = `api/institution/`;

function InstitutionList() {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [id1, setId1] = useState(1);
    const [displayViewModal, setDisplayViewModal] = useState(false);
    const [displayEditModal, setDisplayEditModal] = useState(false);

    // function to reload list after creating a new record
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
        } catch (err) {
            setError(err.message);
            setData(null);
        } finally {
            setLoading(false);
        }
    }

    // Helper to bring data from the api =====================
    async function getData1Helper(urlpath, itemid) {
        let itemData = await GetData1(urlpath, itemid);
        setData(itemData);
    }

    // initial load ======================
    useEffect(() => {
        getData1Helper('api/institution/', '');
    }, [displayEditModal]);

    // helpers to show and hide VIEW modal =====================
    function handleShowViewModal(id) {
        console.log(id);
        setId1(id);
        setDisplayViewModal(true);
    }

    function handleCloseViewModal(id) {
        console.log(id);
        // setId1(id);
        setDisplayViewModal(false);
    }

    // helpers to show and hide EDIT modal =====================
    function handleShowEditModal(id) {
        setId1(id);
        console.log(id);
        setDisplayEditModal(true);
    }

    function handleCloseEditModal(id) {
        setDisplayEditModal(false);
        console.log(id);
    }

    // helpers to show and hide DELETE modal =====================
    function showDeleteModal(id) {
        console.log(id);
    }

    return (
        <div className='container'>
            <h3 className="my-4">Institution List</h3>
            {loading && <Spinner animation="border" variant="primary" ></Spinner>}
            {error && (<p>{`There is a problem fetching the post data - ${error}`}</p>)}

            <p></p>
            <Table striped bordered hover responsive className='table table-sm align-middle fs-6'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&

                        data.map(({ id, institution_name, institution_number }) => (
                            <tr key={id.toString()} >
                                <td>{id}</td>
                                <td>{institution_name}</td>
                                <td>{institution_number}</td>
                                <td align='center' >
                                    <a href="#" onClick={() => { handleShowViewModal(id) }} className="view" title="View" data-toggle="tooltip"><i className="material-icons">&#xE416;</i></a>
                                    &nbsp;
                                    <a href="#" onClick={() => { handleShowEditModal(id) }} className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons">&#x2710;</i></a>
                                    &nbsp;
                                    <a href="#" onClick={() => showDeleteModal(id)} className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#x2716;</i></a>
                                </td>
                            </tr>
                        ))}
                </tbody>

            </Table>
            <InstitutionNewModal getData={getData}></InstitutionNewModal>
            <InstitutionViewModal itemId={id1} showViewModal={displayViewModal} closeViewModal={handleCloseViewModal} ></InstitutionViewModal>
            <InstitutionEditModal itemId={id1} showEditModal={displayEditModal} closeEditModal={handleCloseEditModal} ></InstitutionEditModal>
            {/* <InstitutionEditModal showEditModal={displayEditModal} closeEditModal={handleCloseEditModal} formData={formData} handleChangeEdit={handleChangeEdit} studentIdEditModalx={studentIdEditModal} clearFormData={clearFormData} getData={getData} ></InstitutionEditModal> */}
            {/* <InstitutionDeleteModal showDeleteModal={displayConfirmationModal} hideDeleteModal={hideDeleteModal} confirmDeleteModal={confirmationDeleteModal} id={id1} message={messageDelete} ></InstitutionDeleteModal> */}
            {/* <ToastNotification/> */}

        </div>
    );
}

export default InstitutionList;
