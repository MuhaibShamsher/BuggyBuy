import React from 'react';
import { Container, Pagination } from 'react-bootstrap';

export default function Paginate({ currentPage, totalPage, pageHandler }) {
  return (
    <Container className='d-flex justify-content-center mt-5'>
      <Pagination className="shadow-sm rounded-pill pagination-custom">
        <Pagination.First
          onClick={() => pageHandler(1)}
          disabled={currentPage <= 1}
        />

        <Pagination.Prev
          onClick={() => pageHandler(currentPage - 1)}
          disabled={currentPage <= 1}
        />

        {[...Array(totalPage)].map((_, i) => (
          <Pagination.Item
            key={i}
            active={i + 1 === currentPage}
            onClick={() => pageHandler(i + 1)}
            className="rounded"
          >
            {i + 1}
          </Pagination.Item>
        ))}

        <Pagination.Next
          onClick={() => pageHandler(currentPage + 1)}
          disabled={currentPage >= totalPage}
        />

        <Pagination.Last
          onClick={() => pageHandler(totalPage)}
          disabled={currentPage >= totalPage}
        />
      </Pagination>
    </Container>
  );
}