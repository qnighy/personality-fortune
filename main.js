import { useCallback, useEffect, useReducer, useState } from "react";
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
  const [state, dispatch] = useReducer(reducer, intialState);
  const start = useCallback(() => {
    dispatch({ type: "start" });
  }, [dispatch]);

  return (
    // <div
    jsxs("div", {
      // className="App__container"
      className: "App__container",
      // >
      children: [
        state.page === "title" &&
          // <TitlePage,
          jsx(TitlePage, {
            // start={start}
            start,
          }),
          // />
        state.page === "main" &&
          // <MainPage,
          jsx(MainPage, {
            // lottery={state.lottery}
            lottery: state.lottery,
          }),
          // />
      ],
    })
    // </div>
  );
}

function TitlePage(props) {
  const { start } = props;
  return (
    // <div
    jsxs("div", {
      // className="TitlePage__container"
      className: "TitlePage__container",
      // >
      children: [
        // <h1
        jsx("h1", {
          // className="TitlePage__title"
          className: "TitlePage__title",
          // >
          children: "Personality Assessment",
        }),
        // </h1>
        // <button
        jsx("button", {
          // className="TitlePage__start-button"
          className: "TitlePage__start-button",
          // onClick={start}
          onClick: start,
          // >
          // Start Lottery
          children: "Start",
        }),
        // </button>
      ],
    })
    // </div>
  );
}

function MainPage(props) {
  const { lottery } = props;
  const lotteryOptions = [
    ["I", "E"],
    ["S", "N"],
    ["T", "F"],
    ["J", "P"],
  ];
  const [rands, setRands] = useState([0, 0, 0, 0]);
  useEffect(() => {
    let active = true;
    function animate() {
      if (!active) return;
      const newRands = Array.from({ length: 4 }, () => Math.random());
      setRands(newRands);
      requestAnimationFrame(animate);
    }
    animate();
    return () => { active = false; };
  }, []);
  return (
    // <div
    jsx("div", {
      // className="MainPage__container"
      className: "MainPage__container",
      // >
      children:
        // <div
        jsxs("div", {
          // className="MainPage__lottery-container"
          className: "MainPage__lottery-container",
          // >
          children: [
            [...lottery].map((ch, i) =>
              // <SlotUnit key={`slot-${i}`}
              jsx(SlotUnit, {
                // value={ch === "*" ? null : ch}
                value: ch === "*" ? null : ch,
                // options={lotteryOptions[i]}
                options: lotteryOptions[i],
                // randValue={rands[i]}
                randValue: rands[i],
              }, `slot-${i}`)
              // />
            ),
          ],
        })
        // </div>
    })
    // </div>
  );
}

function SlotUnit(props) {
  const { value, options, randValue } = props;
  const optionsExt = [...options, options[0]];
  const off = -randValue * 240 * options.length;
  return (
    // <div
    jsxs("div", {
      // className="SlotUnit__container"
      className: "SlotUnit__container",
      // >
      children: [
        // <div
        jsxs("div", {
          // className="SlotUnit__window"
          className: "SlotUnit__window",
          // >
          children: [
            !!value &&
              // <div
              jsxs("div", {
                // className="SlotUnit__option"
                className: "SlotUnit__option",
                // style={{ top: "0px" }}
                style: { top: "0px", },
                // >
                children: [
                  // <span
                  jsx("span", {
                    // className="SlotUnit__option-text"
                    className: "SlotUnit__option-text",
                    // >
                    children: value,
                  }),
                  // </span>
                ],
              }),
              // />
            !value &&
              optionsExt.map((option, i) => (
                // <div key={`option-${i}`}
                jsxs("div", {
                  // className="SlotUnit__option SlotUnit__option-active"
                  className: "SlotUnit__option SlotUnit__option-active",
                  // style={{ top: `${off + i * 240}px` }}
                  style: { top: `${off + i * 240}px`, },
                  // >
                  children: [
                    // <span
                    jsx("span", {
                      // className="SlotUnit__option-text"
                      className: "SlotUnit__option-text",
                      // >
                      children: option,
                    }),
                    // </span>
                  ],
                }, `option-${i}`)
                // />
              )),
          ],
        }),
        // </div>
      ],
    })
    // </div>
  );
}

const intialState = {
  page: "title",
  lottery: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "start":
      return {
        ...state,
        page: "main",
        lottery: "****",
      };
    default:
      return state;
  }
}

main();
