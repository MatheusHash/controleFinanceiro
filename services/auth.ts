export async function login(loginData: { email: string; password: string }) {
  console.log("=== FRONTEND: INICIANDO LOGIN ===");

  const res = await fetch("http://127.0.0.1:5000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(loginData),
  });

  console.log("Response status:", res.status);
  console.log("Response headers:", res.headers);
  console.log("Response ok:", res.ok);

  // Verifica os cookies que foram setados
  const setCookieHeader = res.headers.get("set-cookie");
  console.log("Set-Cookie header:", setCookieHeader);

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Erro no login:", errorText);
    throw new Error("Falha no login");
  }

  const data = await res.json();
  console.log("Dados retornados:", data);
  return data;
}

export async function getUser() {
  console.log("=== FRONTEND: BUSCANDO USUÁRIO ===");

  const res = await fetch("http://127.0.0.1:5000/auth/me", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("GET /me status:", res.status);
  console.log("GET /me headers:", res.headers);
  console.log("GET /me ok:", res.ok);

  // Verifica se cookies estão sendo enviados
  console.log("Request credentials:", "include");

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Erro ao buscar usuário:", errorText);
    return null;
  }

  const userData = await res.json();
  console.log("Usuário retornado:", userData);
  return userData;
}
