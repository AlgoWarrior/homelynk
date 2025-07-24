import React, { useState } from 'react';
import { 
  CameraIcon, 
  PencilIcon, 
  LockClosedIcon,
  BellIcon,
  CreditCardIcon,
  CogIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ChartBarIcon,
  UserGroupIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface SettingsSection {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [successMessage, setSuccessMessage] = useState('');

  // Settings tabs
  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserGroupIcon },
    { id: 'store', name: 'Store Info', icon: CogIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'payment', name: 'Payment', icon: CreditCardIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'password', name: 'Password', icon: LockClosedIcon }
  ];

  // Profile state
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+250 788 123 456',
    address: 'Kigali, Rwanda',
    profilePicture: null as File | null,
    profilePreview: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });

  // Notification preferences
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    inventoryAlerts: true,
    promotionalEmails: false,
    weeklyReports: true
  });

  // Payment settings
  const [payment, setPayment] = useState({
    bankName: 'Bank of Kigali',
    accountNumber: '****1234',
    mobileMoneyNumber: '+250 788 123 456',
    preferredMethod: 'bank'
  });

  // Store state
  const [store, setStore] = useState({
    name: 'My Awesome Store',
    description: 'We sell high-quality products with fast shipping',
    logo: null as File | null,
    logoPreview: '/default-store-logo.png'
  });

  // Password state
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  // Handle profile changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  // Handle profile picture upload
  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfile(prev => ({
        ...prev,
        profilePicture: file,
        profilePreview: URL.createObjectURL(file)
      }));
    }
  };

  // Handle store changes
  const handleStoreChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStore(prev => ({ ...prev, [name]: value }));
  };

  // Handle store logo upload
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setStore(prev => ({
        ...prev,
        logo: file,
        logoPreview: URL.createObjectURL(file)
      }));
    }
  };

  // Handle password changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword(prev => ({ ...prev, [name]: value }));
  };

  // Form submissions
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.fullName || !profile.email) {
      alert('Please fill in all required fields');
      return;
    }
    alert('Profile updated successfully!');
  };

  const handleStoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!store.name) {
      alert('Store name is required');
      return;
    }
    alert('Store information updated successfully!');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.current || !password.new || !password.confirm) {
      alert('Please fill in all password fields');
      return;
    }
    if (password.new !== password.confirm) {
      alert('New passwords do not match');
      return;
    }
    alert('Password updated successfully!');
    setPassword({ current: '', new: '', confirm: '' });
  };

  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0D3547]">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account and store preferences</p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <CheckCircleIcon className="h-5 w-5 text-green-600" />
          <span className="text-green-800">{successMessage}</span>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-[#0D3547] text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#0D3547]'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <UserGroupIcon className="h-6 w-6 text-[#8B5E3C] mr-3" />
                <h2 className="text-xl font-semibold text-[#0D3547]">Profile Information</h2>
              </div>

        <form onSubmit={handleProfileSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 flex flex-col items-center mb-4">
              <div className="relative mb-4">
                <img 
                  src={profile.profilePreview} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover border-2 border-[#8B5E3C]"
                />
                <label 
                  htmlFor="profilePicture"
                  className="absolute bottom-0 right-0 bg-[#0D3547] p-2 rounded-full cursor-pointer hover:bg-[#0D3547]/90 transition"
                >
                  <CameraIcon className="h-4 w-4 text-white" />
                  <input 
                    id="profilePicture" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleProfilePictureChange}
                  />
                </label>
              </div>
              <span className="text-sm text-gray-500">Click to change profile picture</span>
            </div>

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={profile.fullName}
                onChange={handleProfileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5E3C] focus:border-[#0D3547] transition"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5E3C] focus:border-[#0D3547] transition"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={profile.phone}
                onChange={handleProfileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5E3C] focus:border-[#0D3547] transition"
              />
            </div>
          </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#0D3547] text-white rounded-lg hover:bg-[#0D3547]/90 transition focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                >
                  Save Changes
                </button>
              </div>
            </form>
            </div>
          )}

          {/* Store Info Tab */}
          {activeTab === 'store' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <CogIcon className="h-6 w-6 text-[#8B5E3C] mr-3" />
                <h2 className="text-xl font-semibold text-[#0D3547]">Store Information</h2>
              </div>

              <form onSubmit={handleStoreSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 flex flex-col items-center mb-6">
                    <div className="relative mb-4">
                      <img 
                        src={store.logoPreview} 
                        alt="Store Logo" 
                        className="w-24 h-24 rounded-lg object-cover border-2 border-[#8B5E3C]"
                      />
                      <label 
                        htmlFor="storeLogo"
                        className="absolute bottom-0 right-0 bg-[#0D3547] p-2 rounded-full cursor-pointer hover:bg-[#0D3547]/90 transition"
                      >
                        <CameraIcon className="h-4 w-4 text-white" />
                        <input 
                          id="storeLogo" 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleLogoChange}
                        />
                      </label>
                    </div>
                    <span className="text-sm text-gray-500">Click to change store logo</span>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="storeName" className="block text-sm font-medium text-gray-700 mb-1">
                      Store Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="storeName"
                      name="name"
                      type="text"
                      value={store.name}
                      onChange={handleStoreChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5E3C] focus:border-[#0D3547] transition"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="storeDescription" className="block text-sm font-medium text-gray-700 mb-1">
                      Store Description
                    </label>
                    <textarea
                      id="storeDescription"
                      name="description"
                      rows={4}
                      value={store.description}
                      onChange={handleStoreChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5E3C] focus:border-[#0D3547] transition"
                      placeholder="Describe your store and what makes it special..."
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#0D3547] text-white rounded-lg hover:bg-[#0D3547]/90 transition focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                  >
                    Save Store Info
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <BellIcon className="h-6 w-6 text-[#8B5E3C] mr-3" />
                <h2 className="text-xl font-semibold text-[#0D3547]">Notification Preferences</h2>
              </div>

              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-medium text-[#0D3547] mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Order Updates</label>
                        <p className="text-sm text-gray-500">Get notified when you receive new orders</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.orderUpdates}
                          onChange={(e) => setNotifications(prev => ({ ...prev, orderUpdates: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#8B5E3C]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8B5E3C]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Inventory Alerts</label>
                        <p className="text-sm text-gray-500">Get alerts when products are low in stock</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.inventoryAlerts}
                          onChange={(e) => setNotifications(prev => ({ ...prev, inventoryAlerts: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#8B5E3C]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8B5E3C]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Weekly Reports</label>
                        <p className="text-sm text-gray-500">Receive weekly sales and performance reports</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.weeklyReports}
                          onChange={(e) => setNotifications(prev => ({ ...prev, weeklyReports: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#8B5E3C]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8B5E3C]"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-[#0D3547] mb-4">SMS Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700">SMS Alerts</label>
                        <p className="text-sm text-gray-500">Receive urgent notifications via SMS</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.smsNotifications}
                          onChange={(e) => setNotifications(prev => ({ ...prev, smsNotifications: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#8B5E3C]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8B5E3C]"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => showSuccessMessage('Notification preferences updated successfully!')}
                    className="px-6 py-2 bg-[#0D3547] text-white rounded-lg hover:bg-[#0D3547]/90 transition focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Payment Tab */}
          {activeTab === 'payment' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <CreditCardIcon className="h-6 w-6 text-[#8B5E3C] mr-3" />
                <h2 className="text-xl font-semibold text-[#0D3547]">Payment Settings</h2>
              </div>

              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-medium text-[#0D3547] mb-4">Bank Account Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bank Name
                      </label>
                      <select
                        value={payment.bankName}
                        onChange={(e) => setPayment(prev => ({ ...prev, bankName: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5E3C] focus:border-[#0D3547] transition"
                      >
                        <option value="Bank of Kigali">Bank of Kigali</option>
                        <option value="Equity Bank">Equity Bank</option>
                        <option value="Cogebanque">Cogebanque</option>
                        <option value="Access Bank">Access Bank</option>
                        <option value="GT Bank">GT Bank</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Account Number
                      </label>
                      <input
                        type="text"
                        value={payment.accountNumber}
                        onChange={(e) => setPayment(prev => ({ ...prev, accountNumber: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5E3C] focus:border-[#0D3547] transition"
                        placeholder="Enter account number"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-medium text-[#0D3547] mb-4">Mobile Money</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Money Number
                    </label>
                    <input
                      type="tel"
                      value={payment.mobileMoneyNumber}
                      onChange={(e) => setPayment(prev => ({ ...prev, mobileMoneyNumber: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5E3C] focus:border-[#0D3547] transition"
                      placeholder="+250 788 123 456"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-[#0D3547] mb-4">Preferred Payment Method</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={payment.preferredMethod === 'bank'}
                        onChange={(e) => setPayment(prev => ({ ...prev, preferredMethod: e.target.value }))}
                        className="h-4 w-4 text-[#8B5E3C] focus:ring-[#8B5E3C] border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Bank Transfer</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="mobile"
                        checked={payment.preferredMethod === 'mobile'}
                        onChange={(e) => setPayment(prev => ({ ...prev, preferredMethod: e.target.value }))}
                        className="h-4 w-4 text-[#8B5E3C] focus:ring-[#8B5E3C] border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Mobile Money</span>
                    </label>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => showSuccessMessage('Payment settings updated successfully!')}
                    className="px-6 py-2 bg-[#0D3547] text-white rounded-lg hover:bg-[#0D3547]/90 transition focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                  >
                    Save Payment Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <ShieldCheckIcon className="h-6 w-6 text-[#8B5E3C] mr-3" />
                <h2 className="text-xl font-semibold text-[#0D3547]">Security Settings</h2>
              </div>

              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-medium text-[#0D3547] mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Enable 2FA</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <button
                      onClick={() => showSuccessMessage('Two-factor authentication will be set up via SMS')}
                      className="px-4 py-2 bg-[#0D3547] text-white rounded-lg hover:bg-[#0D3547]/90 transition text-sm"
                    >
                      Enable 2FA
                    </button>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-medium text-[#0D3547] mb-4">Login Security</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Login Alerts</label>
                        <p className="text-sm text-gray-500">Get notified of new login attempts</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#8B5E3C]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8B5E3C]"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-[#0D3547] mb-4">Active Sessions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Current Session</p>
                          <p className="text-sm text-gray-500">Windows • Chrome • Kigali, Rwanda</p>
                        </div>
                      </div>
                      <span className="text-sm text-green-600 font-medium">Active</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => showSuccessMessage('Security settings updated successfully!')}
                    className="px-6 py-2 bg-[#0D3547] text-white rounded-lg hover:bg-[#0D3547]/90 transition focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                  >
                    Save Security Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Password Tab */}
          {activeTab === 'password' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <LockClosedIcon className="h-6 w-6 text-[#8B5E3C] mr-3" />
                <h2 className="text-xl font-semibold text-[#0D3547]">Change Password</h2>
              </div>

              <form onSubmit={handlePasswordSubmit}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="currentPassword"
                      name="current"
                      type="password"
                      value={password.current}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5E3C] focus:border-[#0D3547] transition"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="newPassword"
                        name="new"
                        type="password"
                        value={password.new}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5E3C] focus:border-[#0D3547] transition"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="confirmPassword"
                        name="confirm"
                        type="password"
                        value={password.confirm}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5E3C] focus:border-[#0D3547] transition"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-blue-800 mb-2">Password Requirements:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• At least 8 characters long</li>
                      <li>• Contains at least one uppercase letter</li>
                      <li>• Contains at least one lowercase letter</li>
                      <li>• Contains at least one number</li>
                      <li>• Contains at least one special character</li>
                    </ul>
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#0D3547] text-white rounded-lg hover:bg-[#0D3547]/90 transition focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;