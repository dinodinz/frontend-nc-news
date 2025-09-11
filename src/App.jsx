import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import MainContent from "./components/UI/MainContent";
import Article from "./components/Article/Article";
import Login from "./components/Header/Login";
import Create from "./components/Header/Create";
import Author from "./components/Author/Author";
import "./App.css";
import Topics from "./components/Topics/Topics";
import ErrorPage from "./components/UI/ErrorPage";

function App() {
  return (
    <div className="h-full w-full flex flex-col items-center">
      <Header />

      <Routes>
        <Route path="/" element={<MainContent />}></Route>
        <Route path="/article/:article_id" element={<Article />}></Route>
        <Route path="/author/:author_name" element={<Author />}></Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/create" element={<Create />}></Route>

        <Route path="/topic/:topic" element={<Topics />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
