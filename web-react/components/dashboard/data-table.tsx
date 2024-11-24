"use client"

import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowUpDown, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { DadosColetados, dadosColetadosService } from "@/services/api"
import { format } from "date-fns"

export function DataTable() {
  const [data, setData] = useState<DadosColetados[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortKey, setSortKey] = useState<keyof DadosColetados>("DataHora")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await dadosColetadosService.getAll()
      setData(response)
    } catch (error) {
      setError('Erro ao carregar dados. Por favor, tente novamente.')
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  const sortData = (key: keyof DadosColetados) => {
    const isAsc = sortKey === key && sortOrder === "asc"
    setSortKey(key)
    setSortOrder(isAsc ? "desc" : "asc")

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return isAsc ? 1 : -1
      if (a[key] > b[key]) return isAsc ? -1 : 1
      return 0
    })

    setData(sortedData)
  }

  const formatDataHora = (dataHora: string) => {
    return format(new Date(dataHora), "dd/MM/yyyy HH:mm")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        {error}
        <Button onClick={loadData} variant="outline" className="ml-2">
          Tentar novamente
        </Button>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        Nenhum dado encontrado
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              Usuario {" "}
              <Button variant="ghost" onClick={() => sortData("codigo")}>
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              Data e Hora {" "}
              <Button variant="ghost" onClick={() => sortData("DataHora")}>
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              Tipo {" "}
              <Button variant="ghost" onClick={() => sortData("Tipo")}>
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              Valor1 {" "}
              <Button variant="ghost" onClick={() => sortData("Valor1")}>
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              Valor2 {" "}
              <Button variant="ghost" onClick={() => sortData("Valor2")}>
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Em casa?</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={`${row.codigo}-${row.DataHora}`}>
              <TableCell>{row.codigo}</TableCell>
              <TableCell>{formatDataHora(row.DataHora)}</TableCell>
              <TableCell>{row.Tipo}</TableCell>
              <TableCell>{row.Valor1}</TableCell>
              <TableCell>{row.Valor2 ?? '-'}</TableCell>
              <TableCell>{row.EmCasa ? 'Sim' : 'Não'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

