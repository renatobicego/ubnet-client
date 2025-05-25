"use client";
import { Form, Input } from "@heroui/react";
import PrimaryButton from "../buttons/PrimaryButton";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Correo o contraseña incorrectos");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Ocurrió un error al iniciar sesión. Intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form className="flex w-full max-w-sm flex-col gap-4" onSubmit={onSubmit}>
      <Input
        isRequired
        errorMessage="Ingrese un mail válido"
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="Ingrese su mail"
        type="email"
      />
      <Input
        isRequired
        label="Contraseña"
        labelPlacement="outside"
        name="password"
        placeholder="Ingrese su contraseña"
        type="password"
      />
      {error && <p className="text-red-500">{error}</p>}
      <PrimaryButton isLoading={isLoading} type="submit">
        {isLoading ? "Iniciando..." : "Iniciar Sesión"}
      </PrimaryButton>
    </Form>
  );
};

export default LoginForm;
