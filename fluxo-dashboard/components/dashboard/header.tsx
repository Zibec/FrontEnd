"use client"

import type React from "react"

import { useState } from "react"
import { Settings } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface HeaderProps {
  balance: number
  onBalanceChange: (newBalance: number) => void
}

export function Header({ balance, onBalanceChange }: HeaderProps) {
  const [isEditingBalance, setIsEditingBalance] = useState(false)
  const [tempBalance, setTempBalance] = useState("")
  const router = useRouter()

  const menuItems = [
    { label: "Contas e Cartões", route: "/contas-cartoes" },
    { label: "Meus Investimentos", route: "/investimentos" },
    { label: "Agendamentos", route: "/agendamentos" },
    { label: "Perfis", route: "/perfis" },
    { label: "Categorias", route: "/categorias" },
    { label: "Histórico", route: "/historico" },
  ]

  const handleBalanceClick = () => {
    setIsEditingBalance(true)
    setTempBalance(balance.toString())
  }

  const handleBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, "")
    setTempBalance(value)
  }

  const handleBalanceBlur = () => {
    const newBalance = Number.parseFloat(tempBalance) || 0
    onBalanceChange(newBalance)
    setIsEditingBalance(false)
  }

  const handleBalanceKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBalanceBlur()
    } else if (e.key === "Escape") {
      setIsEditingBalance(false)
    }
  }

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-neutral-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="cursor-pointer">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/503032198-f0f23b0e-d540-498b-b4a3-4b33f89caf6e-eg4z1CkWeSwdB3BmyoNF2VoCEwHIde.png"
            alt="Fluxo Logo"
            className="h-12 w-12 hover:opacity-80 transition-opacity"
          />
        </Link>

        <div className="text-center">
          <p className="text-sm text-neutral-500 mb-1">Dinheiro na conta</p>
          {isEditingBalance ? (
            <input
              type="text"
              value={tempBalance}
              onChange={handleBalanceChange}
              onBlur={handleBalanceBlur}
              onKeyDown={handleBalanceKeyDown}
              autoFocus
              className="text-4xl font-bold text-neutral-900 bg-transparent border-b-2 border-blue-600 outline-none text-center w-64"
              placeholder="0"
            />
          ) : (
            <p
              onClick={handleBalanceClick}
              className="text-4xl font-bold text-neutral-900 cursor-pointer hover:text-blue-600 transition-colors"
            >
              R$ {balance.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          )}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Configurações</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-neutral-900 border-neutral-800">
            <SheetHeader>
              <SheetTitle className="text-white text-xl">Menu</SheetTitle>
            </SheetHeader>
            <nav className="mt-8">
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => {
                        if (item.route !== "#") {
                          router.push(item.route)
                        }
                      }}
                      className="w-full text-left px-4 py-3 text-neutral-100 hover:bg-neutral-800 rounded-lg transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
