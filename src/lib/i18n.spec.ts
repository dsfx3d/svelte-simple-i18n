import test from 'ava';
import { get } from 'svelte/store';

import { InvalidOptionsError } from './exceptions';
import { createI18n } from './i18n';

const enUS = 'en-US';
const hiIn = 'hi-IN';
const esMX = 'es-MX';

const lang = {
  [enUS]: {
    onlyHere: 'only exists in english',
    foo: {
      baz: 'Translation in English',
    },
  },
  [hiIn]: {
    foo: {
      baz: 'हिंदी में अनुवाद',
    },
  },
  [esMX]: {
    foo: {
      baz: 'Traducción en español',
    },
  },
};

test('i18n: throws Error if "messages" option is not valid', (t) => {
  // is undefined
  t.throws(() => {
    createI18n({ messages: undefined });
  }, new InvalidOptionsError('Option "messages" is required and must be a valid messages object.'));

  // is null
  t.throws(() => {
    createI18n({ messages: null });
  }, new InvalidOptionsError('Option "messages" is required and must be a valid messages object.'));

  t.notThrows(() => {
    createI18n({ messages: {} });
  });
});

test('i18n: returns empty string if non existent locale and no fallback', (t) => {
  const { t: $t } = createI18n({
    messages: lang,
    locale: 'en',
  });
  t.is(get($t)('foo.baz'), '');
});

test('i18n: returns empty string if no locale, no fallback', (t) => {
  const { t: $t2 } = createI18n({
    messages: lang,
  });
  t.is(get($t2)('foo.baz'), '');
});

test("i18n: returns empty string if doesn't exist in locale and no fallback", (t) => {
  const { t: $t3 } = createI18n({
    messages: lang,
    locale: hiIn,
  });
  t.is(get($t3)('onlyHere'), '');
});

test("i18n: returns empty string if doesn't exist in either locale or fallback", (t) => {
  const { t: $t4 } = createI18n({
    messages: lang,
    locale: hiIn,
    fallbackLocale: enUS,
  });
  t.is(get($t4)('nowhere'), '');
});

test("i18n: returns empty string if doesn't no locale and not in fallback", (t) => {
  const { t: $t4 } = createI18n({
    messages: lang,
    fallbackLocale: enUS,
  });
  t.is(get($t4)('nowhere'), '');
});

test('i18n: returns message if exists in locale', (t) => {
  const { t: $t4 } = createI18n({
    messages: lang,
    locale: hiIn,
    fallbackLocale: enUS,
  });
  t.is(get($t4)('foo.baz'), lang[hiIn].foo.baz);
});

test('i18n: returns fallback if message exists in fallback but not in locale', (t) => {
  const { t: $t4 } = createI18n({
    messages: lang,
    locale: hiIn,
    fallbackLocale: enUS,
  });
  t.is(get($t4)('onlyHere'), lang[enUS].onlyHere);
});
