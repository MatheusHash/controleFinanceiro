import axios from "axios";

const baseUrl = "http://localhost:5000";

export async function login(loginData: { email: string; password: string }) {
  const res = await axios.post(
    baseUrl + "/auth/login",
    {
      email: loginData.email,
      password: loginData.password,
    },
    {
      withCredentials: true,
    }
  );
  if (!(res.status == 201)) {
    const errorText = res.statusText;
    console.error("Erro no login:", errorText);
    throw new Error("Falha no login");
  }

  return await res.data;
}

export async function getUser() {
  const res = await axios.get(baseUrl + "/auth/user/me", {
    withCredentials: true,
  });
  if (!(res.status == 200)) {
    const errorText = res.statusText;
    console.error("Erro ao buscar usuário:", errorText);
    return null;
  }
  console.log(res);
  localStorage.setItem("user", res.data);
  return await res.data;
}
