export default function getlocalStorageName() {
  const nickname = localStorage.getItem("nickname");
  return nickname ? nickname : "";
}
