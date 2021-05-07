import { useState, useRef } from 'react'
import Slider from './components/slider/Slider'
import ControlPanel from './components/controls/ControlPanel'

function App() {
  const [percentage, setPercentage] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  //const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const audioRef = useRef()

  const onChange = (e) => {
    const audio = audioRef.current
    audio.currentTime = (audio.duration / 100) * e.target.value
    setPercentage(e.target.value)
  }

  const play = () => {
    const audio = audioRef.current
    audio.volume = 0.1

    if (!isPlaying) {
      setIsPlaying(true)
      audio.play()
    }

    if (isPlaying) {
      setIsPlaying(false)
      audio.pause()
    }
  }

  const getCurrDuration = (e) => {
    const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2)
    const time = e.currentTarget.currentTime

    setPercentage(+percent)
    setCurrentTime(time.toFixed(2))
  }

  return (
    <div className='app-container'>
      <h1>Login FM - My MUSIC!</h1>
      <Slider percentage={percentage} onChange={onChange} />
      <audio
        ref={audioRef}
        onTimeUpdate={getCurrDuration}
        onLoadedData={(e) => {
          //setDuration(e.currentTarget.duration.toFixed(2))
        }}
        src={'https://node-21.zeno.fm/wk7yfawv0heuv?rj-ttl=5&rj-tok=AAABeUPJ7mYA1HeyMTo3KMkN4g'}
      ></audio>
      <ControlPanel
        play={play}
        isPlaying={isPlaying}
        //duration={duration}
        currentTime={currentTime}
      />
    </div>
  )
}

export default App
