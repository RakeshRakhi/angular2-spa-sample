// app/translate/translation.ts

import { OpaqueToken, InjectionToken } from '@angular/core';
import { LANG_EN_NAME, LANG_EN_TRANS } from 'app/localezation/static-en';
import { LANG_AR_NAME, LANG_AR_TRANS } from 'app/localezation/static-ar';

// import translations



// translation token
export const TRANSLATIONS = new InjectionToken('translations');

// all traslations
export const dictionary = {
	'en': LANG_EN_TRANS,
	'ar': LANG_AR_TRANS,

};

// providers
export const TRANSLATION_PROVIDERS = [
	{ provide: TRANSLATIONS, useValue: dictionary },
];