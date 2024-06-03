import { create } from "zustand";

type ModalContext = {
  show: boolean;
  modalId: string;
  toggleShow: (id: string) => void;
};

const useModalContext = create<ModalContext>()((set) => ({
  show: false,
  modalId: "",
  toggleShow: (id) => {
    set((state) => ({ show: !state.show, modalId: id }));
  },
}));

export default useModalContext;
