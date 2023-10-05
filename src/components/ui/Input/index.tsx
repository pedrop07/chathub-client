import { InputHTMLAttributes } from 'react'
import { helperTextStyle, inputStyle } from './styles'
import clsx from 'clsx'

interface InputProps {
  error?: boolean
  helperText?: string
  label?: string
}

export function Input({
  error,
  helperText,
  label,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & InputProps) {
  return (
    <div className="flex flex-col">
      <div>
        {label && (
          <label
            htmlFor={props.id}
            className="block mb-1 text-sm font-medium text-primary dark:text-slate-50"
          >
            {label}
          </label>
        )}
        <input
          className={clsx(className, inputStyle())}
          {...props}
        />
      </div>
      {helperText &&
        <span className={helperTextStyle({ color: error ? 'error' : 'default' })}>
          {helperText}
        </span>}
    </div>
  )
}
