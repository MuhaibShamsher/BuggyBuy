import React from 'react'
import { Spinner, Modal } from 'react-bootstrap'


export default function Loader() {
  
  return (
    <Modal.Dialog className=' position-absolute top-50 start-50 translate-middle '>
      <Modal.Body>
        <Spinner animation='border' role='status' variant='info' />
      </Modal.Body>
    </Modal.Dialog>
  )
}