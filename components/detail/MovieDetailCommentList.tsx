import { Comment } from "@/types/comment";
import convertTimestamp from "@/utils/convertTimestamp";
import { useState } from "react";
import CommentDeleteModal from "../modal/CommentDeleteModal";

export default function MovieDetailCommentList({
  commentList,
  deleteComment,
}: {
  commentList: Comment[];
  deleteComment: Function;
}) {
  const [showModal, setShowModal] = useState(false);
  const [commentId, setcommentId] = useState("");
  const [commentPassword, setCommentPassword] = useState("");

  const openModal = (id: string, password: string) => {
    setcommentId(id);
    setCommentPassword(password);
    setShowModal(true);
  };

  return (
    <>
      {showModal && (
        <CommentDeleteModal
          setModal={setShowModal}
          commentId={commentId}
          commentPassword={commentPassword}
          deleteComment={deleteComment}
        />
      )}
      <ul>
        {commentList.map((movie) => (
          <li key={movie.id}>
            <div className="commenter-info">
              <span className="commenter-name">{movie.nickname}</span>
              <span className="commenter-time">
                {convertTimestamp(movie.createdTime)}
              </span>
            </div>
            <div className="comment-content">
              <pre>{movie.comment}</pre>
            </div>
            <div>
              <button onClick={() => openModal(movie.id!, movie.password!)}>
                삭제
              </button>
            </div>
          </li>
        ))}
        <style jsx>{`
          li {
            padding: 5px;
            border: 1px solid gray;
            display: flex;
            font-family: "DungGeunMo";
            justify-content: space-between;
            gap: 3px;
            border-radius: 5px;
          }
          li + li {
            margin: 3px 0px;
          }
          .commenter-info {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 70px;
            min-height: 50px;
          }
          .commenter-name {
            text-align: center;
            font-size: 15px;
          }
          .commenter-time {
            font-size: 13px;
            text-align: center;
          }
          .comment-content {
            flex-grow: 1;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .comment-content pre {
            overflow: hidden;
            flex-grow: 1;
            font-family: "DungGeunMo";
            padding: 5px;
            width: 240px;
            min-height: 60px;
            word-wrap: break-word;
            white-space: pre-wrap;
            text-overflow: ellipsis;
          }
          button {
            all: unset;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            background-color: #f0f0f0;
            padding: 4px 4px;
            font-size: 12px;
            min-height: 20px;
            border: 1px solid rgba(0, 0, 0, 0.21);
            border-bottom-color: rgba(0, 0, 0, 0.34);
            text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
            box-shadow: 0 1px 0 rgba(255, 255, 255, 0.34) inset,
              0 2px 0 -1px rgba(0, 0, 0, 0.13), 0 3px 0 -1px rgba(0, 0, 0, 0.08),
              0 3px 13px -1px rgba(0, 0, 0, 0.21);
            border-radius: 5px;
          }
          button:active {
            top: 1px;
            border-color: rgba(0, 0, 0, 0.34) rgba(0, 0, 0, 0.21)
              rgba(0, 0, 0, 0.21);
            box-shadow: 0 1px 0 rgba(255, 255, 255, 0.89),
              0 1px rgba(0, 0, 0, 0.05) inset;
            position: relative;
          }
        `}</style>
      </ul>
    </>
  );
}
