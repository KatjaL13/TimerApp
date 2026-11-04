import { useState } from "react";

import TimeInput from "./components/TimeInput";
import Stopwatch from "./components/Stopwatch";
import TimerControls from "./components/TimerControls";

import { useCountdown } from "./hooks/countdown";

import "./App.css";

function App() {
  const [seconds, setSeconds] = useState<number | null>(null);

  const [timerKey, setTimerKey] = useState(0);

  const handleSecondsChange = (value: number | null) => {
    setSeconds(value);
    setTimerKey((previous) => previous + 1);
  };

  return (
    <main className="timer-app">
      <div className="timer-container">
        <TimeInput seconds={seconds} onSecondsChange={handleSecondsChange} />

        <Timer key={timerKey} seconds={seconds ?? 0} />
      </div>
    </main>
  );
}

type TimerProps = {
  seconds: number;
};

function Timer({ seconds }: TimerProps) {
  const { timeLeft, isRunning, start, pause, reset } = useCountdown(seconds);

  return (
    <>
      <Stopwatch timeLeft={timeLeft} />

      <TimerControls isRunning={isRunning} onStart={start} onPause={pause} onReset={reset} />
    </>
  );
}

export default App;
