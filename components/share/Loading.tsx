export default function Loading() {
  return (
    <div className="loading">
      <span>loading</span>
      <div className="circle"></div>
      <style jsx>{`
        .loading {
          font-family: "DungGeunMo";
          margin: auto;
          position: relative;
          width: 50px;
          height: 50px;
          color: #222;
        }
        .circle {
          border: 5px solid #000;
          width: inherit;
          height: inherit;
          box-sizing: border-box;
          border-radius: 50%;
          border-right-color: lightgray;
          border-left-color: lightgray;
          animation: circle 1s linear infinite;
        }
        .loading span {
          font-size: 14px;
          text-transform: uppercase;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.8);
          animation: loading 1s linear infinite;
        }
        @keyframes circle {
          0% {
            transform: rotate(0);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes loading {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
