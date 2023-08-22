import React from "react";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Button } from "react-bootstrap";

function InstitutionList() {

    const [data1, setData1] = useState([]);
    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState([]);
    const [records, setRecords] = useState([]);
    const [search, setSearch] = useState("");

    const columns = [
        {
            name: "id",
            selector: row => row.id,
            sortable: true
        },
        {
            name: "institution_name",
            selector: row => row.institution_name,
            sortable: true
        },
        {
            name: "institution_number",
            selector: row => row.institution_number,
            sortable: true
        },
        {
            name: "Actions",
            cell: (row) => (
                <>
                    <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => { alert(row.id) }}
                    >Edit
                    </button>
                    <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => { alert(row.id) }}
                    >Delete
                    </button>
                </>
            ),
        }
    ]



    const fetchStudents = async () => {
        const response = await axios
            .get("http://127.0.0.1:8000/api/institution/")
            .catch((err) => console.log(err));

        let studentsList = [];
        if (response) {
            studentsList = response.data;
            console.log("Students_1: ", studentsList);
            setStudents(studentsList);
            console.log("Students_2: ", students);
        }

        setRecords(studentsList);
    };

    // Load the information at the start
    useEffect(() => {
        fetchStudents();
        // getDataFetch();
    }, []);

    const handleFilter = (e) => {
        // const newData = setRecords(e.target.value);
        const newData = students.filter(row => {
            return row.name.toLowerCase().includes(e.target.value.toLowerCase());
        });

        setRecords(newData);
    }



    return (
        <div className="container">
            {/* <div><input type="text" onChange={() => handleFilter}></input></div> */}
            <DataTable
                title="Institutions List"
                className="table"
                columns={columns}
                data={records}
                pagination
                fixedHeader
                fixedHeaderScrollHeight="500px"
                selectableRows
                selectableRowsHighlight
                highlightOnHover
                actions={<Button className="btn btn-primary">Export</Button>}
                subHeader
                subHeaderComponent={
                    <input
                        type="text"
                        placeholder="search..."
                        className="w-25 form-control"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value) }}
                    />
                }
                subHeaderAlign="right"
            >
            </DataTable>
        </div>
    );
}

export default InstitutionList;
