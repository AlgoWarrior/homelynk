import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProductGrid from './components/ProductGrid';
import CategoryGrid from './components/CategoryGrid';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import SellerDashboard from './components/seller/SellerDashboard';
import Settings from './components/seller/Settings';
import Orders from './components/seller/Orders';
import Overview from './components/seller/Overview';
import NotFoundPage from './pages/NotFoundPage';
import ManageProducts from './components/seller/ManageProducts';
import OrderTracking from './pages/OrderTracking.tsx';
import SuperAdminDashboard from './components/SuperAdmin/SuperAdminDashboard';
import OverviewAdmin from './components/SuperAdmin/Overview.tsx';
import ApproveSellers from './components/SuperAdmin/ApproveSellers';
import ApproveProducts from './components/SuperAdmin/ApproveProducts';
import ManageUsers from './components/SuperAdmin/ManageUsers';
import Reports from './components/SuperAdmin/Reports';
import Checkout from './pages/Checkout.tsx';
import AllProducts from './pages/AllProducts';


function AppContent() {
  const location = useLocation();

  const hideNavbar =
    location.pathname.startsWith('/seller') || location.pathname.startsWith('/admin');


  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <CategoryGrid />
              <ProductGrid />
              <Footer />
            </>
          }
        />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/BrowseProducts" element={<CategoryGrid />} />


        {/* ✅ SELLER DASHBOARD ROUTES */}
        <Route path="/seller/*" element={<SellerDashboard />}>
          <Route index element={<Overview />} />
          <Route path="orders" element={<Orders />} />
          <Route path="settings" element={<Settings />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="browse-products" element={<ProductGrid />} />
        </Route>

        <Route path="/admin/*" element={<SuperAdminDashboard />}>
          <Route index element={<OverviewAdmin />} />
          <Route path="approve-sellers" element={<ApproveSellers />} />
          <Route path="approve-products" element={<ApproveProducts />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="reports" element={<Reports />} />
        </Route>


        <Route path="/track-order" element={<OrderTracking />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
