"use client";

import { ReactElement, useCallback, useEffect, useRef } from "react";

export type SlotUnitProps = {
  value?: string | null | undefined;
  options: string[];
  randValue: number;
  push: (value: string) => void;
  focus: boolean;
};

export function SlotUnit(props: SlotUnitProps): ReactElement | null {
  const { value, options, randValue, push, focus } = props;
  const optionsExt = [...options, options[0]];
  const off = -randValue * options.length;
  const onPush = useCallback(() => {
    const sampled = options[Math.floor(Math.random() * options.length)];
    push(sampled);
  }, [options, push]);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (focus) {
      button.current?.focus();
    }
  }, [focus]);
  return (
    <div className="SlotUnit__container w-45 h-70 m-1 flex flex-col place-content-center place-items-center">
      <div className="SlotUnit__window w-45 h-60 rounded-sm overflow-hidden relative inset-shadow-large">
        {
          !!value &&
            <div
              className="SlotUnit__option absolute w-45 h-60 left-0 text-abs-50 text-center align-middle top-0"
            >
              <span className="SlotUnit__option-text">
                {value}
              </span>
            </div>
        }
        {
          !value &&
            optionsExt.map((option, i) => (
              <div key={`option-${i}`}
                className="SlotUnit__option absolute w-45 h-60 left-0 text-abs-50 text-center align-middle filter-[url(#blur-vertical)] select-none cursor-default"
                style={{ top: `calc(var(--spacing) * ${off + i} * 70)` }}
              >
                <span className="SlotUnit__option-text">
                  {option}
                </span>
              </div>
            ))
        }
      </div>
      <div className="SlotUnit__button-container w-45 h-10 flex">
        {
          !value &&
            <button
              ref={button}
              className="btn SlotUnit__button w-full h-full text-2xl"
              onClick={onPush}
            >
              {"Push!"}
            </button>
        }
      </div>
    </div>
  );
}
