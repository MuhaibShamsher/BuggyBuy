import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/auth.slice.js';

import { Button, Nav } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {
    FaCartShopping,
    FaGauge,
    FaPowerOff,
    FaTable,
    FaUsers
} from 'react-icons/fa6';


export default function Sidebar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/users/logout`, {
                method: 'GET',
                credentials: 'include'
            })

            if (!res.ok) {
                throw new Error("Logout failed!")
            }

            dispatch(logout());
            navigate('/admin');
            toast.success('Logout successful');
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <>
            <Nav.Link
                as={Link}
                to='/admin/dashboard'
                className='mx-3 text-decoration-none text-white'
            >
                <strong>
                    <FaGauge
                        style={{ marginRight: '10px', marginBottom: '3px' }}
                        size={14}
                    />
                    Dashboard
                </strong>
            </Nav.Link>

            <Nav.Link
                as={Link}
                to='/admin/product-list'
                className='mx-3 text-decoration-none text-white'
            >
                <strong>
                    <FaTable
                        style={{ marginRight: '10px', marginBottom: '3px' }}
                        size={14}
                    />
                    Products
                </strong>
            </Nav.Link>

            <Nav.Link
                as={Link}
                to='/admin/order-list'
                className='mx-3 text-decoration-none text-white'
            >
                <strong>
                    <FaCartShopping
                        style={{ marginRight: '10px', marginBottom: '3px' }}
                        size={14}
                    />
                    Orders
                </strong>
            </Nav.Link>

            <Nav.Link
                as={Link}
                to='/admin/user-list'
                className='mx-3 text-white text-decoration-none'
            >
                <strong>
                    <FaUsers
                        style={{ marginRight: '10px', marginBottom: '3px' }}
                        size={14}
                    />
                    Users
                </strong>
            </Nav.Link>

            <Button 
                onClick={logoutHandler}
                className="ms-4"
            >
                <strong>
                    <FaPowerOff
                        style={{ marginRight: '10px', marginBottom: '3px' }}
                        size={14}
                    />
                    Logout
                </strong>
            </Button>
        </>
    )
}