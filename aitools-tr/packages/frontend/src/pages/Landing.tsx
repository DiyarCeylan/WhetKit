import { Link } from 'react-router-dom'
import { PricingCard } from '../components/PricingCard'
import { Bot, Zap, Shield, Globe, ArrowRight, Sparkles, Code, Image } from 'lucide-react'

const features = [
  { icon: Sparkles, title: 'Metin Üretici', desc: 'Blog, sosyal medya, e-posta içerikleri oluşturun' },
  { icon: Code, title: 'Kod Asistanı', desc: 'Kod üretin, açıklayın, hataları düzeltin' },
  { icon: Image, title: 'Görsel Üretici', desc: 'Prompt\'tan profesyonel görseller oluşturun' },
  { icon: Bot, title: 'Çevirmen', desc: 'AI destekli metin çevirisi yapın' },
  { icon: Zap, title: 'Hızlı Sonuç', desc: 'Saniyeler içinde profesyonel çıktılar' },
  { icon: Shield, title: 'Gizlilik', desc: 'Verileriniz güvende, paylaşım yok' }
]

const plans = [
  {
    name: 'Ücretsiz',
    price: '₺0',
    period: '/ay',
    features: ['Günde 10 işlem', 'Temel araçlar', 'Reklam destekli'],
    cta: 'Ücretsiz Başla'
  },
  {
    name: 'Pro',
    price: '₺199',
    period: '/ay',
    features: ['Sınırsız işlem', 'Tüm araçlar', 'Öncelikli destek', 'Reklamsız'],
    cta: 'Pro\'ya Geç',
    highlighted: true
  },
  {
    name: 'Business',
    price: '₺499',
    period: '/ay',
    features: ['Pro özellikleri', 'API erişimi', 'Toplu işlem', 'Beyaz etiket'],
    cta: 'İletişime Geçin'
  }
]

export function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Yapay Zeka Gücü<br />
            <span className="text-primary-200">Tek Platformda</span>
          </h1>
          <p className="text-xl lg:text-2xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Metin üretme, kod asistanı, görsel oluşturma ve daha fazlası.
            Türkiye'nin AI araçları platformu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/kayit"
              className="bg-white text-primary-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-50 transition-colors inline-flex items-center justify-center gap-2"
            >
              Hemen Başla <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/fiyatlandirma"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
            >
              Fiyatları Gör
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Güçlü Araçlar</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            İhtiyacınız olan tüm AI araçları tek bir yerde
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-2xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all">
                <Icon className="h-10 w-10 text-primary-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50" id="fiyatlandirma">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Basit ve Şeffaf Fiyatlandırma</h2>
          <p className="text-gray-600 text-center mb-12">İhtiyacınıza uygun planı seçin</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
            {plans.map((plan) => (
              <PricingCard key={plan.name} {...plan} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Globe className="h-12 w-12 mx-auto mb-6 text-primary-200" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Hemen Ücretsiz Deneyin
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Kredi kartı gerekmez. Günde 10 ücretsiz işlem.
          </p>
          <Link
            to="/kayit"
            className="bg-white text-primary-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-50 transition-colors inline-block"
          >
            Ücretsiz Kayıt Ol
          </Link>
        </div>
      </section>
    </div>
  )
}
