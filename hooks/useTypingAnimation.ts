import { useEffect, useState } from "react";

export default function useTypingAnimation(message: string, ms: number) {
  const [count, setCount] = useState(0);
  const [typing, setTyping] = useState<string>("");
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
    }, ms);

    return () => {
      clearInterval(typingInterval);
    };
  }, [typing]);

  return typing;
}
