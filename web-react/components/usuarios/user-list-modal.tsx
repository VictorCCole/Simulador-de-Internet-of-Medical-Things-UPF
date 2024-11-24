"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil, Trash2, Save, X } from 'lucide-react'
import { Usuario, usuariosService } from "@/services/api"
import { toast } from "sonner"

export function UserListModal() {
  const [users, setUsers] = useState<Usuario[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<Usuario | null>(null)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const response = await usuariosService.getAll()
      setUsers(response)
    } catch (error) {
      console.error('Erro ao carregar usuários:', error)
      toast.error("Erro ao carregar usuários")
    }
  }

  const handleEdit = (user: Usuario) => {
    setEditingId(user.codigo!)
    setEditForm({...user})
  }

  const handleSave = async () => {
    if (editForm && editForm.codigo) {
      try {
        await usuariosService.update(editForm.codigo, editForm)
        setEditingId(null)
        setEditForm(null)
        loadUsers()
        toast.success("Usuário atualizado com sucesso!")
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error)
        toast.error("Erro ao atualizar usuário")
      }
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditForm(null)
  }

  const handleDelete = async (codigo: number) => {
    try {
      await usuariosService.delete(codigo)
      loadUsers()
      toast.success("Usuário excluído com sucesso!")
    } catch (error) {
      console.error('Erro ao deletar usuário:', error)
      toast.error("Erro ao deletar usuário")
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="fixed bottom-4 right-4">
          Lista de Usuários
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Lista de Usuários</DialogTitle>
          <DialogDescription>
            Aqui você pode visualizar, editar e excluir usuários.
          </DialogDescription>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Nascimento</TableHead>
              <TableHead>Sexo</TableHead>
              <TableHead>Latitude</TableHead>
              <TableHead>Longitude</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.codigo}>
                {editingId === user.codigo ? (
                  <>
                    <TableCell>{user.codigo}</TableCell>
                    <TableCell>
                      <Input
                        name="Nome"
                        value={editForm?.Nome || ""}
                        onChange={handleInputChange}
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        name="Nascimento"
                        type="date"
                        value={editForm?.Nascimento || ""}
                        onChange={handleInputChange}
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={editForm?.Sexo || ""}
                        onValueChange={(value) => setEditForm(prev => ({ ...prev!, Sexo: value }))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="M">Masculino</SelectItem>
                          <SelectItem value="F">Feminino</SelectItem>
                          <SelectItem value="O">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        name="Latitude"
                        type="number"
                        step="0.000001"
                        value={editForm?.Latitude?.toString() || ""}
                        onChange={handleInputChange}
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        name="Longitude"
                        type="number"
                        step="0.000001"
                        value={editForm?.Longitude?.toString() || ""}
                        onChange={handleInputChange}
                        className="w-full"
                      />
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
                    <TableCell>{user.codigo}</TableCell>
                    <TableCell>{user.Nome}</TableCell>
                    <TableCell>{new Date(user.Nascimento).toLocaleDateString()}</TableCell>
                    <TableCell>{user.Sexo}</TableCell>
                    <TableCell>{user.Latitude}</TableCell>
                    <TableCell>{user.Longitude}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button onClick={() => handleEdit(user)} size="icon" variant="ghost">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button onClick={() => user.codigo && handleDelete(user.codigo)} size="icon" variant="ghost">
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
      </DialogContent>
    </Dialog>
  )
}

