import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import addCurrency from '../../utilis/currency.utilis.js';

import { FaCheck, FaXmark } from 'react-icons/fa6';
import { Button, Table, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


export default function Profile() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { userInfo } = useSelector(state => state.auth)

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError('');
            const res = await fetch(`http://localhost:5000/api/v1/orders/my-orders/${userInfo.userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) {
                throw new Error('Failed to fetch orders');
            }

            const data = await res.json();
            setOrders(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, [])

    return (
        <Container className='mt-5 pt-5'>
          <div className='mb-4 text-center'>
            <h2 className='fw-bold text-primary'>My Orders</h2>
            <p className='text-muted'>Here's a list of all your placed orders with their current status.</p>
          </div>
    
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <div className='rounded shadow-sm overflow-hidden'>
              <Table responsive bordered hover size='sm' className='align-middle text-center bg-white'>
                <thead className='table-dark'>
                  <tr className='text-uppercase'>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id}>
                      <td className='text-break'>{order._id}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>{addCurrency(order.totalPrice)}</td>
                      <td>
                        {order.isPaid ? (
                          <FaCheck className='text-success fs-5' />
                        ) : (
                          <FaXmark className='text-danger fs-5' />
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          <FaCheck className='text-success fs-5' />
                        ) : (
                          <FaXmark className='text-danger fs-5' />
                        )}
                      </td>
                      <td>
                        <Link to={`/order-details/${order._id}`}>
                          <Button className='btn-sm px-3 shadow-sm' variant='info'>
                            View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Container>
    );
}