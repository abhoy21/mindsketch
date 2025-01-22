import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const baseStyles =
      "flex h-9 md:h-12 w-full rounded-md border border-amethyst-400/50 bg-transparent px-4 py-3 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-400 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-royal-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-base outline-none text-amethyst-200";

    const combinedStyles = `${baseStyles} ${className}`;
    return <input ref={ref} {...props} className={combinedStyles} />;
  },
);

Input.displayName = "Input";

export default Input;
