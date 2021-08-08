import _get from 'lodash.get';
import { derived, readable, writable } from 'svelte/store';

import type { Options } from '../types/i18n';
import { InvalidOptionsError } from './exceptions';

export const createI18n = (options: Options) => {
  if (!options.messages) {
    throw new InvalidOptionsError(
      'Option "messages" is required and must be a valid messages object.'
    );
  }

  const locale = writable(options.locale);
  const fallbackLocale = readable(options.fallbackLocale);

  const t = derived(
    [locale, fallbackLocale],
    ([$locale, $fallbackLocale]) =>
      (path) => {
        const messages = options.messages;
        let locale = messages[$locale];

        if (!($locale in messages)) {
          console.warn(
            `[i18n] locale "${$locale}" not found. Will use fallback locale "${$fallbackLocale}"`
          );

          locale = messages[$locale];
        }

        let text = _get(locale, path);

        if (text === undefined && $locale in messages) {
          console.warn(
            `[i18n] "${path}", message not found is local "${$locale}". Will use fallback locale "${$fallbackLocale}".`
          );

          text = _get(messages[$fallbackLocale], path);
        }

        if (text === undefined) {
          console.warn(
            `[i18n] "${path}", message not found in fallback locale either.`
          );
          return '';
        }

        return text;
      }
  );

  return { t, locale };
};
