import React from 'react'
import Button from 'react-bootstrap/Button'
import './SplashBanner.css';

function SplashBanner() {
    return (
        <div className = "banner-container">
            <h1>Crime Stats</h1>
            <p>See how police presence relates to crime</p>
            <Button variant = "primary" size = "lg">
                Will be a search function next week
            </Button>
        </div>
    )
}

export default SplashBanner;