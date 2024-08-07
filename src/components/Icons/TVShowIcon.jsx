const TVIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 48 48"
    className="fill-current"
  >
    <defs>
      <mask id="ipSTvOne0">
        <g fill="none" strokeLinejoin="round" strokeWidth={4}>
          <path
            fill="#fff"
            stroke="#fff"
            d="M42 12H6a2 2 0 0 0-2 2v26a2 2 0 0 0 2 2h36a2 2 0 0 0 2-2V14a2 2 0 0 0-2-2Z"
          />
          <path fill="#000" stroke="#000" d="M31 19H11v16h20z" />
          <path stroke="#fff" strokeLinecap="round" d="m14 4.5l9.09 7.5L34 2" />
          <path stroke="#000" strokeLinecap="round" d="M38 18v1m0 6v1" />
        </g>
      </mask>
    </defs>
    <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSTvOne0)" />
  </svg>
);

export default TVIcon;
