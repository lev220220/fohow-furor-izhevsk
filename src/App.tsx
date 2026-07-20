import { Routes, Route, Navigate } from 'react-router'
import { AuthProvider } from '@/lib/auth'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import Team from '@/pages/Team'
import Training from '@/pages/Training'
import Catalog from '@/pages/Catalog'
import ProductDetail from '@/pages/ProductDetail'
import Programs from '@/pages/Programs'
import ProgramDetail from '@/pages/ProgramDetail'
import Business from '@/pages/Business'
import Company from '@/pages/Company'
import Doctors from '@/pages/Doctors'
import Reviews from '@/pages/Reviews'
import Devices from '@/pages/Devices'
import Promo from '@/pages/Promo'
import Contacts from '@/pages/Contacts'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Knowledge from '@/pages/Knowledge'
import Marketing from '@/pages/Marketing'
import Admin from '@/pages/Admin'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/training" element={<Training />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:slug" element={<ProgramDetail />} />
          <Route path="/business" element={<Business />} />
          <Route path="/company" element={<Company />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/promo" element={<Promo />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
