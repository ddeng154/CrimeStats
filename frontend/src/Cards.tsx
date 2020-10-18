import React from 'react'
import CardItem from './CardItem'
import './Cards.css'

function Cards() {
    return (
        <div className = "cards">
            <div className = "cards-container">
                <div className = "cards-wrapper">
                    <ul className = "cards-items">
                        <CardItem 
                            src = "/images/splash-image"
                            path = "/counties"
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards