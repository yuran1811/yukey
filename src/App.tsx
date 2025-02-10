import { listen } from '@tauri-apps/api/event';
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow';
import { useCallback, useEffect, useState } from 'react';

import { Key, ModifierKeys, TitleBar } from '@/components';
import type { KeyPressPayload, ModifierKeyType } from '@/shared';
import {
  CONTROL_KEYCODES,
  SPECIAL_KEYS,
  altKeys,
  controlKeys,
  metaKeys,
  clearedBeforeUsed,
  notDuplicateTickers,
  shiftKeys,
} from '@/shared';
import { useStore } from '@/store';
import { changeTheme, cn, isFuncKey, mergeDuplicatedTicker } from '@/utils';

const appWindow = getCurrentWebviewWindow();

const GLOBAL_STATE = {
  controlPressed: false,
};

function App() {
  const theme = useStore((state) => state.theme);
  const settings = useStore((state) => state.settings);
  const setSettings = useStore((state) => state.setSettings);

  const [alphabeticKeys, setAlphabeticKeys] = useState<{
    raw: string[];
    formatted: string[];
  }>({ raw: ['NONE'], formatted: ['NONE'] });
  const [modifierKeys, setModifierKeys] = useState<ModifierKeyType[]>([
    {
      title: SPECIAL_KEYS.ShiftLeft,
      id: shiftKeys,
      active: false,
    },
    {
      title: SPECIAL_KEYS.ControlLeft,
      id: controlKeys,
      active: false,
    },
    {
      title: SPECIAL_KEYS.Alt,
      id: altKeys,
      active: false,
    },
    {
      title: SPECIAL_KEYS.MetaLeft,
      id: metaKeys,
      active: false,
    },
  ]);

  const updateTickers = useCallback(
    (message: string) => {
      setAlphabeticKeys((prevTickers) => {
        if (prevTickers.raw.length >= 40) prevTickers.raw.shift();

        const charCode = message.charCodeAt(0);

        (charCode === 8 || charCode === 127) && (message = 'Backspace');
        charCode === 9 && (message = 'Tab');
        charCode === 13 && (message = 'Enter');
        charCode === 27 && (message = 'Esc');
        charCode === 32 && (message = SPECIAL_KEYS.Space);
        charCode === 85 &&
          message !== 'UpArrow' &&
          (message = SPECIAL_KEYS.ContextMenu);

        GLOBAL_STATE.controlPressed &&
          CONTROL_KEYCODES[charCode] &&
          (message = CONTROL_KEYCODES[charCode]);

        const newTickers: string[] = [];

        if (
          !notDuplicateTickers.includes(message) &&
          !clearedBeforeUsed.includes(message)
        ) {
          newTickers.splice(0, 0, ...prevTickers.raw, message);
        }

        if (message in SPECIAL_KEYS || isFuncKey(message)) {
          message = isFuncKey(message) ? message : SPECIAL_KEYS[message];

          newTickers.splice(
            0,
            newTickers.length,
            ...(!notDuplicateTickers.includes(message) &&
            !clearedBeforeUsed.includes(message) &&
            !isFuncKey(message) &&
            prevTickers.raw.every((key) => key === message)
              ? prevTickers.raw
              : []),
            message,
          );
        }

        return {
          raw: newTickers,
          formatted: settings.mergeDuplicates
            ? mergeDuplicatedTicker(newTickers)
            : newTickers,
        };
      });
    },
    [settings.autoClear, settings.mergeDuplicates, settings.maxCharToShow],
  );

  const updateModifierActiveStatus = (message: string, status: boolean) => {
    setModifierKeys((modifierKeys) => {
      return modifierKeys.map((key) => {
        const _key = { ...key };
        if (_key.id.includes(message)) {
          _key.active = status;
        }
        return _key;
      });
    });
  };

  const updateControlPressedStatus = (message: string, status: boolean) => {
    controlKeys.includes(message) && (GLOBAL_STATE.controlPressed = status);
  };

  useEffect(() => {
    appWindow.setAlwaysOnTop(settings.alwaysOnTop);
  }, [settings.alwaysOnTop]);

  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  useEffect(() => {
    const unlistenKeyPayload = listen<KeyPressPayload>(
      'input-press',
      ({ payload }) => {
        const { mode, message } = payload;

        if (mode === 'Some') {
          updateTickers(message);
        }

        if (mode === 'KeyPress') {
          updateModifierActiveStatus(message, true);
          updateControlPressedStatus(message, true);
          updateTickers(message);
        }

        if (mode === 'KeyRelease') {
          updateControlPressedStatus(message, false);
          updateModifierActiveStatus(message, false);
        }

        if (mode === 'ButtonPress') {
        }
      },
    );

    return () => {
      unlistenKeyPayload && unlistenKeyPayload.then((stop) => stop());
    };
  }, [settings.autoClear, settings.mergeDuplicates, settings.maxCharToShow]);

  return (
    <div
      data-tauri-drag-region
      className={cn('ticker-container group')}
      onContextMenu={(e) => e.preventDefault()}
    >
      <TitleBar
        state={{
          isPinned: settings.alwaysOnTop,
          isMinimalUI: settings.isMinimalUI,
        }}
        callbacks={{
          closeAction: () => appWindow.close(),
          hideAction: () =>
            setSettings({
              ...settings,
              isMinimalUI: !settings.isMinimalUI,
            }),
          pinAction: () =>
            setSettings({
              ...settings,
              alwaysOnTop: !settings.alwaysOnTop,
            }),
        }}
      />

      <div
        className={cn(
          'ticker-wrapper',
          settings.isMinimalUI && 'rounded-b-2xl',
        )}
      >
        {alphabeticKeys.formatted
          .slice(-settings.maxCharToShow)
          .map((ticker, idx) => (
            <Key key={idx} ticker={ticker} />
          ))}
      </div>

      <ModifierKeys isHide={settings.isMinimalUI} modifierKeys={modifierKeys} />
    </div>
  );
}

export default App;
