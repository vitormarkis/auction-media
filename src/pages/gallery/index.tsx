import { useAuth } from "@/contexts/AuthProvider";
import { api } from "@/services/axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useEffect } from "react";

const Gallery: React.FC = () => {
  const { user } = useAuth()

  useEffect(() => {
    api.get("/users")
  }, []);

  return (
    <div className="h-screen bg-fuchsia-500">
      <img src={user?.avatar_url ?? ""} alt="" />
      <h1>{user?.name}</h1>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  
  if(!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false
      }
    }
  }
  
  return {
    props: {},
  }
}

export default Gallery
