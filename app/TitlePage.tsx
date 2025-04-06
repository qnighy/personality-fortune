"use client";

import { ChangeEvent, ReactElement, useEffect, useRef } from "react";

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
    <div className="TitlePage__container">
      <h1 className="TitlePage__title">
        Personality Assessment
      </h1>
      <button
        ref={button}
        className="btn TitlePage__start-button"
        onClick={start}
      >
        Start
      </button>
      <div className="TitlePage__settings-container">
        <select
          className="sel TitlePage__settings-mode"
          value={mode}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setMode(e.currentTarget.value as "basic" | "advanced")}
        >
          <option className="opt TitlePage__settings-mode-option" value="basic">
            basic mode
          </option>
          <option className="opt TitlePage__settings-mode-option" value="advanced">
            advanced mode
          </option>
        </select>
      </div>
    </div>
  );
}
