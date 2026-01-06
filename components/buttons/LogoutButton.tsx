'use client'

import { LogOutIcon } from 'lucide-react'
import { AdminLayoutButton } from './AdminLayoutButton'

export function LogoutButton() {
  async function handleLogout() {
    await fetch('/api/logout', { method: 'POST' })
    window.location.href = '/'
  }

  return (
    <AdminLayoutButton label="Log out" icon={<LogOutIcon size={16} />} onClick={handleLogout} />
  )
}
