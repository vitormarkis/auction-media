import { useAuth } from "@/contexts/AuthProvider"
import { api } from "@/services/axios";
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

export default Gallery
