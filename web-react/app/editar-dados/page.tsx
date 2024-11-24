import { EditDataTable } from "@/components/editar-dados/edit-data-table"

export default function Page() {
  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-center text-white bg-[#6587FF] py-2 rounded-md mb-6 w-full">EDITAR DADOS</h1>
      <EditDataTable />
    </div>
  )
}

