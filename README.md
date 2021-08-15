# :globe_with_meridians: svelte-simple-i18n

Light internationalization support for svelte.

[![npm](https://img.shields.io/npm/v/svelte-simple-i18n?color=%23f&style=flat-square)](https://www.npmjs.com/package/svelte-simple-i18n)

## :book: Documentation

- [Try a demo](https://codesandbox.io/s/demo-svelte-simple-i18n-hcshi?file=/Button.svelte) on CodeSandbox.

- [API Reference](https://dsfx3d.github.io/svelte-simple-i18n/index.html) on github pages.

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

```html
<script>
  import { t, locale } from './i18n';
  import { esMX } from './lang';

  function changeLocale() {
    $locale = esMX;
  }
</script>

<div>
  {$locale}
  <!--= hi-IN -->

  {$t('foo.baz')}
  <!--= हिंदी में अनुवाद -->

  <!-- fallback -->
  {$t('onlyHere')}
  <!--= only exists in english -->

  <button on:click="{changeLocale}">Change Locale</button>
</div>
```
