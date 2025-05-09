import React, { useState } from 'react';
import SearchBox from './SearchBox';
import TrackOrderModal from '../TrackOrderModal.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/auth.slice.js';
import { clearCartItems } from '../../store/slices/cart.slice.js';

import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaBug } from 'react-icons/fa';
import { toast } from 'react-toastify';


export default function Header() {
  const { userInfo } = useSelector(state => state.auth);
  const { cartItems } = useSelector(state => state.cart);

  const [showTrackModal, setShowTrackModal] = useState(false)
  const openModal = () => setShowTrackModal(true)
  const closeModal = () => setShowTrackModal(false)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/logout`, {
        method: 'GET',
        credentials: 'include'
      });

      if (!res.ok) {
        throw new Error("Logout failed!");
      }

      dispatch(logout());
      dispatch(clearCartItems());
      navigate('/login');
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  return (
    <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect className='fixed-top z-3 shadow'>
      <Container>
        <Link to='/' className="text-decoration-none">
          <Navbar.Brand className="d-flex align-items-center gap-2 text-warning fw-bold fs-4">
            <FaBug /> BuggyBuy
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto align-items-center gap-3'>
            <SearchBox />

            <Nav.Link
              as={Link}
              to='/cart'
              className="text-decoration-none text-white d-flex align-items-center"
            >
              <FaShoppingCart className="me-1" />
              Cart
              {cartItems.length > 0 && (
                <Badge pill bg='warning' className='text-dark ms-2'>
                  <strong>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</strong>
                </Badge>
              )}
            </Nav.Link>

            {userInfo ? (
              <NavDropdown
                title={<span className="text-warning">👋 Hello, {userInfo.name}</span>}
                id='username'
                className='text-white'
              >
                <NavDropdown.Item>
                  <Link to='/profile' className="text-decoration-none">
                    Profile
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item onClick={openModal}>
                  Track Order
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link
                as={Link}
                to='/login'
                className="text-decoration-none text-white d-flex align-items-center"
              >
                <FaUser className="me-1" />
                Sign In
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>

        <TrackOrderModal show={showTrackModal} handleClose={closeModal} />
      </Container>
    </Navbar>
  );
}