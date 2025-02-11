import type { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

import { CloseIcon } from '@/components/icons';
import { cn } from '@/utils';
import { Tooltip } from '..';

type ModalProps = PropsWithChildren & {
  show?: boolean;
  title?: string;
  className?: string;
  closeAction?: React.MouseEventHandler<HTMLElement>;
};

export const Modal = ({
  show = false,
  title = '',
  className = '',
  children,
  closeAction,
}: ModalProps) => {
  return createPortal(
    show && (
      <div
        data-tauri-drag-region
        className={cn(
          className,
          '!pointer-events-auto fixed inset-0 z-10 rounded-2xl',
        )}
      >
        <div className="m-1 flex justify-between rounded-2xl bg-[hsl(var(--background))]/80 p-2">
          <div className="flex items-center pl-2 font-medium">{title}</div>
          <div className="flex flex-row-reverse">
            <button onClick={closeAction} className="btn-close group/tooltip">
              <Tooltip text="Close" />
              <CloseIcon />
            </button>
          </div>
        </div>

        <div className="flexcenter m-1 mb-0 h-[calc(100dvh-56px)] overflow-hidden rounded-2xl backdrop-blur-lg">
          {children}
        </div>
      </div>
    ),
    document.getElementById('modal-container')!,
  );
};
