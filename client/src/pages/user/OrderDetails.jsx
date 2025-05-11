import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import addCurrency from '../../utilis/currency.utilis.js';

import { toast } from 'react-toastify';
import { Row, Col, ListGroup, Button, Image, Card, Container } from 'react-bootstrap';


export default function OrderDetails() {
  const { id: orderId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingPay, setLoadingPay] = useState(false);
  const [loadingDeliver, setLoadingDeliver] = useState(false);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/orders/${orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        throw new Error('Failed to fetch order details')
      }

      const data = await res.json();
      setOrder(data);
    } catch (err) {
      console.log("1: ", error)
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const paymentHandler = async () => {
    try {
      setLoadingPay(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/orders/${orderId}/pay`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 'PAYID123456',
          status: 'COMPLETED',
          updateTime: new Date().toISOString(),
          email: order?.user?.email,
        }),
      });

      if (!res.ok) {
        throw new Error('Payment failed')
      }

      await fetchOrder();
      toast.success('Order Paid');
    } catch (err) {
      console.log("2: ", error)
      toast.error(err.message);
    } finally {
      setLoadingPay(false);
    }
  };

  const deliveredHandler = async () => {
    try {

      setLoadingDeliver(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/orders/${orderId}/deliver`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        throw new Error('Failed to mark as delivered')
      }

      await fetchOrder();
      toast.success('Order Delivered');
    } catch (err) {
      console.log("3: ", error)
      toast.error(err.message);
    } finally {
      setLoadingDeliver(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);


  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container className="py-5 mt-5">
          <h2 className="mb-4 text-center text-primary">Order Summary</h2>
          <h5 className="mb-4 text-center">Order ID: <span className="text-muted">{orderId}</span></h5>

          <Row>
            {/* Left Column */}
            <Col md={8}>
              <ListGroup variant="flush">
                {/* Shipping Info */}
                <ListGroup.Item className="mb-4 shadow-sm rounded p-3">
                  <h4 className="mb-3">Shipping</h4>
                  <p><strong>Name:</strong> {order?.user?.name}</p>
                  <p><strong>Email:</strong> {order?.user?.email}</p>
                  <p><strong>Address:</strong> {`${order?.shippingAddress?.address}, ${order?.shippingAddress?.city}, ${order?.shippingAddress?.postalCode}, ${order?.shippingAddress?.country}`}</p>
                  {order?.isDelivered ? (
                    <Message variant="success">Delivered on {new Date(order?.deliveredAt).toLocaleString()}</Message>
                  ) : (
                    <Message variant="danger">Not Delivered</Message>
                  )}
                </ListGroup.Item>

                {/* Payment Info */}
                <ListGroup.Item className="mb-4 shadow-sm rounded p-3">
                  <h4 className="mb-3">Payment</h4>
                  <p><strong>Method:</strong> {order?.paymentMethod}</p>
                  {order?.isPaid ? (
                    <Message variant="success">Paid on {new Date(order?.paidAt).toLocaleString()}</Message>
                  ) : (
                    <Message variant="danger">Not Paid</Message>
                  )}
                </ListGroup.Item>

                {/* Order Items */}
                <ListGroup.Item className="shadow-sm rounded p-3">
                  <h4 className="mb-3">Items</h4>
                  <ListGroup variant="flush">
                    {order?.orderItems?.map(item => (
                      <ListGroup.Item key={item._id} className="d-flex align-items-center border-0 px-0 py-2">
                        <Image src={item.image} alt={item.name} fluid rounded style={{ width: '50px', marginRight: '10px' }} />
                        <div className="flex-grow-1">
                          <Link to={`/product/${item._id}`} className="text-decoration-none text-dark fw-medium">
                            {item.name}
                          </Link>
                        </div>
                        <div className="text-end">{item.qty} x {addCurrency(item.price)} = <strong>{addCurrency(item.qty * item.price)}</strong></div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            {/* Right Column: Summary */}
            <Col md={4}>
              <Card className="shadow-sm rounded">
                <Card.Body>
                  <Card.Title className="text-center mb-4">Summary</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item><Row><Col>Items:</Col><Col>{addCurrency(order?.itemsPrice)}</Col></Row></ListGroup.Item>
                    <ListGroup.Item><Row><Col>Shipping:</Col><Col>{addCurrency(order?.shippingPrice)}</Col></Row></ListGroup.Item>
                    <ListGroup.Item><Row><Col>Tax:</Col><Col>{addCurrency(order?.taxPrice)}</Col></Row></ListGroup.Item>
                    <ListGroup.Item><Row><Col>Total:</Col><Col className="fw-bold">{addCurrency(order?.totalPrice)}</Col></Row></ListGroup.Item>

                    {/* Pay Order Button */}
                    {!order?.isPaid && !userInfo.isAdmin && (
                      <ListGroup.Item>
                        <Button
                          className="w-100 mt-3"
                          variant="success"
                          onClick={paymentHandler}
                          disabled={loadingPay}
                        >
                          {loadingPay ? 'Processing Payment...' : 'Pay Now'}
                        </Button>
                      </ListGroup.Item>
                    )}

                    {/* Not Pay Order Instruction */}
                    {!order?.isPaid && userInfo.isAdmin && (
                      <ListGroup.Item>
                        <Button
                          className="w-100 mt-3"
                          variant="danger"
                        >
                          Payment Not Recieved
                        </Button>
                      </ListGroup.Item>
                    )}

                    {/* Mark as Delivered Button */}
                    {order?.isPaid && !order?.isDelivered && userInfo.isAdmin && (
                      <ListGroup.Item>
                        <Button
                          className="w-100 mt-3"
                          variant="warning"
                          onClick={deliveredHandler}
                          disabled={loadingDeliver}
                        >
                          {loadingDeliver ? 'Updating...' : 'Mark as Delivered'}
                        </Button>
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}