import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { buttonStyle } from "./styles";
import { Spinner } from "../Spinner";

interface Props {
  children: ReactNode;
  variant?: 'outlined';
  color?: 'primary' | 'success' | 'error'; 
  fullWidth?: boolean;
  loading?: boolean;
}

export function Button({
  children,
  variant,
  color,
  fullWidth,
  loading,
  ...props
}: Props & ButtonHTMLAttributes<HTMLButtonElement>) {

  return (
    <button
      {...props}
      className={clsx(buttonStyle({ className: props.className, variant, color }), fullWidth && 'w-full')}
    >
      <div className="flex items-center justify-center gap-2">
        {loading && <Spinner />}
        {children}
      </div>
    </button>
  )
}
