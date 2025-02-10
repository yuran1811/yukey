export interface ModifierKeyType {
  title: string;
  id: string[];
  active: boolean;
}

export interface KeyPressPayload {
  message: string;
  mode: string;
}

export type ThemeVariants =
  | 'light'
  | 'dark'
  | 'slate'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'violet'
  | 'sakura';

export type ThemeItemType = {
  name: ThemeVariants;
  foreground: string;
  background: string;
};
