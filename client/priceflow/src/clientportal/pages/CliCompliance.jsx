import React, { useState } from 'react';
import { FaShieldAlt, FaSearch, FaFilter, FaDownload, FaEllipsisV, FaCheckCircle, FaExclamationTriangle, FaBan, FaFileAlt } from 'react-icons/fa';

const Compliance = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const mockCompliance = [
    {
      id: 'CMP-2024-001',
      client: 'PharmaCorp Inc.',
      licenseNumber: 'PHR-12345',
      assessment: 'FDA Compliance Check',
      status: 'compliant',
      riskLevel: 'low',
      lastAudit: '2024-01-15',
      nextAudit: '2024-07-15',
      documents: ['License', 'Certificate', 'Audit Report']
    },
    {
      id: 'CMP-2024-002',
      client: 'MediLife Labs',
      licenseNumber: 'PHR-67890',
      assessment: 'Quality Management Audit',
      status: 'review',
      riskLevel: 'medium',
      lastAudit: '2024-01-20',
      nextAudit: '2024-04-20',
      documents: ['License', 'Inspection Report']
    },
    {
      id: 'CMP-2024-003',
      client: 'BioTech Solutions',
      licenseNumber: 'PHR-11223',
      assessment: 'Safety Standards Review',
      status: 'non-compliant',
      riskLevel: 'high',
      lastAudit: '2024-01-25',
      nextAudit: '2024-02-25',
      documents: ['License', 'Violation Notice']
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'compliant':
        return 'bg-green-100 text-green-800';
      case 'review':
        return 'bg-yellow-100 text-yellow-800';
      case 'non-compliant':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low':
        return 'text-green-500';
      case 'medium':
        return 'text-yellow-500';
      case 'high':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'compliant':
        return <FaCheckCircle className="mr-2" />;
      case 'review':
        return <FaExclamationTriangle className="mr-2" />;
      case 'non-compliant':
        return <FaBan className="mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Compliance Management</h1>
          <p className="text-gray-600">Monitor and manage compliance requirements</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors">
          <FaShieldAlt className="mr-2" />
          New Assessment
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm">Total Clients</p>
              <h3 className="text-2xl font-bold text-gray-800">156</h3>
            </div>
            <span className="text-green-500 text-sm">+8.2%</span>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm">Compliant</p>
              <h3 className="text-2xl font-bold text-gray-800">128</h3>
            </div>
            <span className="text-green-500 text-sm">82%</span>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '82%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm">Under Review</p>
              <h3 className="text-2xl font-bold text-gray-800">18</h3>
            </div>
            <span className="text-yellow-500 text-sm">12%</span>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '12%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm">Non-Compliant</p>
              <h3 className="text-2xl font-bold text-gray-800">10</h3>
            </div>
            <span className="text-red-500 text-sm">6%</span>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: '6%' }}></div>
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
              placeholder="Search compliance records..."
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
                <option value="all">All Status</option>
                <option value="compliant">Compliant</option>
                <option value="review">Under Review</option>
                <option value="non-compliant">Non-Compliant</option>
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

      {/* Compliance Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">ID</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Client</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">License No.</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Assessment</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Risk Level</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Last Audit</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Next Audit</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Documents</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockCompliance.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-blue-600">{record.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{record.client}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{record.licenseNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{record.assessment}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(record.status)}`}>
                      {getStatusIcon(record.status)}
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${getRiskColor(record.riskLevel)}`}>
                      {record.riskLevel.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{record.lastAudit}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{record.nextAudit}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {record.documents.map((doc, idx) => (
                        <span key={idx} className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          <FaFileAlt className="mr-1" />
                          {doc}
                        </span>
                      ))}
                    </div>
                  </td>
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

export default Compliance;