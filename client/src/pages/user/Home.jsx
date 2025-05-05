import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Product from '../../components/Product.jsx';
import Loader from '../../components/Loader.jsx';
import Message from '../../components/Message.jsx';
import Paginate from '../../components/Paginate.jsx';
import OrderLookupForm from '../../components/TrackOrderModal.jsx';
import { Container, Row, Col } from 'react-bootstrap';


export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { search } = useSelector(state => state.search)

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 12;

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const skip = (currentPage - 1) * limit;

      const res = await fetch(
        `http://localhost:5000/api/v1/products?limit=${limit}&skip=${skip}&search=${search}`
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
  }, [currentPage, search])

  const pageHandler = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPage && pageNum !== currentPage) {
      setCurrentPage(pageNum);
    }
  }

  return (
    <>
      {
        isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            <Container style={{ marginTop: '6rem' }}>
              <div>
                <OrderLookupForm />
              </div>
              <h1>Latest Products</h1>
              <Row>
                {products.map(product => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>

              {totalPage > 1 && (
                <Paginate
                  currentPage={currentPage}
                  totalPage={totalPage}
                  pageHandler={pageHandler}
                />
              )}
            </Container>
          </>
        )
      }
    </>
  )
}