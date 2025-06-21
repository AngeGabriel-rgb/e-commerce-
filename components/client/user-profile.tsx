"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { useSession } from "next-auth/react"
import { useState } from "react"

export default function UserProfile() {
  const { data: session } = useSession()
  const [name, setName] = useState(session?.user?.name || "")
  const [email, setEmail] = useState(session?.user?.email || "")
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdateProfile = async () => {
    setIsUpdating(true)
    try {
      const response = await fetch("/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      })

      if (response.ok) {
        toast({
          title: "Succès",
          description: "Votre profil a été mis à jour avec succès.",
        })
      } else {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la mise à jour de votre profil.",
          variant: "destructive",
        })
      }
    } catch {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour de votre profil.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nom</Label>
        <Input id="name" placeholder="Votre nom" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="Votre email" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
      </div>
      <Button onClick={handleUpdateProfile} disabled={isUpdating}>
        {isUpdating ? "Mise à jour..." : "Mettre à jour"}
      </Button>
    </div>
  )
}
