/** @format */

import React, { useState, useEffect } from "react";

interface ITimeoutRender {
  children: React.ReactNode;
  delay: number;
}
const TimeoutRender: React.FunctionComponent<ITimeoutRender> = ({
  children,
  delay,
}) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShouldRender(true);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [delay]);

  return shouldRender ? children : null;
};

export default TimeoutRender;
