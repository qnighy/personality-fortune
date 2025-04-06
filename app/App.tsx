"use client";

import { useCallback, useReducer } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { initialState, reducer } from "./state";
import { getShuffledCandidates } from "./candidates";
import { TitlePage } from "./TitlePage";
import { MainPage } from "./MainPage";
import { ResultPage } from "./ResultPage";

export function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const start = useCallback(() => {
    const candidates = getShuffledCandidates(state.mode);
    dispatch({ type: "start", payload: { candidates } });
  }, [dispatch, state.mode]);
  const push = useCallback((index, newValue) => {
    dispatch({ type: "push", payload: { index, newValue } });
  }, [dispatch]);
  const goResult = useCallback(() => {
    dispatch({ type: "goResult" });
  }, [dispatch]);
  const goBack = useCallback(() => {
    dispatch({ type: "goBack" });
  }, [dispatch]);
  const setMode = useCallback((mode) => {
    dispatch({ type: "setMode", payload: { mode } });
  }, [dispatch]);

  return (
    // <div
    jsxs("div", {
      // className="App__container"
      className: "App__container",
      // >
      children: [
        state.page === "title" &&
          // <TitlePage,
          jsx(TitlePage, {
            // start={start}
            start,
            // mode={state.mode}
            mode: state.mode,
            // setMode={setMode}
            setMode,
          }),
          // />
        state.page === "main" &&
          // <MainPage,
          jsx(MainPage, {
            // lottery={state.lottery}
            lottery: state.lottery,
            // candidates={state.candidates}
            candidates: state.candidates,
            // push={push}
            push,
            // goResult={goResult}
            goResult,
          }),
          // />
        state.page === "result" &&
          // <ResultPage,
          jsx(ResultPage, {
            // lottery={state.lottery}
            lottery: state.lottery,
            // goBack={goBack}
            goBack,
          }),
          // />
      ],
    })
    // </div>
  );
}
