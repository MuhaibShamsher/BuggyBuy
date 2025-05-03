import React from 'react';
import AdminSidebar from './AdminSidebar.jsx';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';


export default function AdminHeader() {

  return (
    <Navbar
      bg='dark'
      variant='dark'
      expand='md'
      collapseOnSelect
    >
      <Container fluid>
        <Link to='/admin/dashboard' className='m-3 text-decoration-none text-white'>
          <Navbar.Brand className='fw-bold'>Admin Panel</Navbar.Brand>
        </Link>

        <div className="text-end">
          <Navbar.Toggle aria-controls='basic-navbar-nav' />

          <Navbar.Collapse id='basic-navbar-nav' >
            <AdminSidebar />
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  )
}