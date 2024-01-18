import { Player } from "@lottiefiles/react-lottie-player"
const LoadingAnimation = () => {
  return (
    <div>
      {" "}
      <Player
        src="../lotties/loading.json"
        className="player"
        loop
        autoplay
        speed={10}
      />
    </div>
  )
}

export default LoadingAnimation
