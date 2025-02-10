import { THEME_VARIANTS } from '@/shared';
import { ThemeItem } from '..';

export const ThemePicker = () => {
  return (
    <div className="flexcenter w-4/5 flex-wrap gap-3 px-2 py-3">
      {THEME_VARIANTS.map((theme, idx) => (
        <ThemeItem key={idx} theme={theme} />
      ))}
    </div>
  );
};
