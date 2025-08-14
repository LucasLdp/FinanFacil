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
import { createFileRoute, Link } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'
import { CreateUserSchema, type ICreateUserDTO } from '@/schemas/user.schema'

import { useCreateUser } from '@/hooks/users/useCreateUser'

export const Route = createFileRoute('/register')({
  component: App,
})

function App() {
  const createUser = useCreateUser()
  const form = useForm({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })
  const { control } = form

  async function onSubmit(data: ICreateUserDTO) {
    await createUser.mutateAsync(data)
  }

  return (
    <main className="min-h-screen px-2 overflow-hidden">
      <div className="w-full max-w-md bg-white/80 rounded-lg p-6 sm:p-8 mx-auto text-center mt-24 mb-8">
        <h4 className="font-bold text-2xl">Economize com o FinanFácil 💸</h4>
        <span className="block mt-4 mb-8">
          Insira suas credenciais para entrar na sua conta
        </span>
        <Form {...form}>
          <form
            className="w-full space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Seu nome" {...field} />
                  </FormControl>
                  <FormMessage className="text-left" />
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
                  <FormMessage className="text-left" />
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
                  <FormMessage className="text-left" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-900 cursor-pointer w-full"
            >
              Entrar
            </Button>
            <span className="flex gap-2 justify-center">
              Já possui uma conta?
              <Link className="text-green-600 hover:text-green-900" to="/">
                Entre agora !
              </Link>
            </span>
          </form>
        </Form>
      </div>
    </main>
  )
}
