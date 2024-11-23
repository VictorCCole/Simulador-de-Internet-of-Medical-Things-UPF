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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, Trash2, Save, X } from 'lucide-react'
import { DadosColetados, dadosColetadosService } from "@/services/api"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

export function EditDataTable() {
  const [data, setData] = useState<DadosColetados[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<DadosColetados | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const response = await dadosColetadosService.getAll()
      setData(response)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
      toast.error("Erro ao carregar dados")
    }
  }

  const handleEdit = (item: DadosColetados) => {
    if (item.seq) {
      setEditingId(item.seq)
      setEditForm(item)
    }
  }

  const handleSave = async () => {
    if (editForm && editForm.seq) {
      try {
        await dadosColetadosService.update(editForm.seq, editForm)
        setEditingId(null)
        setEditForm(null)
        loadData()
        toast.success("Dados atualizados com sucesso!")
      } catch (error) {
        console.error('Erro ao atualizar dados:', error)
        toast.error("Erro ao atualizar dados")
      }
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditForm(null)
  }

  const handleDelete = async (seq: number) => {
    try {
      await dadosColetadosService.delete(seq)
      loadData()
      toast.success("Dados excluídos com sucesso!")
    } catch (error) {
      console.error('Erro ao deletar dados:', error)
      toast.error("Erro ao deletar dados")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editForm) {
      setEditForm({
        ...editForm,
        [e.target.name]: e.target.value
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    if (editForm) {
      setEditForm({
        ...editForm,
        [name]: name === 'EmCasa' ? value === 'sim' : value
      })
    }
  }

  const formatDataHora = (dataHora: string) => {
    return format(new Date(dataHora), "dd/MM/yyyy HH:mm")
  }

  return (
    <div className="rounded-md border max-w-2xl mx-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuario</TableHead>
            <TableHead>DataHora</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Valor1</TableHead>
            <TableHead>Valor2</TableHead>
            <TableHead>EmCasa</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.seq}>
              {editingId === item.seq ? (
                <>
                  <TableCell>
                    <Input 
                      name="codigo" 
                      type="number"
                      value={editForm?.codigo} 
                      onChange={handleInputChange}
                      className="bg-white"
                    />
                  </TableCell>
                  <TableCell>{formatDataHora(item.DataHora)}</TableCell>
                  <TableCell>
                    <Select 
                      value={String(editForm?.Tipo)} 
                      onValueChange={(value) => handleSelectChange('Tipo', value)}
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Tipo 1</SelectItem>
                        <SelectItem value="2">Tipo 2</SelectItem>
                        <SelectItem value="3">Tipo 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input 
                      name="Valor1" 
                      type="number"
                      step="0.01"
                      value={editForm?.Valor1} 
                      onChange={handleInputChange}
                      className="bg-white"
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      name="Valor2" 
                      type="number"
                      step="0.01"
                      value={editForm?.Valor2} 
                      onChange={handleInputChange}
                      className="bg-white"
                    />
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={editForm?.EmCasa ? 'sim' : 'nao'} 
                      onValueChange={(value) => handleSelectChange('EmCasa', value)}
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sim">Sim</SelectItem>
                        <SelectItem value="nao">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button onClick={handleSave} size="icon" variant="ghost">
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button onClick={handleCancel} size="icon" variant="ghost">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell>{item.codigo}</TableCell>
                  <TableCell>{formatDataHora(item.DataHora)}</TableCell>
                  <TableCell>{item.Tipo}</TableCell>
                  <TableCell>{item.Valor1}</TableCell>
                  <TableCell>{item.Valor2 ?? '-'}</TableCell>
                  <TableCell>{item.EmCasa ? 'Sim' : 'Não'}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button onClick={() => handleEdit(item)} size="icon" variant="ghost">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button onClick={() => item.seq && handleDelete(item.seq)} size="icon" variant="ghost">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

