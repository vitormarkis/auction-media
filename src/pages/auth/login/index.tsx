import { useAuth } from "@/contexts/AuthProvider"
import { IUserLogin, userLoginSchema } from "@/schemas/users"
import { GetServerSideProps } from "next"
import { getSession, signIn } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { SubmitHandler } from "react-hook-form/dist/types"

const Login: React.FC = () => {
  const [error, setError] = useState("Esse usuário não existe em nosso banco de dados")
  const { register, reset, handleSubmit } = useForm<IUserLogin>()
  const { login } = useAuth()

  const submitHandler: SubmitHandler<IUserLogin> = async (formData) => {
    const { password, username } = userLoginSchema.parse(formData)

    console.log({ password, username })
    
    await signIn('credentials', { password, username, redirect: false })
  }

  return (
    <div className="flex h-screen items-center justify-center bg-[#d7d7d7] text-neutral-700">
      <div className="w-[320px] rounded-md bg-white p-3 shadow-lg shadow-black/20" style={{ gridArea: "2 / 2 / 3 / 3" }}>
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Faça login ou cadastre-se</h1>
          <p className="text font-thin">Preencha seus dados para continuar</p>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit(submitHandler)}>
          <label>Nome de usuário:</label>
          <input className="mb-4 rounded-md border border-zinc-300 px-4 py-2 focus:outline-none focus:outline-1 focus:outline-offset-2 focus:outline-blue-600" {...register("username")} type="text" placeholder="pedrodasilva" />
          <label>Senha:</label>
          <input className="mb-4 rounded-md border border-zinc-300 px-4 py-2 focus:outline-none focus:outline-1 focus:outline-offset-2 focus:outline-blue-600" {...register("password")} type="password" placeholder="Insira sua senha aqui..." />
          <p className="mb-4">
            Ainda não possui uma conta?{" "}
            <Link href="/register" className="text-blue-500 underline">
              Registrar
            </Link>
          </p>
          {error && <p className="mb-2 text-center font-semibold text-red-600">{error}</p>}
          <button className="rounded-md bg-blue-500 p-3 text-lg text-white mb-2" type="submit">
            Enviar
          </button>
          <div>
            <p>Ou entre com <span onClick={() => signIn('github')} className="underline cursor-pointer">Github</span></p>
          </div>
        </form>
      </div>
    </div>
  )
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  
  if(session) {
    return {
      redirect: {
        destination: '/home',
        permanent: false
      }
    }
  }
  
  return {
    props: {
      session
    },
  }
}

export default Login
