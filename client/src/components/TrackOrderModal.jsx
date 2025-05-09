import { useState } from 'react'
import { Modal, Button, Form, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

export default function TrackOrderModal({ show, handleClose }) {
  const [orderId, setOrderId] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/${orderId}`)
      if (!response.ok) {
        throw new Error('Order not found')
      }

      const data = await response.json()

      if (data) {
        handleClose()
        navigate(`/order-details/${orderId}`)
      }
    } catch (err) {
      setError('Order not found or invalid Order ID')
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered contentClassName="bg-dark text-white rounded-4">
      <Modal.Header closeButton closeVariant='white' className="border-0 pb-0">
        <Modal.Title className="text-warning fw-bold fs-4 d-flex align-items-center gap-2">
          <FaSearch /> Track Your Order
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-3">
        {error && (
          <Alert variant="danger" className="text-center fw-semibold rounded-3">
            {error}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="orderId" className="mb-4">
            <Form.Label className="fw-semibold">Enter Order ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. 654f938afcba6a..."
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
              className="p-3 rounded-3 bg-dark text-white border border-secondary"
            />
          </Form.Group>
          <Button
            variant="warning"
            type="submit"
            className="w-100 fw-bold text-dark"
            disabled={loading}
            style={{ backgroundColor: '#ffc107' }}
          >
            {loading ? 'Searching...' : 'View Order Details'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}