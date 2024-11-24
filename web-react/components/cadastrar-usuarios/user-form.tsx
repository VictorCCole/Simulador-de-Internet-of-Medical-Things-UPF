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
import { User } from 'lucide-react'
import { usuariosService } from "@/services/api"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"

const formSchema = z.object({
  codigo: z.number().int().positive(),
  Nome: z.string().min(1, "Nome é obrigatório"),
  Nascimento: z.string().min(1, "Data de nascimento é obrigatória"),
  Sexo: z.string().min(1, "Sexo é obrigatório"),
  Latitude: z.number().min(-90).max(90),
  Longitude: z.number().min(-180).max(180),
})

export function UserForm() {
  const router = useRouter()
  const [apiErrors, setApiErrors] = useState<string[]>([])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codigo: 0,
      Nome: "",
      Nascimento: "",
      Sexo: "",
      Latitude: 0,
      Longitude: 0,
    },
  })

  const generateRandomCoordinates = () => {
    const latitude = Math.random() * 180 - 90
    const longitude = Math.random() * 360 - 180
    form.setValue("Latitude", Number(latitude.toFixed(6)))
    form.setValue("Longitude", Number(longitude.toFixed(6)))
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setApiErrors([])
      const formattedData = {
        ...values,
        Nascimento: new Date(values.Nascimento).toISOString().split('T')[0],
      }
      console.log('Sending data to API:', formattedData)
      
      await usuariosService.create(formattedData)
      toast.success("Usuário cadastrado com sucesso!")
      router.push("/")
    } catch (error: any) {
      console.error('Erro ao cadastrar usuário:', error)
      let errorMessages: string[]
      try {
        errorMessages = JSON.parse(error.message)
      } catch {
        errorMessages = [error.message || "Erro ao cadastrar usuário. Por favor, tente novamente."]
      }
      setApiErrors(errorMessages)
      toast.error("Erro ao cadastrar usuário")
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 bg-white shadow-lg p-6 border border-gray-200">
      <div className="flex justify-center">
        <User className="h-20 w-20 text-black" />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {apiErrors.length > 0 && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Erro!</strong>
              {apiErrors.map((error, index) => (
                <span key={index} className="block sm:inline"> {error}</span>
              ))}
            </div>
          )}
          <FormField
            control={form.control}
            name="codigo"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="absolute -top-2.5 left-3 text-[#6587FF] bg-white px-1 text-sm">
                  Código
                </FormLabel>
                <FormControl>
                  <Input type="number" className="rounded-lg border-gray-300 bg-white" placeholder="..." {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Nome"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="absolute -top-2.5 left-3 text-[#6587FF] bg-white px-1 text-sm">
                  Digite seu Nome
                </FormLabel>
                <FormControl>
                  <Input className="rounded-lg border-gray-300 bg-white" placeholder="..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Nascimento"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="absolute -top-2.5 left-3 text-[#6587FF] bg-white px-1 text-sm">
                  Data de Nascimento
                </FormLabel>
                <FormControl>
                  <Input 
                    className="rounded-lg border-gray-300 bg-white" 
                    type="date" 
                    max={new Date().toISOString().split('T')[0]}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Sexo"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="absolute -top-2.5 left-3 text-[#6587FF] bg-white px-1 text-sm">
                  Escolha seu Sexo
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="rounded-lg border-gray-300 bg-white">
                      <SelectValue placeholder="..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="M">Masculino</SelectItem>
                    <SelectItem value="F">Feminino</SelectItem>
                    <SelectItem value="O">Outro</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Latitude"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="absolute -top-2.5 left-3 text-[#6587FF] bg-white px-1 text-sm">
                  Latitude
                </FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.000001" 
                    className="rounded-lg border-gray-300 bg-white" 
                    placeholder="..." 
                    {...field} 
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Longitude"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="absolute -top-2.5 left-3 text-[#6587FF] bg-white px-1 text-sm">
                  Longitude
                </FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.000001" 
                    className="rounded-lg border-gray-300 bg-white" 
                    placeholder="..." 
                    {...field} 
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="button" 
            onClick={generateRandomCoordinates}
            className="w-full bg-blue-500 hover:bg-blue-600 mb-4"
          >
            Gerar Coordenadas Aleatórias
          </Button>
          <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
            Cadastrar
          </Button>
        </form>
      </Form>
    </div>
  )
}

