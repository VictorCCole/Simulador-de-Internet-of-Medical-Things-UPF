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
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User } from 'lucide-react'

const formSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  dataNascimento: z.string().min(1, "Data de nascimento é obrigatória"),
  sexo: z.string().min(1, "Sexo é obrigatório"),
})

export function UserForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      dataNascimento: "",
      sexo: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 bg-white shadow-lg p-6 border border-gray-200">
      <div className="flex justify-center">
        <User className="h-20 w-20 text-black" />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="absolute -top-2.5 left-3 text-[#6587FF] bg-white px-1 text-sm">
                  Digite seu Nome
                </FormLabel>
                <FormControl>
                  <Input className="rounded-lg border-gray-300 bg-white" placeholder="..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dataNascimento"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="absolute -top-2.5 left-3 text-[#6587FF] bg-white px-1 text-sm">
                  Data de Nascimento
                </FormLabel>
                <FormControl>
                  <Input className="rounded-lg border-gray-300 bg-white" type="date" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sexo"
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
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="feminino">Feminino</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
            Cadastrar
          </Button>
        </form>
      </Form>
    </div>
  )
}

