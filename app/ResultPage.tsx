"use client";

import { useEffect, useRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";

export function ResultPage(props) {
  const { lottery, goBack } = props;
  const button = useRef(null);
  useEffect(() => {
    button.current?.focus();
  }, []);
  return (
    // <div
    jsxs("div", {
      // className="ResultPage__container"
      className: "ResultPage__container",
      // >
      children: [
        // <h1
        jsx("h1", {
          // className="ResultPage__title"
          className: "ResultPage__title",
          // >
          children: "Result",
        }),
        // </h1>
        // <div
        jsxs("div", {
          // className="ResultPage__lottery"
          className: "ResultPage__lottery",
          // >
          children: [
            // <span
            jsxs("span", {
              // className="ResultPage__lottery-text"
              className: "ResultPage__lottery-text",
              // >
              children: [
                // <span>
                jsx("span", {
                  children: "Your personality is: ",
                }),
                // </span>
                // <span
                jsx("span", {
                  // className="ResultPage__lottery-main"
                  className: "ResultPage__lottery-main",
                  // >
                  children: lottery,
                }),
                // </span>
                // <span>
                jsx("span", {
                  children: "",
                }),
                // </span>
              ],
            }),
            // </span>
          ],
        }),
        // </div>
        // <button
        jsx("button", {
          // ref={button}
          ref: button,
          // className="btn ResultPage__go-back-button"
          className: "btn ResultPage__go-back-button",
          // onClick={goBack}
          onClick: goBack,
          // >
          children: "Go Back",
        }),
        // </button>
      ],
    })
    // </div>
  );
}
