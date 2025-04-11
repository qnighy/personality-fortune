// Licensed under the MIT License. See LICENSE file for details.
// Copyright (c) 2025 Masaki Hara

"use client";

import { ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { SlotUnit } from "./SlotUnit";

export type MainPageProps = {
  lottery: string;
  candidates: string[];
  push: (index: number, newValue: string) => void;
  goResult: () => void;
};

export function MainPage(props: MainPageProps): ReactElement | null {
  const { lottery, candidates, push, goResult } = props;
  const lotteryOptions = useMemo(() =>
    [...lottery].map((_ch, i) => candidates.map((s) => s[i])),
    [lottery, candidates]
  );

  const [rands, setRands] = useState<number[]>([0, 0, 0, 0]);
  const needsAnimation = lottery.indexOf("*") >= 0;
  useEffect(() => {
    if (!needsAnimation) return;

    let active = true;
    function animate() {
      if (!active) return;
      const newRands = Array.from({ length: 4 }, () => Math.random());
      setRands(newRands);
      requestAnimationFrame(animate);
    }
    animate();
    return () => { active = false; };
  }, [needsAnimation]);

  const focusIndex = lottery.indexOf("*");

  const isFinished = lottery.indexOf("*") < 0;
  useEffect(() => {
    if (isFinished) {
      const timer = setTimeout(() => {
        goResult();
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isFinished, goResult]);

  const nextButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (isFinished) {
      nextButton.current?.focus();
    }
  }, [isFinished]);

  return (
    <div className="MainPage__container w-full h-full flex flex-col place-content-center place-items-center">
      <div
        className="MainPage__lottery-container grid grid-cols-2 md:flex md:flex-row place-content-center place-items-center"
      >
        {
          [...lottery].map((ch, i) =>
            <SlotUnit key={`slot-${i}`}
              value={ch === "*" ? null : ch}
              options={lotteryOptions[i]}
              randValue={rands[i]}
              push={(ch: string) => push(i, ch)}
              focus={focusIndex === i}
            />
          )
        }
      </div>
      <button
        ref={nextButton}
        className={`MainPage__next-button btn mt-5 px-5 py-2.5 text-2xl${isFinished ? '' : ' invisible'}`}
        onClick={() => goResult()}
        disabled={!isFinished}
      >
        Next
      </button>
    </div>
  );
}
