// Licensed under the MIT License. See LICENSE file for details.
// Copyright (c) 2025 Masaki Hara

"use client";

import { ChangeEvent, ReactElement, useEffect, useRef } from "react";
import { useI18n } from "@hi18n/react";
import { book } from "./locales";

export type TitlePageProps = {
  start: () => void;
  mode: "basic" | "advanced";
  setMode: (mode: "basic" | "advanced") => void;
  locale: string;
  setLocale: (locale: string) => void;
};

export function TitlePage(props: TitlePageProps): ReactElement | null {
  const { start, mode, setMode, locale, setLocale } = props;
  const { t } = useI18n(book);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    button.current?.focus();
  }, []);
  return (
    <div className="TitlePage__container w-full h-full flex flex-col place-content-center place-items-center">
      <h1 className="TitlePage__title text-5xl font-bold text-center">
        {t("title/title")}
      </h1>
      <button
        type="button"
        ref={button}
        className="btn btn-primary TitlePage__start-button mt-5 px-5 py-2.5 text-2xl"
        onClick={start}
      >
        {t("title/start")}
      </button>
      <div className="TitlePage__settings-container mt-10 flex flex-row">
        <select
          className="sel TitlePage__settings-mode mx-1 text-xl"
          value={mode}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setMode(e.currentTarget.value as "basic" | "advanced")}
        >
          <option className="opt TitlePage__settings-mode-option" value="basic">
            {t("mode/basic")}
          </option>
          <option className="opt TitlePage__settings-mode-option" value="advanced">
            {t("mode/advanced")}
          </option>
        </select>
        <select
          className="sel TitlePage__settings-locale mx-1 text-xl"
          value={locale}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setLocale(e.currentTarget.value)}
        >
          <option className="opt TitlePage__settings-locale-option" value="en">
            English
          </option>
          <option className="opt TitlePage__settings-locale-option" value="ja">
            日本語
          </option>
        </select>
      </div>
    </div>
  );
}
