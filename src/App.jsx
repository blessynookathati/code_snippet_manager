import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SnippetView from "./pages/SnippetView";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/snippet/:id" element={<SnippetView />} />
    </Routes>
  );
}