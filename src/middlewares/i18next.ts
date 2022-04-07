// i18n
import i18next from "i18next";
import i18nextMiddleware from "i18next-http-middleware";
import Backend from "i18next-fs-backend";
import path from "path";
import logger from "../logger";

const detectionOptions = {
  // order and from where user language should be detected
  order: ['querystring', 'cookie', 'header'],
  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupHeader: 'accept-language',
  lookupHeaderRegex: /(([a-z]{2})-?([A-Z]{2})?)\s*;?\s*(q=([0-9.]+))?/gi,
  lookupSession: 'lng',
  lookupPath: 'lng',
  lookupFromPathIndex: 0,
  // cache user language
  caches: false, // ['cookie']
  
  ignoreCase: true, // ignore case of detected language

  // optional expire and domain for set cookie
  cookieExpirationDate: new Date(),
  cookieDomain: 'myDomain',
  cookiePath: '/my/path',
  cookieSecure: true, // if need secure cookie
  cookieSameSite: 'strict' // 'strict', 'lax' or 'none'
};

const getI18nextMiddleware = ()=>{
  i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    // debug: true,
    backend: {
      // eslint-disable-next-line no-path-concat
      loadPath: path.join(__dirname, '../../locales/{{lng}}/{{ns}}.json'),
    },
    lng: 'pt_br',
    fallbackLng: 'pt_br',
    preload: ['pt_br', 'en'],
    // nonExplicitSupportedLngs: true,
    supportedLngs: ['pt_br', 'en'],
    load: 'all',
    saveMissing: true,
    detection: detectionOptions,
  }, (err, t) => {
    if (err) {
      return logger.error(err)
    }
    logger.info('i18next is ready.')
  });
  return i18nextMiddleware.handle(i18next);
}
export default getI18nextMiddleware;