import { GetServerSideProps } from "next"
import { getSession, useSession } from "next-auth/react"

const Home: React.FC = ({ user }) => {
  console.log(user)
  const session = useSession()

  return (
    <div>
      <h1>Seja bem-vindo de volta {user.name}</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
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
