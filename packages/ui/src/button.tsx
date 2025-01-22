"use client";

import { ReactNode } from "react";

type Variants = "primary" | "secondary" | "outline" | "ghost" | "danger";

type ButtonSize = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: Variants;
  size?: ButtonSize;
  isLoading?: boolean;
  disabled?: boolean;
}

export const Button = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-150 ease-in-out  disabled:cursor-not-allowed whitespace-nowrap";

  const variantStyles: Record<Variants, string> = {
    primary: `
      bg-gradient-to-r from-royal-blue-600 to-amethyst-600 
      text-white 
      hover:bg-gradient-to-r hover:from-amethyst-500 hover:to-royal-blue-500 hover:scale-105 transition-all
      duration-300 ease-in-out
      disabled:bg-amethyst-100
    `,
    secondary: `
     bg-gradient-to-br from-royal-blue-400 to-amethyst-400 
      text-amethyst-200 
      hover:bg-amethyst-200 hover:scale-105   
      transition-all
      duration-300 ease-in-out
      disabled:bg-amethyst-50 
      disabled:text-amethyst-300
    `,
    outline: `
      border 
      border-amethyst-800 
      text-amethyst-100 backdrop-blur-sm
      hover:bg-amethyst-50/10  hover:scale-105   
      transition-all
      duration-300 ease-in-out
      disabled:border-amethyst-200 
      disabled:text-amethyst-200
    `,
    ghost: `
      bg-gradient-to-r from-royal-blue-400 to-amethyst-400 text-transparent bg-clip-text
      hover:bg-amethyst-50 hover:scale-105
      transition-all
      duration-300 ease-in-out      
      disabled:text-amethyst-300
    `,
    danger: `
      bg-red-600 
      text-white 
      hover:bg-red-700  hover:scale-105
      transition-all
      duration-300 ease-in-out   
      disabled:bg-red-200
    `,
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3 py-1 text-sm w-24 h-10",
    md: "px-4 py-2 text-base w-36 h-12",
    lg: "px-6 py-2 text-lg h-14",
    icon: "h-9 w-9 p-2",
  };

  const loadingStyles = isLoading ? "opacity-80 cursor-wait" : "";

  const combinedStyles = `
    ${baseStyles} 
    ${variantStyles[variant]} 
    ${sizeStyles[size]} 
    ${loadingStyles} 
    ${className}
  `
    .replace(/\s+/g, " ")
    .trim();

  return (
    <button
      className={combinedStyles}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className='h-5 w-5 animate-spin' fill='none' viewBox='0 0 24 24'>
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='#1ea477'
              strokeWidth='4'
            />
            <path
              className='opacity-75'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              fill='#1ea477'
            />
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
