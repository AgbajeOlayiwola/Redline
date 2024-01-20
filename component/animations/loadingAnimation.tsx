import Lottie from "react-lottie"
import * as animationData from "../lotties/loading.json"
const LoadingAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }
  return (
    <div>
      {" "}
      <Lottie options={defaultOptions} height={100} width={100} />
    </div>
  )
}

export default LoadingAnimation
