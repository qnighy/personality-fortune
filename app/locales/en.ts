// Licensed under the MIT License. See LICENSE file for details.
// Copyright (c) 2025 Masaki Hara

import { msg, Catalog } from "@hi18n/core";
import type { Vocabulary } from ".";

export default new Catalog<Vocabulary>("en", {
  "main/stop-slot": msg("Push!"),
  "mode/advanced": msg("advanced mode"),
  "mode/basic": msg("basic mode"),
  "result/description": msg("<span>Your personality may be: </span><result/>"),
  "result/go-back": msg("Go back"),
  "result/title": msg("Result"),
  "title/start": msg("Start"),
  "title/title": msg("Personality Assessment"),
});
