// Licensed under the MIT License. See LICENSE file for details.
// Copyright (c) 2025 Masaki Hara

const CANDIDATES_BASIC: string[] = [
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
const CANDIDATES_ADVANCED: string[] = [
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
  "AAAI",
  "AAPL",
  "ACID",
  "ACPI",
  "ADSL",
  "ANSI",
  "APEC",
  "ASAP",
  "ASLR",
  "ASMR",
  "ASPX",
  "BACH",
  "BASH",
  "BCPL",
  "BDFL",
  "BIOS",
  "BLAS",
  "BLOB",
  "BONN",
  "BYOD",
  "CBRT",
  "CDCL",
  "CDDA",
  "CDMA",
  "CERN",
  "CISC",
  "CMOS",
  "CMYK",
  "CNCF",
  "CPIO",
  "CSGO",
  "CSMA",
  "CSRF",
  "CVSS",
  "DBLP",
  "DBMS",
  "DBUS",
  "DEMO",
  "DENO",
  "DFSG",
  "DHCP",
  "DHMO",
  "DIFF",
  "DISC",
  "DKIM",
  "DKMS",
  "DMCA",
  "DPDK",
  "DPKG",
  "DPLL",
  "DPRK", // A bit political but should be okay
  "DRAM",
  "DSDM",
  "DSSS",
  "DTMF",
  "DVCS",
  "ECRM",
  "EFTA",
  "ESPN",
  "ESTA",
  "ESXI",
  "ETCD",
  "EULA", // Unrelated to Genshin Impact
  "EVEX",
  "EXEC",
  "EXIF",
  "FIFA",
  "FIFO",
  "FIJI",
  "FIRE",
  "FOCA",
  "FOSS",
  "FPGA",
  "FQDN",
  "FRAP",
  "FSCK",
  "FSDG",
  "FWIW",
  "GADT",
  "GAFA",
  "GAFE",
  "GDPR",
  "GGST",
  "GIMP",
  "GMBH", // Actually GmbH
  "GOGH",
  "GOOG",
  "GOTY",
  "GRPC",
  "GRUB",
  "GUAM",
  "GUID",
  "GZIP",
  "HDMI",
  "HDTV",
  "HHKB",
  "HHVM",
  "HIFI",
  "HOPF",
  "HTML",
  "HTTP",
  "IAEA",
  "ICBM",
  "IEEE",
  "IIRC",
  "IKEA",
  "IMDB", // IMDb
  "IMHO",
  "IMSA",
  "INFO",
  "INTL",
  "IOPS",
  "IPAD",
  "IPCC",
  "ISBN",
  "ISDN",
  "ISMS",
  "ISSN",
  "JAVA",
  "JPEG",
  "JRPG",
  "JSDF",
  "JSON",
  "JTAG",
  "JWST",
  "KCAL",
  "KCIA",
  "KISS",
  "KLOC",
  "LAIN",
  "LAMP",
  "LDAP",
  "LGPL",
  "LGTM",
  "LISP",
  "LLNL",
  "LLVM",
  "LOTR",
  "LSAT",
  "LSTM",
  "LUMO",
  "LYFT",
  "LZMA",
  "LZSS",
  "MAFF",
  "MBCS",
  "MBTI",
  "MCMC",
  "MEMS",
  "META",
  "MIDI",
  "MIKU",
  "MIME",
  "MIPS",
  "MITM",
  "MKSA",
  "MMIO",
  "MPEG",
  "MSDN",
  "MSFT",
  "MSIE",
  "MSVC",
  "MVCC",
  "MVNO",
  "MVVM",
  "NACK",
  "NAND",
  "NAPT",
  "NASA",
  "NATO",
  "NERV",
  "NIKE",
  "NIST",
  "NTFS",
  "NTSC",
  "NULL", /* Not an acronym but okay */
  "NUMA",
  "NVDA",
  "NYSE",
  "ODBC",
  "OECD",
  "OEIS",
  "OFDM",
  "OMFG",
  "OOBE", /* a[-1] */
  "OPAC", /* did you read Acendance of a Bookworm? */
  "OPEC",
  "OPML",
  "OSCE",
  "OSHA",
  "OSPF",
  "PBRT",
  "PCAP",
  "PDAF",
  "PING",
  "PISA",
  "PNAS",
  "PPAP",
  "PRML",
  "PRNG",
  "PSAT",
  "PSTN",
  "PUBG",
  "PYMK",
  "QEMU",
  "QGIS",
  "QRNG",
  "QWOP",
  "RAID",
  "RAII",
  "RDMA",
  "REPL",
  "REST",
  "REXX",
  "RFID",
  "RGBA",
  "RIAA",
  "RISC",
  "RSVP",
  "RTMP",
  "RTTI",
  "SAGA",
  "SAML",
  "SASS",
  "SATA",
  "SAXO",
  "SBCS",
  "SBOM",
  "SCSI",
  "SDXC",
  "SEGA",
  "SETI",
  "SFTP",
  "SGML",
  "SIAM",
  "SKEB",
  "SKLZ",
  "SLAM",
  "SLBM",
  "SMTP",
  "SNMP",
  "SOAP",
  "SOLR",
  "SONY",
  "SPDX",
  "SPSS",
  "SQLI",
  "SQRT",
  "SRAM",
  "STAP",
  "STEM",
  "STLC",
  "SWAT",
  "SWIG",
  "TGIF",
  "TIFF",
  "TLDR",
  "TODO",
  "TOML",
  "TPMS",
  "TQWT",
  "TRPG",
  "TRUE",
  "TSMC",
  "TTIP",
  "UBER",
  "UCLA",
  "UEFI",
  "UMPC",
  "UNEP",
  "UNIX",
  "USPS",
  "USSR",
  "UTAH",
  "UUID",
  "VHDL",
  "VLAN",
  "VLIW",
  "VLSC",
  "VLSI",
  "VOIP",
  "VRAM",
  "VRCW",
  "VRML",
  "VSCF",
  "VTOL",
  "VVVF",
  "WASI",
  "WASM",
  "WIFI",
  "WIIU",
  "WIKI",
  "WLOG",
  "WSDL",
  "WSGI",
  "WWWF",
  "XACT",
  "XAML",
  "XBOX",
  "XBRL",
  "XMAS",
  "XMPP",
  "XREF",
  "XSLT",
  "YACC",
  "YAML",
  "YAPF",
  "YHOO",
  "YMMV",
];

export function getShuffledCandidates(mode: "basic" | "advanced") {
  return shuffle(mode === "basic" ? CANDIDATES_BASIC : CANDIDATES_ADVANCED);
}
function shuffle<T>(array: readonly T[]): T[] {
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
