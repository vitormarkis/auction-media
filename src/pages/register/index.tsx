import { useState } from "react"
import { useForm } from "react-hook-form"
import { SubmitHandler } from "react-hook-form/dist/types"
import axios from 'axios'
import { IUserRegister } from "@/schemas/users"

interface RegisterUserFields extends IUserRegister {
  repeated_password: string
}

const Register: React.FC = () => {
  const [error, setError] = useState("As senhas não coincidem")
  const { register, reset, handleSubmit } = useForm<RegisterUserFields>()

  const submitHandler: SubmitHandler<RegisterUserFields> = async (formData) => {
    await axios.post("/api/users", formData)
  }

  return (
    <div className="flex h-screen items-center justify-center bg-[#f7f7f7] text-neutral-700">
      <div className="w-[320px] rounded-md bg-white p-3 shadow-lg shadow-black/20" style={{ gridArea: "2 / 2 / 3 / 3" }}>
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Seja bem-vindo</h1>
          <p className="text font-thin">Cadastre-se para poder continuar</p>
        </div>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form className="flex flex-col" onSubmit={handleSubmit(submitHandler)}>
          <label>Nome:</label>
          <input className="mb-4 rounded-md border border-zinc-300 px-4 py-2" {...register("name")} type="text" placeholder="Pedro da Silva..." />
          <label>Nome de usuário:</label>
          <input className="mb-4 rounded-md border border-zinc-300 px-4 py-2" {...register("username")} type="text" placeholder="pedrodasilva" />
          <label>E-mail:</label>
          <input className="mb-4 rounded-md border border-zinc-300 px-4 py-2" {...register("email")} type="email" placeholder="pedrosilva@gmail.com" />
          <label>Senha:</label>
          <input className="mb-4 rounded-md border border-zinc-300 px-4 py-2" {...register("password")} type="password" placeholder="Insira sua senha aqui..." />
          <label>Confirme sua senha:</label>
          <input className="mb-4 rounded-md border border-zinc-300 px-4 py-2" {...register("repeated_password")} type="password" placeholder="Repita sua senha..." />
          <p className="mb-4">
            Já possui uma conta? <span className="text-blue-500 underline">Entrar</span>
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

export default Register
