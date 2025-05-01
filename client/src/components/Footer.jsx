import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'


export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <Container>
      <Row>
        <Col className='text-center py-3'>MERN Shop &copy; {currentYear}</Col>
      </Row>
    </Container>
  )
}