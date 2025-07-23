import React, { useState } from 'react';
import { CameraIcon, PencilIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const Settings = () => {
  // Profile state
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    profilePicture: null as File | null,
    profilePreview: '/default-profile.jpg'
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-[#0D3547] mb-8">Settings</h1>

      {/* Profile Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center mb-6">
          <PencilIcon className="h-6 w-6 text-[#8B5E3C] mr-2" />
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

      {/* Store Information Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center mb-6">
          <PencilIcon className="h-6 w-6 text-[#8B5E3C] mr-2" />
          <h2 className="text-xl font-semibold text-[#0D3547]">Store Information</h2>
        </div>

        <form onSubmit={handleStoreSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 flex flex-col items-center mb-4">
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Store Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={store.name}
                onChange={handleStoreChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5E3C] focus:border-[#0D3547] transition"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Store Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={store.description}
                onChange={handleStoreChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5E3C] focus:border-[#0D3547] transition"
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

      {/* Password Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-6">
          <LockClosedIcon className="h-6 w-6 text-[#8B5E3C] mr-2" />
          <h2 className="text-xl font-semibold text-[#0D3547]">Change Password</h2>
        </div>

        <form onSubmit={handlePasswordSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="current" className="block text-sm font-medium text-gray-700 mb-1">
                Current Password <span className="text-red-500">*</span>
              </label>
              <input
                id="current"
                name="current"
                type="password"
                value={password.current}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5E3C] focus:border-[#0D3547] transition"
                required
              />
            </div>

            <div>
              <label htmlFor="new" className="block text-sm font-medium text-gray-700 mb-1">
                New Password <span className="text-red-500">*</span>
              </label>
              <input
                id="new"
                name="new"
                type="password"
                value={password.new}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5E3C] focus:border-[#0D3547] transition"
                required
              />
            </div>

            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password <span className="text-red-500">*</span>
              </label>
              <input
                id="confirm"
                name="confirm"
                type="password"
                value={password.confirm}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5E3C] focus:border-[#0D3547] transition"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-[#0D3547] text-white rounded-lg hover:bg-[#0D3547]/90 transition focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;