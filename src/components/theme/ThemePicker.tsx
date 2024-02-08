import { ThemeItem } from '..';

export const ThemePicker = () => {
  return (
    <div>
      {Array(10).map((_, idx) => (
        <ThemeItem key={idx} />
      ))}
    </div>
  );
};
