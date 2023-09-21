import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { cardStyle } from "./styles";

interface Props {
  children: ReactNode;
}

export function Card({ children, ...props }: Props & HTMLAttributes<HTMLDivElement>) {

  return (
    <div
      {...props}
      className={clsx(cardStyle({ className: props.className }))}
    >
      {children}
    </div>
  )
}
