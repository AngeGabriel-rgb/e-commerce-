"use client"

import { Button } from "../ui/button"
import { Bell, Search, LogOut } from "lucide-react"
import { Input } from "../ui/input"
import { ThemeToggle } from "../theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import Link from "next/link"
import { useUser, SignOutButton } from "@clerk/nextjs"
import MobileSidebar from "./mobile-sidebar"

export default function AdminHeader() {
  const { user } = useUser()

  if (!user) return null

  return (
    <header className="sticky top-0 z-10 h-16 border-b bg-background flex items-center px-4 md:px-6">
      <div className="flex items-center gap-4 md:hidden">
        <MobileSidebar />
        <Link href="/admin" className="font-semibold">
          OloStore Admin
        </Link>
      </div>

      <div className="hidden md:flex md:flex-1 md:items-center md:gap-4 md:px-6">
        <form className="flex-1 ml-auto mr-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>

        <ThemeToggle />

        <Button variant="outline" size="icon" className="relative bg-transparent">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600" />
          <span className="sr-only">Notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.imageUrl || "/placeholder.svg"} alt={user.fullName || ""} />
                <AvatarFallback>
                  {user.firstName?.charAt(0) || user.emailAddresses[0]?.emailAddress.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.fullName || user.firstName || "Utilisateur"}</p>
                <p className="text-xs leading-none text-muted-foreground">{user.emailAddresses[0]?.emailAddress}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/client">Retour à la boutique</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/parametres">Paramètres</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <SignOutButton redirectUrl="/admin/sign-in">
                <button className="flex w-full items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Se déconnecter
                </button>
              </SignOutButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
