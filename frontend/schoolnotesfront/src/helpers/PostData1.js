import React from "react";
import axios from "axios";

const BASE_URL = `http://localhost:8000/`;

function PostData1(routeUrl){

    console.log("this is POST");

    // const routex1 = `api/student/`;

    const newObject = {
        "institution_name": "Big and Blue South College",
        "institution_number": 99
    }

    const { data } = axios.post('http://127.0.0.1:8000/api/institution/',
    newObject,
    {
        headers:
        { 'Content-Type': 'application/json' }
    },
    {
        withCredentials: true
    });


}

export default PostData1;
