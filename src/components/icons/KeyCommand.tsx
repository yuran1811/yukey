import type { SVGProps } from 'react';

export function KeyboardCommandKey(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M6.5 21q-1.45 0-2.475-1.025T3 17.5q0-1.45 1.025-2.475T6.5 14H8v-4H6.5q-1.45 0-2.475-1.025T3 6.5q0-1.45 1.025-2.475T6.5 3q1.45 0 2.475 1.025T10 6.5V8h4V6.5q0-1.45 1.025-2.475T17.5 3q1.45 0 2.475 1.025T21 6.5q0 1.45-1.025 2.475T17.5 10H16v4h1.5q1.45 0 2.475 1.025T21 17.5q0 1.45-1.025 2.475T17.5 21q-1.45 0-2.475-1.025T14 17.5V16h-4v1.5q0 1.45-1.025 2.475T6.5 21m0-2q.625 0 1.063-.437T8 17.5V16H6.5q-.625 0-1.062.438T5 17.5q0 .625.438 1.063T6.5 19m11 0q.625 0 1.063-.437T19 17.5q0-.625-.437-1.062T17.5 16H16v1.5q0 .625.438 1.063T17.5 19M10 14h4v-4h-4zM6.5 8H8V6.5q0-.625-.437-1.062T6.5 5q-.625 0-1.062.438T5 6.5q0 .625.438 1.063T6.5 8M16 8h1.5q.625 0 1.063-.437T19 6.5q0-.625-.437-1.062T17.5 5q-.625 0-1.062.438T16 6.5z"
      />
    </svg>
  );
}
