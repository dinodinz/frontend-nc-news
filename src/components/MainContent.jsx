import AllArticles from "./AllArticles";
import { ArticleListProvider } from "../contexts/AllContexts";

const MainContent = () => {
  return (
    <div id="main-content-container">
      <ArticleListProvider>
        <AllArticles />
      </ArticleListProvider>
    </div>
  );
};

export default MainContent;
