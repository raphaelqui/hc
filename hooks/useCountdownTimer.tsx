/** @format */
import React, { useState, useEffect, Component, useRef } from "react";

function useCountdownTimer(startCountdown, duration) {
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    let intervalId;

    if (startCountdown) {
      setIsCounting(true);

      intervalId = setInterval(() => {
        setIsCounting(false);
      }, duration);

      return () => clearInterval(intervalId);
    } else {
      setIsCounting(false);
      clearInterval(intervalId);
    }
  }, [startCountdown, duration]);

  return isCounting;
}

export default useCountdownTimer;
