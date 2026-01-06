'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

interface AdminLayoutButtonProps {
  label: string
  icon?: ReactNode
  href?: string
  onClick?: () => void
  className?: string
}

export function AdminLayoutButton({
  label,
  icon,
  href,
  onClick,
  className = '',
}: AdminLayoutButtonProps) {
  const baseStyles =
    'cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#1d4ed8] transition-colors group w-full text-left'

  if (href) {
    return (
      <Link href={href} className={`${baseStyles} ${className}`}>
        {icon}
        <span className="ms-3 whitespace-nowrap">{label}</span>
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={`${baseStyles} ${className}`}>
      {icon}
      <span className="ms-3 whitespace-nowrap">{label}</span>
    </button>
  )
}
