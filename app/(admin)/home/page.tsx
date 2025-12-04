'use client'
import { useUser } from '@/hooks/useUser'

export default function Home() {
  const { user, isLoading, isError, logout } = useUser()

  if (isLoading) return <p>Carregando usuário...</p>
  if (isError) return <p>Erro ao carregar usuário</p>
  if (!user) return <p>Você não está logado</p>

  return (
    <div>
      <h1>Bem-vindo, {user.name} 👋</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <button onClick={logout}>Sair</button>
    </div>
  )
}
