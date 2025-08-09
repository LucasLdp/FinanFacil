import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const form = useForm()
  const { control } = form

  return (
    <main className="min-h-screen px-2 overflow-hidden">
      <div className="w-full max-w-md bg-white/80 rounded-lg p-6 sm:p-8 mx-auto text-center mt-24 mb-8">
        <h4 className="font-bold text-2xl">Economize com o FinanFácil 💸</h4>
        <span className="block mt-4 mb-8">
          Insira suas credenciais para entrar na sua conta
        </span>
        <Form {...form}>
          <form className="w-full space-y-4" action="">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="@seunome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Insira seu email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Insira sua senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="bg-green-600 hover:bg-green-900 cursor-pointer w-full"
              type="submit"
            >
              Entrar
            </Button>
          </form>
        </Form>
      </div>
    </main>
  )
}
