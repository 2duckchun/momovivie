import { useState } from "react";

export default function useValidation() {
  const [error, setError] = useState({
    isError: false,
    errorMessage: "",
  });

  const validator = (name: string, password: string, comment: string) => {
    if (name.length < 2) {
      setError({
        isError: true,
        errorMessage: "닉네임은 2글자 이상 입력해주세요!",
      });
      return false;
    } else if (password.length < 4) {
      setError({
        isError: true,
        errorMessage: "비밀번호는 4글자 이상 입력해주세요!",
      });
      return false;
    } else if (comment.length < 1) {
      setError({
        isError: true,
        errorMessage: "댓글은 1글자 이상 입력해주세요!",
      });
      return false;
    }

    setError({
      isError: false,
      errorMessage: "",
    });

    return true;
  };

  return { validator, error, setError };
}
