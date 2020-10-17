import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <div className = "main-footer">
            <div className = "container">
                <div className = "row">
                    {/* Column 1 */}
                    <div className = "col">
                        <h4 style={{color: "red"}}>Hello Style!</h4>
                        <ul className = "list-unstyled">
                            <Link to="/counties">Counties</Link>
                        </ul>
                    </div>
                    {/* Colum 2 */}
                    <div className = "col">
                        <h4>PLACEHOLDER</h4>
                        <ul className = "list-unstyled">
                            <li>temp</li>
                            <li>temp</li>
                            <li>temp</li>
                        </ul>
                    </div>
                    {/* Colum 3 */}
                    <div className = "col">
                        <h4>PLACEHOLDER</h4>
                        <ul className = "list-unstyled">
                            <li>temp</li>
                            <li>temp</li>
                            <li>temp</li>
                        </ul>
                    </div>
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