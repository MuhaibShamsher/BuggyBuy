import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaRupeeSign, FaTrash, FaEdit } from 'react-icons/fa';

import Loader from '../../components/Loader.jsx';
import Paginate from '../../components/Paginate.jsx';
import Message from '../../components/Message.jsx';
import addCurrency from '../../utilis/currency.utilis.js';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const skip = (currentPage - 1) * limit;

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/products?limit=${limit}&skip=${skip}`
      );
      const fetchData = await res.json();
      const data = fetchData.data

      if (!res.ok) throw new Error(data.message || 'Failed to fetch products');

      setProducts(data.products);
      setTotal(data.total);
      setTotalPage(Math.ceil(data.total / limit));

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const deleteHandler = async (productId) => {
    try {
      setIsDeleteLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products/${productId}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) throw new Error('Failed to delete product');

      const data = await res.json();
      
      toast.success(data.message);
      fetchProducts();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const pageHandler = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPage && pageNum !== currentPage) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <>
      <Container className="d-flex justify-content-between align-items-center mt-4">
        <h1 className="fw-bold text-primary">Products</h1>
        <Link to="/admin/product/create">
          <Button className="my-3" variant="warning">
            Add Product
          </Button>
        </Link>
      </Container>

      {isDeleteLoading && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container className='mt-4'>
          <Table striped hover bordered responsive size="sm">
            <thead className='table-dark'>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{addCurrency(product.price)}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Link to={`/admin/product/update/${product._id}`}>
                      <Button className="btn-sm" variant="light">
                        <FaEdit />
                      </Button>
                    </Link>{' '}
                    <Button
                      className="btn-sm"
                      variant="light"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: 'red' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      )}

      {totalPage > 1 && (
        <Paginate
          currentPage={currentPage}
          totalPage={totalPage}
          pageHandler={pageHandler}
        />
      )}
    </>
  )
}