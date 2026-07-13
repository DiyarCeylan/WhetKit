import { useState } from 'react'
import { Link } from 'react-router-dom'
import client from '../api/client'
import { Sparkles, Copy, Check, ArrowLeft, Loader2 } from 'lucide-react'

const presets = [
  { label: 'Blog Yazısı', prompt: 'Şu konuda kısa bir blog yazısı yaz: ' },
  { label: 'Sosyal Medya', prompt: 'Şu konuda etkileyici bir sosyal medya metni yaz: ' },
  { label: 'E-posta', prompt: 'Profesyonel bir e-posta taslağı yaz: ' },
  { label: 'Ürün Açıklaması', prompt: 'Şu ürün için çekici bir açıklama yaz: ' },
]

export function TextGenerator() {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    setLoading(true)
    setError('')
    setResult('')
    try {
      const res = await client.post('/tools/text-generator', { prompt })
      setResult(res.data.content)
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="h-4 w-4" /> Dashboard'a Dön
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Metin Üretici</h1>
          <p className="text-gray-600 text-sm">AI ile hızlıca içerik oluşturun</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {presets.map(({ label, prompt: p }) => (
          <button
            key={label}
            onClick={() => setPrompt(p)}
            className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
          >
            {label}
          </button>
        ))}
      </div>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ne hakkında içerik oluşturmamı istersiniz?"
        className="w-full h-32 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none"
      />

      <button
        onClick={handleGenerate}
        disabled={loading || !prompt.trim()}
        className="mt-4 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 disabled:opacity-50 transition-colors inline-flex items-center gap-2"
      >
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
        {loading ? 'Üretiliyor...' : 'İçerik Üret'}
      </button>

      {error && (
        <div className="mt-4 bg-red-50 text-red-700 p-4 rounded-xl">{error}</div>
      )}

      {result && (
        <div className="mt-6 bg-white rounded-2xl border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Üretilen İçerik</h3>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Kopyalandı' : 'Kopyala'}
            </button>
          </div>
          <div className="prose prose-sm max-w-none whitespace-pre-wrap">{result}</div>
        </div>
      )}
    </div>
  )
}
