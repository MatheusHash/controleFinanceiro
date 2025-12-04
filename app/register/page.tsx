'use client'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import api from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const registerSchema = z
  .object({
    name: z.string().min(4, 'Muito curto. Digite nome e sobrenome!'),
    email: z.email('E-mail invalido'),
    password: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .max(64, 'A senha pode ter no máximo 64 caracteres'),
    confirmPassword: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .max(64, 'A senha pode ter no máximo 64 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type RegisterFormValues = z.infer<typeof registerSchema>

export default function Register() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })
  const router = useRouter()

  async function onSubmit(formData: RegisterFormValues) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (response.status == 201) {
        router.push(`/`)
      }
    } catch (error) {
      console.error('Erro de rede:', error)
    }
  }
  return (
    <section id="register" className="h-dvh w-dvw flex justify-center items-center bg-white">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[600px] text-black">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome de usuario</FormLabel>
                <FormControl>
                  <Input
                    className="text[#2563EB] border-black placeholder:text[#2563EB] bg-transparent"
                    placeholder="Como voce quer ser chamado?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="text[#2563EB] border-black placeholder:text[#2563EB] bg-transparent"
                    placeholder="Digite seu email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-[300px]">
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    className="text[#2563EB] border-black placeholder:text[#2563EB] bg-transparent"
                    type="password"
                    placeholder="Digite sua senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="w-[300px]">
                <FormLabel>Confirme a senha</FormLabel>
                <FormControl>
                  <Input
                    className="text[#2563EB] border-black placeholder:text[#2563EB] bg-transparent"
                    type="password"
                    placeholder="Repita sua senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div id="form-buttons" className="space-x-6 w-full flex justify-between ">
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                router.push('/')
              }}
              className="cursor-pointer"
            >
              cancelar
            </Button>
            <Button type="submit" className="cursor-pointer">
              Criar conta
            </Button>
          </div>
        </form>
      </Form>
    </section>
  )
}
