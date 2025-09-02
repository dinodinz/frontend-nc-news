import { Link } from "react-router-dom";
import { ThumbsUp, ChatTeardropText } from "@phosphor-icons/react";

const ArticleTile = ({ article, handleVoteClick, setCurrentTopic }) => {
  return (
    <div key={article.article_id} className="article-tile">
      {/* Image + Topic */}
      <div className="all-articles-page-img-container">
        <Link to={`/article/${article.article_id}`}>
          <img src={article.article_img_url} alt={article.title} />
        </Link>

        <Link
          className="all-article-topic-button"
          to={`/topic/${article.topic}`}
        >
          <button onClick={() => setCurrentTopic(article.topic)}>
            {article.topic}
          </button>
        </Link>
      </div>

      {/* Author + Votes + Comments */}
      <div className="article-tile-info">
        <Link
          className="article-tile-author-link"
          to={`/author/${article.author}`}
        >
          <p className="article-tile-author">{article.author}</p>
        </Link>

        <div className="article-tile-like-dislike-button-container">
          <p className="article-tile-thumbs-up-icon">
            <ThumbsUp
              size={25}
              onClick={() => handleVoteClick(article.article_id)}
            />
          </p>
          <p className="article-tile-thumbs-up-count">
            <span>{article.votes}</span>
          </p>

          <Link
            className="article-tile-like-dislike-button"
            to={`/article/${article.article_id}`}
          >
            <p className="article-tile-comment-icon">
              <ChatTeardropText size={25} />
            </p>
          </Link>
          <p className="article-tile-comment-count">{article.comment_count}</p>
        </div>
      </div>

      {/* Title */}
      <p className="article-tile-title">{article.title}</p>
    </div>
  );
};

export default ArticleTile;
