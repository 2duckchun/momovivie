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
        {commentList.map((el) => (
          <li key={el.id}>
            <div className="commenter-info">
              <span className="commenter-name">{el.nickname}</span>
              <span className="commenter-time">
                {convertTimestamp(el.createdTime)}
              </span>
            </div>
            <div className="comment-content">
              <p>{el.comment}</p>
            </div>
            <div>
              <button onClick={() => openModal(el.id!, el.password!)}>
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
            gap: 10px;
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
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .comment-content p {
            padding: 5px;
            width: 100%;
            min-height: 60px;
            resize: none;
          }
          button {
            width: 45px;
            min-height: 30px;
          }
        `}</style>
      </ul>
    </>
  );
}
