# svelte-simple-i18n

Simple and light internationalization for svelte

## Install

```bash
yarn add svelte-simple-i18n
# or
npm i svelte-simple-i18n
```

## Usage

1. Prepare a language object.

```javascript
// lang.js

export const enUS = 'en-US';
export const hiIn = 'hi-IN';
export const esMX = 'es-MX';

export const lang = {
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
```

2. Create i18n module.

```javascript
// i18n.js

import { lang, hiIN, enUS } from './lang';

export const { t, locale } = createI18n({
  messages: lang,
  locale: hiIN,
  fallbackLocale: enUS,
});
```

3. Use in you components.

```javascript
<script>
  import { t, locale } from './i18n'
</script>

<div>
  {$locale} <!--= hi-IN -->

  {$t('foo.baz')} <!--= हिंदी में अनुवाद -->

  <!-- fallback -->
  {$t('onlyHere')} <!--= only exists in english -->
</div>
```

`locale` is a writable store which holds the value of selected locale, update it's value to reactively update the translations.
