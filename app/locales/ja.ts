import { msg, Catalog } from "@hi18n/core";
import type { Vocabulary } from ".";

export default new Catalog<Vocabulary>("ja", {
  "main/stop-slot": msg("Push!"),
  "mode/advanced": msg("上級者向けモード"),
  "mode/basic": msg("基本モード"),
  "result/description": msg("<span>あなたの性格は</span><result/><span>かもしれません。</span>"),
  "result/go-back": msg("タイトル"),
  "result/title": msg("診断結果"),
  "title/start": msg("診断をはじめる"),
  "title/title": msg("性格診断"),
});
