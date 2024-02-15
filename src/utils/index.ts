import { clsx, type ClassValue } from 'clsx';

export const cn = (...args: ClassValue[]) => clsx(args);

export const changeTheme = (theme: string) => {
  document.documentElement.dataset.theme = theme;
};
