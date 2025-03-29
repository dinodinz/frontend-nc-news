import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import {
  AppProvider,
  ArticleListProvider,
  ErrorPageProvider,
  TopicsProvider,
  HasCreatedProvider,
} from "./contexts/AllContexts";
import MainContent from "./components/MainContent";
import Article from "./components/Article";
import Login from "./components/Login";
import Create from "./components/Create";
import Author from "./components/Author";
import "./App.css";
import Topics from "./components/Topics";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <TopicsProvider>
      <AppProvider>
        <div className="universal-container">
          <Header />

          <Routes>
            <Route path="/" element={<MainContent />}></Route>
            <Route
              path="/article/:article_id"
              element={
                <ErrorPageProvider>
                  <ArticleListProvider>
                    <Article />
                  </ArticleListProvider>
                </ErrorPageProvider>
              }
            ></Route>
            <Route path="/author/:author_name" element={<Author />}></Route>

            <Route
              path="/login"
              element={
                <HasCreatedProvider>
                  <Login />
                </HasCreatedProvider>
              }
            ></Route>
            <Route
              path="/create"
              element={
                <HasCreatedProvider>
                  <Create />
                </HasCreatedProvider>
              }
            ></Route>

            <Route
              path="/topic/:topic"
              element={
                <ErrorPageProvider>
                  <ArticleListProvider>
                    <Topics />
                  </ArticleListProvider>
                </ErrorPageProvider>
              }
            ></Route>
            <Route
              path="*"
              element={
                <ErrorPageProvider>
                  <ErrorPage />
                </ErrorPageProvider>
              }
            ></Route>
          </Routes>
        </div>
      </AppProvider>
    </TopicsProvider>
  );
}

export default App;
