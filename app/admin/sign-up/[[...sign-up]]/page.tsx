import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Créer un compte administrateur</h1>
          <p className="text-muted-foreground mt-2">Créez votre compte pour accéder au panneau d'administration</p>
        </div>
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary: "bg-primary hover:bg-primary/90",
              card: "shadow-lg border",
            },
          }}
          redirectUrl="/admin"
          signInUrl="/admin/sign-in"
        />
      </div>
    </div>
  )
}
