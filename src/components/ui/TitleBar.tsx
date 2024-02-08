import { useState } from 'react';

import {
  CloseIcon,
  ColorPaletteIcon,
  MinimizeIcon,
  PinIcon,
  SettingIcon,
} from '@/components/icons';
import { cn } from '@/utils';
import { Tooltip } from '..';

interface TitleBarProps {
  state: {
    isPinned: boolean;
  };
  callbacks: {
    pinAction?: React.MouseEventHandler<HTMLButtonElement>;
    closeAction?: React.MouseEventHandler<HTMLButtonElement>;
    hideAction?: React.MouseEventHandler<HTMLButtonElement>;
  };
}

export const TitleBar = ({
  state: { isPinned },
  callbacks: { pinAction, closeAction, hideAction },
}: TitleBarProps) => {
  const [openPanels, setOpenPanels] = useState({
    theme: false,
    setting: false,
  });

  return (
    <div className="z-10 my-1 flex w-full translate-y-1/2 flex-row-reverse gap-3 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
      <button onClick={closeAction} className="btn-close group/tooltip">
        <Tooltip text="Close" />
        <CloseIcon />
      </button>

      <button onClick={hideAction} className="btn-hide group/tooltip">
        <Tooltip text="Hide" />
        <MinimizeIcon />
      </button>

      <button
        onClick={pinAction}
        className={cn('btn-pin group/tooltip', isPinned && 'active')}
      >
        <Tooltip text="Pin" />
        <PinIcon />
      </button>

      <button
        className="btn-theme group/tooltip"
        onClick={() =>
          setOpenPanels({ ...openPanels, theme: !openPanels.theme })
        }
      >
        <Tooltip text="Theme" />
        <ColorPaletteIcon />
      </button>

      <button
        className="btn group/tooltip"
        onClick={() =>
          setOpenPanels({ ...openPanels, setting: !openPanels.setting })
        }
      >
        <Tooltip text="Settings" />
        <SettingIcon />
      </button>
    </div>
  );
};
