type TimerControlsProps = {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
};

function TimerControls({ isRunning, onStart, onPause, onReset }: TimerControlsProps) {
  return (
    <div className="timer-controls">
      <button type="button" className="control-button" onClick={onStart} disabled={isRunning}>
        Start
      </button>

      <button type="button" className="control-button" onClick={onPause} disabled={!isRunning}>
        Pause
      </button>

      <button type="button" className="control-button" onClick={onReset}>
        Reset
      </button>
    </div>
  );
}

export default TimerControls;
