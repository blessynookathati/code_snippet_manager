import { useSnippets } from "../context/SnippetContext";

export default function Header() {
  const {
    toggleTheme,
    theme,
    exportSnippets,
    importSnippets,
  } = useSnippets();

  return (
    <header className="sticky top-0 z-50 bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Code Snippet Manager
          </h1>

          <p className="text-gray-300 text-sm">
            Manage and organize reusable code snippets
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={toggleTheme}
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg"
            data-testid="theme-toggle-button"
          >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>

          <button
            onClick={exportSnippets}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            Backup JSON
          </button>

          <label className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg cursor-pointer">
            Restore JSON
            <input
              hidden
              type="file"
              accept=".json"
              onChange={importSnippets}
            />
          </label>
        </div>
      </div>
    </header>
  );
}