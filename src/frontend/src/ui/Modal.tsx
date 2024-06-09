import { ReactNode } from "react";
import useModalContext from "../contexts/ModalContext";
import { CloseIcon } from "../assets/svg";
import IconButton from "./IconButton";
import { useThemeContext } from "../contexts/ThemeProvider";

const Modal: React.FC<{
  children: ReactNode;
  id: string;
  header?: string;
  subHeader?: string;
  closable?: boolean;
  closeOutside?: boolean;
}> = ({
  children,
  id,
  header,
  subHeader,
  closable = true,
  closeOutside = true,
}) => {
  const { theme } = useThemeContext();
  const { show, modalId, toggleShow } = useModalContext();

  const closeModalExternalClick = (event: any) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      toggleShow("");
    }
  };

  if (!show) return;
  if (modalId != id) return;
  return (
    <>
      <section
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-2 transition-opacity duration-300 ${
          show ? "opacity-100" : "opacity-0"
        }`}
        onClick={(event) => {
          closeOutside && closeModalExternalClick(event);
        }}
      >
        <div
          className={`relative flex max-h-[90%] min-h-[20%] w-full max-w-lg transform flex-col gap-5 overflow-y-auto 
           rounded-xl border-2 border-neutral-100 bg-white p-5 shadow-lg dark:border-neutral-700 dark:bg-neutral-900`}
        >
          <header className="flex h-auto items-start justify-between border-b-2 border-neutral-700 py-2">
            <div>
              <h1 className="mb-2 text-2xl font-semibold opacity-90">
                {header}
              </h1>
              <h2 className="text-start text-sm opacity-80">{subHeader}</h2>
            </div>
            {closable && (
              <IconButton
                onClick={() => {
                  toggleShow("");
                }}
              >
                {<CloseIcon color={`${theme == "dark" ? "#999" : "#333"}`} />}
              </IconButton>
            )}
          </header>
          <section>{children}</section>
        </div>
      </section>
    </>
  );
};

export default Modal;
