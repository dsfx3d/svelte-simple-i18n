/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Readable, Writable } from 'svelte/store';

export type Locale = string;

export type Messages = {
  [key: string]: any;
};

export type Options = {
  /**
   * The lang object
   */
  messages: Messages;
  /**
   * Selected locale. This will be a key of messages object.
   */
  locale?: Locale;
  /**
   * If a text is not found in selected locale, uses this as the fallback
   * language for that text.
   */
  fallbackLocale?: Locale;
};

export type I18n = {
  /**
   * Holds the value of currently active locale.
   * Update this writable store to change the selected locale.
   *
   * ### Example
   *
   * ```html
   * <script>
   *   import { locale } from './i18n';
   *
   *   $locale = 'en';
   *
   *   console.log($locale);
   * </script>
   * ```
   */
  locale: Writable<Locale>;
  /**
   * Get text according to the selected locale
   *
   * ### Example
   *
   * ```html
   * <div>
   *  {$t('a.b')} <!--= foo -->
   * </div>
   *
   * <script>
   * const { t } = createI18n({
   *   locale: 'en',
   *   messages: {
   *     en: { a: { b: 'foo' } }
   *   },
   * })
   * </script>
   * ```
   *
   * @param {String} path The object path of the text under current locale in messages object.
   * @returns {String} The text if found in locale or fallback locale, otherwise an empty string
   */
  t: Readable<(path: string) => string>;
};
