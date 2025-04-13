// Licensed under the MIT License. See LICENSE file for details.
// Copyright (c) 2025 Masaki Hara

"use client";

import { Translate, useI18n } from "@hi18n/react";
import { ReactElement, ReactNode, useEffect, useRef } from "react";
import { book } from "./locales";

export type ResultPageProps = {
  lottery: string;
  goBack: () => void;
};

export function ResultPage(props: ResultPageProps): ReactElement | null {
  const { lottery, goBack } = props;
  const { t } = useI18n(book);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    button.current?.focus();
  }, []);
  return (
    <div className="ResultPage__container w-full h-full flex flex-col place-content-center place-items-center">
      <h1 className="ResultPage__title m-0 text-5xl font-bold text-center">
        {t("result/title")}
      </h1>
      <div className="ResultPage__lottery px-5 py-2.5 text-2xl">
        <span className="ResultPage__lottery-text">
          <Translate
            book={book}
            id="result/description"
            span={<span />}
            result={
              <Wrapper
                node={
                  <span className="ResultPage__lottery-main text-3xl font-bold" translate="no">
                    {lottery}
                  </span>
                }
              />
            }
          />
        </span>
      </div>
      <button
        type="button"
        ref={button}
        className="btn btn-primary ResultPage__go-back-button mt-5 px-5 py-2.5 text-2xl"
        onClick={goBack}
      >
        {t("result/go-back")}
      </button>
    </div>
  );
}

function Wrapper(props: { node: ReactNode }): ReactElement {
  return <>{props.node}</>;
}
