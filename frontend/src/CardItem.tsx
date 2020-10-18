import React from 'react'
import { Link } from 'react-router-dom'

function CardItem(props: any) {
    return (
        <li className = "cards-item">
            <Link className = "cards-item-link" to = {props.path}>
                <figure className = "cards-item-pic-wrap">
                    <img 
                        src = {props.src} 
                        alt = "An Image"
                        className = "cards-item-img"
                    />
                </figure>
            </Link>
        </li>
    )
}

export default CardItem