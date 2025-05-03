import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

import { FaTrash } from 'react-icons/fa6';
import { Container, Button, Table } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';


export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingUserId, setDeletingUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('http://localhost:5000/api/v1/users', {
        credentials: 'include',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to fetch users');
      }

      const data = await res.json();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteHandler = async (userId) => {
    try {
      setDeletingUserId(userId);
      const res = await fetch(`http://localhost:5000/api/v1/users/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Delete failed');

      toast.success(data.message);
      fetchUsers(); // refresh list
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeletingUserId(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="text-center my-4">
        <h1 className="fw-bold text-primary">Registered Users</h1>
        <p className="text-muted">Manage all non-admin users from here</p>
      </div>

      {(isLoading || deletingUserId) && <Loader />}

      {error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Container className='mt-4'>
          <Table striped bordered hover responsive size='sm' className='text-center'>
            <thead className='table-dark'>
              <tr>
                <th>Unique User ID</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button
                      className='btn-sm'
                      variant='outline-danger'
                      onClick={() => deleteHandler(user._id)}
                      disabled={deletingUserId === user._id}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      )}
    </>
  );
}