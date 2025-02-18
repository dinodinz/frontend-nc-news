import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Article from "./components/Article";
import Author from "./components/Author";
import "./App.css";

function App() {
  return (
    <div className="universal-container">
      <Router>
        <Routes>
          <Route path="*" element={<Header />}></Route>
        </Routes>

        <Routes>
          <Route path="/" element={<MainContent />}></Route>
          <Route path="/article/:article_id" element={<Article />}></Route>
          <Route path="/author/:author_name" element={<Author />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
