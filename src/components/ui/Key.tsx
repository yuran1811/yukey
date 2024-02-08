import { cn } from '@/utils';

export const Key = ({ ticker }: { ticker: string }) => (
  <div
    className={cn(
      'ticker-item grow-0 transition-all',
      ticker === 'NONE' && 'text-transparent',
    )}
  >
    {ticker === 'NONE' ? '.' : ticker}
  </div>
);
