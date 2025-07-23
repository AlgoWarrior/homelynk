import { useState, useEffect } from 'react';
import {
  FiSearch,
  FiUser,
  FiMail,
  FiPhone,
  FiCheckCircle,
  FiEdit2,
  FiEye,
  FiUserCheck,
  FiUserX,
} from 'react-icons/fi';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'seller' | 'buyer';
  status: 'active' | 'blocked';
  avatar?: string;
  registeredAt: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    type: 'seller',
    status: 'active',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    registeredAt: '2023-05-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1987654321',
    type: 'buyer',
    status: 'active',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    registeredAt: '2023-05-18',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    phone: '+1122334455',
    type: 'seller',
    status: 'blocked',
    registeredAt: '2023-05-20',
  },
  {
    id: '4',
    name: 'Emily Brown',
    email: 'emily@example.com',
    phone: '+1098765432',
    type: 'buyer',
    status: 'active',
    registeredAt: '2023-06-01',
  },
];

const statusStyles = {
  active: 'bg-green-100 text-green-800',
  blocked: 'bg-red-100 text-red-800',
};

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setPage(1);
  }, [searchTerm, users]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleView = (user: User) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleBlockUnblock = async (userId: string) => {
    setActionLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const updatedUsers = users.map(user =>
        user.id === userId ? { ...user, status: (user.status === 'active' ? 'blocked' : 'active') as 'active' | 'blocked' } : user
      ) as User[];
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.type.toLowerCase().includes(searchTerm.toLowerCase())
      ));
      setOpenDialog(false);
    } finally {
      setActionLoading(false);
    }
  };

  const count = Math.ceil(filteredUsers.length / rowsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-[#0d3547] mb-4">Manage Users</h1>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <p className="text-[#8b5e3c]">
          {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
        </p>
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-[#8b5e3c]" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-[#0d3547] focus:border-[#0d3547]"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#0d3547]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">User</th>
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Type</th>
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {user.avatar ? (
                          <img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-[#8b5e3c] flex items-center justify-center text-white">
                            <FiUser size={20} />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="md:hidden text-sm text-gray-500">{user.type.charAt(0).toUpperCase() + user.type.slice(1)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.type.charAt(0).toUpperCase() + user.type.slice(1)}</div>
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[user.status]}`}>
                      {user.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                    <button
                      onClick={() => handleView(user)}
                      className="text-[#0d3547] hover:text-[#0a2a38] border border-[#0d3547] hover:border-[#0a2a38] px-2 py-1 rounded-md text-sm flex items-center"
                    >
                      <FiEye className="mr-1" />View
                    </button>
                    <button
                      className="text-[#8b5e3c] border border-[#8b5e3c] hover:bg-[#8b5e3c] hover:text-white px-2 py-1 rounded-md text-sm flex items-center"
                    >
                      <FiEdit2 className="mr-1" />Edit
                    </button>
                    <button
                      onClick={() => handleBlockUnblock(user.id)}
                      disabled={actionLoading}
                      className={`border px-2 py-1 rounded-md text-sm flex items-center ${user.status === 'active' ? 'text-red-600 border-red-600 hover:bg-red-600 hover:text-white' : 'text-green-600 border-green-600 hover:bg-green-600 hover:text-white'} disabled:opacity-50`}
                    >
                      {user.status === 'active' ? <><FiUserX className="mr-1" />Block</> : <><FiUserCheck className="mr-1" />Unblock</>}
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
      {/* User Details Modal */}
      {openDialog && selectedUser && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={handleCloseDialog}></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
              <div className="bg-[#0d3547] px-4 py-3 sm:px-6">
                <div className="flex items-center">
                  <FiUser className="mr-2 text-white" />
                  <h3 className="text-lg font-medium text-white">User Details</h3>
                </div>
              </div>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex flex-col items-center mb-4">
                  {selectedUser.avatar ? (
                    <img
                      src={selectedUser.avatar}
                      alt={selectedUser.name}
                      className="w-20 h-20 rounded-full mb-2 object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-[#8b5e3c] flex items-center justify-center text-white mb-2">
                      <FiUser size={32} />
                    </div>
                  )}
                  <h2 className="text-xl font-bold text-[#0d3547]">{selectedUser.name}</h2>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[selectedUser.status]} mt-1`}>{selectedUser.status.toUpperCase()}</span>
                </div>
                <div className="grid grid-cols-1 gap-2 mb-4">
                  <DetailItem icon={<FiMail />} label="Email" value={selectedUser.email} />
                  <DetailItem icon={<FiPhone />} label="Phone" value={selectedUser.phone} />
                  <DetailItem icon={<FiUser />} label="Type" value={selectedUser.type.charAt(0).toUpperCase() + selectedUser.type.slice(1)} />
                  <DetailItem icon={<FiCheckCircle />} label="Registered At" value={new Date(selectedUser.registeredAt).toLocaleDateString()} />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => handleBlockUnblock(selectedUser.id)}
                  disabled={actionLoading}
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${selectedUser.status === 'active' ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-green-600 text-white hover:bg-green-700'} focus:outline-none sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50`}
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
                      {selectedUser.status === 'active' ? <><FiUserX className="mr-1" />Block</> : <><FiUserCheck className="mr-1" />Unblock</>}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCloseDialog}
                  disabled={actionLoading}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                >
                  Close
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
    <div className="flex items-center">
      <span className="text-[#8b5e3c] mr-2">{icon}</span>
      <span className="text-sm font-semibold text-[#0d3547]">{label}:</span>
      <span className="text-sm text-gray-600 ml-2">{value}</span>
    </div>
  );
};

export default ManageUsers;
