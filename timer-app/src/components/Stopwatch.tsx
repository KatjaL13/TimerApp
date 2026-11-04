type StopwatchProps = {
  timeLeft: number;
};

function Stopwatch({ timeLeft }: StopwatchProps) {
  const totalSeconds = Math.floor(timeLeft / 1000);

  const milliseconds = timeLeft % 1000;

  const [tenths, hundredths, thousandths] = String(milliseconds).padStart(3, "0").split("");

  return (
    <div className="stopwatch">
      <div className="watch-button watch-button-left" />
      <div className="watch-button watch-button-right" />

      <div className="watch-face">
        <h1>Time left</h1>

        <div className="digital-display">
          <div className="digit seconds">{totalSeconds}</div>

          <span className="decimal-point">.</span>

          <div className="digit">{tenths}</div>
          <div className="digit">{hundredths}</div>
          <div className="digit">{thousandths}</div>

          <span className="unit">s</span>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
