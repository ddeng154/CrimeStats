import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <div className = "main-footer">
            <div className = "container">
                <div className = "footer-link-items">
                    <h2>Explore</h2>
                    <Link to = "/counties">Counties</Link>
                    <Link to = "/policedepartments">Police Departments</Link>
                    <Link to = "/crimes">Crimes</Link>
                    <Link to = "/about">About</Link>
                </div>
                <div className = "footer-text">
                    <h4>About Us</h4>
                    <p>We want to teach society on the relation between police presence and crime</p>
                </div>
                <hr />
                <div className = "row">
                    <p className = "col-sm">
                        &copy;{new Date().getFullYear()} Crimestats | All rights reserved | Terms Of Service | Privacy
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer;