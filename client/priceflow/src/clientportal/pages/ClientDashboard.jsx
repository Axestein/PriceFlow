import React, { useState } from 'react';
import { LineChart, Line, BarChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ClientDashboard = () => {
  // Sample data for charts
  const revenueData = [
    { month: 'Jan', revenue: 45000, prescriptions: 1200, refills: 800 },
    { month: 'Feb', revenue: 52000, prescriptions: 1350, refills: 920 },
    { month: 'Mar', revenue: 49000, prescriptions: 1280, refills: 850 },
    { month: 'Apr', revenue: 58000, prescriptions: 1420, refills: 980 },
    { month: 'May', revenue: 56000, prescriptions: 1380, refills: 940 },
    { month: 'Jun', revenue: 62000, prescriptions: 1500, refills: 1050 },
  ];

  const drugCategories = [
    { name: 'Antibiotics', count: 450, revenue: 28000 },
    { name: 'Pain Management', count: 380, revenue: 32000 },
    { name: 'Cardiovascular', count: 320, revenue: 45000 },
    { name: 'Diabetes', count: 280, revenue: 38000 },
    { name: 'Respiratory', count: 250, revenue: 25000 },
  ];

  const [selectedTimeframe, setSelectedTimeframe] = useState('monthly');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Client Dashboard</h1>
        <div className="flex items-center mt-4">
          <select 
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
          <p className="text-2xl font-bold text-gray-800 mt-2">$322,000</p>
          <span className="text-green-500 text-sm font-medium">↑ 8.2% vs last period</span>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Active Prescriptions</h3>
          <p className="text-2xl font-bold text-gray-800 mt-2">8,130</p>
          <span className="text-green-500 text-sm font-medium">↑ 12.5% vs last period</span>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Patients</h3>
          <p className="text-2xl font-bold text-gray-800 mt-2">3,842</p>
          <span className="text-green-500 text-sm font-medium">↑ 5.3% vs last period</span>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Refill Rate</h3>
          <p className="text-2xl font-bold text-gray-800 mt-2">76.4%</p>
          <span className="text-red-500 text-sm font-medium">↓ 2.1% vs last period</span>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Trend */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Revenue Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Prescription Analytics */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Prescription Analytics</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="prescriptions" fill="#3B82F6" />
                <Bar dataKey="refills" fill="#60A5FA" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Drug Categories Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Drug Categories</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prescriptions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {drugCategories.map((category, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.count}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${category.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">↑ {Math.floor(Math.random() * 15 + 1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium mb-4">Insurance Claims Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Approved</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '82%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-900">82%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pending</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '13%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-900">13%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Rejected</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '5%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-900">5%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium mb-4">Patient Demographics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Senior (65+)</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-900">45%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Adult</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '35%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-900">35%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Youth</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-900">20%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium mb-4">Compliance Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">On-Time Refills</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '78%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-900">78%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Adherence Rate</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-900">85%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Prior Auth Rate</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '92%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-900">92%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;