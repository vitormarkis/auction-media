import { type NextPage } from "next"
import { signIn } from "next-auth/react"
import Head from "next/head"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Auction Media</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen bg-blue-600">
        <div className="h-32 w-full bg-neutral-700 flex items-center text-white justify-center">
          <button onClick={() => signIn()}>Log in</button>
        </div>
      </main>
    </>
  )
}

export default Home
