import { msg, Catalog } from "@hi18n/core";
import type { Vocabulary } from ".";

export default new Catalog<Vocabulary>("en", {
  title: msg("Personality Assessment"),
});
