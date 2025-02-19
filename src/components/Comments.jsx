import { useEffect, useState } from "react";
import { getTimestamp } from "../utils/UtilFunctions";
import { ThumbsUp, ThumbsDown } from "@phosphor-icons/react";
import { getCommentsByArticleId, addCommentByArticleId } from "../utils/Api";
import { Link } from "react-router-dom";

const Comments = ({ article }) => {
  const [allComments, setAllComments] = useState([]);
  const [comment, setComment] = useState([]);
  const [postedComment, setPostedComment] = useState(false);

  useEffect(() => {
    getCommentsByArticleId(article.article_id).then((allComments) => {
      setAllComments(allComments);
    });
  }, [postedComment]);

  function handleCommentSubmit(event) {
    event.preventDefault();
    const commentBody = event.target.value;
    if (commentBody.length !== 0) {
      const username = "tickle122";
      addCommentByArticleId(article.article_id, commentBody, username).then(
        (response) => {
          setPostedComment(comment);
        }
      );
    }
  }

  return (
    <>
      <div className="comment-input-btn-container">
        <input
          placeholder="Comments"
          onChange={(event) => {
            setComment(event.target.value);
          }}
        ></input>
        <button type="submit" value={comment} onClick={handleCommentSubmit}>
          Send
        </button>
      </div>
      <ul className="comment-list">
        {allComments.map((comment) => {
          return (
            <div className="single-comment" key={comment.comment_id}>
              <Link to={`/author/${comment.author}`}>
                <p>{comment.author}</p>
              </Link>
              <li>{comment.body}</li>
              <div className="comment-author-timestamp">
                <p>{getTimestamp(comment.created_at)}</p>

                <div className="comment-like-dislike-button">
                  <p className="">
                    <ThumbsUp size={25} />
                  </p>
                  <p className="">
                    <ThumbsDown size={25} />
                  </p>
                  <p className="article-page-vote-count">
                    <span>{comment.votes}</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </ul>
    </>
  );
};

export default Comments;
