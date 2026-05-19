import { useState } from "react";
import Header from "../components/Header";
import SnippetForm from "../components/SnippetForm";
import SnippetList from "../components/SnippetList";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6">
          <input
            type="text"
            placeholder="Search snippets..."
            className="w-full border border-gray-300 rounded-xl p-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-testid="search-input"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <SnippetForm />
          <SnippetList search={search} />
        </div>
      </main>
    </div>
  );
}