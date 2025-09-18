import { useEffect, useState } from "react";
import { getArticleById, updateArticleByArticleId } from "../../utils/Api";
import { useParams } from "react-router-dom";
import { ImageBroken } from "@phosphor-icons/react";
import Comments from "./Comments";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import FooterCredits from "../UI/FooterCredits";
import ArticlePageImage from "./ArticlePageImage";
import { useSelector, useDispatch } from "react-redux";
import { setErrorPage } from "../../redux/errorSlice";

const Article = () => {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(0);
  const [error, setError] = useState(null);
  const { article_id } = useParams();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser.loggedUser);
  const errorPage = useSelector((state) => state.error.errorPage);

  useEffect(() => {
    getArticleById(article_id)
      .then((article) => {
        setArticle(article);
        setVoteCount(article.votes);
        setIsLoading(false);
      })
      .catch((err) => {
        dispatch(setErrorPage([err.response.status, err.response.data.error]));
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
      <div className="w-[95%] flex flex-col bg-[hsla(219,79%,41%,0.13)] rounded-[15px] mt-[20px] pt-[20px] mb-[20px] pb-[20px] relative">
        <div className="loading-msg-container">
          <DotLottieReact
            src="https://lottie.host/64874a31-dac6-4247-8bf9-ff1be54f880d/jzje4DTIL8.lottie"
            loop
            autoplay
            className="w-2/3 relative"
          />
          <p className="loading-msg">Loading...</p>
        </div>
        <FooterCredits />
      </div>
    );
  }

  if (errorPage) {
    return (
      <div className="w-[95%] flex flex-col bg-[hsla(219,79%,41%,0.13)] rounded-[15px] mt-[20px] pt-[20px] mb-[20px] pb-[20px] relative">
        <div className="flex flex-col items-center h-screen justify-center gap-4">
          <ImageBroken size={130} className="mb-[20px] text-[#ff646c]" />
          <p className="font-[900] tracking-[5px] text-[1.4rem]">
            {"Error:" + errorPage[0]}
          </p>
          <p className="font-[900] tracking-[5px] text-[1.4rem]">
            {errorPage[1]}
          </p>
        </div>
        <FooterCredits />
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
