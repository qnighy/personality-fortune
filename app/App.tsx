"use client";

import { ReactElement, useCallback, useEffect, useReducer } from "react";
import { LocaleProvider, useI18n, useLocales } from "@hi18n/react";
import { initialState, reducer } from "./state";
import { getShuffledCandidates } from "./candidates";
import { TitlePage } from "./TitlePage";
import { MainPage } from "./MainPage";
import { ResultPage } from "./ResultPage";
import { book } from "./locales";

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
  const setLocale = useCallback((locale: string) => {
    dispatch({ type: "setLocale", payload: { locale } });
  }, [dispatch]);

  useEffect(() => {
    const locale = selectLocaleFromDefault();
    dispatch({ type: "setLocale", payload: { locale } });
  }, [dispatch]);

  return (
    <LocaleProvider locales={[state.locale]} >
      <div className="App__container w-screen h-screen bg-orange-100">
        {
          state.page === "title" &&
            <TitlePage
              start={start}
              mode={state.mode}
              setMode={setMode}
              locale={state.locale}
              setLocale={setLocale}
            />
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
      <SetTitle />
      <SetHtmlLang />
    </LocaleProvider>
  );
}

function selectLocaleFromDefault(): string {
  for (const language of navigator.languages) {
    if (/^ja\b/i.test(language)) {
      return "ja";
    } else if (/^en\b/i.test(language)) {
      return "en";
    }
  }
  return "en";
}

function SetTitle(): ReactElement | null {
  const { t } = useI18n(book);
  const title = t("title/title");
  useEffect(() => {
    console.log("Updating title to", title);
    document.title = title;
  }, [title]);
  return null;
}

function SetHtmlLang(): ReactElement | null {
  const locales = useLocales();
  const locale = locales[0];
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
