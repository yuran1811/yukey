import type { ModifierKeyType } from '@/shared';
import { cn } from '@/utils';
import {
  ControlIcon,
  MetaModifierIcon,
  OptionModifierIcon,
  ShiftIcon,
} from '../icons';

interface ModifierKeysProps {
  isHide: boolean;
  modifierKeys: ModifierKeyType[];
}

export const ModifierKeys = ({ isHide, modifierKeys }: ModifierKeysProps) => (
  <div className={cn('modifier-keycaps', isHide && 'hidden')}>
    {modifierKeys.map(({ id, active, title }, index) => (
      <div key={`${title}-${index}`} className="keycap">
        {id[0].toLowerCase().startsWith('shift') ? (
          <ShiftIcon className={cn(!active && 'opacity-50')} />
        ) : id[0].toLowerCase().startsWith('control') ? (
          <ControlIcon className={cn(!active && 'opacity-50')} />
        ) : id[0].toLowerCase().startsWith('meta') ? (
          <MetaModifierIcon className={cn(!active && 'opacity-50')} />
        ) : id[0].toLowerCase().startsWith('alt') ? (
          <OptionModifierIcon className={cn(!active && 'opacity-50')} />
        ) : (
          <span className={cn(!active && 'opacity-50')}>{title}</span>
        )}
      </div>
    ))}
  </div>
);
