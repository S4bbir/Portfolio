"use client";

import { useEffect, useState } from "react";

export function useWebGL(): { supported: boolean; checked: boolean } {
  const [state, setState] = useState({ supported: true, checked: false });

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setState({ supported: !!gl, checked: true });
    } catch {
      setState({ supported: false, checked: true });
    }
  }, []);

  return state;
}
