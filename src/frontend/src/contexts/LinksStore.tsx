import { create } from "zustand";
import { LinkType } from "../types/types";

type LinkStore = {
  links: LinkType[];
  add: (link: LinkType) => void;
  remove: (id: string) => void;
  setInitialLinks: (links: LinkType[]) => void;
  modify: (id: string, data: LinkType) => void;
};

const useLinkStore = create<LinkStore>()((set) => ({
  links: [],
  add: (link) => {
    set((state) => ({ links: [...state.links, link] }));
  },
  remove: (id) => {
    set((state) => ({ links: state.links.filter((link) => link._id != id) }));
  },
  setInitialLinks: (links) => {
    set(() => ({ links: links }));
  },
  modify: (id, link) => {
    set((state) => ({
      links: state.links.map((elem) => {
        if (id != elem._id) return elem;
        return link;
      }),
    }));
  },
}));
export default useLinkStore;
