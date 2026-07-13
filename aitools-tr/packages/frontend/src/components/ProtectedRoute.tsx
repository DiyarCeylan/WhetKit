import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore()

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Yükleniyor...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/giris" replace />
  }

  return <>{children}</>
}
