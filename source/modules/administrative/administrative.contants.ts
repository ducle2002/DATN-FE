import language, {languageKeys} from '@/config/language/language';

export const FILTER_FORMID = [
  {
    name: language.t(languageKeys.administrative.main.requesting),
    type: 21,
  },
  {
    name: language.t(languageKeys.administrative.main.accept),

    type: 22,
  },
  {
    name: language.t(languageKeys.administrative.main.decline),
    type: 23,
  },
];
