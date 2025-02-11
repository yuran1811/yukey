import { cn } from '@/utils';

export const Key = ({ ticker }: { ticker: string }) => (
  <div
    className={cn(
      'text-4xl transition-all min-w-max',
      ticker === 'NONE' && 'text-transparent',
    )}
  >
    {ticker === 'NONE' ? '' : ticker}
  </div>
);
