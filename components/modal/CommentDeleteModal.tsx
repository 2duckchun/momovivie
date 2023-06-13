import { useState } from "react";

export default function CommentDeleteModal({
  setModal,
  commentId,
  commentPassword,
  deleteComment,
}: {
  setModal: Function;
  commentId: string;
  commentPassword: string;
  deleteComment: Function;
}) {
  const [inputPassword, setInputPassword] = useState("");

  const handleData = (event: any) => {
    if (event.target.id === "modal-input-password")
      setInputPassword(event.target.value);
  };

  const checkPassword = (
    inputPassword: string,
    commentPassword: string,
    commentId: string
  ) => {
    if (inputPassword === commentPassword) {
      deleteComment(commentId);
      setModal(false);
    }
    // else 에러메세지 뿜고 비밀번호가 다르다고 나온다.
  };

  return (
    <>
      <div className="modal-container" onClick={() => setModal(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h4>댓글 삭제</h4>
          <p>비밀번호를 입력해주세요.</p>
          <input
            type="password"
            id="modal-input-password"
            required
            onChange={handleData}
            value={inputPassword}
          />
          <button
            onClick={() =>
              checkPassword(inputPassword, commentPassword, commentId)
            }
          >
            확인
          </button>
          <button onClick={() => setModal(false)}>취소</button>
          <div>id : {commentId}</div>
          <div>pass : {commentPassword}</div>
        </div>
      </div>
      <style jsx>{`
        .modal-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          width: 300px;
          background-color: #fff;
          min-height: 150px;
        }
      `}</style>
    </>
  );
}
