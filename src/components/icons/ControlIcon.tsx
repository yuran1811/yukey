import type { SVGProps } from 'react';

export function ControlIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 56 56"
      {...props}
    >
      <path
        fill="currentColor"
        d="M8.266 35.781c-.399.422-.633.938-.633 1.524c0 1.218.937 2.156 2.156 2.156c.586 0 1.125-.258 1.524-.633L28 21.79l16.688 17.04c.398.374.96.632 1.523.632a2.12 2.12 0 0 0 2.156-2.156c0-.586-.234-1.102-.633-1.524L29.57 17.22a2.1 2.1 0 0 0-1.57-.68c-.61 0-1.125.234-1.57.68Z"
      />
    </svg>
  );
}
