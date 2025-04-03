import { useEffect, useState } from "react";
import { getTimestamp, closeCommentPopup } from "../utils/UtilFunctions";
import { ThumbsUp, ThumbsDown } from "@phosphor-icons/react";
import {
  getCommentsByArticleId,
  addCommentByArticleId,
  deleteCommentById,
  updateCommentByCommentId,
} from "../utils/Api";
import { Link } from "react-router-dom";
import { useLoggedUser } from "../contexts/AllContexts";

const Comments = ({ article }) => {
  const [allComments, setAllComments] = useState([]);
  const [comment, setComment] = useState([]);
  const [logError, setLogError] = useState(null);
  const [postedComment, setPostedComment] = useState(false);
  const [deletedComment, setDeletedComment] = useState(false);
  const [votedComment, setVotedComment] = useState(false);
  const { loggedUser } = useLoggedUser();

  useEffect(() => {
    setDeletedComment(false);
    setVotedComment(false);
    getCommentsByArticleId(article.article_id).then((allComments) => {
      setAllComments(allComments);
    });
  }, [postedComment, deletedComment, votedComment]);

  function handleCommentSubmit(event) {
    event.preventDefault();
    const commentBody = event.target.value;
    if (loggedUser) {
      if (commentBody.length !== 0) {
        setLogError(null);
        const username = loggedUser.username;
        addCommentByArticleId(article.article_id, commentBody, username).then(
          (response) => {
            setPostedComment(comment);
          }
        );
      } else {
        setLogError("Please provide your comment");
      }
    } else {
      setLogError("Please log in to post comments and like");
    }
  }

  function handleDeleteComment(event) {
    event.preventDefault();
    const commentId = event.target.value;

    deleteCommentById(commentId).then(() => {
      setDeletedComment(true);
    });
  }

  function handleCommentVote(upDown, comment_id, comment_votes) {
    if (upDown === "up") {
      updateCommentByCommentId(
        { updateVote: comment_votes + 1, update: "increase" },
        comment_id
      ).then(() => {
        setVotedComment(true);
      });
    } else {
      updateCommentByCommentId(
        { updateVote: comment_votes - 1, update: "decrease" },
        comment_id
      ).then(() => {
        setVotedComment(true);
      });
    }
  }

  return (
    <>
      <div className="comment-input-btn-container">
        {logError ? (
          <div id="comment-pop-up-error">
            <p>{logError}</p>
            <button
              onClick={() => {
                setLogError(null);
                closeCommentPopup();
              }}
            >
              close
            </button>
          </div>
        ) : null}
        <div className="comment-box-btn-container">
          <textarea
            className="comment-input-box"
            placeholder="Write a comment..."
            onChange={(event) => {
              setComment(event.target.value);
            }}
          ></textarea>
          <div className="comment-btn-container">
            <button type="submit" value={comment} onClick={handleCommentSubmit}>
              Post a Comment
            </button>
          </div>
        </div>
      </div>
      <ul className="comment-list">
        {allComments.map((comment) => {
          return (
            <div className="single-comment" key={comment.comment_id}>
              <div className="delete-btn-comment-container">
                <Link to={`/author/${comment.author}`}>
                  <p>{comment.author}</p>
                </Link>
                {loggedUser ? (
                  loggedUser.username === comment.author ? (
                    <button
                      className="comment-delete-btn"
                      value={comment.comment_id}
                      onClick={handleDeleteComment}
                    >
                      delete
                    </button>
                  ) : null
                ) : null}
              </div>
              <li>{comment.body}</li>
              <div className="comment-author-timestamp">
                <p>{getTimestamp(comment.created_at)}</p>

                <div className="comment-like-dislike-button">
                  <p
                    className="increase-thumbs-up"
                    onClick={(event) => {
                      handleCommentVote(
                        "up",
                        comment.comment_id,
                        comment.votes
                      );
                    }}
                  >
                    <ThumbsUp size={25} />
                  </p>
                  <p
                    className="decrease-thumbs-up"
                    onClick={(event) => {
                      handleCommentVote(
                        "down",
                        comment.comment_id,
                        comment.votes
                      );
                    }}
                  >
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
