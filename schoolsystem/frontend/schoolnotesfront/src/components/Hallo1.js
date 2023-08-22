// Import the react JS packages
// import {useEffect, useState} from "react";
// import axios from "axios";
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';


// Define the hallo1 function.
export function Hallo1() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await fetch(
              `http://127.0.0.1:8000/test/student/`
            );
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

        getData()


        let getStudents = async () => {

            const response = await fetch("http://localhost:8000/test/student/");
            if (response.status !== 200) {
              throw new Error("cannot fetch data");
            }
            let data = await response.json();
            return data;
          };

          getStudents()

            .then((data) => {
              console.log("resolved", data);
              console.log(data);
              console.log(data[0].firstname);
              console.log(data[0].studentnumber);
            })

            .catch((err) => {
              console.log("rejected", err.message);
            });

      }, [])


     return (
        
        <div>

            <h3>Hallo1 file hier start</h3>
            <Button variant="primary">Primary</Button>{' '}
            <Button variant="secondary">Secondary</Button>{' '}
            <Button variant="success">Success</Button>{' '}
            <Button variant="warning">Warning</Button>{' '}
            <Button variant="danger">Danger</Button>{' '}
            <Button variant="info">Info</Button>{' '}
            <Button variant="light">Light</Button>{' '}
            <Button variant="dark">Dark</Button>
            <Button variant="link">Link</Button>
            <h3>Hallo1 file hier ending</h3>


        </div>

     )

}

export default Hallo1;