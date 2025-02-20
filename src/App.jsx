import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import {
  AppProvider,
  ArticleListProvider,
  TopicsProvider,
} from "./contexts/AllContexts";
import MainContent from "./components/MainContent";
import Article from "./components/Article";
import Login from "./components/Login";
import Author from "./components/Author";
import "./App.css";
import Topics from "./components/Topics";

function App() {
  return (
    <TopicsProvider>
      <AppProvider>
        <div className="universal-container">
          <Routes>
            <Route path="*" element={<Header />}></Route>
          </Routes>

          <Routes>
            <Route path="/home" element={<MainContent />}></Route>
            <Route
              path="/article/:article_id"
              element={
                <ArticleListProvider>
                  <Article />
                </ArticleListProvider>
              }
            ></Route>
            <Route path="/author/:author_name" element={<Author />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route
              path="/topic/:topic"
              element={
                <ArticleListProvider>
                  <Topics />
                </ArticleListProvider>
              }
            ></Route>
          </Routes>
        </div>
      </AppProvider>
    </TopicsProvider>
  );
}

export default App;
