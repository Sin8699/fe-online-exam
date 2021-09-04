import './style.css'

const Clock = ({ hours, minutes, seconds, completed }) => {
  const warning = hours === 0 && minutes < 5
  const error = hours === 0 && minutes < 1

  if (completed) {
    // Render a completed state
    return <p>Hết giờ làm bài</p>
  } else {
    // Render a countdown
    return (
      <div className="clock">
        <div className={`container ${error ? 'error' : warning ? 'warning' : 'normal'}`}>
          <div className="item">{hours > 9 ? `${hours}` : `0${hours}`}</div>
          <div className="item-2">:</div>
          <div className="item">{minutes > 9 ? `${minutes}` : `0${minutes}`}</div>
          <div className="item-2">:</div>
          <div className="item">{seconds > 9 ? `${seconds}` : `0${seconds}`}</div>
        </div>
      </div>
    )
  }
}

export default Clock
