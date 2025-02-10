import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RefreshCw, ArrowUp, ArrowDown, Pill, ShoppingCart, DollarSign, Package, Thermometer, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const BASE_URL = 'https://api.fda.gov/drug/ndc.json';

// Disease categories mapping
const DISEASE_CATEGORIES = {
  'Cardiovascular': ['tablet', 'capsule'],
  'Respiratory': ['inhaler', 'solution'],
  'Pain Management': ['injection', 'tablet'],
  'Diabetes': ['injection', 'tablet'],
  'Mental Health': ['tablet', 'capsule'],
  'Other': ['cream', 'gel', 'powder']
};

function generatePrice(basePrice) {
  const fluctuation = basePrice * (Math.random() * 0.1 - 0.05);
  return Number((basePrice + fluctuation).toFixed(2));
}

const basePrices = {};

function assignDiseaseCategory(dosageForm) {
  for (const [category, forms] of Object.entries(DISEASE_CATEGORIES)) {
    if (forms.some(form => dosageForm.toLowerCase().includes(form))) {
      return category;
    }
  }
  return 'Other';
}

const StatCard = ({ title, value, icon: Icon, description }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between space-x-4">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="p-3 bg-blue-50 rounded-full">
        <Icon className="w-8 h-8 text-blue-500" />
      </div>
    </div>
  </div>
);

const MedicineDashboard = ({ medicines }) => {
  const totalValue = medicines.reduce((sum, med) => sum + med.price, 0).toFixed(2);
  const averagePrice = (totalValue / medicines.length).toFixed(2);
  const inStockCount = medicines.filter(m => m.inStock).length;
  
  const categoryData = medicines.reduce((acc, med) => {
    const category = med.category || 'Uncategorized';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Inventory Value"
          value={`$${totalValue}`}
          icon={DollarSign}
          description="Total value of all medicines"
        />
        <StatCard
          title="Average Price"
          value={`$${averagePrice}`}
          icon={Package}
          description="Average price per medicine"
        />
        <StatCard
          title="In Stock Items"
          value={inStockCount}
          icon={Package}
          description={`Out of ${medicines.length} total items`}
        />
        <StatCard
          title="Categories"
          value={Object.keys(categoryData).length}
          icon={Thermometer}
          description="Different medicine categories"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Medicine Categories Distribution</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

function PriceCard({ medicine, previousPrice = 0, onAddToCart }) {
  const priceChange = previousPrice ? medicine.price - previousPrice : 0;
  const priceChangePercent = previousPrice 
    ? ((medicine.price - previousPrice) / previousPrice * 100).toFixed(1)
    : '0';

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all hover:shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{medicine.name}</h3>
          <span className="text-sm px-2 py-1 bg-cyan-100 text-blue-800 rounded-full">
            {medicine.diseaseCategory}
          </span>
        </div>
        <div className="flex items-center">
          <div className="flex text-yellow-400 mr-2">
            {'★'.repeat(Math.floor(medicine.rating))}
            {'☆'.repeat(5 - Math.floor(medicine.rating))}
          </div>
          <span className="text-sm text-gray-600">({medicine.rating})</span>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">{medicine.description}</p>
      
      <div className="space-y-2">
        <p className="text-sm text-gray-600">{medicine.manufacturer}</p>
        <div className="grid grid-cols-2 gap-2">
          <p className="text-sm text-gray-600"><span className="font-medium">Form:</span> {medicine.dosageForm}</p>
          <p className="text-sm text-gray-600"><span className="font-medium">Route:</span> {medicine.route}</p>
          <p className="text-sm text-gray-600"><span className="font-medium">Strength:</span> {medicine.strength}</p>
          <p className="text-sm text-gray-600"><span className="font-medium">NDC:</span> {medicine.ndc}</p>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-2xl font-bold text-gray-900">${medicine.price.toFixed(2)}</p>
            {priceChange !== 0 && (
              <div className={`flex items-center text-sm ${priceChange > 0 ? 'text-red-500' : 'text-green-500'}`}>
                {priceChange > 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                <span>{Math.abs(Number(priceChangePercent))}%</span>
              </div>
            )}
          </div>
          
          <button
            onClick={() => onAddToCart(medicine)}
            disabled={!medicine.inStock}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition duration-300 ${
              medicine.inStock 
                ? 'bg-cyan-500 text-white hover:bg-cyan-600' 
                : 'bg-red-500 text-white cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            {medicine.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
        
        <p className="text-xs text-gray-500 mt-2">Last updated: {new Date(medicine.lastUpdated).toLocaleString()}</p>
      </div>
    </div>
  );
}

const Products = () => {
  const [medicines, setMedicines] = useState([]);
  const [prevPrices, setPrevPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [showDashboard, setShowDashboard] = useState(false);

  async function fetchMedicinePrices() {
    try {
      const response = await axios.get(BASE_URL, {
        params: { limit: 20, search: 'marketing_category:"NDA"' }
      });
  
      return response.data.results.map((item) => {
        const id = item.product_ndc;
        if (!basePrices[id]) basePrices[id] = Math.random() * 190 + 10;
  
        return {
          id,
          name: item.brand_name || item.generic_name,
          manufacturer: item.labeler_name,
          price: generatePrice(basePrices[id]),
          lastUpdated: new Date().toISOString(),
          inStock: Math.random() > 0.2,
          category: item.product_type,
          diseaseCategory: assignDiseaseCategory(item.dosage_form),
          ndc: item.product_ndc,
          dosageForm: item.dosage_form,
          strength: item.active_ingredients?.[0]?.strength || 'N/A',
          route: item.route?.[0] || 'N/A',
          description: `${item.brand_name || item.generic_name} is a ${item.dosage_form.toLowerCase()} medication used for treating various conditions.`,
          rating: (Math.random() * 2 + 3).toFixed(1)
        };
      });
    } catch (error) {
      console.error('Error fetching medicine data:', error);
      throw error;
    }
  }

  useEffect(() => {
    updatePrices();
    const interval = setInterval(updatePrices, 10000);
    return () => clearInterval(interval);
  }, []);

  async function updatePrices() {
    try {
      setLoading(true);
      setError(null);
      const newPrices = await fetchMedicinePrices();
      
      const prev = {};
      medicines.forEach((m) => (prev[m.id] = m.price));
      setPrevPrices(prev);
      setMedicines(newPrices);
    } catch {
      setError('Failed to fetch medicine prices.');
    } finally {
      setLoading(false);
    }
  }

  const handleAddToCart = (medicine) => {
    setCart([...cart, medicine]);
  };

  const filteredMedicines = medicines
    .filter(m => m.name.toLowerCase().includes(search.toLowerCase()))
    .filter(m => selectedCategory === 'All' || m.diseaseCategory === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Medical Marketplace</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowDashboard(!showDashboard)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300"
            >
              {showDashboard ? 'Show Products' : 'Show Dashboard'}
            </button>
            <button 
              onClick={updatePrices} 
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition duration-300"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> 
              Refresh Prices
            </button>
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </div>
          </div>
        </div>

        {showDashboard ? (
          <MedicineDashboard medicines={medicines} />
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <input 
                type="text" 
                placeholder="Search medicine..." 
                className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500" 
                onChange={(e) => setSearch(e.target.value)} 
              />
              <select
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                {Object.keys(DISEASE_CATEGORIES).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            {error && (
              <div className="text-red-500 text-center mb-6 bg-red-50 p-4 rounded-lg">
                {error}
              </div>
            )}
            
            {loading && (
              <div className="flex justify-center items-center mt-10">
                <div className="animate-spin h-12 w-12 border-t-4 border-cyan-500 rounded-full"></div>
              </div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMedicines.map((medicine) => (
                <PriceCard 
                  key={medicine.id} 
                  medicine={medicine} 
                  previousPrice={prevPrices[medicine.id]}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Products;