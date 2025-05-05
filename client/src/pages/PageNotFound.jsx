import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';


export default function PageNotFound() {
  return (
    <>
      <Container fluid className='d-flex align-items-center justify-content-center min-vh-100 bg-light'>
        <Row className='text-center'>
          <Col>
            <h1 className='display-1 fw-bold text-primary mb-3 animate__animated animate__fadeInDown'>
              404
            </h1>
            <h2 className='mb-3 text-danger fw-semibold animate__animated animate__fadeInUp'>
              Oops! Page not found.
            </h2>
            <p className='lead text-muted mb-4 animate__animated animate__fadeIn'>
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Button href='/' variant='warning' size='lg' className='px-5 py-2 shadow'>
              Go Home
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}