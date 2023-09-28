import { tv } from "tailwind-variants";

export const inputStyle = tv({
  base: [
    'transition',
    'block',
    'text-gray-900 dark:text-white text-sm',
    'bg-gray-50 dark:bg-gray-700',
    'border border-gray-300 dark:border-gray-600 focus:border-blue-500',
    'rounded-lg',
    'w-full p-2.5',
    'focus:ring-blue-500',
    'dark:placeholder-gray-400',
  ],
  variants: {
    variant: {
      outlined: 'bg-gray-50',
    }
  }
})

export const helperTextStyle = tv({
  base: 'text-sm text-primary ml-2 mt-1',
  variants: {
    color: {
      error: 'text-rose-500',
      default: 'text-primary'
    }
  }
})
