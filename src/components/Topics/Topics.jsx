import { useEffect, useState } from "react";
import { getArticles, getTopics } from "../../utils/Api.js";
import { ThumbsUp, ChatTeardropText, ImageBroken } from "@phosphor-icons/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentTopic } from "../../redux/topicSlice.js";
import { setArticles } from "../../redux/articleListSlice.js";
import { setErrorPage } from "../../redux/errorSlice.js";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import FooterCredits from "../UI/FooterCredits.jsx";

const Topics = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { topic } = useParams();
  const [allTopic, setAllTopic] = useState([]);
  const currentTopic = useSelector((state) => state.topic.currentTopic);
  const articles = useSelector((state) => state.articleList.articles);
  const errorPage = useSelector((state) => state.error.errorPage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentTopic === null) {
      dispatch(setCurrentTopic(topic));
    } else {
      getArticles(currentTopic)
        .then((topicRelatedArticles) => {
          dispatch(setArticles(topicRelatedArticles));
          setIsLoading(false);
        })
        .catch((err) => {
          dispatch(
            setErrorPage([err.response.status, err.response.data.error])
          );
          setIsLoading(false);
        });

      getTopics(currentTopic)
        .then((allTopicResponse) => {
          setAllTopic(allTopicResponse);
        })
        .catch((err) => {
          dispatch(
            setErrorPage([err.response.status, err.response.data.error])
          );
          setIsLoading(false);
        });
    }
  }, [currentTopic]);

  if (isLoading) {
    return (
      <div className="w-[95%] flex flex-col bg-[hsla(219,79%,41%,0.13)] rounded-[15px] mt-[20px] pt-[20px] mb-5[20px] pb-[20px] relative">
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
      <div className="w-[95%] flex flex-col bg-[hsla(219,79%,41%,0.13)] rounded-[15px] mt-[20px] pt-[20px] mb-5[20px] pb-[20px] relative">
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
    <>
      <div className="alltopic-container">
        <p>Topics:</p>
        {allTopic.map((eachTopic) => {
          return (
            <Link key={eachTopic.slug} to={`/topic/${eachTopic.slug}`}>
              <button
                key={eachTopic.slug}
                onClick={() => {
                  dispatch(setCurrentTopic(eachTopic.slug));
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
          <div
            key={article.article_id}
            className="article-tile w-[300px] bg-[white] pt-[10px] px-[5px] pb-[15px] rounded-[10px]"
          >
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
                    dispatch(setCurrentTopic(article.topic));
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
