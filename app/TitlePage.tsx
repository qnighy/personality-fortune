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
    <div className="TitlePage__container w-full h-full flex flex-col place-content-center place-items-center">
      <h1 className="TitlePage__title text-5xl font-bold text-center text-gray-800">
        Personality Assessment
      </h1>
      <button
        ref={button}
        className="btn TitlePage__start-button mt-5 px-5 py-2.5 text-2xl"
        onClick={start}
      >
        Start
      </button>
      <div className="TitlePage__settings-container mt-10 flex flex-row">
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
