import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
// import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LoginContext from '../context/LoginContext';

function Navigation() {

  //  const [isAuth, setIsAuth] = useState(false);
  const { isAuth, setIsAuth } = useContext(LoginContext);

    // if token is not null, then authentication is true
   useEffect(() => {
     if (localStorage.getItem('access_token') !== null) {
        setIsAuth(true);
      }
    }, [isAuth]);

     return (
       <Navbar className='' expand="lg" bg="light" data-bs-theme="dark">
         <Container fluid className="container">
           <Navbar.Brand className='text-primary' href="#">SchoolAdminSystem</Navbar.Brand>
           <Navbar.Toggle aria-controls="navbarScroll" />
           <Navbar.Collapse id="navbarScroll">
             <Nav
               className="me-auto my-2 my-lg-0"
               style={{ maxHeight: '200px' }}
              //  navbarScroll
             >
               {isAuth?
               <>
                    <Nav className="me-auto">
                        {isAuth ? <Nav.Link href="/">Home</Nav.Link> : null}
                    </Nav>

                    {/* <Nav className="me-auto">
                        {isAuth ? <Nav.Link href="/dashboard">Dashboard</Nav.Link> : null}
                    </Nav> */}

                    <NavDropdown title="Institutions" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="/institutions">List of Institutions</NavDropdown.Item>
                        <NavDropdown.Divider />
                        {/* <NavDropdown.Item href="/institutions">Institutions Other</NavDropdown.Item> */}
                    </NavDropdown>

                    <NavDropdown title="Programs" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="/programs">List of Programs</NavDropdown.Item>
                        <NavDropdown.Divider />
                        {/* <NavDropdown.Item href="/programs">Program Other</NavDropdown.Item> */}
                    </NavDropdown>

                    <NavDropdown title="Subjects" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="/subjects">List of Subjects</NavDropdown.Item>
                        <NavDropdown.Divider />
                        {/* <NavDropdown.Item href="/subjects">Subjects Other</NavDropdown.Item> */}
                    </NavDropdown>

                    <NavDropdown title="Students" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="/students">List of Students</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/subject/register/">Student Register</NavDropdown.Item>
                        {/* <NavDropdown.Item href="/students">Student Other</NavDropdown.Item> */}
                    </NavDropdown>

                    <NavDropdown title="Teacher" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="/teacher">List of Teachers</NavDropdown.Item>
                        {/* <NavDropdown.Item href="/teacher">Look for a TeacherStudent</NavDropdown.Item> */}
                        <NavDropdown.Divider />
                        {/* <NavDropdown.Item href="/teacher">Teacher Other</NavDropdown.Item> */}
                    </NavDropdown>
                    </>
                : <></>}

               {/* <Nav.Link href="#" disabled>Link</Nav.Link> */}

               <Nav>
                 {isAuth ? <Nav.Link className='text-danger' href="/logout">Logout</Nav.Link> : <Nav.Link href="/login">Login</Nav.Link>}
               </Nav>

               <Nav>
                {/* {isAuth ? "true" : "false"} */}
               </Nav>

             </Nav>
           </Navbar.Collapse>
         </Container>
       </Navbar>
     );
}

export default Navigation;
