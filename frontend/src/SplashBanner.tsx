import React from 'react'
import Button from 'react-bootstrap/Button'
import './SplashBanner.css';
import Search from './Search'

function SplashBanner() {
    return (
        <div className = "banner-container">
            <h1>Crime Stats</h1>
            <p>See how police presence relates to crime</p>
            <Search/>
        </div>
    )
}

export default SplashBanner;