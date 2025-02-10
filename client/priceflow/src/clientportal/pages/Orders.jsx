import React, { useState } from 'react';
import { FaBox, FaSearch, FaFilter, FaDownload, FaEllipsisV, FaCheckCircle, FaTruck, FaClock, FaExclamationCircle } from 'react-icons/fa';

const Orders = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const mockOrders = [
    { 
      id: 'ORD-2024-001', 
      client: 'PharmaCorp Inc.', 
      products: ['Amoxicillin 500mg', 'Metformin 1000mg'],
      quantity: 5000,
      total: 15500,
      status: 'delivered',
      orderDate: '2024-02-01',
      deliveryDate: '2024-02-05'
    },
    { 
      id: 'ORD-2024-002', 
      client: 'MediLife Labs', 
      products: ['Lisinopril 20mg', 'Omeprazole 40mg'],
      quantity: 3000,
      total: 8750,
      status: 'processing',
      orderDate: '2024-02-05',
      deliveryDate: '2024-02-10'
    },
    { 
      id: 'ORD-2024-003', 
      client: 'BioTech Solutions', 
      products: ['Metoprolol 25mg'],
      quantity: 2000,
      total: 6250,
      status: 'pending',
      orderDate: '2024-02-07',
      deliveryDate: '2024-02-12'
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <FaCheckCircle className="mr-2" />;
      case 'processing':
        return <FaTruck className="mr-2" />;
      case 'pending':
        return <FaClock className="mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
          <p className="text-gray-600">Track and manage pharmaceutical orders</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors">
          <FaBox className="mr-2" />
          New Order
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm">Total Orders</p>
              <h3 className="text-2xl font-bold text-gray-800">1,284</h3>
            </div>
            <span className="text-green-500 text-sm">+15.3%</span>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm">Processing</p>
              <h3 className="text-2xl font-bold text-gray-800">247</h3>
            </div>
            <span className="text-blue-500 text-sm">Active</span>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm">Delivered</p>
              <h3 className="text-2xl font-bold text-gray-800">892</h3>
            </div>
            <span className="text-green-500 text-sm">+5.2%</span>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm">Revenue</p>
              <h3 className="text-2xl font-bold text-gray-800">$458.2K</h3>
            </div>
            <span className="text-green-500 text-sm">+12.5%</span>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <div className="relative">
              <select
                className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Orders</option>
                <option value="delivered">Delivered</option>
                <option value="processing">Processing</option>
                <option value="pending">Pending</option>
              </select>
              <FaFilter className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            </div>

            <button className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg flex items-center hover:bg-gray-100">
              <FaDownload className="mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Client</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Products</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Quantity</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Total</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Order Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Delivery Date</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-blue-600">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.client}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <div className="flex flex-col">
                      {order.products.map((product, idx) => (
                        <span key={idx} className="text-sm">{product}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.quantity.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">${order.total.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.orderDate}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.deliveryDate}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-gray-600">
                      <FaEllipsisV />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;