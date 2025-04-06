import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import ReactDOMClient from "react-dom/client";

function main() {
  const root = ReactDOMClient.createRoot(document.getElementById("root"));
  root.render(
    // <App />
    jsx(App, {})
  );
}

function App() {
  return (
    // <div>
    jsx("div", {
      // Hello, world!
      children: "Hello, world!",
    })
    // </div>
  );
}

main();
