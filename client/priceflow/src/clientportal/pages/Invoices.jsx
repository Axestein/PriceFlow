import React, { useState, useRef } from 'react';
import { FaFileInvoiceDollar, FaDownload, FaFilter, FaSearch, FaEllipsisV, FaCheckCircle, FaClock, FaExclamationCircle } from 'react-icons/fa';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Invoices = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const tableRef = useRef(null);

  const mockInvoices = [
    { id: 'INV-2024-001', client: 'PharmaCorp Inc.', amount: 12500, status: 'paid', date: '2024-02-01', dueDate: '2024-03-01' },
    { id: 'INV-2024-002', client: 'MediLife Labs', amount: 8750, status: 'pending', date: '2024-02-05', dueDate: '2024-03-05' },
    { id: 'INV-2024-003', client: 'BioTech Solutions', amount: 15000, status: 'overdue', date: '2024-01-15', dueDate: '2024-02-15' },
  ];

  const exportToPDF = () => {
    const input = tableRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 10;
      
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save('invoices.pdf');
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Invoice Management</h1>
        <button onClick={exportToPDF} className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg flex items-center hover:bg-gray-100">
          <FaDownload className="mr-2" /> Export
        </button>
      </div>
      <div ref={tableRef} className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Invoice ID</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Client</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Date</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Due Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockInvoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-blue-600">{invoice.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{invoice.client}</td>
                <td className="px-6 py-4 text-sm text-gray-700">${invoice.amount.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{invoice.status}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{invoice.date}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{invoice.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoices;
