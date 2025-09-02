import AllArticles from "../Article/AllArticles";
import { ArticleListProvider } from "../../contexts/AllContexts";

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
