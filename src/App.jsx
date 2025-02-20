import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import { AppProvider } from "./contexts/AllContexts";
import MainContent from "./components/MainContent";
import Article from "./components/Article";
import Login from "./components/Login";
import Author from "./components/Author";
import "./App.css";

function App() {
  return (
    <AppProvider>
      <div className="universal-container">
        <Routes>
          <Route path="*" element={<Header />}></Route>
        </Routes>

        <Routes>
          <Route path="/home" element={<MainContent />}></Route>
          <Route path="/article/:article_id" element={<Article />}></Route>
          <Route path="/author/:author_name" element={<Author />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </AppProvider>
  );
}

export default App;
