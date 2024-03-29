const Back_svg = ({ onClick }: { onClick: any }) => {
  return (
    <svg
      onClick={() => onClick()}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M9.57 5.93018L3.5 12.0002L9.57 18.0702"
        stroke="#374267"
        strokeWidth="3.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.4999 12H3.66992"
        stroke="#374267"
        strokeWidth="3.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Back_svg
