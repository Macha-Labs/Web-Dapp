import React from "react";

const IconDarkUser = () => {
  return (
    <svg width={32} height={32} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity={0.8}>
        <rect width={32} height={32} rx={10} fill="url(#a)" />
        <rect
          x={0.5}
          y={0.5}
          width={31}
          height={31}
          rx={9.5}
          stroke="url(#b)"
          strokeOpacity={0.5}
        />
      </g>
      <path
        d="M8.5 21.833v.5a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-.5a5 5 0 0 0-5-5h-5a5 5 0 0 0-5 5Z"
        fill="url(#c)"
      />
      <circle cx={16} cy={11.417} fill="url(#d)" r={3.75} />
      <defs>
        <linearGradient
          id="a"
          x1={2.133}
          y1={3.902}
          x2={31.691}
          y2={28.305}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0D2147" stopOpacity={0.66} />
          <stop offset={1} stopColor="#0B2049" stopOpacity={0.15} />
        </linearGradient>
        <linearGradient
          id="b"
          x1={6.126}
          y1={1.463}
          x2={28.343}
          y2={28.983}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#353C54" />
          <stop offset={1} stopColor="#071F4E" stopOpacity={0.76} />
        </linearGradient>
        <linearGradient
          id="c"
          x1={8.5}
          y1={17.372}
          x2={23.249}
          y2={23.894}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#197CEC" />
          <stop offset={0.609} stopColor="#004AD9" />
        </linearGradient>
        <linearGradient
          id="d"
          x1={12.25}
          y1={8.206}
          x2={20.655}
          y2={10.064}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#197CEC" />
          <stop offset={0.609} stopColor="#004AD9" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default IconDarkUser;
