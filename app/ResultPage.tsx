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
    <div className="ResultPage__container w-full h-full flex flex-col place-content-center place-items-center">
      <h1 className="ResultPage__title m-0 text-5xl font-bold text-center text-gray-800">
        Result
      </h1>
      <div className="ResultPage__lottery px-5 py-2.5 text-2xl">
        <span className="ResultPage__lottery-text">
          <span>{"Your personality is: "}</span>
          <span className="ResultPage__lottery-main text-3xl font-bold">
            {lottery}
          </span>
          <span>{""}</span>
        </span>
      </div>
      <button
        ref={button}
        className="btn ResultPage__go-back-button mt-5 px-5 py-2.5 text-2xl"
        onClick={goBack}
      >
        Go Back
      </button>
    </div>
  );
}
