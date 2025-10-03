import { decrypt, getSession } from "@/lib/session";
import axios from "axios";

export async function getLoggedUser() {
  // const sessionUser = await getSession();
  // if (!sessionUser) return null;
  // const loggedUser = await decrypt(sessionUser);
  // console.log(loggedUser);
  const res = await fetch("http://localhost:5000/accounts/user", {
    method: "GET",
    credentials: "include",
  }).then((response) => {
    if (response.status == 401) {
      return "null";
    }
    return res.json();
  });

  // const user = {
  //   id: loggedUser.sub,
  //   name: loggedUser.name,
  //   email: loggedUser.email,
  //   profilePicture: loggedUser?.picture ?? null,
  // };
  return res;
}
