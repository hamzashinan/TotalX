import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, className = "", ...props }: Props) {
  return (
    <button
      {...props}
      className={`w-full h-12 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;