"use client";

import { ReactElement, useCallback, useReducer } from "react";
import { initialState, reducer } from "./state";
import { getShuffledCandidates } from "./candidates";
import { TitlePage } from "./TitlePage";
import { MainPage } from "./MainPage";
import { ResultPage } from "./ResultPage";

export function App(): ReactElement | null {
  const [state, dispatch] = useReducer(reducer, initialState);
  const start = useCallback(() => {
    const candidates = getShuffledCandidates(state.mode);
    dispatch({ type: "start", payload: { candidates } });
  }, [dispatch, state.mode]);
  const push = useCallback((index: number, newValue: string) => {
    dispatch({ type: "push", payload: { index, newValue } });
  }, [dispatch]);
  const goResult = useCallback(() => {
    dispatch({ type: "goResult" });
  }, [dispatch]);
  const goBack = useCallback(() => {
    dispatch({ type: "goBack" });
  }, [dispatch]);
  const setMode = useCallback((mode: "basic" | "advanced") => {
    dispatch({ type: "setMode", payload: { mode } });
  }, [dispatch]);

  return (
    <div className="App__container">
      {
        state.page === "title" &&
          <TitlePage start={start} mode={state.mode} setMode={setMode} />
      }
      {
        state.page === "main" &&
          <MainPage
            lottery={state.lottery!}
            candidates={state.candidates!}
            push={push}
            goResult={goResult}
          />
      }
      {
        state.page === "result" &&
          <ResultPage lottery={state.lottery!} goBack={goBack} />
      }
    </div>
  );
}
