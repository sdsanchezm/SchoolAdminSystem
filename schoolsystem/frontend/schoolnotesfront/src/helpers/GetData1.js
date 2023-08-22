import React from "react";
import axios from "axios";

const BASE_URL = `http://localhost:8000/`;

function GetData1(routeUrl, itemId){

    console.log("this is GetData1");

    // const routex1 = `api/student/`;

    if (itemId === null || itemId === undefined){
        itemId = 1;
    }

    return fetch(`${BASE_URL}${routeUrl}${itemId}`)
        .then((response) => response.json())
        // .catch((error) => {
        //     console.error(`This is an HTTP error: The status is ${response.status} - ${error}`);
        // }) 
}

export default GetData1;