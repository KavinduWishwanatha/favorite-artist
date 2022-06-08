import { getNumberUnit, secondsToTime, alphabeticalSort } from './util';

describe('secondsToTime', () => {
  it.each([
    [43, '00:43'],
    [61, '01:01'],
    [75.02, '01:15'],
    [521.022123, '08:41'],
  ])('when seconds is %s, return as %s', (value: number, result: string) =>
    expect(secondsToTime(value)).toBe(result)
  );
});

describe('getNumberUnit', () => {
  it.each([
    [1000000, '1.00M'],
    [1500000, '1.50M'],
    [65000, '6.50K'],
    [80000, '8.00K'],
  ])('when number unit is %s, return as %s', (value: number, result: string) =>
    expect(getNumberUnit(value)).toBe(result)
  );
});

describe('getNumberUnit', () => {
  it.each([
    [
      [
        {
          name: 'Shanaka',
        },
        {
          name: 'Kavindu',
        },
        {
          name: 'Yeshan',
        },
      ],
      [
        {
          name: 'Kavindu',
        },
        {
          name: 'Shanaka',
        },
        {
          name: 'Yeshan',
        },
      ],
    ],
    [
      [
        {
          name: 'Deshan',
        },
        {
          name: 'Tiran',
        },
        {
          name: 'Hishan',
        },
      ],
      [
        {
          name: 'Deshan',
        },
        {
          name: 'Hishan',
        },
        {
          name: 'Tiran',
        },
      ],
    ],
  ])('when unsorted array is %s, return as %s', (value: any[], result: any[]) =>
    expect(value.sort(alphabeticalSort)).toEqual(result)
  );
});
