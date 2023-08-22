import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';

function ValuesGrade({ handleonchange, listname, default1, inputRef }) {


    return (
        <Form.Select onChange={handleonchange} defaultValue={default1} size='sm' name={listname} aria-label="select grade" ref={inputRef} required >
        {/* <Form.Select onChange={handleOnchange} value={default1} defaultValue="0" size='sm' name={listname} aria-label="select grade" required> */}
            <option value="0">0</option>
            <option value="4.9">4.9</option>
            <option value="5">5</option>
            <option value="4.8">4.8</option>
            <option value="4.7">4.7</option>
            <option value="4.6">4.6</option>
            <option value="4.5">4.5</option>
            <option value="4.4">4.4</option>
            <option value="4.3">4.3</option>
            <option value="4.2">4.2</option>
            <option value="4.1">4.1</option>
            <option value="4">4</option>
            <option value="3.9">3.9</option>
            <option value="3.8">3.8</option>
            <option value="3.7">3.7</option>
            <option value="3.6">3.6</option>
            <option value="3.5">3.5</option>
            <option value="3.4">3.4</option>
            <option value="3.3">3.3</option>
            <option value="3.2">3.2</option>
            <option value="3.1">3.1</option>
            <option value="3">3</option>
            <option value="2.9">2.9</option>
            <option value="2.8">2.8</option>
            <option value="2.7">2.7</option>
            <option value="2.6">2.6</option>
            <option value="2.5">2.5</option>
            <option value="2.4">2.4</option>
            <option value="2.3">2.3</option>
            <option value="2.2">2.2</option>
            <option value="2.1">2.1</option>
            <option value="2">2</option>
            <option value="1.9">1.9</option>
            <option value="1.8">1.8</option>
            <option value="1.7">1.7</option>
            <option value="1.6">1.6</option>
            <option value="1.5">1.5</option>
            <option value="1.4">1.4</option>
            <option value="1.3">1.3</option>
            <option value="1.2">1.2</option>
            <option value="1.1">1.1</option>
            <option value="1">1</option>
            <option value="0.9">0.9</option>
            <option value="0.8">0.8</option>
            <option value="0.7">0.7</option>
            <option value="0.6">0.6</option>
            <option value="0.5">0.5</option>
            <option value="0.4">0.4</option>
            <option value="0.3">0.3</option>
            <option value="0.2">0.2</option>
            <option value="0.1">0.1</option>
        </Form.Select>
    )
}


export default ValuesGrade;
