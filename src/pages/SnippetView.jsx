import { useParams, Link } from "react-router-dom";
import { useSnippets } from "../context/SnippetContext";
import Editor from "@monaco-editor/react";

export default function SnippetView() {
  const { id } = useParams();
  const { snippets } = useSnippets();

  const snippet = snippets.find((s) => s.id === id);

  if (!snippet) {
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold">
          Snippet Not Found
        </h1>
      </div>
    );
  }

  const copyCode = async () => {
    await navigator.clipboard.writeText(snippet.code);
    alert("Code copied!");
  };

  const exportToGist = async () => {
    try {
      const token = import.meta.env.VITE_GITHUB_TOKEN;

      console.log("TOKEN:", token);

      const response = await fetch(
        "https://api.github.com/gists",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            description: snippet.title,
            public: true,
            files: {
              [`${snippet.title}.txt`]: {
                content: snippet.code,
              },
            },
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (data.html_url) {
        window.open(data.html_url, "_blank");
      } else {
        alert("Failed to export gist");
      }
    } catch (error) {
      console.error(error);
      alert("Error exporting gist");
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">
              {snippet.title}
            </h1>

            <p className="text-gray-500 mt-2">
              {snippet.language}
            </p>
          </div>

          <Link
            to="/"
            className="bg-gray-800 text-white px-4 py-2 rounded-xl"
          >
            Back
          </Link>
        </div>

        <div className="flex gap-2 flex-wrap">
          {snippet.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        <Editor
          height="500px"
          language={snippet.language}
          value={snippet.code}
          theme="vs-dark"
          options={{
            readOnly: true,
            minimap: { enabled: false },
            fontSize: 16,
          }}
        />

        <div className="flex gap-4">
          <button
            onClick={copyCode}
            className="bg-green-600 text-white px-5 py-3 rounded-xl"
          >
            Copy Code
          </button>

          <button
            onClick={exportToGist}
            className="bg-purple-600 text-white px-5 py-3 rounded-xl"
          >
            Export to Gist
          </button>
        </div>
      </div>
    </div>
  );
}