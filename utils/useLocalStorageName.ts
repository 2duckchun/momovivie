export default function useLocalName() {
  const nickname = localStorage.getItem("nickname");
  return nickname ? nickname : "";
}
