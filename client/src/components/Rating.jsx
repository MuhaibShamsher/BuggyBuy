import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

export default function Rating({ value, text }) {
  const starColor = '#ffc107'; // Bootstrap warning color

  return (
    <div className='d-flex align-items-center gap-1'>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ color: starColor, fontSize: '1.2rem' }}>
          {value >= i ? (
            <FaStar />
          ) : value >= i - 0.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
      ))}
      {text && <span className='ms-2 text-muted'>{text}</span>}
    </div>
  );
}
