'use client'
import useSWR from 'swr'
import api from '@/lib/axios'

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR('me')

  return {
    user: data,
    isLoading,
    isError: error,
    mutateUser: mutate,
    logout: async () => {
      await api.post('/logout') // exemplo de logout (opcional)
      mutate(null, false) // limpa cache do usuário
    },
  }
}
