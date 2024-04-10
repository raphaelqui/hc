/** @format */
import React, { useState, useEffect, Component, useRef } from "react";

function useCountdownTimer(startCountdown: any, duration: any) {
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    let intervalId: any;

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
