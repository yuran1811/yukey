import { cn } from '@/utils';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  position?: TooltipPosition;
  text: string;
}

export const Tooltip = ({ position = 'bottom', text }: TooltipProps) => (
  <div
    className={cn(
      'absolute right-0 z-2 rounded-md border-2 border-current bg-[hsl(var(--background))] px-2 py-1 text-sm tracking-wide text-current opacity-0 transition-opacity group-hover/tooltip:opacity-100',
      position == 'top'
        ? '-top-9'
        : position == 'bottom'
          ? 'top-9'
          : position == 'left'
            ? '-translate-x-full'
            : position == 'right'
              ? 'translate-x-full'
              : '',
    )}
  >
    {text}
  </div>
);
