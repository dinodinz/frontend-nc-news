import { useEffect, useState } from "react";
import { getArticleById, updateArticleByArticleId } from "../utils/Api";
import { closePopup } from "../utils/UtilFunctions";
import { useParams, Link } from "react-router-dom";
import { Heart, ImageBroken } from "@phosphor-icons/react";
import Comments from "./Comments";
import {
  useErrorPageState,
  useTopicState,
  useLoggedUser,
} from "../contexts/AllContexts";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import FooterCredits from "./FooterCredits";
import ArticlePageImage from "./ArticlePageImage";

const Article = () => {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(0);
  const [error, setError] = useState(null);
  const { article_id } = useParams();
  const { setCurrentTopic } = useTopicState();
  const { errorPage, setErrorPage } = useErrorPageState();
  const { loggedUser } = useLoggedUser();

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
    if (loggedUser) {
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
    } else {
      setError("Please log in to post comments and like");
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
        <ArticlePageImage
          article={article}
          error={error}
          setError={setError}
          handleVoteClick={handleVoteClick}
          hasVoted={hasVoted}
          voteCount={voteCount}
          setCurrentTopic={setCurrentTopic}
        />
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
