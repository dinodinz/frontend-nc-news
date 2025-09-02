import { useEffect, useState } from "react";
import { getArticles, getTopics } from "../../utils/Api.js";
import { ThumbsUp, ChatTeardropText, ImageBroken } from "@phosphor-icons/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useArticleState,
  useErrorPageState,
  useTopicState,
} from "../../contexts/AllContexts.jsx";

const Topics = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { topic } = useParams();
  const { articles, setArticles } = useArticleState();
  const [allTopic, setAllTopic] = useState([]);
  const { currentTopic, setCurrentTopic } = useTopicState();
  const { errorPage, setErrorPage } = useErrorPageState();

  useEffect(() => {
    if (currentTopic === null) {
      setCurrentTopic(topic);
    } else {
      getArticles(currentTopic)
        .then((topicRelatedArticles) => {
          setArticles(topicRelatedArticles);
          setIsLoading(false);
        })
        .catch((err) => {
          setErrorPage([err.response.status, err.response.data.error]);
          setIsLoading(false);
        });

      getTopics(currentTopic)
        .then((allTopicResponse) => {
          setAllTopic(allTopicResponse);
        })
        .catch((err) => {
          setErrorPage([err.response.status, err.response.data.error]);
          setIsLoading(false);
        });
    }
  }, [currentTopic]);

  if (isLoading) {
    return (
      <div className="loading-msg-container">
        <p className="loading-msg">Loading...</p>
      </div>
    );
  }

  if (errorPage) {
    return (
      <div className="loading-msg-container">
        <ImageBroken size={130} />
        <p className="loading-msg">{"Error:" + errorPage[0]}</p>
        <p className="loading-msg">{errorPage[1]}</p>
      </div>
    );
  }

  return (
    <>
      <div className="alltopic-container">
        <p>Topics:</p>
        {allTopic.map((eachTopic) => {
          return (
            <Link key={eachTopic.slug} to={`/topic/${eachTopic.slug}`}>
              <button
                key={eachTopic.slug}
                onClick={() => {
                  setCurrentTopic(eachTopic.slug);
                }}
              >
                {eachTopic.slug}
              </button>
            </Link>
          );
        })}
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

export default Topics;
