import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Administration OloStore</h1>
          <p className="text-muted-foreground mt-2">Connectez-vous pour accéder au panneau d'administration</p>
        </div>
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: "bg-primary hover:bg-primary/90",
              card: "shadow-lg border",
            },
          }}
          redirectUrl="/admin"
          signUpUrl="/admin/sign-up"
        />
      </div>
    </div>
  )
}
