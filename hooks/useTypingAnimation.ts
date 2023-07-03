import { useEffect, useState } from "react";

export default function useTypingAnimation(message: string) {
  const [count, setCount] = useState(0);
  const [typing, setTyping] = useState<string>(""); // 붙여넣기
  useEffect(() => {
    if (count >= message.length) {
      return;
    }
    const typingInterval = setInterval(() => {
      setTyping((prev: string) => {
        let result;
        result = prev ? prev + message[count] : message[count];
        setCount(count + 1);
        return result;
      });
    }, 50);

    return () => {
      clearInterval(typingInterval);
    };
  }, [typing]);

  return typing;
}
