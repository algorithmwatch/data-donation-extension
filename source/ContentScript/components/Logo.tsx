import * as React from 'react';

function Logo({className}: {className?: string}): React.ReactElement {
  return (
    <svg
      className={className}
      width="190"
      height="190"
      viewBox="0 0 190 190"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29 56.0425C29 35.0322 46.0322 18 67.0425 18H122.987C143.998 18 161.03 35.0322 161.03 56.0425V161.219H67.0425C46.0322 161.219 29 144.187 29 123.176V56.0425Z"
        fill="#312509"
      />
      <circle cx="69.2731" cy="69.4779" r="13.4268" fill="white" />
      <circle cx="120.741" cy="69.4779" r="13.4268" fill="white" />
      <ellipse
        cx="99.3839"
        cy="182.814"
        rx="46.7775"
        ry="2.18586"
        fill="#C4C4C4"
      />
    </svg>
  );
}

export default Logo;
