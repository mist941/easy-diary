import { ComponentProps, memo } from 'react';

const UnhappyFace = memo((props: ComponentProps<'svg'>) => {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="48" height="48" fill="white" fillOpacity="0.01" />
      <path
        d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
        fill="transparent"
        stroke="oklch(79.5% 0.184 86.047)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M31 18V19"
        stroke="oklch(79.5% 0.184 86.047)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 18V19"
        stroke="oklch(79.5% 0.184 86.047)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31 30.9999C31 30.9999 29 26.9999 24 26.9999C19 26.9999 17 30.9999 17 30.9999"
        stroke="oklch(79.5% 0.184 86.047)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

UnhappyFace.displayName = 'UnhappyFace';

export { UnhappyFace };
