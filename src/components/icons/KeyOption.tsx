import { SVGProps } from 'react';

export function KeyboardOptionKey(props: SVGProps<SVGSVGElement>) {
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
        d="M14.775 19L7.85 7H3V5h6l6.925 12H21v2zM15 7V5h6v2z"
      />
    </svg>
  );
}
