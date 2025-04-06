import { StrictMode, useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import ReactDOMClient from "react-dom/client";

function main() {
  const root = ReactDOMClient.createRoot(document.getElementById("root"));
  root.render(
    // <StrictMode>
    jsx(StrictMode, {
      children:
        // <App />
        jsx(App, {})
    })
    // </StrictMode>
  );
}

function App() {
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

function TitlePage(props) {
  const { start, mode, setMode } = props;
  const button = useRef(null);
  useEffect(() => {
    button.current?.focus();
  }, []);
  return (
    // <div
    jsxs("div", {
      // className="TitlePage__container"
      className: "TitlePage__container",
      // >
      children: [
        // <h1
        jsx("h1", {
          // className="TitlePage__title"
          className: "TitlePage__title",
          // >
          children: "Personality Assessment",
        }),
        // </h1>
        // <button
        jsx("button", {
          // ref={button}
          ref: button,
          // className="btn TitlePage__start-button"
          className: "btn TitlePage__start-button",
          // onClick={start}
          onClick: start,
          // >
          // Start
          children: "Start",
        }),
        // </button>
        // <div
        jsxs("div", {
          // className="TitlePage__settings-container"
          className: "TitlePage__settings-container",
          // >
          children: [
            // <select
            jsxs("select", {
              // className="sel TitlePage__settings-mode"
              className: "sel TitlePage__settings-mode",
              // value={mode}
              value: mode,
              // onChange={(e) => setMode(e.currentTarget.value)}
              onChange: (e) => setMode(e.currentTarget.value),
              // >
              children: [
                // <option
                jsx("option", {
                  // className="opt TitlePage__settings-mode-option"
                  className: "opt TitlePage__settings-mode-option",
                  // value="basic"
                  value: "basic",
                  // >
                  // basic mode
                  children: "basic mode",
                }),
                // </option>
                // <option
                jsx("option", {
                  // className="opt TitlePage__settings-mode-option"
                  className: "opt TitlePage__settings-mode-option",
                  // value="advanced"
                  value: "advanced",
                  children: "advanced mode",
                }),
                // </option>
              ],
            }),
          ],
        }),
        // </div>
      ],
    })
    // </div>
  );
}

function MainPage(props) {
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

function SlotUnit(props) {
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

function ResultPage(props) {
  const { lottery, goBack } = props;
  const button = useRef(null);
  useEffect(() => {
    button.current?.focus();
  }, []);
  return (
    // <div
    jsxs("div", {
      // className="ResultPage__container"
      className: "ResultPage__container",
      // >
      children: [
        // <h1
        jsx("h1", {
          // className="ResultPage__title"
          className: "ResultPage__title",
          // >
          children: "Result",
        }),
        // </h1>
        // <div
        jsxs("div", {
          // className="ResultPage__lottery"
          className: "ResultPage__lottery",
          // >
          children: [
            // <span
            jsxs("span", {
              // className="ResultPage__lottery-text"
              className: "ResultPage__lottery-text",
              // >
              children: [
                // <span>
                jsx("span", {
                  children: "Your personality is: ",
                }),
                // </span>
                // <span
                jsx("span", {
                  // className="ResultPage__lottery-main"
                  className: "ResultPage__lottery-main",
                  // >
                  children: lottery,
                }),
                // </span>
                // <span>
                jsx("span", {
                  children: "",
                }),
                // </span>
              ],
            }),
            // </span>
          ],
        }),
        // </div>
        // <button
        jsx("button", {
          // ref={button}
          ref: button,
          // className="btn ResultPage__go-back-button"
          className: "btn ResultPage__go-back-button",
          // onClick={goBack}
          onClick: goBack,
          // >
          children: "Go Back",
        }),
        // </button>
      ],
    })
    // </div>
  );
}

const initialState = {
  page: "title",
  mode: "basic",
  lottery: null,
  candidates: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "start": {
      const { candidates } = action.payload;
      return {
        ...state,
        page: "main",
        lottery: "****",
        candidates,
      };
    }
    case "push": {
      const { index, newValue } = action.payload;
      if (state.lottery[index] !== "*") {
        return state;
      }
      const newLottery = state.lottery.slice(0, index) + newValue + state.lottery.slice(index + 1);
      const pattern = compilePattern(newLottery);
      const newCandidates = state.candidates.filter((candidate) => pattern.test(candidate));
      if (newCandidates.length === 0) {
        return state;
      }
      return {
        ...state,
        lottery: newLottery,
        candidates: newCandidates,
      }
    }
    case "goResult": {
      return {
        ...state,
        page: "result",
      };
    }
    case "goBack":
      return {
        ...state,
        page: initialState.page,
        lottery: initialState.lottery,
        candidates: initialState.candidates,
      };
    case "setMode": {
      const { mode } = action.payload;
      return {
        ...state,
        mode,
      };
    }
    default:
      return state;
  }
}

function compilePattern(lottery) {
  return new RegExp(`^${lottery.replace(/\*/g, ".")}$`);
}

const CANDIDATES_BASIC = [
  "ISTJ",
  "ISTP",
  "ISFJ",
  "ISFP",
  "INTJ",
  "INTP",
  "INFJ",
  "INFP",
  "ESTJ",
  "ESTP",
  "ESFJ",
  "ESFP",
  "ENTJ",
  "ENTP",
  "ENFJ",
  "ENFP",
];
const CANDIDATES_ADVANCED = [
  "ISTJ",
  "ISTP",
  "ISFJ",
  "ISFP",
  "INTJ",
  "INTP",
  "INFJ",
  "INFP",
  "ESTJ",
  "ESTP",
  "ESFJ",
  "ESFP",
  "ENTJ",
  "ENTP",
  "ENFJ",
  "ENFP",
  // Including somewhat popular acronyms/initialisms consisting of 4 letters.
  // Note: do not include those that can be easily related to a specific personality type
  //       or relevant feature (e.g. ADHD, PTSD, etc.).
  // Note: actually not limited to acronyms/initialisms, but also some 4 letter words
  //       that are sometimes written capitalized.
  "AAPL",
  "ACID",
  "ADSL",
  "ANSI",
  "APEC",
  "ASMR",
  "BIOS",
  "CERN",
  "CISC",
  "CMOS",
  "CMYK",
  "CSRF",
  "DPRK", // A bit political but should be okay
  "DRAM",
  "EULA", // Unrelated to Genshin Impact
  "FIFA",
  "FIFO",
  "FIRE",
  "FWIW",
  "GDPR",
  "GIMP",
  "GMBH", // Actually GmbH
  "GOOG",
  "HDMI",
  "HDTV",
  "HTML",
  "HTTP",
  "IAEA",
  "IEEE",
  "IIRC",
  "IKEA",
  "IMDB", // IMDb
  "IMHO",
  "IPCC",
  "ISBN",
  "ISDN",
  "ISSN",
  "JAVA",
  "JPEG",
  "JSDF",
  "JSON",
  "JTAG",
  "JWST",
  "LAMP",
  "LDAP",
  "LSAT",
  "MAFF",
  "MBCS",
  "MBTI",
  "MCMC",
  "MEMS",
  "META",
  "MIDI",
  "MIPS",
  "MITM",
  "MKSA",
  "MMIO",
  "MSDN",
  "MSFT",
  "MSIE",
  "MPEG",
  "MVNO",
  "NASA",
  "NATO",
  "NIST",
  "NTFS",
  "NTSC",
  "NULL", /* Not an acronym but okay */
  "NYSE",
  "ODBC",
  "OECD",
  "OEIS",
  "OMFG",
  "OOBE", /* a[-1] */
  "OPAC", /* did you read Acendance of a Bookworm? */
  "OPEC",
  "PBRT",
  "PNAS",
  "PRML",
  "PUBG",
  "PYMK",
  "RAID",
  "RFID",
  "RGBA",
  "RIAA",
  "RISC",
  "RTTI",
  "SAML",
  "SATA",
  "SCSI",
  "SDXC",
  "SETI",
  "SGML",
  "SIAM",
  "SMTP",
  "SOAP",
  "SRAM",
  "STEM",
  "SWAT",
  "TGIF",
  "TLDR",
  "TOML",
  "TSMC",
  "UCLA",
  "UEFI",
  "UMPC",
  "UNEP",
  "UNIX",
  "USPS",
  "USSR",
  "UUID",
  "VLIW",
  "VLSI",
  "VOIP",
  "VRML",
  "VTOL",
  "VVVF",
  "WASI",
  "WASM",
  "WLOG",
  "WSDL",
  "WWWF",
  "XSLT",
  "YACC",
  "YAML",
];

function getShuffledCandidates(mode) {
  return shuffle(mode === "basic" ? CANDIDATES_BASIC : CANDIDATES_ADVANCED);
}
function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 1; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    if (i !== j) {
      const [a, b] = [shuffled[i], shuffled[j]];
      [shuffled[i], shuffled[j]] = [b, a];
    }
  }
  return shuffled;
}

main();
