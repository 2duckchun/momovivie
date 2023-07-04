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
  const [error, setError] = useState(false);

  const handleData = (event: any) => {
    if (event.target.id === "modal-input-password") setError(false);
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
    } else {
      setError(true);
    }
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
          {error && <p className="error-message">비밀번호가 다릅니다!</p>}
          <div className="modal-button-container">
            <button
              className="confirm-button"
              onClick={() =>
                checkPassword(inputPassword, commentPassword, commentId)
              }
            >
              확인
            </button>
            <button className="cancel-button" onClick={() => setModal(false)}>
              취소
            </button>
          </div>
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
          overflow: hidden;
          width: 300px;
          background-color: #fff;
          min-height: 100px;
          border-radius: 5px;
          border: 1px solid #000;
          box-shadow: 6px 6px 9px -2px rgba(0, 0, 0, 0.75);
        }
        h4 {
          background-color: #bdb9b98a;
        }
        h4,
        p {
          text-align: center;
          padding: 5px;
        }
        input {
          margin: 0 auto;
          width: 90%;
          display: block;
          padding: 2px 5px;
        }
        .modal-button-container {
          display: flex;
          padding: 10px 0px 10px;
          margin: auto;
          width: 90%;
          justify-content: flex-end;
          gap: 10px;
        }
        button {
          padding: 3px 10px 3px;
        }
        .error-message {
          color: tomato;
        }
      `}</style>
    </>
  );
}
