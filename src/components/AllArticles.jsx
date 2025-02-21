import { useEffect, useState } from "react";
import { getArticles } from "../utils/Api.js";
import { ThumbsUp, ChatTeardropText, Triangle } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useArticleState, useTopicState } from "../contexts/AllContexts.jsx";

const AllArticles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sortByValue, setSortByValue] = useState("created_at");
  const [order, setOrder] = useState("DESC");
  const { articles, setArticles } = useArticleState();
  const { setCurrentTopic } = useTopicState();

  useEffect(() => {
    getArticles(null, sortByValue, order).then((allArticles) => {
      setArticles(allArticles);
      setIsLoading(false);
    });
  }, [sortByValue, order]);

  if (isLoading) {
    return (
      <div className="loading-msg-container">
        <p className="loading-msg">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="sort-by-container">
        <div>
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            value={sortByValue}
            onChange={(event) => {
              setSortByValue(event.target.value);
            }}
          >
            <option value="created_at">Date</option>
            <option value="comment_count">Comment</option>
            <option value="votes">Vote</option>
          </select>
        </div>
        <div className="triangle-order-btn-container">
          <p>Order:</p>
          <Triangle
            className="triangle-icons"
            id="ASC"
            onClick={(event) => {
              setOrder(event.target.id);
            }}
            size={18}
          />
          <Triangle
            className="upside-down triangle-icons"
            id="DESC"
            onClick={(event) => {
              setOrder(event.target.id);
            }}
            size={18}
          />
        </div>
      </div>
      {articles.map((article) => {
        return (
          <div key={article.article_id} className="article-tile">
            <div className="all-articles-page-img-container">
              <Link to={`/article/${article.article_id}`}>
                <img src={article.article_img_url}></img>
              </Link>
              <Link
                className="all-article-topic-button"
                to={`/topic/${article.topic}`}
              >
                <button
                  onClick={() => {
                    setCurrentTopic(article.topic);
                  }}
                >
                  {article.topic}
                </button>
              </Link>
            </div>
            <div className="article-tile-info">
              <Link
                className="article-tile-author-link"
                to={`/author/${article.author}`}
              >
                <p className="article-tile-author">{article.author}</p>
              </Link>
              <div className="article-tile-like-dislike-button-container">
                <Link
                  className="article-tile-like-dislike-button"
                  to={`/article/${article.article_id}`}
                >
                  <p className="article-tile-thumbs-up-icon">
                    <ThumbsUp size={25} />
                  </p>
                  <p className="article-tile-thumbs-up-count">
                    <span>{article.votes}</span>
                  </p>
                  <p className="article-tile-comment-icon">
                    <ChatTeardropText size={25} />
                  </p>
                </Link>
                <p className="article-tile-comment-count">
                  {article.comment_count}
                </p>
              </div>
            </div>
            <p className="article-tile-title">{article.title} </p>
          </div>
        );
      })}
    </>
  );
};

export default AllArticles;
