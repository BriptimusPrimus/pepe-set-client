import {constants} from './constants';

export function getCookies() {
	var cookies = {};
	for (let cookie of document.cookie.split('; ')) {
		let [name, value] = cookie.split("=");
		cookies[name] = decodeURIComponent(value);
	}
  return cookies;
}

export function getSessionToken() {
  return getCookies()[constants.SESSION_TOKEN_COOKIE];
}