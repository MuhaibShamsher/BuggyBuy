import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import addCurrency from '../../utilis/currency.utilis.js';

import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { FaCheck, FaXmark } from 'react-icons/fa6';


export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userInfo } = useSelector(state => state.auth);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('http://localhost:5000/api/v1/orders', {
        method: "GET"
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
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Container>
      <div className="text-center my-4">
        <h1 className="fw-bold text-primary">Orders Overview</h1>
        <p className="text-muted">Track and monitor all user orders efficiently from here</p>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive size="sm" className="shadow">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id.slice(0, 8)}...</td>
                <td>{order.user?.name || 'Unknown'}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>{addCurrency(order.totalPrice)}</td>
                <td>
                  {order.isPaid ? (
                    <FaCheck className="text-success" />
                  ) : (
                    <FaXmark className="text-danger" />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <FaCheck className="text-success" />
                  ) : (
                    <FaXmark className="text-danger" />
                  )}
                </td>
                <td>
                  <Link
                    to={
                      userInfo.isAdmin
                        ? `/admin/order/${order._id}`
                        : `/order/${order._id}`
                    }
                  >
                    <Button size="sm" variant="info">
                      Details
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}