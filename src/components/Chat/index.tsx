import clsx from "clsx"

interface Props {
  title: string;
  description: string;
  owner: 'community' | 'admin';
}

export function Chat({ title, description, owner }: Props) {
  return (
    <>
      <div
        className={clsx(
          owner === "admin" && "bg-[url('/space.jpg')] bg-cover bg-center",
          'cursor-pointer h-full'
        )}
      >
        <div className="backdrop-blur-lg bg-white/10 p-8 w-full h-full">
          <h2 className="text-slate-100 text-xl mb-3">
            {title}
          </h2>
          <p className="text-slate-100 break-all">
            {description.length >= 120 ? `${description.substring(0, 120)}...` : description}
          </p>
        </div>
      </div>
    </>
  )
}