"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  Package,
  LayoutDashboard,
  Tag,
  ShoppingCart,
  Users,
  MessageSquare,
  Settings,
  BarChart,
} from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Produits",
    href: "/admin/produits",
    icon: Package,
  },
  {
    title: "Promotions",
    href: "/admin/promotions",
    icon: Tag,
  },
  {
    title: "Commandes",
    href: "/admin/commandes",
    icon: ShoppingCart,
  },
  {
    title: "Utilisateurs",
    href: "/admin/utilisateurs",
    icon: Users,
  },
  {
    title: "Avis",
    href: "/admin/avis",
    icon: MessageSquare,
  },
  {
    title: "Statistiques",
    href: "/admin/statistiques",
    icon: BarChart,
  },
  {
    title: "Paramètres",
    href: "/admin/parametres",
    icon: Settings,
  },
]

export default function MobileSidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden bg-transparent">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/admin" className="flex items-center gap-2 font-semibold" onClick={() => setOpen(false)}>
            <Package className="h-6 w-6" />
            <span>OloStore Admin</span>
          </Link>
        </div>
        <nav className="grid gap-2 py-4">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                pathname === item.href ? "bg-muted text-primary" : "text-muted-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
