'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronDown, ChevronUp, Wallet } from 'lucide-react'

interface CategoryCardProps {
  category: {
    id: number
    name: string
    type: string
    accounts?: { id: number; name: string }[] // opcional
  }
}

export function CategoryCard({ category }: CategoryCardProps) {
  const [showAccounts, setShowAccounts] = useState(false)

  return (
    <Card className="shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 rounded-2xl">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Wallet size={18} className="text-blue-600" />
          {category.name}
        </CardTitle>
        <span
          className={`px-3 py-1 text-xs rounded-full ${
            category.type === 'despesa' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
          }`}
        >
          {category.type}
        </span>
      </CardHeader>

      <CardContent>
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAccounts(!showAccounts)}
            className="text-sm"
          >
            {showAccounts ? (
              <>
                Ocultar contas <ChevronUp size={14} className="ml-1" />
              </>
            ) : (
              <>
                Ver contas <ChevronDown size={14} className="ml-1" />
              </>
            )}
          </Button>
        </div>

        {showAccounts && (
          <div className="mt-4 border-t pt-3">
            {category.accounts && category.accounts.length > 0 ? (
              <ul className="space-y-1 text-sm text-gray-700">
                {category.accounts.map((acc) => (
                  <li
                    key={acc.id}
                    className="flex justify-between items-center bg-gray-50 p-2 rounded-md"
                  >
                    <span>{acc.name}</span>
                    <span className="text-gray-500 text-xs">ID: {acc.id}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm italic">Nenhuma conta vinculada</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
