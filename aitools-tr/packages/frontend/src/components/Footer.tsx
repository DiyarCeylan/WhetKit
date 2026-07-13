import { Bot } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Bot className="h-6 w-6 text-primary-400" />
            <span className="text-white font-bold">AITools.tr</span>
          </div>
          <p className="text-sm">Türkiye'nin yapay zeka araçları platformu.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Araçlar</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/araclar" className="hover:text-white">Metin Üretici</Link></li>
            <li><Link to="/araclar" className="hover:text-white">Kod Asistanı</Link></li>
            <li><Link to="/araclar" className="hover:text-white">Görsel Üretici</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Şirket</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/hakkimizda" className="hover:text-white">Hakkımızda</Link></li>
            <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link to="/iletisim" className="hover:text-white">İletişim</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Yasal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/gizlilik" className="hover:text-white">Gizlilik Politikası</Link></li>
            <li><Link to="/kosullar" className="hover:text-white">Kullanım Şartları</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-sm">
        © 2026 AITools.tr. Tüm hakları saklıdır.
      </div>
    </footer>
  )
}
