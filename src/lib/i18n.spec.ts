import test from 'ava';

import { InvalidOptionsError } from './exceptions';
import { createI18n } from './i18n';

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
