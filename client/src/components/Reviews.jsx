import React from 'react';
import Rating from './Rating';
import Message from './Message';
import { Link } from 'react-router-dom';
import { Button, Form, ListGroup } from 'react-bootstrap';


export default function Reviews({
    reviews,
    userInfo,
    comment,
    setComment,
    rating,
    setRating,
    loading,
    submitHandler
}) {

    return (
        <>
            <h5>Reviews</h5>
            <ListGroup variant='flush'>
                {reviews?.map(review => (
                    <ListGroup.Item
                        key={review._id}
                        className="shadow-sm rounded-3 mb-3 p-3 bg-light border-0"
                    >
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <strong className="text-primary">{review.name}</strong>
                            <Rating value={review.rating} />
                        </div>
                        <p className="mb-0 text-secondary" style={{ fontSize: '0.95rem' }}>
                            {review.comment}
                        </p>
                    </ListGroup.Item>
                ))}

                <ListGroup.Item>
                    {userInfo ? (
                        <Form onSubmit={submitHandler}>
                            <Form.Group className='my-2' controlId='rating'>
                                <Form.Label>Rating</Form.Label>
                                <Form.Control
                                    as='select'
                                    required
                                    value={rating}
                                    onChange={e => setRating(e.target.value)}
                                >
                                    <option value=''>Select...</option>
                                    <option value='1'>1 - Poor</option>
                                    <option value='2'>2 - Fair</option>
                                    <option value='3'>3 - Good</option>
                                    <option value='4'>4 - Very Good</option>
                                    <option value='5'>5 - Excellent</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className='my-2' controlId='comment'>
                                <Form.Label>Comment</Form.Label>
                                <Form.Control
                                    as='textarea'
                                    rows={3}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder='Write your review here...'
                                    required
                                />
                            </Form.Group>

                            <Button
                                className='w-100'
                                disabled={loading}
                                type='submit'
                                variant='warning'
                            >
                                Submit
                            </Button>
                        </Form>
                    ) : (
                        <Message>
                            Please <Link to='/login'>sign in</Link> to give a review
                        </Message>
                    )}
                </ListGroup.Item>
            </ListGroup>
        </>
    );
}