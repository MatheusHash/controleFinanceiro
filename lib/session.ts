import * as jose from "jose";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

const secretKey = process.env.secret_key;
const key = new TextEncoder().encode(secretKey);

export async function getSession() {
  const session = (await cookies()).get("token")?.value;
  return session;
}

export async function encrypt(payload: any) {
  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jose.jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("token")?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);

  const res = NextResponse.next();
  res.cookies.set({
    name: "token",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
