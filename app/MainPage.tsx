import { useEffect, useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { SlotUnit } from "./SlotUnit";

export function MainPage(props) {
  const { lottery, candidates, push, goResult } = props;
  const lotteryOptions = useMemo(() =>
    [...lottery].map((_ch, i) => candidates.map((s) => s[i])),
    [lottery, candidates]
  );

  const [rands, setRands] = useState([0, 0, 0, 0]);
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

  return (
    // <div
    jsx("div", {
      // className="MainPage__container"
      className: "MainPage__container",
      // >
      children:
        // <div
        jsxs("div", {
          // className="MainPage__lottery-container"
          className: "MainPage__lottery-container",
          // >
          children: [
            [...lottery].map((ch, i) =>
              // <SlotUnit key={`slot-${i}`}
              jsx(SlotUnit, {
                // value={ch === "*" ? null : ch}
                value: ch === "*" ? null : ch,
                // options={lotteryOptions[i]}
                options: lotteryOptions[i],
                // randValue={rands[i]}
                randValue: rands[i],
                // push={(ch) => push(i, ch)}
                push: (ch) => push(i, ch),
                // focus={focusIndex === i}
                focus: focusIndex === i,
              }, `slot-${i}`)
              // />
            ),
          ],
        })
        // </div>
    })
    // </div>
  );
}
