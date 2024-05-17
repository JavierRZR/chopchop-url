import { ReactNode } from "react";

interface IconButtonProps {
  children: ReactNode;
  onClick?: Function;
}

const IconButton: React.FC<IconButtonProps> = ({ children, onClick }) => {
  return (
    <div
      className="flex items-center
       justify-center rounded-md p-1 hover:bg-neutral-200/50 dark:hover:bg-neutral-800"
      onClick={() => onClick && onClick()}
    >
      {children}
    </div>
  );
};
export default IconButton;
