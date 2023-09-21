import { InputHTMLAttributes } from 'react'
import { helperTextStyle, inputStyle } from './styles'

interface InputProps {
  error?: boolean
  helperText?: string
  label?: string
  variant?: 'outlined'
}

export function Input({
  error,
  helperText,
  label,
  variant = 'outlined',
  ...props
}: InputHTMLAttributes<HTMLInputElement> & InputProps) {
  return (
    <div className="flex flex-col">
      <div>
        {label && (
          <label
            htmlFor={props.id}
            className="block mb-1 text-sm font-medium text-blue-600 dark:text-slate-50"
          >
            {label}
          </label>
        )}
        <input
          className={inputStyle({ variant, className: props.className })}
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
