import type { SVGProps } from 'react';

export function MaximizeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
      {...props}
    >
      <path
        fill="currentColor"
        d="M20 2v2h6.586L18 12.582L19.414 14L28 5.414V12h2V2zm-6 17.416L12.592 18L4 26.586V20H2v10h10v-2H5.414z"
      />
    </svg>
  );
}
