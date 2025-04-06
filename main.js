"use client";

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

export function ResultPage(props) {
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

export function getShuffledCandidates(mode) {
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
