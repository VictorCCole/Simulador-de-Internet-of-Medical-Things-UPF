"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from 'lucide-react'
import { dadosColetadosService } from "@/services/api"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const formSchema = z.object({
  codigo: z.string().min(1, "Código do usuário é obrigatório"),
  Tipo: z.string().min(1, "Tipo é obrigatório"),
  Valor1: z.string().min(1, "Valor1 é obrigatório"),
  Valor2: z.string().optional(),
  EmCasa: z.string().min(1, "Em Casa é obrigatório"),
})

export function CreateForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codigo: "",
      Tipo: "",
      Valor1: "",
      Valor2: "",
      EmCasa: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await dadosColetadosService.create({
        codigo: parseInt(values.codigo),
        DataHora: new Date().toISOString(),
        Tipo: parseInt(values.Tipo),
        Valor1: parseFloat(values.Valor1),
        Valor2: values.Valor2 ? parseFloat(values.Valor2) : undefined,
        EmCasa: values.EmCasa === "sim"
      })
      
      toast.success("Dados criados com sucesso!")
      router.push("/")
    } catch (error) {
      toast.error("Erro ao criar dados. Verifique os valores e tente novamente.")
      console.error('Erro ao criar dados:', error)
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-center text-white bg-[#6587FF] py-2 rounded-md mb-6 max-w-2xl mx-auto">CRIAR DADOS</h1>
      <div className="mx-auto max-w-2xl space-y-6 bg-white shadow-lg p-6 border border-gray-200">
        <div className="flex justify-center">
          <Plus className="h-20 w-20 text-black" />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="codigo"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="absolute -top-2.5 left-3 text-[#6587FF] bg-white px-1 text-sm">
                    Código do Usuário
                  </FormLabel>
                  <FormControl>
                    <Input type="number" className="rounded-lg border-gray-300 bg-white" placeholder="..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Tipo"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="absolute -top-2.5 left-3 text-[#6587FF] bg-white px-1 text-sm">
                    Tipo
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-lg border-gray-300 bg-white">
                        <SelectValue placeholder="..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Tipo 1</SelectItem>
                      <SelectItem value="2">Tipo 2</SelectItem>
                      <SelectItem value="3">Tipo 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Valor1"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="absolute -top-2.5 left-3 text-[#6587FF] bg-white px-1 text-sm">
                    Valor1
                  </FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" className="rounded-lg border-gray-300 bg-white" placeholder="..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Valor2"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="absolute -top-2.5 left-3 text-[#6587FF] bg-white px-1 text-sm">
                    Valor2
                  </FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" className="rounded-lg border-gray-300 bg-white" placeholder="..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="EmCasa"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="absolute -top-2.5 left-3 text-[#6587FF] bg-white px-1 text-sm">
                    Em Casa
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-lg border-gray-300 bg-white">
                        <SelectValue placeholder="..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="sim">Sim</SelectItem>
                      <SelectItem value="nao">Não</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">Criar</Button>
          </form>
        </Form>
      </div>
    </>
  )
}

