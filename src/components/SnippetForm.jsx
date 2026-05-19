import { useState } from "react";
import { useSnippets } from "../context/SnippetContext";

export default function SnippetForm() {
  const { addSnippet } = useSnippets();

  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [tags, setTags] = useState("");
  const [code, setCode] = useState("");
  const [gistUrl, setGistUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addSnippet({
      title,
      language,
      tags: tags.split(",").map((tag) => tag.trim()),
      code,
    });

    setTitle("");
    setLanguage("javascript");
    setTags("");
    setCode("");
  };

  const importGist = async () => {
    try {
      const gistId = gistUrl.split("/").pop();

      const response = await fetch(
        `https://api.github.com/gists/${gistId}`
      );

      const data = await response.json();

      const firstFile = Object.values(data.files)[0];

      setTitle(firstFile.filename);
      setCode(firstFile.content);

      alert("Gist imported!");
    } catch (error) {
      alert("Failed to import gist");
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6">
        Create Snippet
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border rounded-xl p-3"
          placeholder="Snippet Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="w-full border rounded-xl p-3"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>

        <input
          className="w-full border rounded-xl p-3"
          placeholder="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <textarea
          className="w-full border rounded-xl p-3"
          rows="8"
          placeholder="Write your code..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <input
          className="w-full border rounded-xl p-3"
          placeholder="Paste GitHub Gist URL"
          value={gistUrl}
          onChange={(e) => setGistUrl(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={importGist}
            className="bg-purple-600 text-white px-4 py-3 rounded-xl"
          >
            Import Gist
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-3 rounded-xl"
          >
            Save Snippet
          </button>
        </div>
      </form>
    </div>
  );
}