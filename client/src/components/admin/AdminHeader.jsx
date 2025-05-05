import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { FaBug } from 'react-icons/fa';
import AdminSidebar from './AdminSidebar.jsx';

export default function AdminHeader() {
  return (
    <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect sticky='top' className='shadow'>
      <Container>
        <Link to='/admin/dashboard' className='navbar-brand d-flex align-items-center gap-2 text-warning fw-bold fs-4 mb-0'>
          <FaBug /> Admin Panel
        </Link>

        <Navbar.Toggle aria-controls='admin-navbar-nav' className='ms-auto border-0' />

        <Navbar.Collapse id='admin-navbar-nav'>
          <Nav className='ms-auto'>
            <AdminSidebar />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}