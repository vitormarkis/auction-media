import { useState } from "react"
import { useForm } from "react-hook-form"
import { SubmitHandler } from "react-hook-form/dist/types"

interface LoginUserFields {
  username: string
  password: string
}

const Login: React.FC = () => {
  const [error, setError] = useState("Esse usuário não existe em nosso banco de dados")
  const { register, reset, handleSubmit } = useForm<LoginUserFields>()

  const submitHandler: SubmitHandler<LoginUserFields> = async (formData) => {
    await new Promise((res) => setTimeout(res, 1000))
    console.log(formData)
  }

  return (
    <div className="flex h-screen items-center justify-center bg-[#f7f7f7] text-neutral-700">
      <div className="w-[320px] rounded-md bg-white p-3 shadow-lg shadow-black/20" style={{ gridArea: "2 / 2 / 3 / 3" }}>
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Bem-vindo de volta</h1>
          <p className="text font-thin">Preencha seus dados para continuar</p>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit(submitHandler)}>
          <label>Nome de usuário:</label>
          <input className="mb-4 rounded-md border border-zinc-300 px-4 py-2" {...register("username")} type="text" placeholder="pedrodasilva" />
          <label>Senha:</label>
          <input className="mb-4 rounded-md border border-zinc-300 px-4 py-2" {...register("password")} type="password" placeholder="Insira sua senha aqui..." />
          <p className="mb-4">
            Ainda não possui uma conta? <span className="text-blue-500 underline">Registrar</span>
          </p>
          {error && (
            <p className="font-semibold text-red-600 text-center mb-2">{error}</p>
          )}
          <button className="rounded-md bg-blue-500 p-3 text-lg text-white" type="submit">
            Enviar
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
