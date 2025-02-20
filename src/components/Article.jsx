import { useEffect, useState } from "react";
import { getArticleById, updateArticleByArticleId } from "../utils/Api";
import { closePopup } from "../utils/UtilFunctions";
import { useParams, Link } from "react-router-dom";
import { Heart } from "@phosphor-icons/react";
import Comments from "./Comments";
import { useTopicState } from "../contexts/AllContexts";

const Article = () => {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(0);
  const [error, setError] = useState(null);
  const { article_id } = useParams();
  const { setCurrentTopic } = useTopicState();

  useEffect(() => {
    getArticleById(article_id).then((article) => {
      setArticle(article);
      setVoteCount(article.votes);
      setIsLoading(false);
    });
  }, [hasVoted]);

  function handleVoteClick() {
    if (!hasVoted) {
      setVoteCount((voteCount) => voteCount + 1);
      setError(null);
      updateArticleByArticleId(article.article_id, hasVoted)
        .then((result) => {
          setHasVoted(true);
        })
        .catch((err) => {
          setVoteCount((voteCount) => voteCount - 1);
          setError("Vote submission was not succesfull. Please try again!");
        });
    } else {
      setVoteCount((voteCount) => voteCount - 1);
      setError(null);
      updateArticleByArticleId(article.article_id, hasVoted)
        .then((result) => {
          setHasVoted(false);
        })
        .catch((err) => {
          setVoteCount((voteCount) => voteCount + 1);
          setError("Vote update was not succesfull. Please try again!");
        });
    }
  }

  if (isLoading) {
    return (
      <div className="loading-msg-container">
        <p className="loading-msg">Loading...</p>
      </div>
    );
  }

  return (
    <div id="article-page-container">
      <div className="article-page-buttons">
        <Link
          className="article-page-author-link"
          to={`/author/${article.author}`}
        >
          <p className="article-page-author">{article.author}</p>
        </Link>
        <div className="like-dislike-button">
          <p
            className="article-page-heart-icon"
            onClick={handleVoteClick}
            style={{ color: hasVoted ? "#ff64e8" : "#646cff" }}
          >
            <Heart size={25} />
          </p>
          {error ? (
            <div id="pop-up-error" className="article-page-heart-error-msg">
              <p>{error}</p>
              <button onClick={closePopup}>close</button>
            </div>
          ) : null}
          <p className="article-tile-heart-count">
            <span>{voteCount}</span>
          </p>
        </div>
      </div>
      <div className="article-page-img-container">
        <img src={article.article_img_url}></img>
        <Link to={`/topic/${article.topic}`}>
          <button
            onClick={() => {
              setCurrentTopic(article.topic);
            }}
          >
            {article.topic}
          </button>
        </Link>
      </div>
      <div className="article-body">
        <p>{article.body}</p>
      </div>
      <div className="article-comments-container">
        <Comments article={article} />
      </div>
    </div>
  );
};

export default Article;
