import { clsx, type ClassValue } from 'clsx';

import { notDuplicateTickers } from '@/shared';

export const cn = (...args: ClassValue[]) => clsx(args);

export const changeTheme = (theme: string) => {
  document.documentElement.dataset.theme = theme;
};

export const isFuncKey = (key: string) => /f\d{1,2}/.test(key.toLowerCase());

export const mergeDuplicatedTicker = (tickers: string[]) => {
  const newTickers = [];

  const tickersLength = tickers.length;
  for (let i = 0; i < tickersLength; i++) {
    let countAppears = 1;

    let j = i + 1;
    for (
      ;
      !notDuplicateTickers.includes(tickers[i]) &&
      tickers[i] === tickers[j] &&
      j < tickersLength;
      j++
    )
      countAppears++;

    newTickers.push(
      `${tickers[i]}${countAppears > 1 ? `⨯${countAppears}` : ''}`,
    );

    i = j - 1;
  }

  return newTickers;
};
