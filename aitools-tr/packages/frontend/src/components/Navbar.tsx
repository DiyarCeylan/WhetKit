import { Link } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { Bot, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const { isAuthenticated, logout } = useAuthStore()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <Bot className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">AITools.tr</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/araclar" className="text-gray-600 hover:text-gray-900">Araçlar</Link>
            <Link to="/fiyatlandirma" className="text-gray-600 hover:text-gray-900">Fiyatlandırma</Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
                <button onClick={logout} className="text-gray-600 hover:text-gray-900">Çıkış</button>
              </>
            ) : (
              <>
                <Link to="/giris" className="text-gray-600 hover:text-gray-900">Giriş Yap</Link>
                <Link to="/kayit" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
                  Hemen Başla
                </Link>
              </>
            )}
          </div>

          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t">
          <div className="px-4 py-4 space-y-3">
            <Link to="/araclar" className="block py-2">Araçlar</Link>
            <Link to="/fiyatlandirma" className="block py-2">Fiyatlandırma</Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="block py-2">Dashboard</Link>
                <button onClick={logout} className="block py-2">Çıkış</button>
              </>
            ) : (
              <>
                <Link to="/giris" className="block py-2">Giriş Yap</Link>
                <Link to="/kayit" className="block bg-primary-600 text-white px-4 py-2 rounded-lg text-center">
                  Hemen Başla
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
