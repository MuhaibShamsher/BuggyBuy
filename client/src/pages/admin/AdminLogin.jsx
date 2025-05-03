import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../../store/slices/auth.slice.js';
import FormContainer from '../../components/FormContainer.jsx';
import Footer from '../../components/Footer.jsx';
import Loader from '../../components/Loader.jsx';

import { Form, Button, InputGroup, Card } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';


export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      navigate('/admin/dashboard');
    } else {
      navigate('/admin')
    }
  }, [userInfo])

  const submitHandler = async e => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/v1/users/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.isAdmin === true) {
        dispatch(setCredentials({ ...data }));
        navigate('/admin/dashboard');
        toast.success('Login successful');
      } else {
        toast.error('Wrong Credentials!');
      }
    }
    catch (error) {
      toast.error(error?.data?.message || error.error);
    }
    finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <main className='d-flex position-relative flex-column justify-content-center align-items-center '>
        <FormContainer>
          <Card className='p-3 p-md-5 '>
            <h1 className='mb-5 text-center'>Sign In</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  value={email}
                  placeholder='Enter email'
                  onChange={e => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='password'>
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    placeholder='Enter password'
                    onChange={e => setPassword(e.target.value)}
                  />
                  <InputGroup.Text
                    onClick={togglePasswordVisibility}
                    id='togglePasswordVisibility'
                    style={{ cursor: 'pointer' }}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              <Button
                className='my-3 w-100'
                variant='warning'
                type='submit'
                disabled={isLoading}
              >
                {
                  isLoading ? (
                    <>
                      <Loader />
                      <span className='pl-3'>Loading...</span>
                    </>
                  ) : (
                    'Sign In'
                  )
                }
              </Button>
            </Form>
          </Card>
        </FormContainer>
      </main>
      <Footer />
    </>
  )
}