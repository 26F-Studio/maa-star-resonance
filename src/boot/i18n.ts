import { defineBoot } from '#q-app/wrappers';
import { createI18n } from 'vue-i18n';

import messages from 'src/i18n';

export type MessageLanguages = keyof typeof messages;
// Type-define 'en-US' as the master schema for the resource
export type MessageSchema = (typeof messages)['en-US'];

// See https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition
/* eslint-disable @typescript-eslint/no-empty-object-type */
declare module 'vue-i18n' {
  // noinspection JSUnusedGlobalSymbols
  export interface DefineLocaleMessage extends MessageSchema {}

  // noinspection JSUnusedGlobalSymbols
  export interface DefineDateTimeFormat {}

  // noinspection JSUnusedGlobalSymbols
  export interface DefineNumberFormat {}
}

const i18n = createI18n<{ message: MessageSchema }, MessageLanguages>({
  locale: 'en-US',
  legacy: false,
  messages,
});

export const i18nGlobal = i18n.global;

export default defineBoot(({ app }) => {
  app.use(i18n);
});
