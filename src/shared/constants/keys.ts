export const controlKeys = ['ControlLeft', 'ControlRight'];
export const shiftKeys = ['ShiftLeft', 'ShiftRight'];
export const metaKeys = ['MetaLeft', 'MetaRight'];
export const altKeys = ['Alt', 'AltGr'];

export const MOUSE_BUTTONS: Record<string, number> = {
  Left: -1,
  Middle: 0,
  Right: 1,
};

export const ARROW_KEYS: Record<string, string> = {
  UpArrow: '↑',
  DownArrow: '↓',
  LeftArrow: '←',
  RightArrow: '→',
};

export const MODIFIER_KEYS: Record<string, string> = {
  Control: '⌃',
  ControlLeft: '⌃',
  ControlRight: '⌃',
  Alt: '⌥',
  AltGr: '⌥',
  Shift: '⇧',
  ShiftLeft: '⇧',
  ShiftRight: '⇧',
  MetaLeft: '⊞',
  MetaRight: '⊞',
};

export const OTHER_KEYS: Record<string, string> = {
  PrintScreen: '⎙',
  ScrollLock: 'ScrLk',
  Pause: 'Pause',

  Insert: 'Ins',
  Delete: '⌦',
  Home: '⇱',
  End: '⇲',
  PageUp: '⇞',
  PageDown: '⇟',

  Esc: '⎋',
  Backspace: '⌫',
  Enter: '↵',

  Tab: '⇆',
  CapsLock: '⇪',
  ContextMenu: '≣',
};

export const SPECIAL_KEYS: Record<string, string> = {
  ...MODIFIER_KEYS,
  ...ARROW_KEYS,
  ...OTHER_KEYS,

  Space: '␣',
  Minus: '-',
  Equal: '=',
  SemiColon: ';',
  Quote: "'",
  Dot: '.',
  Comma: ',',
  Slash: '/',
};

export const CONTROL_KEYCODES = [
  '@',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '[',
  '\\',
  ']',
  '^',
  '_',
];

export const notDuplicateTickers = [
  ...Object.values(MODIFIER_KEYS),
  SPECIAL_KEYS.Backspace,
  SPECIAL_KEYS.Delete,
  SPECIAL_KEYS.Insert,
  SPECIAL_KEYS.ScrLk,
  SPECIAL_KEYS.Pause,
];

export const clearedBeforeUsed = [
  ...Object.values(MODIFIER_KEYS),
  SPECIAL_KEYS.Tab,
  SPECIAL_KEYS.Enter,
  SPECIAL_KEYS.Esc,
];
