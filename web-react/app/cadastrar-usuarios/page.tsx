import { UserForm } from "@/components/cadastrar-usuarios/user-form"

export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-center text-white bg-[#6587FF] py-2 rounded-md mb-6 max-w-2xl mx-auto">CADASTRAR USUÁRIOS</h1>
      <UserForm />
    </div>
  )
}

