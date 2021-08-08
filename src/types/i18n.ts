/* eslint-disable @typescript-eslint/no-explicit-any */
export type Locale = string;

export type Messages = {
  [key: string]: any;
};

export type Options = {
  messages: Messages;
  locale?: Locale;
  fallbackLocale?: Locale;
};
