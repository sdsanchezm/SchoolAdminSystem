import React, { useState, useEffect }from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import Home from './components/Home';
import Navigation from './components/Navigation';
import InstitutionList from './components/institution/InstitutionList';
import ProgramList from './components/program/ProgramList';
import SubjectList from './components/subject/SubjectList';
import StudentList from './components/student/StudentList';
import TeacherList from './components/teacher/TeacherList';
import StudentProfile from './components/student/StudentProfile';
import SubjectProfile from './components/subject/SubjectProfile';
import ProgramProfile from './components/program/ProgramProfile';
import StudentRegister from './components/student/StudentRegister';
import Dashboard1 from './components/Dashboard1';
import Footer1 from './components/Footer1';
import NotFound1 from './components/NotFound';
import LoginContext from './context/LoginContext';
import axios from "axios";
import './App.css';


function App() {

  const [data1, setData1] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  function updateData1(data1){
    setData1(data1)
  };


  const getData = () => {
    const response = fetch(`http://127.0.0.1:8000/api/student/`)
      .then( (response) => response.json() )
      .then( (data) => {
      console.log(`data: ${data}`);
      updateData1(data);
    })
      .catch( (error) => {
      console.error(`This is an HTTP error: The status is ${response.status} - ${error}`);
    })

    console.log(`data1_1: ${data1}`);
    updateData1(data1);
    console.log(`data1_2: ${data1}`);

}

// Load the information at the start


// test ======================================================
const [students, setStudents] = useState([]);
const [records, setRecords] = useState([]);

const fetchStudents = async () => {
  const response = await axios
    .get("http://127.0.0.1:8000/api/student/")
    .catch((err) => console.log(err));

    let studentsList = [];
  if (response) {
    studentsList = response.data;
    console.log("Students_1: ", studentsList);
    setStudents(studentsList);
    console.log("Students_2: ", students);
  }
  // return studentsList;
  setRecords(studentsList);
};

useEffect( () => {
  // getData();
//   fetchStudents();
}, []);

const columns = [
  {
    name: "id",
    selector: row => row.id,
    sortable: false
  }
  ,
  {
  name: "student_firstname",
  selector: row => row.student_firstname,
  sortable: true
  },
  {
      name: "student_lastname",
      selector: row => row.student_lastname,
      sortable: true
  },
  {
      name: "student_number",
      selector: row => row.student_number,
      sortable: true
  }
]

const handleFilter = (e) => {
  // const newData = setRecords(e.target.value);
  const newData = students.filter( row => {
      return row.student_firstname.toLowerCase().includes(e.target.value.toLowerCase());
    })
    setRecords(newData);
  };



  return (
    <div>
      {/* <h1>School System</h1> */}
      {/* <StudentList></StudentList> */}
      {/* <DataTableB></DataTableB> */}
      {/* <SchoolList></SchoolList> */}
      {/* <div><input type="text" onChange={(e) => handleFilter(e)}></input></div> */}
        {/* <DataTable
            columns={columns}
            data={records}
            selectableRows
            fixedHeader
            pagination
            >
        </DataTable> */}
      {/* <pre>{JSON.stringify(students, null, 2)}</pre> */}
      {/* <DeleteConfirmationExample1main></DeleteConfirmationExample1main> */}
      {/* <AllExamples></AllExamples> */}
      {/* <FetchExample1></FetchExample1> */}

      <BrowserRouter>

        <LoginContext.Provider value={{ isAuth, setIsAuth }}>
          <Navigation></Navigation>

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/institutions' element={ isAuth? <InstitutionList /> : <NotFound1 />} />
            <Route path='/programs' element={isAuth? <ProgramList /> : <NotFound1 />} />
            <Route path='/programs/view/:programId' element={isAuth? <ProgramProfile /> : <NotFound1 />} />
            <Route path='/subjects' element={isAuth? <SubjectList /> : <NotFound1 />} />
            <Route path='/students' element={isAuth? <StudentList /> : <NotFound1 />} />
            <Route path='/students/view/:studentId' element={ isAuth? <StudentProfile /> : <NotFound1 />} />
            <Route path='/subject/view/:subjectId' element={ isAuth? <SubjectProfile /> : <NotFound1 />} />
            <Route path='/subject/register/' element={ isAuth? <StudentRegister /> : <NotFound1 />} />
            <Route path='/teacher' element={ isAuth? <TeacherList /> : <NotFound1 /> } />
            <Route path='/dashboard' element={ isAuth? <Dashboard1 /> : <NotFound1 /> } />
            <Route path='/login' element={ <Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='*' element={<NotFound1 />} />
          </Routes>

          <Footer1></Footer1>
        </LoginContext.Provider>
      </BrowserRouter>

    </div>
  );
}

export default App;
