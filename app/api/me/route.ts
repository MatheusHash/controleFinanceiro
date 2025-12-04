import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = await cookies()
  const res = await fetch(`${process.env.API_URL}/auth/user/me`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  })
  if (!res.ok) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const user = await res.json()
  return NextResponse.json(user)
}
