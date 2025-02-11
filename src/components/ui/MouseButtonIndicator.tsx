import { MouseButtonAction } from '@/shared';
import { cn } from '@/utils';
import { MouseLeftIcon, MouseMiddleIcon, MouseRightIcon } from '../icons';

interface MouseButtonIndicatorProps {
  isHide: boolean;
  actionType: MouseButtonAction;
}

export const MouseButtonIndicator = ({
  isHide,
  actionType,
}: MouseButtonIndicatorProps) => {
  return (
    <div
      className={cn(
        isHide && 'hidden',
        'flexcenter absolute right-0 bottom-0 size-12 text-3xl',
      )}
    >
      {actionType === MouseButtonAction.Left ? (
        <MouseLeftIcon />
      ) : actionType === MouseButtonAction.Middle ? (
        <MouseMiddleIcon />
      ) : actionType === MouseButtonAction.Right ? (
        <MouseRightIcon />
      ) : null}
    </div>
  );
};
