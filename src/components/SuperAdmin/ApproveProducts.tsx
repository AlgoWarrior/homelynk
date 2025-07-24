import { useState, useEffect } from 'react';
import {
  FiSearch,
  FiCheckCircle,
  FiXCircle,
  FiBox,
  FiUser,
  FiDollarSign,
  FiCalendar,
  FiFileText,
  FiDownload,
  FiInfo,
} from 'react-icons/fi';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  seller: string;
  status: 'pending' | 'approved' | 'rejected';
  image?: string;
  description: string;
  createdAt: string;
  documents: { type: string; url: string }[];
  auditLog?: { action: string; by: string; date: string }[];
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Modern Sofa',
    category: 'Living Room',
    price: 899.99,
    seller: 'John Doe',
    status: 'pending',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=400&q=80',
    description: 'A stylish modern sofa with premium fabric and wooden legs.',
    createdAt: '2023-06-01',
    documents: [
      { type: 'Product Certificate', url: '#' },
      { type: 'Warranty', url: '#' },
    ],
    auditLog: [
      { action: 'Created', by: 'John Doe', date: '2023-06-01' },
    ],
  },
  {
    id: '2',
    name: 'Oak Dining Table',
    category: 'Dining',
    price: 1299.5,
    seller: 'Jane Smith',
    status: 'pending',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    description: 'Solid oak dining table, seats up to 8 people.',
    createdAt: '2023-06-03',
    documents: [
      { type: 'Product Certificate', url: '#' },
    ],
    auditLog: [
      { action: 'Created', by: 'Jane Smith', date: '2023-06-03' },
    ],
  },
  {
    id: '3',
    name: 'Ergonomic Office Chair',
    category: 'Office',
    price: 299.99,
    seller: 'Eco Furniture Solutions',
    status: 'pending',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    description: 'Comfortable office chair with lumbar support and adjustable height.',
    createdAt: '2023-06-05',
    documents: [
      { type: 'Warranty', url: '#' },
    ],
    auditLog: [
      { action: 'Created', by: 'Eco Furniture Solutions', date: '2023-06-05' },
    ],
  },
];

const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

const statusOptions = [
  { value: '', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

const ApproveProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products.filter(product =>
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter ? product.status === statusFilter : true)
    );
    setFilteredProducts(filtered);
    setPage(1);
  }, [searchTerm, products, statusFilter]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  const handleApproveReject = async (productId: string, action: 'approve' | 'reject') => {
    setActionLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      const updatedProducts = products.map(product => {
        if (product.id === productId) {
          const newStatus = action as 'approved' | 'rejected';
          return {
            ...product,
            status: newStatus,
            auditLog: [
              ...(product.auditLog || []),
              { action: newStatus === 'approved' ? 'Approved' : 'Rejected', by: 'Admin', date: new Date().toLocaleString() },
            ],
          };
        }
        return product;
      });
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts.filter(p =>
        (p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter ? p.status === statusFilter : true)
      ));
      setToast({ message: `Product ${action === 'approve' ? 'approved' : 'rejected'} successfully!`, type: 'success' });
      setOpenDialog(false);
    } catch (error) {
      setToast({ message: 'Error updating product status.', type: 'error' });
    } finally {
      setActionLoading(false);
      setTimeout(() => setToast(null), 2000);
    }
  };

  const handleBulkAction = async (action: 'approve' | 'reject') => {
    setActionLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      const updatedProducts = products.map(product => {
        if (selectedIds.includes(product.id)) {
          const newStatus = action as 'approved' | 'rejected';
          return {
            ...product,
            status: newStatus,
            auditLog: [
              ...(product.auditLog || []),
              { action: newStatus === 'approved' ? 'Approved' : 'Rejected', by: 'Admin', date: new Date().toLocaleString() },
            ],
          };
        }
        return product;
      });
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts.filter(p =>
        (p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter ? p.status === statusFilter : true)
      ));
      setToast({ message: `Bulk ${action === 'approve' ? 'approval' : 'rejection'} successful!`, type: 'success' });
      setSelectedIds([]);
    } catch (error) {
      setToast({ message: 'Error updating product status.', type: 'error' });
    } finally {
      setActionLoading(false);
      setTimeout(() => setToast(null), 2000);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(pid => pid !== id));
    }
  };

  const handleExportCSV = () => {
    const headers = ['Name', 'Category', 'Price', 'Seller', 'Status', 'Created At'];
    const rows = filteredProducts.map(p => [p.name, p.category, p.price, p.seller, p.status, p.createdAt]);
    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
      csv += row.join(',') + '\n';
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const count = Math.ceil(filteredProducts.length / rowsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-[#0d3547] mb-4">Product Approvals</h1>
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-4 py-2 rounded shadow-lg text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>{toast.message}</div>
      )}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-[#8b5e3c]" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-[#0d3547] focus:border-[#0d3547]"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="rounded-full border border-gray-300 px-3 py-2 text-sm text-[#0d3547] focus:ring-1 focus:ring-[#0d3547] focus:border-[#0d3547] bg-white"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 mt-2 md:mt-0">
          <button
            onClick={handleExportCSV}
            className="flex items-center px-3 py-2 bg-[#8b5e3c] text-white rounded hover:bg-[#0D3547] transition-colors text-sm"
          >
            <FiDownload className="mr-1" /> Export CSV
          </button>
          {selectedIds.length > 0 && (
            <>
              <button
                onClick={() => handleBulkAction('approve')}
                disabled={actionLoading}
                className="flex items-center px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm disabled:opacity-50"
              >
                <FiCheckCircle className="mr-1" /> Bulk Approve
              </button>
              <button
                onClick={() => handleBulkAction('reject')}
                disabled={actionLoading}
                className="flex items-center px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm disabled:opacity-50"
              >
                <FiXCircle className="mr-1" /> Bulk Reject
              </button>
            </>
          )}
        </div>
      </div>
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-xl font-semibold text-[#0d3547]">
            {searchTerm ? 'No matching products found' : 'No products found'}
          </h2>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 text-[#8b5e3c] hover:underline"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow overflow-hidden w-full">
            <div className="w-full">
              <table className="min-w-full w-full table-fixed divide-y divide-gray-200">
                <colgroup>
                  <col style={{ width: '5%' }} />
                  <col style={{ width: '25%' }} />
                  <col style={{ width: '15%' }} className="hidden md:table-column" />
                  <col style={{ width: '15%' }} className="hidden md:table-column" />
                  <col style={{ width: '15%' }} className="hidden md:table-column" />
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '13%' }} />
                </colgroup>
                <thead className="bg-[#0d3547]">
                  <tr>
                    <th className="px-2 py-3"></th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider truncate">Product</th>
                    <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider truncate">Category</th>
                    <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider truncate">Seller</th>
                    <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider truncate">Price</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider truncate">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider truncate">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(product.id)}
                          onChange={e => handleSelectOne(product.id, e.target.checked)}
                          className="accent-[#8b5e3c]"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {product.image ? (
                              <img className="h-10 w-10 rounded" src={product.image} alt={product.name} />
                            ) : (
                              <div className="h-10 w-10 rounded bg-[#8b5e3c] flex items-center justify-center text-white">
                                <FiBox size={20} />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="md:hidden text-sm text-gray-500">{product.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.category}</div>
                      </td>
                      <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.seller}</div>
                      </td>
                      <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[product.status]}`}>
                          {product.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleViewDetails(product)}
                          className="text-[#0d3547] hover:text-[#0a2a38] border border-[#0d3547] hover:border-[#0a2a38] px-3 py-1 rounded-md text-sm"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {count > 1 && (
            <div className="flex justify-center mt-6">
              <nav className="inline-flex rounded-md shadow">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from({ length: count }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1 border-t border-b border-gray-300 bg-white text-sm font-medium ${page === pageNum ? 'bg-[#8b5e3c] text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    {pageNum}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === count}
                  className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      )}
      {/* Product Details Modal */}
      {openDialog && selectedProduct && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={handleCloseDialog}></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-[#0d3547] px-4 py-3 sm:px-6">
                <div className="flex items-center">
                  <FiBox className="mr-2 text-white" />
                  <h3 className="text-lg font-medium text-white">Product Details</h3>
                </div>
              </div>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex flex-col sm:flex-row mb-6">
                  {selectedProduct.image ? (
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-24 h-24 rounded mb-4 sm:mb-0 sm:mr-6 object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded bg-[#8b5e3c] flex items-center justify-center text-white mb-4 sm:mb-0 sm:mr-6">
                      <FiBox size={32} />
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-bold text-[#0d3547]">{selectedProduct.name}</h2>
                    <p className="text-[#8b5e3c] mb-2">{selectedProduct.category}</p>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[selectedProduct.status]}`}>
                      {selectedProduct.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <DetailItem icon={<FiUser />} label="Seller" value={selectedProduct.seller} />
                  <DetailItem icon={<FiDollarSign />} label="Price" value={`$${selectedProduct.price.toFixed(2)}`} />
                  <DetailItem icon={<FiCalendar />} label="Created At" value={new Date(selectedProduct.createdAt).toLocaleDateString()} />
                </div>
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-[#0d3547] mb-2">Description</h4>
                  <p className="text-gray-600">{selectedProduct.description}</p>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-[#0d3547] mb-2">Documents</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.documents.map((doc, index) => (
                      <button
                        key={index}
                        className="inline-flex items-center px-3 py-1 border border-[#0d3547] rounded-md text-sm text-[#0d3547] hover:bg-gray-50"
                      >
                        <FiFileText className="mr-1" />
                        {doc.type}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Audit Log */}
                {selectedProduct.auditLog && (
                  <div className="mb-2">
                    <h4 className="text-sm font-semibold text-[#0d3547] mb-2 flex items-center"><FiInfo className="mr-1" />Audit Log</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {selectedProduct.auditLog.map((log, idx) => (
                        <li key={idx}>
                          <span className="font-semibold text-[#8b5e3c]">{log.action}</span> by {log.by} on {log.date}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => handleApproveReject(selectedProduct.id, 'approve')}
                  disabled={actionLoading}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#0d3547] text-base font-medium text-white hover:bg-[#0a2a38] focus:outline-none sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                >
                  {actionLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FiCheckCircle className="mr-1" />
                      Approve
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleApproveReject(selectedProduct.id, 'reject')}
                  disabled={actionLoading}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                >
                  {actionLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FiXCircle className="mr-1" />
                      Reject
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCloseDialog}
                  disabled={actionLoading}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DetailItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => {
  return (
    <div>
      <div className="flex items-center">
        <span className="text-[#8b5e3c] mr-2">{icon}</span>
        <span className="text-sm font-semibold text-[#0d3547]">{label}</span>
      </div>
      <p className="text-sm text-gray-600 ml-6">{value}</p>
    </div>
  );
};

export default ApproveProducts;
