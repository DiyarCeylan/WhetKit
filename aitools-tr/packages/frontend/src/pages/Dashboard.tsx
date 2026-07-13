import { Link } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { Sparkles, Code, Image, ArrowRight, CreditCard, BarChart3 } from 'lucide-react'

const tools = [
  { icon: Sparkles, name: 'Metin Üretici', desc: 'Blog, sosyal medya, e-posta içerikleri', path: '/dashboard/araclar/metin-uretici', color: 'bg-blue-500' },
  { icon: Code, name: 'Kod Asistanı', desc: 'Kod üretme ve açıklama', path: '#', color: 'bg-green-500', soon: true },
  { icon: Image, name: 'Görsel Üretici', desc: 'Prompt\'tan görsel oluşturma', path: '#', color: 'bg-purple-500', soon: true },
]

export function Dashboard() {
  const user = useAuthStore((s) => s.user)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Hoş geldin, {user?.name} 👋</h1>
        <p className="text-gray-600 mt-1">AI araçlarını kullanmaya başla</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border p-6">
          <BarChart3 className="h-8 w-8 text-primary-600 mb-2" />
          <p className="text-sm text-gray-500">Bugünkü Kullanım</p>
          <p className="text-2xl font-bold">3 / 10</p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <CreditCard className="h-8 w-8 text-green-600 mb-2" />
          <p className="text-sm text-gray-500">Mevcut Plan</p>
          <p className="text-2xl font-bold capitalize">Ücretsiz</p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <Sparkles className="h-8 w-8 text-yellow-600 mb-2" />
          <p className="text-sm text-gray-500">Toplam İşlem</p>
          <p className="text-2xl font-bold">47</p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Araçlar</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tools.map(({ icon: Icon, name, desc, path, color, soon }) => (
          <Link
            key={name}
            to={path}
            className={`bg-white rounded-2xl border p-6 hover:shadow-lg transition-all group ${soon ? 'opacity-60 pointer-events-none' : ''}`}
          >
            <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-1">{name}</h3>
            <p className="text-gray-600 text-sm mb-4">{desc}</p>
            {soon ? (
              <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">Yakında</span>
            ) : (
              <span className="text-primary-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                Kullan <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
