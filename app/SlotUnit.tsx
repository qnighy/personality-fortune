import { useCallback, useEffect, useRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";

export function SlotUnit(props) {
  const { value, options, randValue, push, focus } = props;
  const optionsExt = [...options, options[0]];
  const off = -randValue * 240 * options.length;
  const onPush = useCallback(() => {
    const sampled = options[Math.floor(randValue * options.length)];
    push(sampled);
  }, [options, push]);
  const button = useRef(null);
  useEffect(() => {
    if (focus) {
      button.current?.focus();
    }
  }, [focus]);
  return (
    // <div
    jsxs("div", {
      // className="SlotUnit__container"
      className: "SlotUnit__container",
      // >
      children: [
        // <div
        jsxs("div", {
          // className="SlotUnit__window"
          className: "SlotUnit__window",
          // >
          children: [
            !!value &&
              // <div
              jsxs("div", {
                // className="SlotUnit__option"
                className: "SlotUnit__option",
                // style={{ top: "0px" }}
                style: { top: "0px", },
                // >
                children: [
                  // <span
                  jsx("span", {
                    // className="SlotUnit__option-text"
                    className: "SlotUnit__option-text",
                    // >
                    children: value,
                  }),
                  // </span>
                ],
              }),
              // />
            !value &&
              optionsExt.map((option, i) => (
                // <div key={`option-${i}`}
                jsxs("div", {
                  // className="SlotUnit__option SlotUnit__option-active"
                  className: "SlotUnit__option SlotUnit__option-active",
                  // style={{ top: `${off + i * 240}px` }}
                  style: { top: `${off + i * 240}px`, },
                  // >
                  children: [
                    // <span
                    jsx("span", {
                      // className="SlotUnit__option-text"
                      className: "SlotUnit__option-text",
                      // >
                      children: option,
                    }),
                    // </span>
                  ],
                }, `option-${i}`)
                // />
              )),
          ],
        }),
        // </div>
        // <div
        jsxs("div", {
          // className="SlotUnit__button-container"
          className: "SlotUnit__button-container",
          // >
          children: [
            !value &&
              // <button
              jsx("button", {
                // ref={button}
                ref: button,
                // className="btn SlotUnit__button"
                className: "btn SlotUnit__button",
                // onClick={onPush}
                onClick: onPush,
                // >
                children: "Push!",
              }),
              // </button>
          ],
        }),
        // </div>
      ],
    })
    // </div>
  );
}
