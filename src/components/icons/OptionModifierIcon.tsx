import type { SVGProps } from 'react';

export function OptionModifierIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M4 5h1.044c1.918 0 2.878 0 3.63.495c.75.496 1.129 1.378 1.885 3.141l2.883 6.728c.755 1.763 1.133 2.645 1.885 3.14c.751.496 1.71.496 3.63.496H20M14 5h6"
        color="currentColor"
      />
    </svg>
  );
}
