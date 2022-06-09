/* eslint-disable @typescript-eslint/no-this-alias */

import { IAlbum } from '../@types';

/* eslint-disable prefer-rest-params */
export const alphabeticalSort = (a: IAlbum, b: IAlbum) => a.name.localeCompare(b.name);

const BILLION = 1.0e9;
const MILLION = 1.0e6;
const THOUSAND = 10000;

export const getNumberUnit = (num: number) => {
  const number = Math.abs(Number(num));
  if (number >= BILLION) {
    return (number / BILLION).toFixed(2) + 'B';
  } else if (number >= MILLION) {
    return (number / MILLION).toFixed(2) + 'M';
  } else if (number >= THOUSAND) {
    return (number / THOUSAND).toFixed(2) + 'K';
  }
  return number;
};

export const secondsToTime = (seconds: number) => {
  if (!seconds || seconds <= 0) {
    return '-';
  }
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return m + ':' + s;
};

export function limitString(content: string, length: number): string {
  const contentString = content.replace(/(<([^>]+)>)/gi, '')
  if (contentString.length > length) {
    return `${contentString.slice(0, length)}...`
  }
  return contentString
}