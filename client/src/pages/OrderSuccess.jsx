
import React from 'react';
import { Link } from 'react-router-dom';

export default function OrderSuccess() {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: '60vh' }}>
      <div className="mb-4 text-success">
        <i className="bi bi-check-circle-fill display-1"></i>
      </div>
      <h1 className="fw-bold mb-3">Order Placed Successfully!</h1>
      <p className="text-muted mb-5">Thank you for your purchase. Your order has been received and is being processed.</p>
      
      <div className="d-flex gap-3">
        <Link to="/shop" className="btn btn-outline-dark rounded-pill px-4 py-2">
          Continue Shopping
        </Link>
        <Link to="/orders" className="btn btn-dark rounded-pill px-4 py-2">
          My Orders
        </Link>
      </div>
    </div>
  );
}
