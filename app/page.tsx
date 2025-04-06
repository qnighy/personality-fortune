import { App } from "./App";

export default function Home() {
  return (
    <>
      <App />
      <BlurProvider />
    </>
  );
}

function BlurProvider() {
  return (
    <svg width="1" height="1" style={{ display: "none" }}>
      <defs>
        <filter id="blur-vertical">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0 20" />
        </filter>
      </defs>
    </svg>
  );
}
