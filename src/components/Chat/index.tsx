import { User } from "@/interfaces/User";
import clsx from "clsx"

interface Props {
  title: string;
  description: string;
  owner: Partial<User>;
}

export function Chat({ title, description, owner }: Props) {
  return (
    <>
      {/* <div
        className={clsx(
          owner === "admin" && "bg-[url('/space.jpg')] bg-cover bg-center",
          'cursor-pointer h-full'
        )}
      > */}
        <div className="shadow-md bg-gradient-to-r from-white to-blue-100 dark:from-slate-800 dark:to-blue-950 p-8 w-full h-full rounded-md transition-shadow hover:shadow-[0_0_0_2px] hover:shadow-primary">
          <h3 className="text-gray-900 dark:text-white text-sm font-medium mb-5">
            Dono: {owner.name}
          </h3>
          <h2 className="text-gray-900 dark:text-white text-xl font-bold mb-3">
            {title}
          </h2>
          <p className="text:gray-600 dark:text-gray-400 break-all">
            {description.length >= 120 ? `${description.substring(0, 120)}...` : description}
          </p>
        </div>
      {/* </div> */}
    </>
  )
}