import { ChangeEventHandler } from 'react';

type SettingItemType = 'switch' | 'input-text' | 'input-number';

interface SettingItemPropsMapping {
  switch: {
    type: 'switch';
    id: string;
    state: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;

    label?: string;
  };
  'input-text': {
    type: 'input-text';
    id: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;

    label?: string;
    defaultValue?: string;
    placeholder?: string;
  };
  'input-number': {
    type: 'input-number';
    id: string;
    value: number;
    onChange: ChangeEventHandler<HTMLInputElement>;

    label?: string;
    defaultValue?: number;
    minValue?: number;
    maxValue?: number;
  };
}

type SettingItemProps<T extends SettingItemType> =
  T extends keyof SettingItemPropsMapping ? SettingItemPropsMapping[T] : never;

export const SettingItem = <T extends SettingItemType>(
  props: SettingItemProps<T>,
) => {
  return (
    <div className="h-max w-full **:text-[hsl(var(--primary-foreground))]">
      {props.type.startsWith('input') ? (
        <label htmlFor={props.id} className="flex items-center justify-between">
          <span className="flex-2">{props.label || props.id}</span>

          {props.type === 'input-number' && (
            <input
              id={props.id}
              type="number"
              className="max-w-1/3"
              defaultValue={props.value}
              min={props.minValue}
              max={props.maxValue}
              onChange={props.onChange}
            />
          )}

          {props.type === 'input-text' && (
            <input
              id={props.id}
              type="text"
              className="max-w-1/3"
              defaultValue={props.value}
              placeholder={props.placeholder}
              onChange={props.onChange}
            />
          )}
        </label>
      ) : props.type === 'switch' ? (
        <label
          htmlFor={props.id}
          className="flex cursor-pointer items-center justify-between text-gray-100 **:!pointer-events-auto"
        >
          <span className="flex-2">{props.label || props.id}</span>
          <span className="relative max-w-1/3">
            <input
              id={props.id}
              type="checkbox"
              className="peer hidden"
              checked={props.state}
              onChange={props.onChange}
            />
            <div className="h-4 w-10 rounded-full border-1 border-[hsl(var(--primary-foreground))] bg-[hsl(var(--primary-foreground))] opacity-30 brightness-50 peer-checked:opacity-100 peer-checked:brightness-90" />
            <div className="absolute -inset-y-1 left-0 h-6 w-6 rounded-full bg-[hsl(var(--primary-foreground))] peer-checked:right-0 peer-checked:left-auto" />
          </span>
        </label>
      ) : null}
    </div>
  );
};
