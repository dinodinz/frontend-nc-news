import { useEffect, useState } from "react";
import { getArticles } from "../utils/Api.js";
import { ThumbsUp, ChatTeardropText } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const AllArticles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then((allArticles) => {
      setArticles(allArticles);
    });
  }, []);

  return (
    <>
      {articles.map((article) => {
        return (
          <div key={article.article_id} className="article-tile">
            <Link to={`/article/${article.article_id}`}>
              <img src={article.article_img_url}></img>
            </Link>
            <div className="article-tile-info">
              <Link
                className="article-tile-author-link"
                to={`/author/${article.author}`}
              >
                <p className="article-tile-author">{article.author}</p>
              </Link>
              <Link to={`/article/${article.article_id}`}>
                <p className="article-tile-thumbs-up-icon">
                  <ThumbsUp size={25} />
                </p>
              </Link>
              <p className="article-tile-thumbs-up-count">
                <span>{article.votes}</span>
              </p>
              <Link to={`/article/${article.article_id}`}>
                <p className="article-tile-comment-icon">
                  <ChatTeardropText size={25} />
                </p>
              </Link>
              <p className="article-tile-comment-count">
                {article.comment_count}{" "}
              </p>
            </div>
            <p className="article-tile-title">{article.title} </p>
          </div>
        );
      })}
    </>
  );
};

export default AllArticles;
