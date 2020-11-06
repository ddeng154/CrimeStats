import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

//Component for the footer element of the website
function Footer() {
    return (
        <div className = "main-footer">
            <div className = "container">
                <div className = "footer-link-wrapper">
                    {/* Links to each of the models pages */}
                    <div className = "footer-link-items">
                        <h2>Explore</h2>
                        <Link to = "/">Home</Link>
                        <Link to = "/counties">Counties</Link>
                        <Link to = "/policedepartments">
                            Police Departments
                        </Link>
                        <Link to = "/crimes">Crimes</Link>
                        <Link to = "/about">About</Link>
                    </div>
                    <div className = "footer-text">
                        <h2>About Us</h2>
                        <p>We want to teach society on the relation between 
                            police presence and crime</p>
                    </div>
                </div>
            </div>
            <div id="line"><hr /></div>
            <div className = "footer-cp-wrapper">
                <p className = "col-sm">
                    &copy;{new Date().getFullYear()} Crimestats 
                    | All rights reserved | Terms Of Service | Privacy
                </p>
            </div>
        </div>
    )
}

export default Footer;