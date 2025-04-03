import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticles, getUserByUsername } from "../utils/Api";
import { useArticleState } from "../contexts/AllContexts";
import { ThumbsUp, ChatTeardropText } from "@phosphor-icons/react";

const Author = () => {
  const { author_name } = useParams();
  const { articles, setArticles } = useArticleState();
  const [authorInfo, setAuthorInfo] = useState({});

  useEffect(() => {
    getArticles(null, "created_at", "asc").then((allArticles) => {
      const authorArticles = allArticles.filter((article) => {
        if (article.author === author_name) return article;
      });

      setArticles(authorArticles);
      getUserByUsername(author_name).then((author) => {
        setAuthorInfo(author);
      });
    });
  }, []);

  return (
    <div id="author-container">
      <div className="wrapper-about-me">
        <div className="authorpage-author-info">
          <img src={authorInfo.avatar_url}></img>
          <div className="authorpage-author-info-text">
            <p>
              <strong>Username:</strong> <br /> {authorInfo.username}
            </p>
            <p>
              <strong>Name:</strong>
              <br /> {authorInfo.name}
            </p>
          </div>
        </div>
      </div>
      <h1 style={{ fontSize: "2rem" }}>Articles</h1>
      <div className="article-container">
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
                  <p
                    className="article-tile-thumbs-up-icon"
                    onClick={() => {
                      handleVoteClick(article.article_id);
                    }}
                  >
                    <ThumbsUp size={25} />
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
                  <p className="article-tile-comment-count">
                    {article.comment_count}
                  </p>
                </div>
              </div>
              <p className="article-tile-title">{article.title} </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Author;
