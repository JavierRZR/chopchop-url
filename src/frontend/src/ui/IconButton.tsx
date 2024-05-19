import { ReactNode } from "react";

interface IconButtonProps {
  children: ReactNode;
  onClick?: Function;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <div
      className={`flex items-center justify-center
       rounded-md p-1 duration-200 hover:scale-110 hover:bg-neutral-200/50 dark:hover:bg-neutral-800 ${className} ${onClick && "hover:cursor-pointer"} `}
      onClick={() => onClick && onClick()}
    >
      {children}
    </div>
  );
};
export default IconButton;
