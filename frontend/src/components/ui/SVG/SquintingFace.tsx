import { ComponentProps, memo } from 'react';

const SquintingFace = memo((props: ComponentProps<'svg'>) => {
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
        stroke="oklch(67.6% 0.214 174.525)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M31 31C31 31 29 35 24 35C19 35 17 31 17 31"
        stroke="oklch(67.6% 0.214 174.525)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 21C21 21 20 17 17 17C14 17 13 21 13 21"
        stroke="oklch(67.6% 0.214 174.525)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35 21C35 21 34 17 31 17C28 17 27 21 27 21"
        stroke="oklch(67.6% 0.214 174.525)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

SquintingFace.displayName = 'SquintingFace';

export { SquintingFace };
