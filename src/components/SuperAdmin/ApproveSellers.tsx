import { useState, useEffect } from 'react';
import {
  FiSearch,
  FiCheckCircle,
  FiXCircle,
  FiUser,
  FiShoppingBag,
  FiMail,
  FiPhone,
  FiMapPin,
  FiFileText,
  FiCalendar
} from 'react-icons/fi';

interface Seller {
  id: string;
  name: string;
  email: string;
  phone: string;
  storeName: string;
  location: string;
  registrationDate: string;
  status: 'pending' | 'approved' | 'rejected';
  avatar?: string;
  description: string;
  documents: {
    type: string;
    url: string;
  }[];
}

const mockSellers: Seller[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    storeName: 'Modern Wood Crafts',
    location: 'New York, USA',
    registrationDate: '2023-05-15',
    status: 'pending',
    description: 'Specializing in handcrafted wooden furniture with modern designs.',
    documents: [
      { type: 'Business License', url: '#' },
      { type: 'Tax ID', url: '#' }
    ]
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1987654321',
    storeName: 'Luxury Furniture Co.',
    location: 'Los Angeles, USA',
    registrationDate: '2023-05-18',
    status: 'pending',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    description: 'High-end luxury furniture imported from Europe and Asia.',
    documents: [
      { type: 'Business License', url: '#' },
      { type: 'Tax ID', url: '#' },
      { type: 'Import License', url: '#' }
    ]
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    phone: '+1122334455',
    storeName: 'Eco Furniture Solutions',
    location: 'Seattle, USA',
    registrationDate: '2023-05-20',
    status: 'pending',
    description: 'Sustainable and eco-friendly furniture made from recycled materials.',
    documents: [
      { type: 'Business License', url: '#' },
      { type: 'Environmental Certification', url: '#' }
    ]
  },
];

const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
};

const ApproveSeller = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [filteredSellers, setFilteredSellers] = useState<Seller[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchSellers = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        setSellers(mockSellers);
        setFilteredSellers(mockSellers);
      } catch (error) {
        console.error('Error fetching sellers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  useEffect(() => {
    const filtered = sellers.filter(seller =>
      seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSellers(filtered);
    setPage(1);
  }, [searchTerm, sellers]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleViewDetails = (seller: Seller) => {
    setSelectedSeller(seller);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedSeller(null);
  };

  const handleApproveReject = async (sellerId: string, action: 'approve' | 'reject') => {
    setActionLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 600));

      const updatedSellers = sellers.map(seller =>
        seller.id === sellerId ? { ...seller, status: action as 'approved' | 'rejected' } : seller
      );

      setSellers(updatedSellers);
      setFilteredSellers(updatedSellers.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
      ));
      setOpenDialog(false);
    } catch (error) {
      console.error('Error updating seller status:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const count = Math.ceil(filteredSellers.length / rowsPerPage);
  const paginatedSellers = filteredSellers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-[#0d3547] mb-4">Seller Approvals</h1>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <p className="text-[#8b5e3c]">
          {filteredSellers.length} pending registration{filteredSellers.length !== 1 ? 's' : ''}
        </p>

        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-[#8b5e3c]" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-[#0d3547] focus:border-[#0d3547]"
            placeholder="Search sellers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8b5e3c]"></div>
        </div>
      ) : filteredSellers.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-xl font-semibold text-[#0d3547]">
            {searchTerm ? 'No matching sellers found' : 'No pending seller registrations'}
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
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#0d3547]">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Seller
                    </th>
                    <th scope="col" className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Store
                    </th>
                    <th scope="col" className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Contact
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedSellers.map((seller) => (
                    <tr key={seller.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {seller.avatar ? (
                              <img className="h-10 w-10 rounded-full" src={seller.avatar} alt={seller.name} />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-[#8b5e3c] flex items-center justify-center text-white">
                                <FiUser size={20} />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{seller.name}</div>
                            <div className="md:hidden text-sm text-gray-500">{seller.storeName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{seller.storeName}</div>
                        <div className="text-sm text-gray-500">{seller.location}</div>
                      </td>
                      <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{seller.email}</div>
                        <div className="text-sm text-gray-500">{seller.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[seller.status]}`}>
                          {seller.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleViewDetails(seller)}
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

      {/* Seller Details Modal */}
      {openDialog && selectedSeller && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={handleCloseDialog}></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-[#0d3547] px-4 py-3 sm:px-6">
                <div className="flex items-center">
                  <FiShoppingBag className="mr-2 text-white" />
                  <h3 className="text-lg font-medium text-white">Seller Registration Details</h3>
                </div>
              </div>

              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex flex-col sm:flex-row mb-6">
                  {selectedSeller.avatar ? (
                    <img
                      src={selectedSeller.avatar}
                      alt={selectedSeller.name}
                      className="w-20 h-20 rounded-full mb-4 sm:mb-0 sm:mr-6"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-[#8b5e3c] flex items-center justify-center text-white mb-4 sm:mb-0 sm:mr-6">
                      <FiUser size={32} />
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-bold text-[#0d3547]">{selectedSeller.name}</h2>
                    <p className="text-[#8b5e3c] mb-2">{selectedSeller.storeName}</p>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[selectedSeller.status]}`}>
                      {selectedSeller.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <DetailItem icon={<FiMail />} label="Email" value={selectedSeller.email} />
                  <DetailItem icon={<FiPhone />} label="Phone" value={selectedSeller.phone} />
                  <DetailItem icon={<FiMapPin />} label="Location" value={selectedSeller.location} />
                  <DetailItem icon={<FiCalendar />} label="Registration Date" value={new Date(selectedSeller.registrationDate).toLocaleDateString()} />
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-[#0d3547] mb-2">Business Description</h4>
                  <p className="text-gray-600">{selectedSeller.description}</p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-[#0d3547] mb-2">Submitted Documents</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSeller.documents.map((doc, index) => (
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
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => handleApproveReject(selectedSeller.id, 'approve')}
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
                  onClick={() => handleApproveReject(selectedSeller.id, 'reject')}
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

export default ApproveSeller;



