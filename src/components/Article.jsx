import { useEffect, useState } from "react";
import { getArticleById } from "../utils/Api";
import { useParams, Link } from "react-router-dom";
import { ThumbsUp, ThumbsDown, ChatTeardropText } from "@phosphor-icons/react";

const Article = () => {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { article_id } = useParams();

  useEffect(() => {
    getArticleById(article_id).then((article) => {
      setArticle(article);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="loading-msg-container">
        <p className="loading-msg">Loading...</p>
      </div>
    );
  }

  return (
    <div id="article-container">
      <div className="article-page-buttons">
        <Link
          className="article-page-author-link"
          to={`/author/${article.author}`}
        >
          <p className="article-page-author">{article.author}</p>
        </Link>
        <div className="like-dislike-button">
          <p className="article-tile-thumbs-up-icon">
            <ThumbsUp size={25} />
          </p>
          <p className="article-tile-thumbs-up-count">
            <span>{article.votes}</span>
          </p>
          <p className="article-tile-thumbs-up-icon">
            <ThumbsDown size={25} />
          </p>
          <p className="article-tile-thumbs-up-count">
            <span>{article.votes}</span>
          </p>
        </div>
      </div>
      <img src={article.article_img_url}></img>
      <div className="article-body">
        <p>{article.body}</p>
      </div>
      <div className="article-comments-container">
        <input placeholder="Comments"></input>
      </div>
    </div>
  );
};

export default Article;
