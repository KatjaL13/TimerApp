type TimeInputProps = {
  seconds: number | null;
  onSecondsChange: (seconds: number | null) => void;
};

function TimeInput({ seconds, onSecondsChange }: TimeInputProps) {
  return (
    <div className="time-setting">
      <label htmlFor="seconds">Zeit festlegen</label>

      <input
        id="seconds"
        type="number"
        min="0"
        placeholder="Sekunden"
        value={seconds ?? ""}
        onChange={(e) => {
          const value = e.target.value;

          if (value === "") {
            onSecondsChange(null);
          } else {
            onSecondsChange(Math.max(0, Number(value)));
          }
        }}
      />
    </div>
  );
}

export default TimeInput;
