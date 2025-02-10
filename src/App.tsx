import { listen } from '@tauri-apps/api/event';
import { appWindow } from '@tauri-apps/api/window';
import { useEffect, useState } from 'react';

import { Key, ModifierKeys, TitleBar } from '@/components';
import {
  ModifierKeyType,
  altKeys,
  controlKeyCodes,
  controlKeys,
  metaKeys,
  shiftKeys,
  specialKeysObj,
} from '@/shared';
import { useStore } from '@/store';
import { changeTheme, cn, isFuncKey, mergeDuplicatedTicker } from '@/utils';

const appWindow = getCurrentWebviewWindow();

const GLOBAL_STATE = {
  maxCharToShow: 5,
  controlPressed: false,
  countAppears: {} as Record<string, number>,
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
      title: specialKeysObj.ShiftLeft,
      id: shiftKeys,
      active: false,
    },
    {
      title: specialKeysObj.ControlLeft,
      id: controlKeys,
      active: false,
    },
    { title: specialKeysObj.Alt, id: altKeys, active: false },
    {
      title: specialKeysObj.MetaLeft,
      id: metaKeys,
      active: false,
    },
  ]);

  const needTobeCleared = (message: string) =>
    [
      specialKeysObj.ControlLeft,
      specialKeysObj.ControlRight,
      specialKeysObj.MetaLeft,
      specialKeysObj.MetaRight,
      specialKeysObj.Alt,
      specialKeysObj.AltGr,
      specialKeysObj.Esc,
    ].includes(message);

  const mergeDuplicatedTicker = (tickers: string[]) => {
    const newTickers = [];

    const tickersLength = tickers.length;
    for (let i = 0; i < tickersLength; i++) {
      let countAppears = 1;

      let j = i + 1;
      for (; tickers[i] === tickers[j] && j < tickersLength; j++)
        countAppears++;

      newTickers.push(
        `${tickers[i]}${countAppears > 1 ? `⨯${countAppears}` : ''}`,
      );

      i = j - 1;
    }

    return newTickers;
  };

  const updateTickers = (message: string) => {
    setAlphabeticKeys((prevTickers) => {
      const charCode = message.charCodeAt(0);

      charCode === 8 && (message = specialKeysObj.Backspace);
      charCode === 9 && (message = specialKeysObj.Tab);
      charCode === 13 && (message = specialKeysObj.Enter);
      charCode === 27 && (message = specialKeysObj.Esc);
      charCode === 32 && (message = specialKeysObj.Space);
      charCode === 85 && (message = specialKeysObj.ContextMenu);

      GLOBAL_STATE.controlPressed &&
        controlKeyCodes[charCode] &&
        (message = controlKeyCodes[charCode]);

      message in specialKeysObj && (message = specialKeysObj[message]);

      let newTickers = [message];
      if (!needTobeCleared(message)) {
        newTickers = [...prevTickers.raw, message];
      }
      const newTickersFormatted = mergeDuplicatedTicker(newTickers);

      // const currentLength = newTickers.length;

      // currentLength > maxTickerLength && newTickers.shift();

      return { raw: newTickers, formatted: newTickersFormatted };
    });
  };

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

      if (mode === 'Some') {
        updateTickers(message);
      }

      if (mode === 'KeyPress') {
        updateControlPressedStatus(message, true);
        updateTickers(message);
        updateModifierActiveStatus(message, true);
      }

      if (mode === 'KeyRelease') {
        updateControlPressedStatus(message, false);
        updateModifierActiveStatus(message, false);
      }
    });

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
