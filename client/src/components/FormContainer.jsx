import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'


export default function FormContainer({ children }) {

    return (
        <Container
            fluid
            className='d-flex justify-content-center align-items-center min-vh-100'
        >
            <Row className='w-100 justify-content-center'>
                <Col xs={12} md={8} lg={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}