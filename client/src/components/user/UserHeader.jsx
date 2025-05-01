import React from 'react';
import SearchBox from './SearchBox';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/auth.slice.js';
// import { useLogoutMutation } from '../slices/usersApiSlice';

import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';


export default function Header() {
   const { userInfo } = useSelector(state => state.auth);
   const { cartItems } = useSelector(state => state.cart);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const logoutHandler = async () => {
      try {
         const res = await fetch('http://localhost:5000/api/v1/users/logout', {
            method: 'GET',
            credentials: 'include'
         })

         if (!res.ok) {
            throw new Error("Logout failed!")
         }

         dispatch(logout());
         navigate('/login');
         toast.success('Logout successful');
      } catch (error) {
         toast.error(error.message);
      }
   };

   return (
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect className='fixed-top z-2 '>
         <Container>
            <Link to='/' className="text-decoration-none">
               <Navbar.Brand>MERN Shop</Navbar.Brand>
            </Link>

            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
               <Nav className='ms-auto m-2'>
                  <SearchBox />
                  <Nav.Link>
                     <Link to='/cart' className="text-decoration-none text-white">
                        <FaShoppingCart style={{ marginRight: '5px' }} />
                        Cart
                        {cartItems.length > 0 && (
                           <Badge pill bg='warning' style={{ marginLeft: '5px' }} className='text-dark'>
                              <strong>
                                 {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                              </strong>
                           </Badge>
                        )}
                     </Link>
                  </Nav.Link>

                  {userInfo ? (
                     <NavDropdown title={`Hello👋, ${userInfo.name}`} id='username'>
                        <Link to='/profile' className="text-decoration-none text-white">
                           <NavDropdown.Item>Profile</NavDropdown.Item>
                        </Link>
                        <NavDropdown.Item onClick={logoutHandler}>
                           Logout
                        </NavDropdown.Item>
                     </NavDropdown>
                  ) : (
                     <Nav.Link>
                        <Link to='/login' className="text-decoration-none text-white">
                           <FaUser style={{ marginRight: '5px' }} />
                           Sign In
                        </Link>
                     </Nav.Link>
                  )}
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
}