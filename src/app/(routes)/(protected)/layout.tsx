import { User } from "@/interfaces/User"
import { FetchAuth } from "@/utils/fetchAuth"
import Provider from "./Provider"

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await FetchAuth<User>('profile', 'GET')

  return (
    <>
      <Provider user={user}>
        {children}
      </Provider>
    </>
  )
}
