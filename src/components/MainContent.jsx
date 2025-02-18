import { useEffect, useState } from "react";
import { getArticles } from "../utils/Api.js";
import { ThumbsUp, ChatTeardropText, SealCheck } from "@phosphor-icons/react";

const MainContent = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then((allArticles) => {
      setArticles(allArticles);
    });
  }, []);

  return (
    <div id="main-content-container">
      {/* <h2>All Articles</h2> */}
      {articles.map((article) => {
        console.log("ENTRY", article);
        return (
          <div className="article-tile">
            <img src={article.article_img_url}></img>
            <div className="article-tile-info">
              <p className="article-tile-author">{article.author}</p>
              <p className="article-tile-thumbs-up-icon">
                <ThumbsUp size={25} />
              </p>
              <p className="article-tile-thumbs-up-count">
                <span>{article.votes}</span>
              </p>
              <p className="article-tile-comment-icon">
                <ChatTeardropText size={25} />
              </p>
              <p className="article-tile-comment-count">
                {article.comment_count}{" "}
              </p>
            </div>
            <p className="article-tile-title">{article.title} </p>
          </div>
        );
      })}
    </div>
  );
};

export default MainContent;
