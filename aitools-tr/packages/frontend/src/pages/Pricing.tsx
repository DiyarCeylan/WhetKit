import { useState } from 'react'
import { PricingCard } from '../components/PricingCard'
import { useAuthStore } from '../stores/authStore'
import client from '../api/client'

export function Pricing() {
  const [interval, setInterval] = useState<'month' | 'year'>('month')
  const { isAuthenticated } = useAuthStore()

  const handleSelect = async (plan: 'pro' | 'business') => {
    if (!isAuthenticated) {
      window.location.href = '/kayit'
      return
    }
    try {
      const res = await client.post('/subscription/checkout', { plan, interval })
      window.location.href = res.data.url
    } catch (err) {
      console.error('Checkout error:', err)
    }
  }

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
      price: interval === 'month' ? '₺199' : '₺150',
      period: interval === 'month' ? '/ay' : '/ay (yıllık)',
      features: ['Sınırsız işlem', 'Tüm araçlar', 'Öncelikli destek', 'Reklamsız'],
      cta: 'Pro\'ya Geç',
      highlighted: true
    },
    {
      name: 'Business',
      price: interval === 'month' ? '₺499' : '₺375',
      period: interval === 'month' ? '/ay' : '/ay (yıllık)',
      features: ['Pro özellikleri', 'API erişimi', 'Toplu işlem', 'Beyaz etiket'],
      cta: 'İletişime Geçin'
    }
  ]

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-4">Fiyatlandırma</h1>
        <p className="text-gray-600 text-center mb-8">İhtiyacınıza uygun planı seçin</p>

        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setInterval('month')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${interval === 'month' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Aylık
          </button>
          <button
            onClick={() => setInterval('year')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${interval === 'year' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Yıllık <span className="text-xs ml-1">(%25 indirim)</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
          {plans.map((plan) => (
            <PricingCard
              key={plan.name}
              {...plan}
              onSelect={() => {
                if (plan.name === 'Pro') handleSelect('pro')
                else if (plan.name === 'Business') handleSelect('business')
                else window.location.href = '/kayit'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
