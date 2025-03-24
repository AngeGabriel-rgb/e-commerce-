import type React from "react"
import AdminHeader from "../../components/admin/admin-header"
import AdminSidebar from "../../components/admin/admin-sidebar"
import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  // Vérifier si l'utilisateur est connecté et a le rôle d'administrateur
  if (!session || session.user.role !== "admin") {
    redirect("/api/auth/signin")
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader user={session.user} />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  )
}

