import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ children }) => {
  return (
    <span
      className={`rounded-md bg-neutral-400/10 px-3 py-1
        font-mono text-sm 
        text-neutral-800/50 outline outline-1 outline-neutral-800/30 dark:text-neutral-300/70 dark:outline-neutral-300/20`}
    >
      {children}
    </span>
  );
};

export default Badge;
