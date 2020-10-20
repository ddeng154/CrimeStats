import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/esm/Card';
import { Link } from 'react-router-dom';
import img1 from './images/county-image.jpg'
import img2 from './images/police-image.jpg'
import img3 from './images/crime-image.jpg'

function Cards (){
    return (
        <div className = "cards">
            <Container fluid className = "cards-container">
                <Row className = "justify-content-md-center">
                    <Col>
                        <Card>
                            <Card.Img variant="top" src={img1} />
                            <Card.Body>
                                <Card.Title>Counties</Card.Title>
                                    <Card.Text>
                                     Will be updated to look better with animation in the future.
                                    </Card.Text>
                                <Button variant="info">
                                    <Link to = "/crimes">Counties</Link>
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Img variant="top" src={img2} />
                            <Card.Body>
                                <Card.Title>Police Deparments</Card.Title>
                                    <Card.Text>
                                    Will be updated to look better with animation in the future.
                                    </Card.Text>
                                <Button variant="info">
                                    <Link to = "/crimes">Police Deparments</Link>
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Img variant="top" src={img3} />
                            <Card.Body>
                                <Card.Title>Crimes</Card.Title>
                                    <Card.Text>
                                    Will be updated to look better with animation in the future.
                                    </Card.Text>
                                <Button variant="info">
                                    <Link to = "/crimes">Crimes</Link>
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Cards