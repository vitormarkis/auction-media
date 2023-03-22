import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/react";

interface Props {
  user: {
    name: string;
  email: string;
  image: string
  }
}

const Home: React.FC<Props> = ({ user }) => {
  return (
    <div>
      <h1>Seja bem-vindo de volta {user.name}</h1>
      <pre>{JSON.stringify({}, null, 2)}</pre>
      <button onClick={() => signOut()} className="py-2 px-6 rounded-md border-2 border-black bg-red-500 text-white ">Sair</button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    }
  }

  const user = session.user

  console.log(session)

  return {
    props: {
      user,
    },
  }
}

export default Home
