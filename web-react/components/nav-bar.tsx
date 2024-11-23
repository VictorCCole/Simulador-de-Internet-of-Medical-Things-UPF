"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, Plus, Pencil, UserPlus } from 'lucide-react'
import { cn } from "@/lib/utils"

export function NavBar() {
  const pathname = usePathname()
  
  const links = [
    {
      href: "/",
      label: "Dashboard",
      icon: LayoutGrid
    },
    {
      href: "/criar-dados",
      label: "Criar dados",
      icon: Plus
    },
    {
      href: "/editar-dados",
      label: "Editar dados",
      icon: Pencil
    },
    {
      href: "/cadastrar-usuarios",
      label: "Cadastrar Usuários",
      icon: UserPlus
    }
  ]

  return (
    <nav className="flex w-11/12 mx-auto my-4 bg-[#6587FF] px-8 py-6 font-['Impact', sans-serif] rounded-[30px] border-2 border-[#A8A8A8]">
      <ul className="flex w-full items-center gap-4">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "flex items-center gap-2 text-white/80 hover:text-white text-xl",
                  pathname === link.href && "text-white"
                )}
              >
                <Icon className="h-5 w-5" />
                {link.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

