import { MouseEventHandler, ReactNode } from "react";

const BUTTON_TYPES = {
  primary:
    "text-neutral-300 bg-neutral-800 shadow hover:bg-neutral-700 hover:text-neutral-200",
  secondary:
    "text-neutral-800  border-neutral-400 border-2 hover:bg-neutral-300  dark:text-neutral-400 dark:hover:bg-neutral-700",
  link: "",
};

interface ButtonProps {
  children: ReactNode;
  type?: "primary" | "secondary" | "link";
  className?: string;
  disabled?: boolean;
  onClick: MouseEventHandler;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "primary",
  className,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={`flex select-none flex-row items-center justify-center gap-2 rounded-md   p-2 px-3 font-semibold duration-300 hover:scale-105 dark:border-neutral-700
      ${BUTTON_TYPES[type]} ${className} 
      ${disabled && "cursor-not-allowed opacity-50"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default Button;
