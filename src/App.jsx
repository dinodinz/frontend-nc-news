import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Article from "./components/Article";
import Login from "./components/Login";
import Author from "./components/Author";
import "./App.css";

function App() {
  const [username, setusername] = useState("");

  return (
    <div className="universal-container">
      <Routes>
        <Route
          path="*"
          element={<Header username={username} setusername={setusername} />}
        ></Route>
      </Routes>

      <Routes>
        <Route path="/" element={<MainContent />}></Route>
        <Route path="/article/:article_id" element={<Article />}></Route>
        <Route path="/author/:author_name" element={<Author />}></Route>
        <Route
          path="/login"
          element={<Login username={username} setusername={setusername} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
