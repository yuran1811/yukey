import type { ThemeItemType } from '@/shared';
import { useStore } from '@/store';
import { cn } from '@/utils';

interface ThemeItemProps {
  theme: ThemeItemType;
}

export const ThemeItem = ({ theme }: ThemeItemProps) => {
  const currentTheme = useStore((state) => state.theme);
  const setTheme = useStore((state) => state.setTheme);

  return (
    <button
      className={cn(
        "relative size-7 rounded-full border-2 after:absolute after:inset-0 after:z-[-1] after:animate-ping after:rounded-full after:border-2 after:bg-current after:content-['']",
        theme.name !== currentTheme && 'after:hidden',
      )}
      style={{
        background: theme.background,
        color: theme.foreground,
        borderColor: 'currentcolor',
      }}
      onClick={() => setTheme(theme.name)}
    />
  );
};
