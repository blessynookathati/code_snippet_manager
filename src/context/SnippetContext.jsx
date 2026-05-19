import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const SnippetContext = createContext();

export function SnippetProvider({ children }) {
  const [snippets, setSnippets] = useState(() => {
    return JSON.parse(localStorage.getItem("snippets")) || [];
  });

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    localStorage.setItem("snippets", JSON.stringify(snippets));
  }, [snippets]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  const addSnippet = (snippet) => {
    setSnippets([...snippets, { ...snippet, id: uuidv4() }]);
  };

  const deleteSnippet = (id) => {
    setSnippets(snippets.filter((s) => s.id !== id));
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const exportSnippets = () => {
  const blob = new Blob([JSON.stringify(snippets, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "snippets-backup.json";
  a.click();
};

const importSnippets = (event) => {
  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    const imported = JSON.parse(e.target.result);
    setSnippets(imported);
  };

  reader.readAsText(file);
};

  return (
    <SnippetContext.Provider
      value={{
  snippets,
  addSnippet,
  deleteSnippet,
  theme,
  toggleTheme,
  exportSnippets,
  importSnippets,
}}
    >
      {children}
      
    </SnippetContext.Provider>
  );
}

export function useSnippets() {
  return useContext(SnippetContext);
}