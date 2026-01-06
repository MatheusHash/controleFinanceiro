'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { CategoryFormData, categorySchema } from '@/src/schemas/categories.schema'

interface FormCategoriesInterface {
  action_type: 'create' | 'update'
  onSuccess?: () => void // callback opcional após criar
  defaultValues?: CategoryFormData
}

export function FormCategories({ action_type, onSuccess, defaultValues }: FormCategoriesInterface) {
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: defaultValues || {
      name: '',
      type: 'despesa',
      description: '',
    },
  })

  const [loading, setLoading] = useState(false)

  async function onSubmit(data: CategoryFormData) {
    try {
      console.log('data', data)
      setLoading(true)
      const res = await fetch('/api/categories', {
        method: action_type === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      // if (!res.ok) throw Error("Erro ao salvar categoria");
      console.log(res)
      if (onSuccess) onSuccess()
      form.reset()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da categoria</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Supermercado" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-500"
                >
                  <option value="despesa">Despesa</option>
                  <option value="receita">Receita</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Pilates da ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={loading}
          className="text-white bg-blue-600 hover:bg-blue-700 w-full hover:cursor-pointer"
        >
          {loading ? 'Salvando...' : 'Criar categoria'} <PlusIcon size={14} className="ml-1" />
        </Button>
      </form>
    </Form>
  )
}
