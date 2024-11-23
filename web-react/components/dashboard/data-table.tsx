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
import { ArrowUpDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { DadosColetados, dadosColetadosService } from "@/services/api"
import { format } from "date-fns"

export function DataTable() {
  const [data, setData] = useState<DadosColetados[]>([])
  const [sortKey, setSortKey] = useState<keyof DadosColetados>("DataHora")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const response = await dadosColetadosService.getAll()
      setData(response)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
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
              DataHora {" "}
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
            <TableHead>EmCasa</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.seq}>
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

