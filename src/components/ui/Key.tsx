import { cn } from '@/utils';

export const Key = ({ ticker }: { ticker: string }) => (
  <div
    className={cn(
      'grow-0 text-4xl transition-all',
      ticker === 'NONE' && 'text-transparent',
    )}
  >
    {ticker === 'NONE' ? '.' : ticker}
  </div>
);
