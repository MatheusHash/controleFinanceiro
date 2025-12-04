import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = await cookies()

  // 1️⃣ Pegar o usuário logado para saber o account.id
  const userRes = await fetch(`${process.env.API_URL}/auth/user/me`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  })

  if (!userRes.ok) {
    return NextResponse.json(
      { message: 'Não foi possível obter o usuário autenticado' },
      { status: userRes.status },
    )
  }

  const user = await userRes.json()
  const categoriesRes = await fetch(
    `${process.env.API_URL}/categories/account/${user.account.id}`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
    },
  )

  const categories = await categoriesRes.json()
  console.log('categories', categories)
  return NextResponse.json(categories, { status: categoriesRes.status })
}

export async function POST(request: Request) {
  const cookieStore = await cookies()

  // 1️⃣ Pegar o usuário logado para saber o account.id
  const userRes = await fetch(`${process.env.API_URL}/auth/user/me`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  })

  if (!userRes.ok) {
    return NextResponse.json(
      { message: 'Não foi possível obter o usuário autenticado' },
      { status: userRes.status },
    )
  }

  const user = await userRes.json()
  const accountId = user.account.id

  // 2️⃣ Receber os dados enviados pelo frontend
  const body = await request.json()

  // 3️⃣ Enviar para o backend NestJS
  const res = await fetch(`${process.env.API_URL}/categories/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify({
      ...body,
      accountId, // garante que o backend receba o ID da conta
    }),
  })

  const data = await res.json()

  return NextResponse.json(data, { status: res.status })
}
