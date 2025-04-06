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
  const off = -randValue * 240 * options.length;
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
    <div className="SlotUnit__container">
      <div className="SlotUnit__window">
        {
          !!value &&
            <div className="SlotUnit__option" style={{ top: "0px" }}>
              <span className="SlotUnit__option-text">
                {value}
              </span>
            </div>
        }
        {
          !value &&
            optionsExt.map((option, i) => (
              <div key={`option-${i}`}
                className="SlotUnit__option SlotUnit__option-active"
                style={{ top: `${off + i * 240}px` }}
              >
                <span className="SlotUnit__option-text">
                  {option}
                </span>
              </div>
            ))
        }
      </div>
      <div className="SlotUnit__button-container">
        {
          !value &&
            <button
              ref={button}
              className="btn SlotUnit__button"
              onClick={onPush}
            >
              {"Push!"}
            </button>
        }
      </div>
    </div>
  );
}
