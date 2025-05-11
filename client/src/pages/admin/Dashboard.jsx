import React from 'react';
import { useNavigate } from 'react-router-dom';


const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <h2 className="text-center text-primary mb-5">Admin Dashboard</h2>
      <div className="row g-4 justify-content-center">
        {/* Orders */}
        <div className="col-md-4">
          <div
            className="card text-white bg-warning h-100 shadow"
            role="button"
            onClick={() => navigate('/admin/order-list')}
          >
            <div className="card-body text-center">
              <h5 className="card-title">Orders</h5>
              <p className="card-text">View and manage customer orders.</p>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="col-md-4">
          <div
            className="card text-white bg-primary h-100 shadow"
            role="button"
            onClick={() => navigate('/admin/product-list')}
          >
            <div className="card-body text-center">
              <h5 className="card-title">Products</h5>
              <p className="card-text">Check and edit product listings.</p>
            </div>
          </div>
        </div>

        {/* Users */}
        <div className="col-md-4">
          <div
            className="card text-white bg-warning h-100 shadow"
            role="button"
            onClick={() => navigate('/admin/user-list')}
          >
            <div className="card-body text-center">
              <h5 className="card-title">Users</h5>
              <p className="card-text">Manage users and their roles.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;