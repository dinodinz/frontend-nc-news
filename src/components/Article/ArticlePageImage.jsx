import { Link } from "react-router-dom";
import { Heart } from "@phosphor-icons/react";
import { closePopup } from "../../utils/UtilFunctions";
import { useDispatch } from "react-redux";
import { setCurrentTopic } from "../../redux/topicSlice";

const ArticlePageImage = ({
  article,
  error,
  setError,
  handleVoteClick,
  hasVoted,
  voteCount,
}) => {
  const dispatch = useDispatch();

  return (
    <>
      <img src={article.article_img_url}></img>
      {error ? (
        <div id="pop-up-error" className="article-page-heart-error-msg">
          <p>{error}</p>
          <button
            onClick={() => {
              setError(null);
              closePopup();
            }}
          >
            close
          </button>
        </div>
      ) : null}

      <div className="like-dislike-button">
        <p
          className="article-page-heart-icon"
          onClick={handleVoteClick}
          style={{ color: hasVoted ? "#ff64e8" : "#ffff" }}
        >
          <Heart size={25} />
        </p>

        <p className="article-tile-heart-count">
          <span>{voteCount}</span>
        </p>
      </div>

      <Link
        className="article-page-author-link"
        to={`/author/${article.author}`}
      >
        <p className="article-page-author">{article.author}</p>
      </Link>
      <Link to={`/topic/${article.topic}`}>
        <button
          className="article-image-topic-button"
          onClick={() => {
            dispatch(setCurrentTopic(article.topic));
          }}
        >
          {article.topic.charAt(0).toUpperCase() + article.topic.slice(1)}
        </button>
      </Link>
    </>
  );
};

export default ArticlePageImage;
