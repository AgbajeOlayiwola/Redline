const Logosvg = ({ wid, hei }: { wid: string; hei: string }) => {
  return (
    <>
      <svg
        width={wid}
        height={hei}
        viewBox="0 0 79 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        // xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <mask
          id="mask0_2402_19939"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="79"
          height="32"
        >
          <mask
            id="mask1_2402_19939"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="79"
            height="32"
          >
            <rect
              width="78.7027"
              height="32"
              fill="url(#pattern0_2402_19939)"
            />
          </mask>
          <g mask="url(#mask1_2402_19939)">
            <rect width="78.7027" height="32" fill="white" />
          </g>
        </mask>
        <g mask="url(#mask0_2402_19939)">
          <rect x="-1.29688" width="35.027" height="31.819" fill="#3ED2FF" />
          <rect x="35.459" width="43.2432" height="31.819" fill="#0F0F0F" />
        </g>
        <defs>
          <pattern
            id="pattern0_2402_19939"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              href="#image0_2402_19939"
              transform="matrix(0.00404858 0 0 0.00995733 0 -0.00284497)"
            />
          </pattern>
          <image
            id="image0_2402_19939"
            width="247"
            height="101"
            href="data:image/png;base64,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"
          />
        </defs>
      </svg>
    </>
  )
}

export default Logosvg
