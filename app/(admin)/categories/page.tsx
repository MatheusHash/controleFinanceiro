'use client'
import { Categories } from '@/components/categories/Categories'
import { FormCategories } from '@/components/categories/FormCategories'
import { Button } from '@/components/ui/button'
import { useCategories } from '@/hooks/useCategories'
import { useUser } from '@/hooks/useUser'
import { FilterIcon, PlusIcon, X } from 'lucide-react'
import { useState } from 'react'

export default function Categorie() {
  const { user } = useUser()
  const { categories, isErrorCategories, isLoadingCategories, mutateCategories } = useCategories()

  const [showFormCategorie, setShowFormCategorie] = useState<boolean>(false)

  return (
    <section>
      <h1 className="font-bold text-3xl text-gray-700 uppercase">Categorias</h1>
      <div className="text-gray-700 font-normal">
        <div id="header">
          <p>
            Voce pode criar categorias para separar suas contas de acordo com a sua necessidade.
            Utilizar as categorias ajuda a aprimorar ainda mais o seu gerenciamento financeiro com
            as funcionalidades que so sao possiveis de utilizar quando uma conta esta dentro de
            alguma categoria.
          </p>

          <div id="actions">
            <Button variant={'link'} className="text-blue-600 ">
              <FilterIcon size={12} />
              Filtrar
            </Button>
            <Button
              onClick={(e) => {
                setShowFormCategorie(true)
              }}
              className="text-white bg-blue-600"
            >
              categoria <PlusIcon size={12} />
            </Button>
          </div>
        </div>
        {showFormCategorie && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 relative">
              {/* Header do modal */}
              <div className="flex items-center justify-between border-b p-4">
                <h2 className="text-xl font-semibold text-gray-700">Criar Categoria</h2>
                <Button
                  onClick={() => setShowFormCategorie(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <X size={18} />
                </Button>
              </div>

              <div className="p-4">
                <FormCategories
                  action_type="create"
                  onSuccess={() => {
                    mutateCategories()
                    setShowFormCategorie(false)
                  }}
                  // onCancel={() => setShowFormCategorie(false)}
                />
              </div>
              <div className="flex justify-end border-t p-3">
                <Button onClick={() => setShowFormCategorie(false)}>Cancelar</Button>
              </div>
            </div>
          </div>
        )}

        {isLoadingCategories ? (
          <p>Carregando categorias...</p>
        ) : isErrorCategories ? (
          <p>Erro ao carregar categorias</p>
        ) : (
          user && <Categories categories={categories} />
        )}
      </div>
    </section>
  )
}
