import { ShowKey } from "@/store/canvas";
import { Database } from "@/data/DataType";
import { Language, Case } from "@/ts/GeneratorCode";

export interface MenuOption {
  close?: boolean;
  show?: ShowKey;
  database?: Database;
  language?: Language;
  tableCase?: Case;
  columnCase?: Case;
}

export default interface Menu {
  readonly id: string;
  name: string;
  keymap?: string;
  icon?: string;
  base64?: boolean;
  children?: Menu[];
  option?: MenuOption;

  execute?(): void;
}
