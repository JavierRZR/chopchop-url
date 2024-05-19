import { create } from "zustand";
import { LinkType } from "../types/types";

type LinkStore = {
  links: LinkType[];
  add: (link: LinkType) => void;
  remove: (id: string) => void;
};

const useLinkStore = create<LinkStore>()((set) => ({
  links: [],
  add: (link) => {
    set((state) => ({ links: [...state.links, link] }));
  },
  remove: (id) => {
    set((state) => ({ links: state.links.filter((link) => link._id != id) }));
  },
}));

export default useLinkStore;
