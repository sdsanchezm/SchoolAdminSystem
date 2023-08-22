import React, { useContext } from 'react';
import LoginContext from "../context/LoginContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import GeneralMisc from './misc/GeneralMisc';

function Footer1() {

    const { isAuth, setIsAuth } = useContext(LoginContext);

    return (
        <div className=''>
            {isAuth? <>
        <footer className="footer1">
            <div className="footermargin1 pt-4 mt-4"></div>
            <div className="container-fluid pt-4 mt-4 text-center text-md-left">
                <div className="row container">


                    <hr className="clearfix w-100 d-md-none pb-0" />

                    <div className="col-md-6 mb-md-0 mb-3">
                        <h5 className="fs-6 fw-bold">Links</h5>
                        <ul className="list-unstyled">
                            <li className="text-dark"><i className="bi bi-calendar2-fill"></i><a className="text-dark fs-6" href="/about"> About</a></li>
                            <li className="text-dark"><i className="bi bi-clipboard-data-fill"></i><a className="text-dark fs-6" href="/legal"> Legal</a></li>
                        </ul>
                    </div>

                    <div className="col-md-6 mt-md-0 mt-3">
                        <h5 className="fs-6 fw-bold text-dark text-start">Details</h5>
                        {/* <p className="fs-6 text-start">School Administration Tool. of Lorem Ipsum.</p> */}
                        <GeneralMisc></GeneralMisc>
                    </div>

                </div>
            </div>

            <div className="footer2 fw-bold text-center align-middle py-2"><p>2023</p>
            </div>

        </footer>
        </>: <></> }

        </div>
    )
}

export default Footer1;
