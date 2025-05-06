import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginForm from "@/components/forms/LoginForm";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="bg-primary_bg justify-start bg-contain">
      <section className="mx-auto mt-20 flex w-1/2 flex-col gap-4 rounded-2xl bg-white p-8">
        <h2 className="title-3">Iniciar Sesión</h2>
        <LoginForm />
      </section>
    </main>
  );
}
