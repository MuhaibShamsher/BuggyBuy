import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Product from '../../components/Product.jsx';
import Loader from '../../components/Loader.jsx';
import Message from '../../components/Message.jsx';
import Paginate from '../../components/Paginate.jsx';
// import ProductCarousel from '../../components/ProductCarousel';
// import ServerError from '../components/ServerError';
// import { useGetProductsQuery } from '../slices/productsApiSlice';
import { Row, Col } from 'react-bootstrap';


export default function HomePage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(0);
    const [skip, setSkip] = useState(0);
    const { search } = useSelector(state => state.search);

    const isLoading = true

  //   const { data, isLoading, error } = useGetProductsQuery({
  //     limit,
  //     skip,
  //     search
  //   });

    // useEffect(() => {
    //   if (data) {
    //     setLimit(4);
    //     setSkip((currentPage - 1) * limit);
    //     setTotal(data.total);
    //     setTotalPage(Math.ceil(total / limit));
    //   }
    // }, [currentPage, data, limit, total, search]);

    const pageHandler = pageNum => {
      if (pageNum >= 1 && pageNum <= totalPage && pageNum !== currentPage) {
        setCurrentPage(pageNum);
      }
    };

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
            {!search && <ProductCarousel />}
            <h1>Latest Products</h1>
            <Row>
              {data.products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            {totalPage > 1 && !search && (
              <Paginate
                currentPage={currentPage}
                totalPage={totalPage}
                pageHandler={pageHandler}
              />
            )}
          </>
        )
      }
    </>
  )
}