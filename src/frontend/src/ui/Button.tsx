import { MouseEventHandler, ReactNode } from "react";

const BUTTON_TYPES = {
  primary: "",
  secondary: "",
  link: "",
};

interface ButtonProps {
  children: ReactNode;
  type?: "primary" | "secondary" | "link";
  className?: string;
  onClick: MouseEventHandler;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "primary",
  className,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={`flex flex-row items-center justify-between gap-2 rounded-md border border-neutral-300 p-2 px-3 text-neutral-400 duration-300 hover:scale-105 hover:bg-neutral-300 dark:border-neutral-700 dark:hover:bg-neutral-700
      ${className} ${BUTTON_TYPES[type]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
