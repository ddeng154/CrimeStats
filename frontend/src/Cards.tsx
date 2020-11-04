import React from 'react';
import { Col, Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import img1 from './images/county-image.jpg';
import img2 from './images/police-image.jpg';
import img3 from './images/crime-image.jpg';

function Cards (){
    return (
        <div className = "cards">
            <Container fluid className = "cards-container">
                <div className="d-flex justify-content-between">
                    <Col>
                    <Link to = "/counties">
                        <Card>
                            <Card.Img variant="top" src={img1} />
                            <Card.Body>
                                <Card.Title>Counties</Card.Title>
                                    <Card.Text>
                                     Look up statistics on crime data for each county in the U.S.
                                    </Card.Text>
                            </Card.Body>
                        </Card>
                        </Link>
                    </Col>
                    <Col>
                    <Link to = "/policedepartments">
                        <Card>
                            <Card.Img variant="top" src={img2} />
                            <Card.Body>
                                <Card.Title>Police Departments</Card.Title>
                                    <Card.Text>
                                    Look up statistics for police departments in the U.S.
                                    </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                    </Col>
                    <Col>
                    <Link to = "/crimes">
                        <Card>
                            <Card.Img variant="top" src={img3} />
                            <Card.Body>
                                <Card.Title>Crimes</Card.Title>
                                    <Card.Text>
                                    Look up details for each individual crime that occurred.
                                    </Card.Text>
                            </Card.Body>
                        </Card>
                        </Link>
                    </Col>
                </div>
            </Container>
        </div>
    )
}

export default Cards;
