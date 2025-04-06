"use client";

import { ChangeEvent, ReactElement, useEffect, useRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";

export type TitlePageProps = {
  start: () => void;
  mode: "basic" | "advanced";
  setMode: (mode: "basic" | "advanced") => void;
};

export function TitlePage(props: TitlePageProps): ReactElement | null {
  const { start, mode, setMode } = props;
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    button.current?.focus();
  }, []);
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
          // ref={button}
          ref: button,
          // className="btn TitlePage__start-button"
          className: "btn TitlePage__start-button",
          // onClick={start}
          onClick: start,
          // >
          // Start
          children: "Start",
        }),
        // </button>
        // <div
        jsxs("div", {
          // className="TitlePage__settings-container"
          className: "TitlePage__settings-container",
          // >
          children: [
            // <select
            jsxs("select", {
              // className="sel TitlePage__settings-mode"
              className: "sel TitlePage__settings-mode",
              // value={mode}
              value: mode,
              // onChange={(e) => setMode(e.currentTarget.value)}
              onChange: (e: ChangeEvent<HTMLSelectElement>) => setMode(e.currentTarget.value as "basic" | "advanced"),
              // >
              children: [
                // <option
                jsx("option", {
                  // className="opt TitlePage__settings-mode-option"
                  className: "opt TitlePage__settings-mode-option",
                  // value="basic"
                  value: "basic",
                  // >
                  // basic mode
                  children: "basic mode",
                }),
                // </option>
                // <option
                jsx("option", {
                  // className="opt TitlePage__settings-mode-option"
                  className: "opt TitlePage__settings-mode-option",
                  // value="advanced"
                  value: "advanced",
                  children: "advanced mode",
                }),
                // </option>
              ],
            }),
          ],
        }),
        // </div>
      ],
    })
    // </div>
  );
}
