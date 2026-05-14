import { useEffect, useRef, useState } from "react";

// Returns a class string ("value-pulse") for one tick whenever the
// watched value changes. Use it on resource counters etc.
export function usePulseOnChange<T>(value: T): string {
  const prev = useRef<T>(value);
  const [pulsing, setPulsing] = useState(false);

  useEffect(() => {
    if (prev.current !== value) {
      prev.current = value;
      setPulsing(true);
      const t = setTimeout(() => setPulsing(false), 380);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [value]);

  return pulsing ? "value-pulse" : "";
}
