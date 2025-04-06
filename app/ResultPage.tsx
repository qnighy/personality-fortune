"use client";

import { ReactElement, useEffect, useRef } from "react";

export type ResultPageProps = {
  lottery: string;
  goBack: () => void;
};

export function ResultPage(props: ResultPageProps): ReactElement | null {
  const { lottery, goBack } = props;
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    button.current?.focus();
  }, []);
  return (
    <div className="ResultPage__container">
      <h1 className="ResultPage__title">
        Result
      </h1>
      <div className="ResultPage__lottery">
        <span className="ResultPage__lottery-text">
          <span>{"Your personality is: "}</span>
          <span className="ResultPage__lottery-main">
            {lottery}
          </span>
          <span>{""}</span>
        </span>
      </div>
      <button
        ref={button}
        className="btn ResultPage__go-back-button"
        onClick={goBack}
      >
        Go Back
      </button>
    </div>
  );
}
