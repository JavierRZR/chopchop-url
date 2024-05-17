import { ReactNode } from "react";

interface MainContainerProps {
  children: ReactNode;
  className: string;
}
const MainContainer: React.FC<MainContainerProps> = ({
  children,
  className,
}) => {
  return <section className={className}>{children}</section>;
};

export default MainContainer;
