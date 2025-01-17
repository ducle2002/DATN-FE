import language from 'i18next';
import {initReactI18next} from 'react-i18next';
import localResource from './locales';
import {getTranslationKeys} from 'i18n-keys';
import vi from './locales/vi';
import intervalPlural from 'i18next-intervalplural-postprocessor';

const initLanguage = async () => {
  language
    .use(initReactI18next)
    .use(intervalPlural)
    .init({
      fallbackLng: 'vi',
      initImmediate: false,
      debug: false,
      compatibilityJSON: 'v3',
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
      resources: localResource,
    });
};

initLanguage();

export const languageKeys = getTranslationKeys(vi);

export default language;
