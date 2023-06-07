import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();

  return (
    <footer>
      ©Copyright 2023 2duckchun
      <style jsx>{`
        footer {
          font-family: "DungGeunMo";
          display: flex;
          justify-content: center;
          align-items: center;
          height: 140px;
        }
      `}</style>
    </footer>
  );
}
