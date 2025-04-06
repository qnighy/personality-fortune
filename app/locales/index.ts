import { Book, Message } from "@hi18n/core";
import catalogEn from "./en";
import catalogJa from "./ja";

export type Vocabulary = {
  title: Message;
};

export const book = new Book<Vocabulary>({
  en: catalogEn,
  ja: catalogJa,
});
