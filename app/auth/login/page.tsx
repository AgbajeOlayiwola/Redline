"use client"
import TrainSvg from "@/component/SVGs/TrainSvg"
import BrideSvg from "@/component/SVGs/bridge"
import Logosvg from "@/component/SVGs/logosvg"
import Slider from "react-slick"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"

import LoginLayout from "@/component/Layout/Login"
import SetPassword from "@/component/Layout/SetPassword"
import { useState } from "react"
import styles from "./styles.module.css"
const Login = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 5000,
    cssEase: "linear",
  }
  const [page, setPage] = useState(0)
  const conditionalComponent = () => {
    switch (page) {
      case 0:
        return <LoginLayout />
      case 1:
        return <SetPassword previous={() => setPage(0)} />
    }
  }

  return (
    <div>
      <div className={styles.logFlex}>
        <Logosvg wid="247" hei="101" />
      </div>
      <div className={styles.loginBoxCover}>
        <div className={styles.loginBox}>{conditionalComponent()}</div>
      </div>
      <div className={styles.train}>
        <Slider {...settings}>
          <TrainSvg />
          <TrainSvg />
          <TrainSvg />
        </Slider>
        <div className={styles.bridge}>
          <BrideSvg />
          <BrideSvg />
        </div>
      </div>
    </div>
  )
}

export default Login
