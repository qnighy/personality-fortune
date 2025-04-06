import { msg, Catalog } from "@hi18n/core";
import type { Vocabulary } from ".";

export default new Catalog<Vocabulary>("ja", {
  title: msg("性格診断"),
});
