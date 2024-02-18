import React from "react"

const BurgerMenuSVg = ({ onClick }: { onClick: any }) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="14"
      viewBox="0 0 24 14"
      fill="none"
    >
      <path
        d="M0.571533 0H23.4287V2.28571H0.571533V0ZM6.28582 5.71429H23.4287V8H6.28582V5.71429ZM13.4287 11.4286H23.4287V13.7143H13.4287V11.4286Z"
        fill="#737373"
      />
    </svg>
  )
}

export default BurgerMenuSVg
