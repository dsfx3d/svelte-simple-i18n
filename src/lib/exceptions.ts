export class I18nError extends Error {
  name = 'I18nError';
}

export class InvalidOptionsError extends I18nError {
  name = 'InvalidOptionsError';
  constructor(message: string) {
    super(`Invalid options. ${message}`);
  }
}
