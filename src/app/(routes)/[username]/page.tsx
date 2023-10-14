import { Profile } from "@/components/Profile";
import { api } from "@/services/api";
import { AxiosError } from "axios";

interface Params {
  username: string;
}

interface Props {
  params: Params;
}

export default async function ProfilePage({ params }: Props) {
  try {
    const { data: user } = await api.get(`/profile/${params.username}`)
    return <Profile user={user} />
  } catch (error: any) {
    if(error instanceof AxiosError) {
      if(error.response?.status === 404) {
        return (
          <div className="flex justify-center items-center flex-col mt-36">
            <h1 className="text-foreground font-bold text-4xl mb-3">
              Esse usuário não existe
            </h1>
      
            <span className="text-muted text-xl">
              Tente buscar outro(a).
            </span>
          </div>
        )
      }
    }

    throw new Error(error.message)
  }
}
