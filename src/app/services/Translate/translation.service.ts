import { Injectable, Inject } from '@angular/core';
import { TRANSLATIONS } from './translation.provider'; // import our opaque token

@Injectable()
export class TranslateService {
	private _currentLang: string;

	public get currentLang() {
		// return this._currentLang;
		let currentLang = localStorage.getItem('lang');
		if (currentLang == undefined)
			currentLang = 'en';

		return currentLang;

	}

	// inject our translations
	constructor( @Inject(TRANSLATIONS) private _translations: any) {
	}

	public use(lang: string): void {
		// set current language
		this._currentLang = lang;
	}

	private translate(key: string): string {
		// private perform translation
	 
		const translation = key;

		if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
			return this._translations[this.currentLang][key];
		}

		return translation;
	}

	public instant(key: string) {
		// public perform translation
		return this.translate(key);
	}

	public ChangeLang() {
		let currentLang = localStorage.getItem('lang');
		if (currentLang == undefined)
			currentLang = 'en';
		if (currentLang == 'en')
			localStorage.setItem('lang', 'ar');
		else
			localStorage.setItem('lang', 'en');

		location.reload();
	}
}