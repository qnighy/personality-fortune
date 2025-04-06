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
