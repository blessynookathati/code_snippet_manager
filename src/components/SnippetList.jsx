import { Link } from "react-router-dom";
import { useSnippets } from "../context/SnippetContext";

export default function SnippetList({ search }) {
  const { snippets, deleteSnippet } = useSnippets();

  const filteredSnippets = snippets.filter(
    (snippet) =>
      snippet.title.toLowerCase().includes(search.toLowerCase()) ||
      snippet.code.toLowerCase().includes(search.toLowerCase())
  );

  // EMPTY STATE
  if (filteredSnippets.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
        <h2 className="text-2xl font-bold">
          No snippets found
        </h2>

        <p className="text-gray-500 mt-2">
          Create your first snippet 🚀
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredSnippets.map((snippet) => (
        <div
          key={snippet.id}
          className="bg-white shadow-lg rounded-2xl p-5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          data-testid="snippet-list-item"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {snippet.title}
              </h2>

              <p className="text-gray-500">
                {snippet.language}
              </p>
            </div>

            <button
              onClick={() => deleteSnippet(snippet.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
              data-testid="delete-snippet-button"
            >
              Delete
            </button>
          </div>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 my-4">
            {snippet.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                data-testid="snippet-tag"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* ACTION BUTTON */}
          <Link
            to={`/snippet/${snippet.id}`}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            View Snippet
          </Link>
        </div>
      ))}
    </div>
  );
}