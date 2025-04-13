// Licensed under the MIT License. See LICENSE file for details.
// Copyright (c) 2025 Masaki Hara

import { Book, ComponentPlaceholder, Message } from "@hi18n/core";
import catalogEn from "./en";
import catalogJa from "./ja";

export type Vocabulary = {
  "main/stop-slot": Message;
  "main/stop-slot-label": Message<{ index: number }>;
  "mode/advanced": Message;
  "mode/basic": Message;
  "result/description": Message<{ span: ComponentPlaceholder, result: ComponentPlaceholder }>;
  "result/go-back": Message;
  "result/title": Message;
  "title/title": Message;
  "title/start": Message;
};

export const book = new Book<Vocabulary>({
  en: catalogEn,
  ja: catalogJa,
});
