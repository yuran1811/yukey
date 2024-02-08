import { ModifierKeyType } from '@/shared';

interface ModifierKeysProps {
  modifierKeys: ModifierKeyType[];
}

export const ModifierKeys = ({ modifierKeys }: ModifierKeysProps) => (
  <div className="modifier-keycaps">
    {modifierKeys.map(({ active, title }, index) => (
      <div key={`${title}-${index}`} className="keycap main-background">
        <span className={active ? '' : 'opacity-50'}>{title}</span>
      </div>
    ))}
  </div>
);
