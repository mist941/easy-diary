import { ComponentProps, memo } from 'react';

const EmptyFace = memo((props: ComponentProps<'svg'>) => {
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
        stroke="oklch(55.4% 0.046 257.417)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M31 18V19"
        stroke="oklch(55.4% 0.046 257.417)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 18V19"
        stroke="oklch(55.4% 0.046 257.417)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

EmptyFace.displayName = 'EmptyFace';

export { EmptyFace };
