'use client'
import { CategoryCard } from './CategoryCard'
interface CategoriesProps {
  categories: {
    id: number
    name: string
    type: string
    accounts?: { id: number; name: string }[]
  }[]
}

export function Categories({ categories }: CategoriesProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">LISTAGEM DAS CATEGORIAS CADASTRADAS</h1>

      {categories.length === 0 ? (
        <p className="text-gray-500 text-sm italic">Nenhuma categoria cadastrada ainda.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  )
}
