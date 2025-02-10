import { useEffect, useState } from 'react';
import axios from 'axios';
import { RefreshCw, ArrowUp, ArrowDown, Pill } from 'lucide-react';
import PropTypes from 'prop-types';

const BASE_URL = 'https://api.fda.gov/drug/ndc.json';

function generatePrice(basePrice) {
  const fluctuation = basePrice * (Math.random() * 0.1 - 0.05);
  return Number((basePrice + fluctuation).toFixed(2));
}

const basePrices = {};

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
        ndc: item.product_ndc,
        dosageForm: item.dosage_form,
        strength: item.active_ingredients?.[0]?.strength || 'N/A',
        route: item.route?.[0] || 'N/A'
      };
    });
  } catch (error) {
    console.error('Error fetching medicine data:', error);
    throw error;
  }
}

function PriceCard({ medicine, previousPrice = 0 }) {
  const priceChange = previousPrice ? medicine.price - previousPrice : 0;
  const priceChangePercent = previousPrice
    ? ((medicine.price - previousPrice) / previousPrice * 100).toFixed(1)
    : '0';

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all hover:shadow-2xl hover:scale-105 transform duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">{medicine.name}</h3>
        <Pill className="text-blue-500" size={24} />
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-600">{medicine.manufacturer}</p>
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Form:</span> {medicine.dosageForm}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Route:</span> {medicine.route}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Strength:</span> {medicine.strength}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">NDC:</span> {medicine.ndc}
          </p>
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

          <div className="text-right">
            <span
              className={`px-3 py-1 text-xs font-bold rounded-full ${
                medicine.inStock ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
              }`}
            >
              {medicine.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-2">Last updated: {new Date(medicine.lastUpdated).toLocaleString()}</p>
      </div>
    </div>
  );
}

PriceCard.propTypes = {
  medicine: PropTypes.shape({
    name: PropTypes.string.isRequired,
    manufacturer: PropTypes.string.isRequired,
    dosageForm: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    strength: PropTypes.string.isRequired,
    ndc: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inStock: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.string.isRequired,
  }).isRequired,
  previousPrice: PropTypes.number,
};

function PriceList() {
  const [medicines, setMedicines] = useState([]);
  const [prevPrices, setPrevPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

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

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">Pharmaceutical Price Tracker</h1>
          <button
            onClick={updatePrices}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search medicine..."
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {error && <div className="text-red-500 text-center">{error}</div>}
        {loading && (
          <div className="flex justify-center items-center mt-10">
            <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 rounded-full"></div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {medicines
            .filter((m) => m.name.toLowerCase().includes(search.toLowerCase()))
            .map((medicine) => (
              <PriceCard key={medicine.id} medicine={medicine} previousPrice={prevPrices[medicine.id]} />
            ))}
        </div>
      </div>
    </div>
  );
}

PriceList.propTypes = {
  medicines: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      manufacturer: PropTypes.string.isRequired,
      dosageForm: PropTypes.string.isRequired,
      route: PropTypes.string.isRequired,
      strength: PropTypes.string.isRequired,
      ndc: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      inStock: PropTypes.bool.isRequired,
      lastUpdated: PropTypes.string.isRequired,
    })
  ),
  prevPrices: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.string,
  search: PropTypes.string,
};

export default PriceList;
