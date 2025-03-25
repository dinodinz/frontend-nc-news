import { useEffect, useState } from "react";
import { getArticleById, updateArticleByArticleId } from "../utils/Api";
import { closePopup } from "../utils/UtilFunctions";
import { useParams, Link } from "react-router-dom";
import { Heart, ImageBroken } from "@phosphor-icons/react";
import Comments from "./Comments";
import { useErrorPageState, useTopicState } from "../contexts/AllContexts";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import FooterCredits from "./FooterCredits";

const Article = () => {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(0);
  const [error, setError] = useState(null);
  const { article_id } = useParams();
  const { setCurrentTopic } = useTopicState();
  const { errorPage, setErrorPage } = useErrorPageState();

  useEffect(() => {
    getArticleById(article_id)
      .then((article) => {
        setArticle(article);
        setVoteCount(article.votes);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorPage([err.response.status, err.response.data.error]);
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
        <DotLottieReact
          src="https://lottie.host/64874a31-dac6-4247-8bf9-ff1be54f880d/jzje4DTIL8.lottie"
          loop
          autoplay
          className="car-animation"
        />
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
    <div id="article-page-container">
      <div className="article-page-img-container">
        <img src={article.article_img_url}></img>

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

        <Link
          className="article-page-author-link"
          to={`/author/${article.author}`}
        >
          <p className="article-page-author">{article.author}</p>
        </Link>
        <Link to={`/topic/${article.topic}`}>
          <button
            onClick={() => {
              setCurrentTopic(article.topic);
            }}
          >
            {article.topic.charAt(0).toUpperCase() + article.topic.slice(1)}
          </button>
        </Link>
      </div>

      <div className="article-body">
        <p>{article.body}</p>
      </div>
      <div className="article-comments-container">
        <Comments article={article} />
      </div>
      <FooterCredits />
    </div>
  );
};

export default Article;

// <div className="article-page-buttons">
//       <Link
//         className="article-page-author-link"
//         to={`/author/${article.author}`}
//       >
//         <p className="article-page-author">{article.author}</p>
//       </Link>
//       <div className="like-dislike-button">
//         <p
//           className="article-page-heart-icon"
//           onClick={handleVoteClick}
//           style={{ color: hasVoted ? "#ff64e8" : "#646cff" }}
//         >
//           <Heart size={25} />
//         </p>
//         {error ? (
//           <div id="pop-up-error" className="article-page-heart-error-msg">
//             <p>{error}</p>
//             <button onClick={closePopup}>close</button>
//           </div>
//         ) : null}
//         <p className="article-tile-heart-count">
//           <span>{voteCount}</span>
//         </p>
//       </div>
//     </div>
