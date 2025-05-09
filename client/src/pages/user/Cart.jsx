import Message from '../../components/Message.jsx';
import addCurrency from '../../utilis/currency.utilis.js';
import { addToCart, removeFromCart } from '../../store/slices/cart.slice.js';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { FaTrash } from 'react-icons/fa';
import {
  Row,
  Col,
  Card,
  ListGroup,
  Form,
  Image,
  Button,
  Container
} from 'react-bootstrap';


export default function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } = useSelector(state => state.cart);


  const addToCartHandler = async (product, qty) => {
    console.log(qty)
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/shipping');
  };

  return (
    <Container style={{ marginTop: '6rem' }}>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 && (
        <Message>
          <div className="text-center p-3" style={{ fontSize: '1.2rem', color: '#555' }}>
            🛒 <strong>Your cart is empty!</strong>
            <br />
            <Link
              to='/'
              className="btn btn-warning mt-3"
              style={{ fontWeight: 'bold' }}
            >
              Go Back
            </Link>
          </div>
        </Message>
      )}
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item className='my-3' key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link
                      to={`/product/${item._id}`}
                      className='product-title text-dark'
                      style={{ textDecoration: 'none' }}
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>{addCurrency(item.price)}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={e =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {Array.from({ length: item.countInStock }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash style={{ color: 'red' }} />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          {cartItems.length > 0 && (
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Items:</Col>
                    <Col>{addCurrency(itemsPrice)}</Col>
                  </Row>
                  <Row>
                    <Col>Shipping:</Col>
                    <Col>{addCurrency(shippingPrice)}</Col>
                  </Row>
                  <Row>
                    <Col>Tax (5%):</Col>
                    <Col>{addCurrency(taxPrice)}</Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col><strong>Total:</strong></Col>
                    <Col><strong>{addCurrency(totalPrice)}</strong></Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button
                    className='w-100'
                    variant='warning'
                    type='button'
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  )
}