import { DataTable } from "@/components/dashboard/data-table"

const sampleData = [
  {
    usuario: "User1",
    dataHora: "2023-05-01 10:00",
    tipo: "Type A",
    valor1: 10,
    valor2: 20,
    emCasa: "Sim"
  },
  {
    usuario: "User2",
    dataHora: "2023-05-02 11:00",
    tipo: "Type B",
    valor1: 15,
    valor2: 25,
    emCasa: "Não"
  }
]

export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-center text-white bg-[#6587FF] py-2 rounded-md">DADOS COLETADOS</h1>
      <DataTable data={sampleData.map((item, index) => ({...item, key: index}))} />
    </div>
  )
}

