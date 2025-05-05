import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../../store/slices/cart.slice.js';
import addCurrency from '../../utilis/currency.utilis.js';
import Rating from '../../components/Rating';
import Reviews from '../../components/Reviews';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

import { toast } from 'react-toastify';
import {
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  Card,
  Form,
  Container
} from 'react-bootstrap';


export default function ProductPage() {
  const dispatch = useDispatch();
  const { id: productId } = useParams();

  const { userInfo } = useSelector(state => state.auth);

  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState(null);

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/v1/products/${productId}`);

      if (!res.ok) throw new Error('Failed to fetch product');

      const data = await res.json();
      
      setProduct(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/v1/reviews/${productId}`, {
        method: "GET"
      });

      if (!res.ok) throw new Error('Failed to fetch reviews');
      const data = await res.json();


      setReviews(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
    
    fetchReviews();
  }, [productId]);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Added to Cart!");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setReviewLoading(true);
      const res = await fetch(`http://localhost:5000/api/v1/products/reviews/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment, rating, name: userInfo.name, userId: userInfo.userId })
      });

      const data = await res.json();
     
      if (!res.ok) {
        throw new Error(data.message || 'Review submission failed');
      }

      toast.success(data.message);
      setRating(0);

      await fetchReviews();

      // Refresh product
      const updatedRes = await fetch(`http://localhost:5000/api/v1/products/${productId}`);
      const updatedData = await updatedRes.json();
      setProduct(updatedData);

    } catch (err) {
      toast.error(err.message || 'Failed to submit review');
    } finally {
      setReviewLoading(false);
      setComment("")
    }
  };
  

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Container className='py-4' style={{ marginTop: '5rem' }}>
          <Row>
            {/* LEFT COLUMN */}
            <Col md={7}>
              <Image
                src={product.image}
                alt={product.name}
                fluid
                className='rounded shadow-sm mb-3'
              />

              <Card className='p-3 shadow-sm border-0 mb-4'>
                <h2 className='mb-3'>{product.name}</h2>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
                <h4 className='my-3 text-primary'>
                  {addCurrency(product.price)}
                </h4>
                <p>
                  <strong>About this item:</strong><br />{product.description}
                </p>
              </Card>

              <Card className='p-3 shadow-sm border-0'>
                <h2 className='mb-3'>Submit Your Review</h2>
                <Reviews
                  reviews={reviews}
                  userInfo={userInfo}
                  rating={rating}
                  setRating={setRating}
                  comment={comment}
                  setComment={setComment}
                  laoding={reviewLoading}
                  submitHandler={submitHandler}
                />
              </Card>
            </Col>

            {/* RIGHT COLUMN */}
            <Col md={5}>
              <Card className='shadow border-0'>
                <ListGroup variant='flush'>
                  <ListGroup.Item className='d-flex justify-content-between'>
                    <span>Price:</span>
                    <strong>{addCurrency(product.price)}</strong>
                  </ListGroup.Item>

                  <ListGroup.Item className='d-flex justify-content-between'>
                    <span>Status:</span>
                    <strong>
                      {product.countInStock > 0
                        ? 'In Stock'
                        : 'Out Of Stock'}
                    </strong>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Form.Group controlId='quantity'>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={e => setQty(Number(e.target.value))}
                        >
                          {Array.from(
                            { length: product.countInStock },
                            (_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Form.Group>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item className='d-grid'>
                    <Button
                      variant='warning'
                      size='lg'
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}