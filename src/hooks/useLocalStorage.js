export const loadSnippets = () => {
  const data = localStorage.getItem("snippets");
  return data ? JSON.parse(data) : [];
};

export const saveSnippets = (snippets) => {
  localStorage.setItem("snippets", JSON.stringify(snippets));
};

export const loadTheme = () => {
  return localStorage.getItem("theme") || "light";
};

export const saveTheme = (theme) => {
  localStorage.setItem("theme", theme);
};