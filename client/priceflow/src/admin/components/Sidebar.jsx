import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaRegChartBar, FaRegFileAlt, FaRegListAlt, FaClipboardCheck } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-cyan-500 text-white min-h-screen">
      <div className="p-6 text-xl font-bold">PriceFlow</div>
      <ul className="space-y-4">
        <li>
          <Link to="/admin/dashboard" className="flex items-center space-x-2 p-4 hover:bg-cyan-700">
            <FaHome className="text-xl" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/pricing" className="flex items-center space-x-2 p-4 hover:bg-cyan-700">
            <FaRegChartBar className="text-xl" />
            <span>Pricing</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/compliance" className="flex items-center space-x-2 p-4 hover:bg-cyan-700">
            <FaClipboardCheck className="text-xl" />
            <span>Compliance</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/analytics" className="flex items-center space-x-2 p-4 hover:bg-cyan-700">
            <FaRegListAlt className="text-xl" />
            <span>Analytics</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/reports" className="flex items-center space-x-2 p-4 hover:bg-cyan-700">
            <FaRegFileAlt className="text-xl" />
            <span>Reports</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/pricelist" className="flex items-center space-x-2 p-4 hover:bg-cyan-700">
            <FaRegFileAlt className="text-xl" />
            <span>PriceList</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
