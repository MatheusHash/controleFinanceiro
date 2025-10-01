"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { getUser, login } from "@/services/auth";
import { useEffect, useState } from "react";

const loginSchema = z.object({
  email: z.email("E-mail inválido").min(5, "E-mail muito curto"),
  password: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .max(64, "A senha pode ter no máximo 64 caracteres"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Home() {
  const { push } = useRouter();
  const [user, setUser] = useState<any>();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    getUser().then(setUser);
  }, []);

  // No seu componente Next.js
  async function onSubmit(values: LoginFormValues) {
    try {
      await login(values);
      const user = await getUser();
      setUser(user);
      push("/home");
    } catch (error) {
      console.error("Erro no onSubmit:", error);
    }
  }

  return (
    <div>
      <section id="home" className="w-full h-dvh flex justify-between ">
        <div
          id="side-home"
          className="w-full h-dvh p-12 flex items-center justify-center bg-white text-[#374151]"
        >
          <div>
            <h1 id="logo-title">CHRODAR</h1>
            <h3 id="subtitle">o futuro te alcanca.</h3>
          </div>
        </div>
        <div
          id="login"
          className="w-full h-dvh p-12 flex items-center justify-center  bg-[#2563EB]"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 flex-row items-center"
            >
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-[300px]">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="text-white placeholder:text-white bg-transparent"
                        type="email"
                        placeholder="Digite seu email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-[300px]">
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        className="text-white placeholder:text-white bg-transparent"
                        type="password"
                        placeholder="Digite sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div id="form-buttons" className="flex justify-between">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    push("/register");
                  }}
                  className="cursor-pointer p-0"
                >
                  Criar uma conta
                </Button>
                <Button type="submit" className="cursor-pointer">
                  Entrar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </section>
    </div>
  );
}
