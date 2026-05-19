import { create } from "zustand";
import {
  loadSnippets,
  saveSnippets,
  loadTheme,
  saveTheme,
} from "../hooks/useLocalStorage";

const useSnippetStore = create((set, get) => ({
  snippets: loadSnippets(),
  search: "",
  selectedSnippet: null,
  theme: loadTheme(),

  addSnippet: (snippet) => {
    const newSnippets = [...get().snippets, snippet];
    saveSnippets(newSnippets);
    set({ snippets: newSnippets });
  },

  updateSnippet: (updatedSnippet) => {
    const updated = get().snippets.map((s) =>
      s.id === updatedSnippet.id ? updatedSnippet : s
    );
    saveSnippets(updated);
    set({ snippets: updated });
  },

  deleteSnippet: (id) => {
    const filtered = get().snippets.filter((s) => s.id !== id);
    saveSnippets(filtered);
    set({ snippets: filtered });
  },

  setSearch: (value) => set({ search: value }),

  selectSnippet: (snippet) => set({ selectedSnippet: snippet }),

  toggleTheme: () => {
    const newTheme = get().theme === "light" ? "dark" : "light";
    saveTheme(newTheme);
    set({ theme: newTheme });
  },
}));

export default useSnippetStore;