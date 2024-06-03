import { ReactNode } from "react";

const InputField: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="flex w-full flex-col items-start justify-center gap-1">
        {children}
      </div>
    </>
  );
};
export default InputField;
