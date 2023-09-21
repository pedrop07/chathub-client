import { tv } from "tailwind-variants";

export const buttonStyle = tv({
  base: [
    'transition',
    'font-medium',
    'text-white text-sm',
    'rounded-lg',
    'border',
    'px-5 py-2.5 mr-2 mb-2',
    'focus:ring-1 focus:outline-none',
    'disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:none'
  ],
  variants: {
    color: {
      primary: 'border-blue-600 bg-blue-600 enabled:hover:bg-blue-700 focus:ring-blue-300',
      success: 'border border-emerald-500 bg-emerald-500 enabled:hover:bg-emerald-700 focus:ring-emerald-300',
      error: 'border border-rose-500 bg-rose-500 enabled:hover:bg-rose-700 focus:ring-rose-300',
    },
    variant: {
      outlined: 'text-current bg-transparent enabled:hover:bg-opacity-10',
    },
  },
  compoundVariants: [
    {
      color: "primary",
      variant: "outlined",
      className: 'text-blue-600'
    },
    {
      color: "success",
      variant: "outlined",
      className: 'text-emerald-600'
    },
    {
      color: "error",
      variant: "outlined",
      className: 'text-rose-500'
    },
  ],
  defaultVariants: {
    color: "primary"
  }
})
