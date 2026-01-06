import * as jose from 'jose'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY
const key = new TextEncoder().encode(secretKey)

export async function getSession() {
  const session = (await cookies()).get('token')?.value
  return session
}

export async function decrypt(token: string) {
  const { payload } = await jose.jwtVerify(token, key)
  return payload
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('token')?.value
  if (!session) return
  await decrypt(session)
  const res = NextResponse.next()
  res.cookies.set({
    name: 'token',
    value: session,
    httpOnly: true,
    // expires: parsed['expires'],
  })
  return res
}

export async function logout() {
  ;(await cookies()).delete('token')
}
