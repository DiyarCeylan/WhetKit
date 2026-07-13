import { cn } from '../lib/utils'
import { Check } from 'lucide-react'

interface PricingCardProps {
  name: string
  price: string
  period: string
  features: string[]
  highlighted?: boolean
  cta: string
  onSelect?: () => void
}

export function PricingCard({ name, price, period, features, highlighted, cta, onSelect }: PricingCardProps) {
  return (
    <div className={cn(
      'rounded-2xl p-8 border-2 transition-all',
      highlighted
        ? 'border-primary-600 bg-white shadow-xl scale-105'
        : 'border-gray-200 bg-white'
    )}>
      {highlighted && (
        <span className="bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          En Popüler
        </span>
      )}
      <h3 className="text-xl font-bold mt-4">{name}</h3>
      <div className="mt-4">
        <span className="text-4xl font-bold">{price}</span>
        <span className="text-gray-500 ml-2">{period}</span>
      </div>
      <ul className="mt-6 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <Check className="h-5 w-5 text-green-500 shrink-0" />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={onSelect}
        className={cn(
          'w-full mt-8 py-3 rounded-lg font-semibold transition-colors',
          highlighted
            ? 'bg-primary-600 text-white hover:bg-primary-700'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        )}
      >
        {cta}
      </button>
    </div>
  )
}
