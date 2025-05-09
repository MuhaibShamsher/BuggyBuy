import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCartItems } from '../../store/slices/cart.slice.js';
import addCurrency from '../../utilis/currency.utilis.js';

import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Container
} from 'react-bootstrap';
import { toast } from 'react-toastify';


export default function PlaceOrder() {
  const { userInfo } = useSelector(state => state.auth)
  console.log(userInfo)

  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = useSelector(state => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const placeOrderHandler = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID: userInfo.userId,
          cartItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to place order');
      }

      dispatch(clearCartItems());
      navigate(`/order-details/${data._id}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container style={{ marginTop: '6rem' }}>
      <h2 className="mb-4 text-primary">Review & Confirm Your Order</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item className="mb-3">
              <h5 className="mb-2">Shipping Address</h5>
              <div>
                {shippingAddress.address}, {shippingAddress.city},{' '}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </div>
            </ListGroup.Item>

            <ListGroup.Item className="mb-3">
              <h5 className="mb-2">Payment Method</h5>
              <div>{paymentMethod}</div>
            </ListGroup.Item>

            <ListGroup.Item className="mb-3">
              <h5 className="mb-2">Order Items</h5>
              {cartItems.length === 0 ? (
                <div>Your cart is empty.</div>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map(item => (
                    <ListGroup.Item key={item._id}>
                      <Row className="align-items-center">
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col md={6}>
                          <Link
                            to={`/product/${item._id}`}
                            className="text-decoration-none text-dark fw-semibold"
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} × {addCurrency(item.price)} ={' '}
                          <strong>
                            {addCurrency(item.qty * item.price)}
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>{addCurrency(itemsPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>{addCurrency(shippingPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>{addCurrency(taxPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="fw-bold border-top">
                <Row>
                  <Col>Total</Col>
                  <Col>{addCurrency(totalPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  variant="warning"
                  className="w-100"
                  onClick={placeOrderHandler}
                  disabled={cartItems.length === 0}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}