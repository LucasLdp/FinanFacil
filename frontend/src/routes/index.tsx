import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
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
    <main className="h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <h4 className="font-bold text-2xl">Economize com o FinanFácil 💸</h4>
        <span>Insira suas credenciais para entrar na sua conta</span>
        <Form {...form}>
          <form className="w-full flex flex-col gap-4" action="">
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
              className="bg-green-600 hover:bg-green-900 cursor-pointer"
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
